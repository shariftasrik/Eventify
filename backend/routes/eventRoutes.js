const express = require("express");

function createEventRouter(eventController) {
  const router = express.Router();

  router.get("/", eventController.getAllEvents);
  router.post("/", eventController.createEvent); ///////////
  router.get("/:eventId", eventController.getEventById);
  router.put("/:eventId", eventController.updateEvent); ///////////
  router.get("/:eventId/attendees", eventController.getEventAttendees); //////////
  router.put("/:eventId/status", eventController.updateEventStatus); ///////////
  router.put("/:eventId/feature", eventController.toggleEventFeaturedStatus); ///////////
  router.post("/:eventId/register", eventController.registerForAnEvent); ///////////
  router.delete("/:eventId/unregister", eventController.unregisterFromAnEvent); ///////////
  router.get("/:eventId/registrations", eventController.getEventRegistrations);
  router.put(
    "/:eventId/registrations/:userId/attendance",
    eventController.updateEventAttendance
  ); ///////////
  router.put(
    "/registrations/my-events",
    eventController.getMyEventRegistrations
  ); ///////////
  router.get("/:eventId/registrations", eventController.getEventRegistrations);

  return router;
}

module.exports = createEventRouter;
