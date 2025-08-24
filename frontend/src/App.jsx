import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";

// Public pages
import Footer from "./components/Footer/Footer";
import AboutUs from "./pages/AboutUs/AboutUs";
import ContactUs from "./pages/ContactUs/ContactUs";
import EventDetails from "./pages/EventDetails/EventDetails";
import Events from "./pages/Events/Events";
import Home from "./pages/Home/Home";
import VerifyEmailPage from "./pages/VerifyEmailPage/VerifyEmailPage";
import FaqChatbot from "./pages/FAQChatbot/FAQChatbot";

// Auth pages
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

// Student pages

import MyEvents from "./pages/Student/MyEvents";
import StudentDashboard from "./pages/Student/StudentDashboard";
import StudentProfile from "./pages/Student/StudentProfile";

// Admin pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminHome from "./pages/Admin/AdminHome";
import Analytics from "./pages/Admin/Analytics";
import CreateEvent from "./pages/Admin/CreateEvent";
import EditEvent from "./pages/Admin/EditEvent";
import ManageEvents from "./pages/Admin/ManageEvents";

// Components
import Header from "./components/Header";
import Banner from "./components/Banner";
import NewsLetter from "./components/NewsLetter";

// 404 page (fallback)
const NotFound = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>404 - Page Not Found</h1>
    <a href="/" style={{ color: "#ff8800" }}>
      Go Back Home
    </a>
  </div>
);

// Layout for public pages
const MainLayout = () => (
  <>
    <Header />

    <main className="app-content">
      <Outlet /> {/* nested public routes thakbe */}
    </main>

    <Footer />
  </>
);

function App() {
  return (
    <div className="app">
      <Routes>
        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Student Dashboard (protected) */}
        <Route
          path="/student"
          element={
            // <ProtectedRoute role="student">
            <StudentDashboard />
            // </ProtectedRoute>
          }
        >
          <Route path="my-events" element={<MyEvents />} />
          <Route path="profile" element={<StudentProfile />} />
        </Route>

        {/* Admin Dashboard (protected) */}
        <Route
          path="/admin"
          element={
            // <ProtectedRoute role="admin">
            <AdminDashboard />
            // </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="manage-events" element={<ManageEvents />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="edit-event/:id" element={<EditEvent />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>

        {/* Public routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faq" element={<FaqChatbot />} />
        </Route>
        <Route path="/verify-email" element={<VerifyEmailPage />} />

        {/* Catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
