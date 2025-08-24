const express = require("express");
const cors = require("cors");
const createAuthRouter = require("./routes/authRoutes");
const createEventRouter = require("./routes/eventRoutes");
const createClubRouter = require("./routes/clubRoutes");
const createFaqRouter = require("./routes/faqRoutes");
const createCertificateRouter = require("./routes/certificateRoutes");
const AuthController = require("./controllers/authController");
const EventController = require("./controllers/eventController");
const ClubController = require("./controllers/clubController");
const FaqController = require("./controllers/faqController");
const CertificateController = require("./controllers/certificateController");
const UserService = require("./services/userService");
const EventService = require("./services/eventService");
const ClubService = require("./services/clubService");
const FaqService = require("./services/faqService");
const CertificateService = require("./services/certificateService");
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
const eventService = new EventService(db);
const clubService = new ClubService(db);
const faqService = new FaqService(db);
const certificateService = new CertificateService(db);

const authController = new AuthController(userService);
const eventController = new EventController(eventService);
const clubController = new ClubController(clubService);
const faqController = new FaqController(faqService);
const certificateController = new CertificateController(certificateService);

const authRouter = createAuthRouter(authController);
const eventRouter = createEventRouter(eventController);
const clubRouter = createClubRouter(clubController);
const faqRouter = createFaqRouter(faqController);
const certificateRouter = createCertificateRouter(certificateController);

// API routes
app.use("/auth", authRouter);
app.use("/events", eventRouter);
app.use("/clubs", clubRouter);
app.use("/faqs", faqRouter);
app.use("/certificates", certificateRouter);

module.exports = app;
