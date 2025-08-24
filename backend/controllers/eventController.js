class EventController {
  constructor(eventService) {
    this.eventService = eventService;

    // Bind methods
    this.getAllEvents = this.getAllEvents.bind(this);
    this.getEventById = this.getEventById.bind(this);
    this.createEvent = this.createEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
    this.getEventAttendees = this.getEventAttendees.bind(this);
    this.updateEventStatus = this.updateEventStatus.bind(this);
    this.toggleEventFeaturedStatus = this.toggleEventFeaturedStatus.bind(this);
    this.registerForAnEvent = this.registerForAnEvent.bind(this);
    this.unregisterFromAnEvent = this.unregisterFromAnEvent.bind(this);
    this.getEventRegistrations = this.getEventRegistrations.bind(this);
    this.updateEventAttendance = this.updateEventAttendance.bind(this);
    this.getMyEventRegistrations = this.getMyEventRegistrations.bind(this);
  }

  async getAllEvents(req, res) {
    try {
      const events = await this.eventService.getAllEvents();
      res.json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getEventById(req, res) {
    const { eventId } = req.params;
    try {
      const event = await this.eventService.getEventById(eventId);
      if (!event) return res.status(404).json({ error: "Event not found" });
      res.json(event);
    } catch (error) {
      console.error("Error fetching event:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createEvent(req, res) {
    try {
      const createdEvent = await this.eventService.createEvent(req.body);
      res.status(201).json(createdEvent);
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateEvent(req, res) {
    const { eventId } = req.params;
    try {
      const updatedEvent = await this.eventService.updateEvent(
        eventId,
        req.body
      );
      if (!updatedEvent)
        return res.status(404).json({ error: "Event not found" });
      res.json(updatedEvent);
    } catch (error) {
      console.error("Error updating event:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getEventAttendees(req, res) {
    const { eventId } = req.params;
    try {
      const attendees = await this.eventService.getEventAttendees(eventId);
      res.json(attendees);
    } catch (error) {
      console.error("Error fetching attendees:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateEventStatus(req, res) {
    const { eventId } = req.params;
    const { status } = req.body;
    try {
      const updated = await this.eventService.updateEventStatus(
        eventId,
        status
      );
      res.json(updated);
    } catch (error) {
      console.error("Error updating event status:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async toggleEventFeaturedStatus(req, res) {
    const { eventId } = req.params;
    try {
      const updated = await this.eventService.toggleEventFeaturedStatus(
        eventId
      );
      res.json(updated);
    } catch (error) {
      console.error("Error toggling featured status:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async registerForAnEvent(req, res) {
    const { eventId } = req.params;
    const { userId } = req.body;
    try {
      const registration = await this.eventService.registerForAnEvent(
        eventId,
        userId
      );
      res.status(201).json(registration);
    } catch (error) {
      console.error("Error registering for event:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async unregisterFromAnEvent(req, res) {
    const { eventId } = req.params;
    const { userId } = req.body;
    try {
      const result = await this.eventService.unregisterFromAnEvent(
        eventId,
        userId
      );
      res.json(result);
    } catch (error) {
      console.error("Error unregistering from event:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getEventRegistrations(req, res) {
    const { eventId } = req.params;
    try {
      const registrations = await this.eventService.getEventRegistrations(
        eventId
      );
      res.json(registrations);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateEventAttendance(req, res) {
    const { eventId, userId } = req.params;
    const { attended } = req.body;
    try {
      const updated = await this.eventService.updateEventAttendance(
        eventId,
        userId,
        attended
      );
      res.json(updated);
    } catch (error) {
      console.error("Error updating attendance:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getMyEventRegistrations(req, res) {
    const { userId } = req.body;
    try {
      const events = await this.eventService.getMyEventRegistrations(userId);
      res.json(events);
    } catch (error) {
      console.error("Error fetching my events:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = EventController;
