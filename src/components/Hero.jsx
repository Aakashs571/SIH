import React from 'react';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Discover Jharkhand</h1>
        <p>Where Nature Meets Culture - Explore Eco & Cultural Wonders</p>
        <div className="search-box">
          <div className="search-grid">
            <input type="text" className="search-input" id="searchDest" placeholder="🔍 Where to?" defaultValue="Jharkhand" />
            <input type="date" className="search-input" id="searchDate" />
            <input type="number" className="search-input" id="searchGuests" placeholder="👥 Guests" min="1" defaultValue={2} />
            <select className="search-input" id="searchType">
              <option value="">Tour Type</option>
              <option value="eco">Eco Tourism</option>
              <option value="cultural">Cultural</option>
              <option value="adventure">Adventure</option>
              <option value="spiritual">Spiritual</option>
            </select>
          </div>
          <button className="search-btn" id="searchToursBtn">Search Tours</button>
        </div>
      </div>
    </section>
  );
}
