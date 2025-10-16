import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DashboardSidebar from './components/DashboardSidebar';
import BookingModal from './components/BookingModal';
import ItineraryModal from './components/ItineraryModal';
import VirtualTourModal from './components/VirtualTourModal';
import DestinationDetailsModal from './components/DestinationDetailsModal';
import Hero from './components/Hero';
import SectionWhy from './components/SectionWhy';
import Destinations from './components/Destinations';
import Packages from './components/Packages';
import Services from './components/Services';
import Reviews from './components/Reviews';
import Profile from './components/Profile';
import Login from './components/Login';
import { BookingProvider, useBooking } from './bookingContext';

function App() {
  // Modal state (expand as needed)
  const { isOpen: isBookingOpen, closeBooking } = useBooking();
  const [showItinerary, setShowItinerary] = useState(false);
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [showDestinationDetails, setShowDestinationDetails] = useState(false);

  const HomePage = () => (
    <>
      <Hero />
      <SectionWhy />
    </>
  );

  return (
    <BookingProvider>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/services" element={<Services />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <DashboardSidebar />
        <Footer />
        {isBookingOpen && <BookingModal onClose={closeBooking} />}
        {showItinerary && <ItineraryModal onClose={() => setShowItinerary(false)} />}
        {showVirtualTour && <VirtualTourModal onClose={() => setShowVirtualTour(false)} />}
        {showDestinationDetails && (
          <DestinationDetailsModal onClose={() => setShowDestinationDetails(false)} />
        )}
      </div>
    </BookingProvider>
  )
}

export default App
