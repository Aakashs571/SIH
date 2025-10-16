import React from 'react';

export default function ItineraryModal({ onClose }) {
  return (
    <div id="itineraryModal" className="modal">
      <div className="modal-content">
        <div className="modal-close" id="closeItineraryModal" onClick={onClose}>×</div>
        <h2>AI Itinerary Planner</h2>
        {/* Itinerary form goes here */}
      </div>
    </div>
  );
}
