const express = require("express");
const cors = require("cors");
const createAuthRouter = require("./routes/authRoutes");
const createEventRouter = require("./routes/eventRoutes");
const createClubRouter = require("./routes/clubRoutes");
const AuthController = require("./controllers/authController");
const EventController = require("./controllers/eventController");
const ClubController = require("./controllers/clubController");
const UserService = require("./services/userService");
const EventService = require("./services/eventService");
const ClubService = require("./services/clubService");
const db = require("./config/supabaseClient");

// Controllers
// const { getUsersByLetter, addUser } = require("./controllers/controller");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

//Dependency injection
const userService = new UserService(db);
const eventService = new EventService(db); //////////////////////eta dkhte hbe abr
const clubService = new ClubService(db);

const authController = new AuthController(userService);
const eventController = new EventController(eventService);
const clubController = new ClubController(clubService);

const authRouter = createAuthRouter(authController);
const eventRouter = createEventRouter(eventController);
const clubRouter = createClubRouter(clubController);

// API routes
app.use("/auth", authRouter);
app.use("/events", eventRouter);
app.use("/clubs", clubRouter);

module.exports = app;
