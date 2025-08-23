// backend/server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { getUsersByLetter, addUser } = require("./controllers/controller");
// const supabase = require('../supabaseClient');

const { runMigrations } = require("./migrations/runner");

runMigrations();

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.get("/users/:letter", getUsersByLetter);
app.post("/users", addUser);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
