class CertificateService {
  constructor(db) {
    this.db = db;
  }

  // Get certificate by eventId & userId (for download)
  async getCertificate(eventId, userId) {
    try {
      const query = `
        SELECT c.*, r.user_id
        FROM certificates c
        JOIN event_registrations r ON c.registration_id = r.id
        WHERE r.event_id = $1 AND r.user_id = $2
      `;
      const { rows } = await this.db.query(query, [eventId, userId]);
      return rows[0] || null;
    } catch (err) {
      console.error("Error in getCertificate:", err.message);
      throw new Error("Failed to fetch certificate");
    }
  }

  async generateCertificates(eventId) {
    try {
      // 1. Get attendees who haven't got a certificate yet
      const queryAttendees = `
        SELECT r.id AS registration_id, u.first_name || ' ' || u.last_name AS participant_name,
               e.title AS event_title, e.event_date, c.name AS club_name
        FROM event_registrations r
        JOIN users u ON r.user_id = u.id
        JOIN events e ON r.event_id = e.id
        JOIN clubs c ON e.club_id = c.id
        WHERE r.event_id = $1 AND r.certificate_generated = false
      `;
      const { rows: attendees } = await this.db.query(queryAttendees, [
        eventId,
      ]);

      if (!attendees.length)
        return {
          generatedCount: 0,
          message: "No attendees to generate certificates for",
        };

      // 2. Insert certificates
      const generated = [];
      for (const attendee of attendees) {
        const certificateId = `CERT-${Date.now()}-${attendee.registration_id}`; // unique certificate ID
        const insertQuery = `
          INSERT INTO certificates (registration_id, certificate_id, participant_name, event_title, event_date, club_name, metadata)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING *
        `;
        const values = [
          attendee.registration_id,
          certificateId,
          attendee.participant_name,
          attendee.event_title,
          attendee.event_date,
          attendee.club_name,
        ];
        const { rows } = await this.db.query(insertQuery, values);

        // mark registration as certificate_generated
        await this.db.query(
          `UPDATE event_registrations SET certificate_generated = true WHERE id=$1`,
          [attendee.registration_id]
        );

        generated.push(rows[0]);
      }

      return { generatedCount: generated.length, certificates: generated };
    } catch (err) {
      console.error("Error in generateCertificates:", err.message);
      throw new Error("Failed to generate certificates");
    }
  }
}

module.exports = CertificateService;
