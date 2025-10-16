import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="footer-links">
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/destinations">Destinations</Link></li>
            <li><Link to="/packages">Packages</Link></li>
            <li><Link to="/services">Services</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <ul>
            <li>📧 info@jharkhandtourism.com</li>
            <li>📞 +91 99999 88888</li>
            <li>📍 Ranchi, Jharkhand</li>
          </ul>
        </div>
      </div>
      <div className="social-links">
        <span>📘</span>
        <span>📷</span>
        <span>🐦</span>
        <span>📺</span>
      </div>
      <p>&copy; 2025 Jharkhand Tourism Board. All rights reserved.</p>
      <p>Building sustainable tourism for a better tomorrow 🌿</p>
    </footer>
  );
}
