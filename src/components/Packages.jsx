import React from 'react';
import { useBooking } from '../bookingContext';

export default function Packages() {
  const { openBooking } = useBooking();
  return (
    <div id="packagesPage" className="page">
      <div className="page-header">
        <h1>Tour Packages</h1>
        <p>Carefully crafted experiences for every type of traveler</p>
      </div>
      <section className="section" style={{background: 'var(--dark)'}}>
        <div className="packages-grid">
          {/* Example package card, repeat for each package */}
          <div className="package-card">
            <span className="package-badge">POPULAR</span>
            <h3 className="package-title">Weekend Explorer</h3>
            <div className="package-price">₹8,999<span style={{fontSize: 18}}>/person</span></div>
            <ul className="package-features">
              <li>2 Days / 1 Night</li>
              <li>Hotel Accommodation</li>
              <li>All Meals Included</li>
              <li>Local Guide</li>
              <li>Transport</li>
              <li>Entry Tickets</li>
            </ul>
            <button
              className="package-btn"
              onClick={() => openBooking({ name: 'Weekend Explorer', price: 8999 })}
            >
              Book Package
            </button>
          </div>
          {/* Add more package cards here */}
        </div>
      </section>
    </div>
  );
}
