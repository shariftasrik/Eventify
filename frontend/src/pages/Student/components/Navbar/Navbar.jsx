import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="hidden md:flex space-x-6">
      <a href="#" className="hover:text-gray-500 transition-colors">
        <Link to="/">Home</Link>
      </a>
      <a href="#" className="hover:text-gray-500 transition-colors">
        <Link to="/events">Events</Link>
      </a>
      <a href="#" className="hover:text-gray-500 transition-colors">
        <Link to="/about-us">About</Link>
      </a>
      <a href="#" className="hover:text-gray-500 transition-colors">
        <Link to="/contact">Contact</Link>
      </a>
    </nav>
  );
};

export default Navbar;
