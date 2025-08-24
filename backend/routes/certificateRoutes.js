const express = require("express");

function createCertificateRouter(certificateController) {
  const router = express.Router();

  // Download participation certificate (if eligible)
  router.get(
    "/events/:eventId/certificate",
    certificateController.getEventCertificate
  );

  // Generate certificates for all attendees (club admin only)
  router.post(
    "/events/:eventId/generate-certificates",
    certificateController.generateEventCertificates
  );

  return router;
}

module.exports = createCertificateRouter;
