import React from 'react';

export default function SectionWhy() {
  return (
    <section className="section" style={{background: 'var(--dark)'}}>
      <h2 className="section-title">Why Choose Jharkhand?</h2>
      <div className="services-grid">
        <div className="service-card">
          <div className="service-icon">🌲</div>
          <h3 className="service-title">Pristine Nature</h3>
          <p className="service-desc">Untouched forests, stunning waterfalls, and diverse wildlife sanctuaries</p>
        </div>
        <div className="service-card">
          <div className="service-icon">🎨</div>
          <h3 className="service-title">Rich Culture</h3>
          <p className="service-desc">Experience authentic tribal traditions, art, music, and festivals</p>
        </div>
        <div className="service-card">
          <div className="service-icon">⛰️</div>
          <h3 className="service-title">Adventure Awaits</h3>
          <p className="service-desc">Trekking, rock climbing, and thrilling outdoor activities</p>
        </div>
        <div className="service-card">
          <div className="service-icon">🏛️</div>
          <h3 className="service-title">Heritage Sites</h3>
          <p className="service-desc">Ancient temples, historical monuments, and spiritual destinations</p>
        </div>
      </div>
    </section>
  );
}
