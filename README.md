# 📌 Eventify

Eventify is a modern **Event Management Platform** that makes it easy to **discover, register, and manage events**.  
It provides **role-based dashboards** for **students/users** and **admins**, with a clean and responsive UI.

---

## 🚀 Features

### 🎟️ User Features
- Browse and search events
- Filter and sort by category, date, or fee
- View detailed event information
- Register or unregister for events
- Track registrations in **My Events**
- User profile management
- Responsive UI with animations

### 🛠️ Admin Features
- Create, edit, and delete events
- Manage capacity and ticket tiers
- Monitor registrations and attendees
- Analytics dashboard with insights
- Role-based access (user/admin)

### 🔐 Cross-cutting
- Authentication (JWT-based)
- Form validation with clear error messages
- Secure API with protected routes
- Modular, scalable architecture

---

## 🏗️ Tech Stack

### 🌐 Frontend
- [React](https://reactjs.org/) + [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
- [lucide-react](https://lucide.dev/) for icons

### ⚙️ Backend
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- JWT authentication, bcrypt for password hashing
- CORS, Helmet, dotenv for security & configs
- REST API (Auth, Users, Events, Registrations, Analytics)

### 🗄️ Database
Supports both **MongoDB** and SQL-style schemas:

**Users**
- id, name, email, role, passwordHash

**Events**
- id, title, description, date, fee, createdBy, capacity

**Registrations**
- id, eventId, userId, status, paymentStatus

**Tickets & Payments (optional)**
- Ticket tiers, payment records with provider & txn status

---

## 🧭 API Endpoints

Base URL: `http://localhost:5000` (or your deployed backend)

---

### 🔐 Auth Routes (`/auth`)
- `POST /auth/signup` → Create a new user
- `POST /auth/login` → Login with email/username + password
- `POST /auth/logout` → Logout user (stateless)
- `GET /auth/verify-email?token=...` → Verify email with token

---

### 🎫 Event Routes (`/events`)
- `GET /events` → Get all events
- `POST /events` → Create a new event
- `GET /events/:eventId` → Get event by ID
- `PUT /events/:eventId` → Update an event
- `PUT /events/:eventId/status` → Update event status (published/draft/etc.)
- `PUT /events/:eventId/feature` → Toggle featured flag

**Attendees**
- `GET /events/:eventId/attendees` → List all attendees for an event

**Registrations**
- `POST /events/:eventId/register` → Register a user for an event  
- `DELETE /events/:eventId/unregister` → Cancel/unregister from an event  
- `GET /events/:eventId/registrations` → Get all registrations for an event  
- `PUT /events/:eventId/registrations/:userId/attendance` → Update attendance status  

**User-specific**
- `GET /events/my-events` → Get the logged-in user’s event registrations

---

### 👥 Club Routes (`/clubs`)
- `GET /clubs` → Get all active clubs
- `POST /clubs` → Create a club
- `GET /clubs/my-clubs` → Get logged-in user’s club memberships
- `GET /clubs/:clubId` → Get a club by ID
- `PUT /clubs/:clubId` → Update a club

**Members**
- `POST /clubs/:clubId/members` → Add a member to a club
- `GET /clubs/:clubId/members` → List members of a club
- `PUT /clubs/:clubId/members/:userId` → Update a club member’s role/status

**Roles & Permissions**
- `GET /clubs/:clubId/roles` → Get all roles in a club
- `POST /clubs/:clubId/roles` → Create a role in a club
- `PUT /clubs/:clubId/roles/:roleId` → Update a role
- `GET /clubs/roles/permissions` → Get all available permissions

---

### ❓ FAQ Routes (`/faqs`)
- `GET /faqs` → Get all FAQs
- `POST /faqs/search` → Search FAQs (chatbot-style)

---

### 🎓 Certificate Routes (`/certificates`)
- `GET /certificates` → Get all certificates (implementation dependent)
- `POST /certificates` → Issue a certificate
- `GET /certificates/:id` → Get certificate by ID

---

## 🔑 Status Codes
- `200 OK` → Request successful
- `201 Created` → Resource created
- `400 Bad Request` → Validation or client error
- `401 Unauthorized` → Authentication required/failed
- `403 Forbidden` → Not enough permissions
- `404 Not Found` → Resource not found
- `500 Internal Server Error` → Unexpected server error


