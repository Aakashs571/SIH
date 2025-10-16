import React from 'react';

export default function Services() {
  return (
    <div id="servicesPage" className="page">
      <div className="page-header">
        <h1>Our Services</h1>
        <p>Complete travel solutions for a hassle-free experience</p>
      </div>
      <section className="section" style={{background: 'var(--dark)'}}>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">🏨</div>
            <h3 className="service-title">Hotel Booking</h3>
            <p className="service-desc">Wide range of accommodations from luxury resorts to budget-friendly stays</p>
            <div className="service-price">From ₹1,500/night</div>
            <button className="book-now-btn">Book Now</button>
          </div>
          {/* Add more service cards here */}
        </div>
      </section>
    </div>
  );
}
