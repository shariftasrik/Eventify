class AuthController {
  constructor(userService) {
    this.userService = userService;

    // Bind methods so 'this' works in routes
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
  }

  async signup(req, res) {
    try {
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
      } = req.body;

      // REQUIRED FIELDS
      if (!username || !email || !password || !first_name || !last_name) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Email format
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      // Username length
      if (username.length > 50) {
        return res
          .status(400)
          .json({ error: "Username too long (max 50 chars)" });
      }

      // Name length
      if (first_name.length > 50 || last_name.length > 50) {
        return res
          .status(400)
          .json({ error: "First or last name too long (max 50 chars)" });
      }

      // other fields validation
      if (student_id && student_id.length > 20) {
        return res
          .status(400)
          .json({ error: "Student ID too long (max 20 chars)" });
      }

      if (phone && phone.length > 11) {
        return res
          .status(400)
          .json({ error: "Phone number too long (max 11 chars)" });
      }

      if (
        year_of_study &&
        (!Number.isInteger(year_of_study) || year_of_study <= 0)
      ) {
        return res
          .status(400)
          .json({ error: "Year of study must be a positive integer" });
      }

      if (profile_image && profile_image.length > 255) {
        return res
          .status(400)
          .json({ error: "Profile image URL too long (max 255 chars)" });
      }

      // then Service ke pass korbo
      const user = await this.userService.signup({
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
      });

      // Exclude password_hash before sending response
      const { password_hash, ...userWithoutPassword } = user;

      res.status(201).json(userWithoutPassword);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async login(req, res) {
    try {
      const { identifier, password } = req.body;
      const result = await this.userService.login({ identifier, password });
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async logout(req, res) {
    // example: clear token on client or just return success
    res.json({ message: "Logged out successfully" });
  }

  async verifyEmail(req, res) {
    try {
      const { token } = req.query;
      if (!token) {
        return res
          .status(400)
          .json({ error: "Verification token is required" });
      }

      const result = await this.userService.verifyEmail(token);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = AuthController;
