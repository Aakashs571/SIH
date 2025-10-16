import React from 'react';

export default function DashboardSidebar() {
  return (
    <aside id="dashboardSidebar" style={{position:'fixed',left:0,top:80,width:320,background:'rgba(0,0,0,0.85)',color:'#fff',padding:'30px 20px 20px 20px',borderRadius:'0 20px 20px 0',zIndex:999,minHeight:'80vh',display:'none',flexDirection:'column',gap:30}}>
      <h3 style={{marginBottom:20,color:'var(--primary)'}}>Dashboard</h3>
      <div className="dashboard-section" id="dashboardBookings">
        <h4>My Bookings</h4>
        <div id="dashboardBookingsList">No bookings yet.</div>
      </div>
      <div className="dashboard-section" id="dashboardSaved">
        <h4>Saved Destinations</h4>
        <div id="dashboardSavedList">No saved destinations.</div>
      </div>
      <div className="dashboard-section" id="dashboardReviews">
        <h4>My Reviews</h4>
        <div id="dashboardReviewsList">No reviews yet.</div>
      </div>
      <div className="dashboard-section" id="dashboardRecommendations">
        <h4>Recommendations</h4>
        <div id="dashboardRecommendationsList">No recommendations yet.</div>
      </div>
      <button id="closeDashboardSidebar" className="package-btn" style={{marginTop:30}}>Close Sidebar</button>
    </aside>
  );
}
