import React from 'react';

export default function Reviews() {
  return (
    <div id="reviewsPage" className="page">
      <div className="page-header">
        <h1>Traveler Reviews</h1>
        <p>Real experiences from travelers who explored Jharkhand</p>
      </div>
      <section className="section" style={{background: 'var(--dark)'}}>
        <div className="booking-summary" style={{marginBottom: 20}}>
          <h3 style={{marginBottom: 10}}>Share your experience</h3>
          <form id="reviewForm">
            <div className="form-row">
              <div className="form-group">
                <label>Your Name</label>
                <input id="reviewName" type="text" placeholder="Full name" />
              </div>
              <div className="form-group">
                <label>Your Location</label>
                <input id="reviewLocation" type="text" placeholder="City, State" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Rating</label>
                <select id="reviewRating">
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Very Good</option>
                  <option value="3">3 - Good</option>
                  <option value="2">2 - Fair</option>
                  <option value="1">1 - Poor</option>
                </select>
              </div>
              <div className="form-group">
                <label>&nbsp;</label>
                <button type="submit" className="submit-btn">Submit Review</button>
              </div>
            </div>
            <div className="form-group">
              <label>Review</label>
              <textarea id="reviewText" rows={3} placeholder="Write about your trip..." />
            </div>
            <div className="muted">Note: You must be logged in to submit a review.</div>
          </form>
        </div>
        <div id="userReviews" className="testimonials-grid"></div>
      </section>
    </div>
  );
}
