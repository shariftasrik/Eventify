const express = require("express");

function createEventRouter(eventController) {
  const router = express.Router();


  // Events
  router.get("/", eventController.getAllEvents);
  router.post("/", eventController.createEvent);
  router.get("/:eventId", eventController.getEventById);
  router.put("/:eventId", eventController.updateEvent);
  router.put("/:eventId/status", eventController.updateEventStatus);
  router.put("/:eventId/feature", eventController.toggleEventFeaturedStatus);

  // Attendees
  router.get("/:eventId/attendees", eventController.getEventAttendees);

  // Registrations
  router.post("/:eventId/register", eventController.registerForAnEvent);
  router.delete("/:eventId/unregister", eventController.unregisterFromAnEvent);

  router.get("/:eventId/registrations", eventController.getEventRegistrations);
  router.put(
    "/:eventId/registrations/:userId/attendance",
    eventController.updateEventAttendance

  );

  // User-specific
  router.get("/my-events", eventController.getMyEventRegistrations);


  return router;
}

module.exports = createEventRouter;
