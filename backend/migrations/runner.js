const fs = require("fs");
const path = require("path");
const db = require("../config/supabaseClient");
async function runMigrations() {
  // Ensure migrations table exists
  await db.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      filename TEXT UNIQUE,
      applied_at TIMESTAMP DEFAULT NOW()
    );
  `);

  const migrationsDir = path.join(__dirname);
  const files = fs
    .readdirSync(migrationsDir)
    .filter((file) => file.endsWith(".sql"))
    .sort();

  for (const file of files) {
    try {
      // Check if migration already applied
      const { rows } = await db.query(
        "SELECT 1 FROM migrations WHERE filename = $1",
        [file]
      );

      if (rows.length > 0) {
        console.log(`✅ Skipping already applied migration: ${file}`);
        continue;
      }

      // Apply migration
      const sql = fs.readFileSync(path.join(migrationsDir, file), "utf-8");
      await db.query(sql);

      // Mark as applied
      await db.query("INSERT INTO migrations (filename) VALUES ($1)", [file]);

      console.log(`🚀 Migration applied: ${file}`);
    } catch (err) {
      console.error(`❌ Migration failed (${file}):`, err.message);
    }
  }

  console.log("All migrations are up to date ✅");
}

module.exports = { runMigrations };
