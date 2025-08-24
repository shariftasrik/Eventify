// backend/server.js
const app = require("./app");
const { runMigrations } = require("./migrations/runner");

const PORT = process.env.PORT || 5000;

// Run migrations before starting server
runMigrations().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
