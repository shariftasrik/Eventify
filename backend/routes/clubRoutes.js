const express = require("express");

function createClubRouter(clubController) {
  const router = express.Router();

  router.get("/", clubController.getAllActiveClubs);
  router.post("/", clubController.createClub);
  router.get("/:clubId", clubController.getClubById);
  router.put("/:clubId", clubController.updateClub);
  router.post("/:clubId/members", clubController.addMemberToClub);
  router.get("/:clubId/members", clubController.getClubMembers);
  router.put("/:clubId/members/:userId", clubController.updateClubMember);
  router.get("/my-clubs", clubController.getUsersClubMemberships);
  router.get("/:clubId/roles", clubController.getClubRoles);
  router.post("/:clubId/roles", clubController.createClubRole);
  router.put("/:clubId/roles/:roleId", clubController.updateClubRole);
  router.get("/roles/permissions", clubController.getAllPermissions);

  return router;
}

module.exports = createClubRouter;
