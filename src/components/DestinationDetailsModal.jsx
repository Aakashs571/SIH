import React from 'react';

export default function DestinationDetailsModal() {
  return (
    <div id="destinationDetailsModal" className="modal">
      <div className="modal-content">
        <div className="modal-close" id="closeDestinationDetailsModal">×</div>
        <h2 id="destinationDetailsTitle">Destination Details</h2>
        <div id="destinationDetailsBody">
          {/* Dynamic destination details will be loaded here */}
        </div>
      </div>
    </div>
  );
}
