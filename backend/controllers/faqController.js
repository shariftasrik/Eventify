class FaqController {
  constructor(faqService) {
    this.faqService = faqService;
    this.getAllFaqs = this.getAllFaqs.bind(this);
    this.searchFaq = this.searchFaq.bind(this);
  }

  // Get all FAQs
  async getAllFaqs(req, res) {
    try {
      const faqs = await this.faqService.getAllFaqs();
      res.json({ faqs });
    } catch (err) {
      console.error("Error fetching FAQs:", err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Chatbot search
  async searchFaq(req, res) {
    try {
      const { message } = req.body;
      if (!message)
        return res.status(400).json({ error: "Message is required" });

      const results = await this.faqService.searchFaqs(message);

      // Optionally increment usage for the first matched FAQ
      if (results.length) await this.faqService.incrementUsage(results[0].id);

      res.json({
        answers: results.map((f) => ({
          question: f.question,
          answer: f.answer,
        })),
      });
    } catch (err) {
      console.error("Error searching FAQs:", err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = FaqController;
