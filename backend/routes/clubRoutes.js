const express = require("express");

function createClubRouter(clubController) {
  const router = express.Router();


  // Clubs
  router.get("/", clubController.getAllActiveClubs);
  router.post("/", clubController.createClub);

  // Special route BEFORE :clubId
  router.get("/my-clubs", clubController.getUsersClubMemberships);

  // Club by ID
  router.get("/:clubId", clubController.getClubById);
  router.put("/:clubId", clubController.updateClub);

  // Members
  router.post("/:clubId/members", clubController.addMemberToClub);
  router.get("/:clubId/members", clubController.getClubMembers);
  router.put("/:clubId/members/:userId", clubController.updateClubMember);

  // Roles
  router.get("/:clubId/roles", clubController.getClubRoles);
  router.post("/:clubId/roles", clubController.createClubRole);
  router.put("/:clubId/roles/:roleId", clubController.updateClubRole);

  // Permissions

  router.get("/roles/permissions", clubController.getAllPermissions);

  return router;
}

module.exports = createClubRouter;
