import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({
  variant = "desktop",
  role = "student",
  onRoleChange,
}) {
  const isMobile = variant === "mobile";

  const linkClass = isMobile
    ? "block px-3 py-2 rounded-lg hover:bg-indigo-50/60 hover:text-indigo-600 transition-colors"
    : "px-2 py-1 rounded-lg hover:text-indigo-600 transition-colors";

  const containerClass = isMobile
    ? "flex flex-col gap-1"
    : "flex items-center gap-6";

  return (
    <nav className={containerClass}>
      <Link to="/" className={linkClass}>
        Home
      </Link>
      <Link to="/events" className={linkClass}>
        Events
      </Link>
      <Link to="/about-us" className={linkClass}>
        About
      </Link>
      <Link to="/contact" className={linkClass}>
        Contact
      </Link>
      <Link to="/faq" className={linkClass}>
        FAQ-Chatbot
      </Link>

      {isMobile ? (
        <div className="my-2 h-px bg-slate-200" />
      ) : (
        <div className="w-px h-6 bg-slate-200" />
      )}

      {/* View as (dropdown) */}
      <div
        className={isMobile ? "flex flex-col gap-1" : "flex items-center gap-2"}
      >
        {!isMobile && <span className="text-sm text-slate-500">View as</span>}
        <select
          value={role}
          onChange={(e) => onRoleChange?.(e.target.value)}
          className="text-sm border border-slate-200 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
          aria-label="View as"
        >
          <option value="student">Student</option>
          <option value="club">Club member</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </nav>
  );
}
