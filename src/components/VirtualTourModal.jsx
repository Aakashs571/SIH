import React from 'react';

export default function VirtualTourModal({ onClose }) {
  return (
    <div id="virtualTourModal" className="modal">
      <div className="modal-content">
        <div className="modal-close" id="closeVirtualTourModal" onClick={onClose}>×</div>
        <h2>Virtual Tour</h2>
        <div id="virtualTourViewer" style={{height:350}}></div>
      </div>
    </div>
  );
}
