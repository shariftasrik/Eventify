const db = require("../config/supabaseClient");

// Get users whose name starts with a letter
async function getUsersByLetter(req, res) {
  const letter = req.params.letter;

  try {
    const result = await pool.query(
      "SELECT id, name, email FROM users WHERE name LIKE $1 ORDER BY id ASC",
      [letter + "%"]
    );
    console.log(result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

// Add a new user
async function addUser(req, res) {
  const { name, email } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { getUsersByLetter, addUser };
