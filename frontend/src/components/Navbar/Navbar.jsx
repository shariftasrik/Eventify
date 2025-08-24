import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="hidden md:flex space-x-6">
      <Link to="/" className="hover:text-gray-500 transition-colors">Home</Link>
      <Link to="/events" className="hover:text-gray-500 transition-colors">Events</Link>
      <Link to="/about" className="hover:text-gray-500 transition-colors">About</Link>
      <Link to="/contact" className="hover:text-gray-500 transition-colors">Contact</Link>
    </nav>
  );
};

export default Navbar;
