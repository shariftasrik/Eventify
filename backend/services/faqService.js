class FaqService {
  constructor(db) {
    this.db = db;
  }

  // Get all active FAQs
  async getAllFaqs() {
    const query = `SELECT * FROM faqs WHERE is_active = true ORDER BY created_at DESC`;
    const { rows } = await this.db.query(query);
    return rows;
  }

  // Get FAQ by ID
  async getFaqById(faqId) {
    const query = `SELECT * FROM faqs WHERE id = $1`;
    const { rows } = await this.db.query(query, [faqId]);
    return rows[0] || null;
  }

  // Search FAQ by keyword or question similarity
  async searchFaqs(queryText) {
    // Using full text search for similarity
    const query = `
      SELECT * FROM faqs
      WHERE is_active = true AND
            to_tsvector('english', question || ' ' || array_to_string(keywords, ' ')) @@ plainto_tsquery($1)
      ORDER BY ts_rank(to_tsvector('english', question || ' ' || array_to_string(keywords, ' ')), plainto_tsquery($1)) DESC
      LIMIT 5
    `;
    const { rows } = await this.db.query(query, [queryText]);
    return rows;
  }

  // Increment usage count
  async incrementUsage(faqId) {
    const query = `UPDATE faqs SET usage_count = usage_count + 1 WHERE id = $1`;
    await this.db.query(query, [faqId]);
  }
}

module.exports = FaqService;
