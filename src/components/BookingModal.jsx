import React from 'react';
import { useBooking } from '../bookingContext';

export default function BookingModal({ onClose }) {
  const { selectedPackage } = useBooking();
  return (
    <div id="bookingModal" className="modal">
      <div className="modal-content">
        <div className="modal-close" id="closeModal" onClick={onClose}>×</div>
        <h2>Complete Your Booking</h2>
        {selectedPackage && (
          <div className="booking-summary" style={{marginTop: 10}}>
            <h3 style={{marginBottom: 8}}>Selected Package</h3>
            <div><strong>Name:</strong> {selectedPackage.name}</div>
            <div><strong>Price:</strong> ₹{selectedPackage.price}</div>
          </div>
        )}
        {/* Booking form goes here */}
      </div>
    </div>
  );
}
