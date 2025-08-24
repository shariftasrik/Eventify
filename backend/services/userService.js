const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { generateAccessToken } = require("../config/generateToken");
const nodemailer = require("nodemailer");

class UserService {
  constructor(db) {
    this.db = db;

    // Setup email transporter
    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  // ----------Signup---------------
  async signup(userData) {
    const {
      username,
      email,
      password,
      first_name,
      last_name,
      student_id,
      phone,
      department,
      year_of_study,
      profile_image,
    } = userData;

    // Check if user exists
    const existing = await this.db.query(
      `SELECT * FROM users WHERE email = $1 OR username = $2 OR student_id = $3`,
      [email, username, student_id]
    );
    if (existing.rows.length > 0) {
      throw new Error("Email, username or student ID already in use");
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Generate email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString("hex");

    // Insert user
    const result = await this.db.query(
      `INSERT INTO users 
        (username, email, password_hash, first_name, last_name, student_id, phone, department, year_of_study, profile_image, email_verification_token)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       RETURNING id, uuid, username, email, first_name, last_name, student_id, phone, department, year_of_study, profile_image, email_verified`,
      [
        username,
        email,
        password_hash,
        first_name,
        last_name,
        student_id,
        phone,
        department,
        year_of_study,
        profile_image,
        emailVerificationToken,
      ]
    );

    const user = result.rows[0];

    // Send verification email
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${emailVerificationToken}`;
    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email",
      html: `<p>Hello ${first_name},</p>
             <p>Please verify your email by clicking the link below:</p>
             <a href="${verificationLink}">${verificationLink}</a>
             <p>Thank you!</p>`,
    });

    return { message: "Signup successful! Please verify your email.", user };
  }

  // ----------------Login-------------
  async login({ identifier, password }) {
    let result = await this.db.query(`SELECT * FROM users WHERE email = $1`, [
      identifier,
    ]);

    if (result.rows.length === 0) {
      result = await this.db.query(`SELECT * FROM users WHERE username = $1`, [
        identifier,
      ]);
    }

    if (result.rows.length === 0) {
      result = await this.db.query(
        `SELECT * FROM users WHERE student_id = $1`,
        [identifier]
      );
    }

    if (result.rows.length === 0) throw new Error("Invalid credentials");

    const user = result.rows[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) throw new Error("Invalid credentials");

    // Check email verified
    if (!user.email_verified)
      throw new Error("Please verify your email before logging in");

    // Generate JWT access token
    const accessToken = generateAccessToken(user.id);

    const { password_hash, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, accessToken };
  }

  // ----------------Verify Email-----------
  async verifyEmail(token) {
    const { rows } = await this.db.query(
      `UPDATE users
       SET email_verified = TRUE, email_verification_token = NULL
       WHERE email_verification_token = $1
       RETURNING id, uuid, username, email, email_verified`,
      [token]
    );

    if (rows.length === 0) throw new Error("Invalid or expired token");

    return { message: "Email verified successfully!", user: rows[0] };
  }
}

module.exports = UserService;
