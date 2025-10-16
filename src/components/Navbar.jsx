import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import { useBooking } from '../bookingContext';

export default function Navbar() {
  const { openBooking } = useBooking();
  return (
    <nav className="navbar">
      <Link to="/" className="logo">🌿 Jharkhand</Link>
      <ul className="nav-links">
        <li><NavLink to="/" end className="nav-link">Home</NavLink></li>
        <li><NavLink to="/destinations" className="nav-link">Destinations</NavLink></li>
        <li><NavLink to="/packages" className="nav-link">Packages</NavLink></li>
        <li><NavLink to="/services" className="nav-link">Services</NavLink></li>
        <li><NavLink to="/reviews" className="nav-link">Reviews</NavLink></li>
        <li><NavLink to="/profile" className="nav-link">Profile</NavLink></li>
        <li><NavLink to="/login" className="nav-link">Login</NavLink></li>
        <li><button className="nav-book-btn" id="mainBookBtn" onClick={() => openBooking(null)}>Book Now</button></li>
      </ul>
    </nav>
  );
}
