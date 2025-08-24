const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { generateAccessToken } = require("../config/generateToken");
const nodemailer = require("nodemailer");

class ClubService {
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

  async getAllActiveClubs() {
    const result = await pool.query(
      `SELECT * FROM clubs WHERE is_active = true ORDER BY created_at DESC`
    );
    return result.rows;
  }

  async createClub({
    name,
    description,
    club_type,
    contact_email,
    contact_phone,
  }) {
    const result = await pool.query(
      `INSERT INTO clubs (name, description, club_type, contact_email, contact_phone)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, description, club_type, contact_email, contact_phone]
    );
    return result.rows[0];
  }

  async getClubById(id) {
    const result = await pool.query(`SELECT * FROM clubs WHERE id = $1`, [id]);
    return result.rows[0];
  }

  async updateClub(
    id,
    { name, description, club_type, contact_email, contact_phone }
  ) {
    const result = await pool.query(
      `UPDATE clubs
       SET name = $1, description = $2, club_type = $3,
           contact_email = $4, contact_phone = $5, updated_at = NOW(), logo_url = $6, website_url = $7, social_links = $8, is_active = $9
       WHERE id = $10
       RETURNING *`,
      [
        name,
        description,
        club_type,
        contact_email,
        contact_phone,
        logo_url,
        website_url,
        social_links,
        is_active,
        id,
      ]
    );
    return result.rows[0];
  }

  async addMemberToClub({ user_id, club_id, club_role_id, assigned_by }) {
    const result = await pool.query(
      `INSERT INTO club_members (user_id, club_id, club_role_id, assigned_by)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id, club_id, club_role_id) DO NOTHING
       RETURNING *`,
      [user_id, club_id, club_role_id, assigned_by]
    );
    return result.rows[0];
  }

  async getClubMembers(clubId) {
    const result = await pool.query(
      `SELECT cm.id, u.username, u.first_name, u.last_name, cr.name as club_role
       FROM club_members cm
       JOIN users u ON cm.user_id = u.id
       JOIN club_roles cr ON cm.club_role_id = cr.id
       WHERE cm.club_id = $1 AND cm.is_active = true`,
      [clubId]
    );
    return result.rows;
  }

  async updateClubMember(memberId, { club_role_id, is_active }) {
    const result = await pool.query(
      `UPDATE club_members
       SET club_role_id = COALESCE($1, club_role_id),
           is_active = COALESCE($2, is_active)
       WHERE id = $3
       RETURNING *`,
      [club_role_id, is_active, memberId]
    );
    return result.rows[0];
  }

  async getUsersClubMemberships(userId) {
    const result = await pool.query(
      `SELECT cm.id, c.name as club_name, cr.name as club_role
       FROM club_members cm
       JOIN clubs c ON cm.club_id = c.id
       JOIN club_roles cr ON cm.club_role_id = cr.id
       WHERE cm.user_id = $1 AND cm.is_active = true`,
      [userId]
    );
    return result.rows;
  }

  async getClubRoles(clubId) {
    const result = await pool.query(
      `SELECT * FROM club_roles WHERE club_id = $1`,
      [clubId]
    );
    return result.rows;
  }

  async createClubRole(clubId, { name }) {
    const result = await pool.query(
      `INSERT INTO club_roles (club_id, name)
       VALUES ($1, $2)
       RETURNING *`,
      [clubId, name]
    );
    return result.rows[0];
  }

  async updateClubRole(roleId, { name }) {
    const result = await pool.query(
      `UPDATE club_roles
       SET name = COALESCE($1, name)
       WHERE id = $2
       RETURNING *`,
      [name, roleId]
    );
    return result.rows[0];
  }

  async getAllPermissions() {
    const result = await pool.query(`SELECT * FROM permissions`);
    return result.rows;
  }
}

module.exports = ClubService;
