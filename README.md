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

## ⚡ Architecture

