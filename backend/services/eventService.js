class EventService {
  constructor(db) {
    this.db = db;
  }
  // shob event nicchi
  async getAllEvents() {
    try {
      const query = `
      SELECT e.*, 
             c.id AS club_id, c.name AS club_name, c.contact_email, c.contact_phone,
             u.id AS created_by_id, u.first_name || ' ' || u.last_name AS created_by_name
      FROM events e
      JOIN clubs c ON e.club_id = c.id
      JOIN users u ON e.created_by = u.id
      ORDER BY e.event_date DESC;
    `;
      const { rows } = await db.query(query);
      return rows;
    } catch (err) {
      console.error("Error in getAllEvents:", err.message);
      throw new Error("Failed to fetch events");
    }
  }

  // Get single event by ID
  async getEventById(id) {
    try {
      const query = `
      SELECT e.*, 
             c.id AS club_id, c.name AS club_name, c.contact_email, c.contact_phone,
             u.id AS created_by_id, u.first_name || ' ' || u.last_name AS created_by_name
      FROM events e
      JOIN clubs c ON e.club_id = c.id
      JOIN users u ON e.created_by = u.id
      WHERE e.id = $1
    `;
      const { rows } = await db.query(query, [eventId]);
      return rows[0] || null;
    } catch (err) {
      console.error("Error in getEventById:", err.message);
      throw new Error("Failed to fetch event");
    }
  }

  // Create a new event
  async createEvent(eventData) {
    try {
      const query = `
        INSERT INTO events
        (title, description, short_description, event_date, start_time, end_time, location, venue_details, max_participants,
         registration_deadline, event_image, club_id, created_by, status, is_featured, registration_required,
         event_fee, tags, external_link, metadata)
        VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)
        RETURNING *;
      `;

      const values = [
        eventData.title,
        eventData.description || null,
        eventData.short_description || null,
        eventData.event_date,
        eventData.start_time,
        eventData.end_time || null,
        eventData.location,
        eventData.venue_details || null,
        eventData.max_participants || 0,
        eventData.registration_deadline || null,
        eventData.event_image || null,
        eventData.club_id,
        eventData.created_by,
        eventData.status || "published",
        eventData.is_featured || false,
        eventData.registration_required !== undefined
          ? eventData.registration_required
          : true,
        eventData.event_fee || 0.0,
        eventData.tags || [],
        eventData.external_link || null,
        eventData.metadata || {},
      ];

      const { rows } = await this.db.query(query, values);
      return rows[0];
    } catch (err) {
      console.error("Error in createEvent:", err.message);
      throw new Error("Failed to create event");
    }
  }

  // Update existing event
  async updateEvent(eventId, updatedData) {
    try {
      const query = `
      UPDATE events
      SET title=$1, description=$2, short_description=$3, event_date=$4, start_time=$5, end_time=$6, location=$7, updated_at=NOW()
      WHERE id=$8
      RETURNING *;
    `;
      const values = [
        updatedData.title,
        updatedData.description,
        updatedData.short_description,
        updatedData.event_date,
        updatedData.start_time,
        updatedData.end_time,
        updatedData.location,
        eventId,
      ];
      const { rows } = await this.db.query(query, values);
      return rows[0];
    } catch (err) {
      console.error("Error in updateEvent:", err.message);
      throw new Error("Failed to update event");
    }
  }

  // Get attendees of an event
  async getEventAttendees(eventId) {
    try {
      const query = `
      SELECT u.id AS user_id, u.first_name || ' ' || u.last_name AS name, u.email,
             r.attendance_status
      FROM event_registrations r
      JOIN users u ON r.user_id = u.id
      WHERE r.event_id = $1
    `;
      const { rows } = await this.db.query(query, [eventId]);
      return rows.length > 0 ? rows : null;
    } catch (err) {
      console.error("Error in getEventAttendees:", err.message);
      throw new Error("Failed to fetch event attendees");
    }
  }

  // Update event status
  async updateEventStatus(eventId, status) {
    try {
      const query = `
        UPDATE events
        SET status=$1, updated_at=NOW()
        WHERE id=$2
        RETURNING *;
      `;
      const { rows } = await this.db.query(query, [status, eventId]);
      return rows[0] || null;
    } catch (err) {
      console.error("Error in updateEventStatus:", err.message);
      throw new Error("Failed to update event status");
    }
  }

  // Toggle featured
  async toggleEventFeaturedStatus(eventId) {
    try {
      const query = `
        UPDATE events
        SET is_featured = NOT is_featured, updated_at=NOW()
        WHERE id=$1
        RETURNING *;
      `;
      const { rows } = await this.db.query(query, [eventId]);
      return rows[0] || null;
    } catch (err) {
      console.error("Error in toggleEventFeaturedStatus:", err.message);
      throw new Error("Failed to toggle event featured status");
    }
  }

  // Register for event
  async registerForAnEvent(eventId, userId, emergencyContact) {
    try {
      const query = `
        INSERT INTO event_registrations (event_id, user_id, emergency_contact)
        VALUES ($1, $2, $3 )
        RETURNING *;
      `;
      const { rows } = await this.db.query(query, [
        eventId,
        userId,
        emergencyContact,
      ]);
      return rows[0] || null;
    } catch (err) {
      console.error("Error in registerForAnEvent:", err.message);
      throw new Error("Failed to register for event");
    }
  }

  // Unregister from event
  async unregisterFromAnEvent(eventId, userId) {
    try {
      const query = `
        DELETE FROM event_registrations
        WHERE event_id=$1 AND user_id=$2
        RETURNING *;
      `;
      const { rows } = await this.db.query(query, [eventId, userId]);
      return rows[0] || null;
    } catch (err) {
      console.error("Error in unregisterFromAnEvent:", err.message);
      throw new Error("Failed to unregister from event");
    }
  }

  // Get all registrations for an event
  async getEventRegistrations(eventId) {
    try {
      const query = `
        SELECT r.*, u.first_name || ' ' || u.last_name AS user_name, u.email
        FROM event_registrations r
        JOIN users u ON r.user_id = u.id
        WHERE r.event_id = $1
      `;
      const { rows } = await this.db.query(query, [eventId]);
      return rows;
    } catch (err) {
      console.error("Error in getEventRegistrations:", err.message);
      throw new Error("Failed to fetch event registrations");
    }
  }

  // Update attendance
  async updateEventAttendance(eventId, userId, attended) {
    try {
      const query = `
        UPDATE event_registrations
        SET attendance_status=$1, updated_at=NOW()
        WHERE event_id=$2 AND user_id=$3
        RETURNING *;
      `;
      const status = attended ? "attended" : "no_show";
      const { rows } = await this.db.query(query, [status, eventId, userId]);
      return rows[0] || null;
    } catch (err) {
      console.error("Error in updateEventAttendance:", err.message);
      throw new Error("Failed to update event attendance");
    }
  }

  // Get my event registrations
  async getMyEventRegistrations(userId) {
    try {
      const query = `
        SELECT e.*, c.name AS club_name
        FROM event_registrations r
        JOIN events e ON r.event_id = e.id
        JOIN clubs c ON e.club_id = c.id
        WHERE r.user_id = $1
        ORDER BY e.event_date DESC
      `;
      const { rows } = await this.db.query(query, [userId]);
      return rows;
    } catch (err) {
      console.error("Error in getMyEventRegistrations:", err.message);
      throw new Error("Failed to fetch my event registrations");
    }
  }
}

module.exports = EventService;
