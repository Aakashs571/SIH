import React from 'react';

export default function Profile() {
  return (
    <div id="profilePage" className="page">
      <div className="page-header">
        <h1>Your Profile</h1>
        <p>View your bookings and details</p>
        <div style={{marginTop: 10}}>
          <button id="logoutBtn" className="package-btn" style={{maxWidth:200}}>Logout</button>
        </div>
      </div>
      <section className="section" style={{background: 'var(--dark)'}}>
        <div id="noBookings" className="profile-empty" style={{display: 'none'}}>
          <h3>No bookings yet</h3>
          <p className="muted">Your confirmed bookings will appear here.</p>
        </div>
        <div id="bookingsList" className="bookings-grid"></div>
      </section>
    </div>
  );
}
