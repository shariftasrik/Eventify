const express = require("express");

function createFaqRouter(faqController) {
  const router = express.Router();

  router.get("/", faqController.getAllFaqs);
  router.post("/chat", faqController.searchFaq); // chatbot endpoint

  return router;
}

module.exports = createFaqRouter;
