class ClubController {
  constructor(clubService) {
    this.clubService = clubService;

    // Bind methods so 'this' works in routes
    this.getAllActiveClubs = this.getAllActiveClubs.bind(this);
    this.createClub = this.createClub.bind(this);
    this.getClubById = this.getClubById.bind(this);
    this.updateClub = this.updateClub.bind(this);
    this.addMemberToClub = this.addMemberToClub.bind(this);
    this.getClubMembers = this.getClubMembers.bind(this);
    this.updateClubMember = this.updateClubMember.bind(this);
    this.getUsersClubMemberships = this.getUsersClubMemberships.bind(this);

    this.getClubRoles = this.getClubRoles.bind(this);
    this.createClubRole = this.createClubRole.bind(this);
    this.updateClubRole = this.updateClubRole.bind(this);
    this.getAllPermissions = this.getAllPermissions.bind(this);
  }

  async getAllActiveClubs(req, res) {
    try {
      const clubs = await this.clubService.getAllActiveClubs();
      res.json(clubs);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async createClub(req, res) {
    try {
      const club = await this.clubService.createClub(req.body);
      res.status(201).json(club);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getClubById(req, res) {
    try {
      const club = await this.clubService.getClubById(req.params.id);
      if (!club) return res.status(404).json({ error: "Club not found" });
      res.json(club);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateClub(req, res) {
    try {
      const updated = await this.clubService.updateClub(
        req.params.id,
        req.body
      );
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async addMemberToClub(req, res) {
    try {
      const member = await this.clubService.addMemberToClub(req.body);
      res.status(201).json(member);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getClubMembers(req, res) {
    try {
      const members = await this.clubService.getClubMembers(req.params.clubId);
      res.json(members);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateClubMember(req, res) {
    try {
      const updated = await this.clubService.updateClubMember(
        req.params.memberId,
        req.body
      );
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getUsersClubMemberships(req, res) {
    try {
      const memberships = await this.clubService.getUsersClubMemberships(
        req.params.userId
      );
      res.json(memberships);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // ===================== ROLES + PERMISSIONS =====================

  async getClubRoles(req, res) {
    try {
      const roles = await this.clubService.getClubRoles(req.params.clubId);
      res.json(roles);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async createClubRole(req, res) {
    try {
      const role = await this.clubService.createClubRole(
        req.params.clubId,
        req.body
      );
      res.status(201).json(role);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async updateClubRole(req, res) {
    try {
      const updated = await this.clubService.updateClubRole(
        req.params.roleId,
        req.body
      );
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getAllPermissions(req, res) {
    try {
      const permissions = await this.clubService.getAllPermissions();
      res.json(permissions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = ClubController;
