class CertificateController {
  constructor(certificateService) {
    this.certificateService = certificateService;

    // Bind methods so 'this' works in routes
    this.getEventCertificate = this.getEventCertificate.bind(this);
    this.generateEventCertificates = this.generateEventCertificates.bind(this);
  }

  async getEventCertificate(req, res) {
    try {
      const { eventId } = req.params;
      const userId = req.user.id;

      const certificate = await this.certificateService.getCertificate(
        eventId,
        userId
      );
      if (!certificate) {
        return res
          .status(404)
          .json({ error: "Certificate not found or not eligible." });
      }

      res.json(certificate); // frontend will use jsPDF to download
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async generateEventCertificates(req, res) {
    try {
      const { eventId } = req.params;
      const adminId = req.user.id;

      const result = await this.certificateService.generateCertificates(
        eventId,
        adminId
      );

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CertificateController;
