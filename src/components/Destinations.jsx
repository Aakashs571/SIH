import React, { useMemo, useState } from 'react';

const MOCK_DESTINATIONS = [
  { id: 1, name: 'Betla National Park', type: 'eco' },
  { id: 2, name: 'Dassam Falls', type: 'waterfall' },
  { id: 3, name: 'Baidhyanath Dham', type: 'spiritual' },
  { id: 4, name: 'Netarhat', type: 'adventure' },
  { id: 5, name: 'Ranchi Culture Walk', type: 'cultural' },
];

export default function Destinations() {
  const [filter, setFilter] = useState('all');
  const filtered = useMemo(() => {
    if (filter === 'all') return MOCK_DESTINATIONS;
    return MOCK_DESTINATIONS.filter(d => d.type === filter);
  }, [filter]);
  return (
    <div id="destinationsPage" className="page">
      <div className="page-header">
        <h1>Explore Destinations</h1>
        <p>Discover the breathtaking beauty of Jharkhand's natural and cultural wonders</p>
      </div>
      <section className="section" style={{background: 'var(--dark)'}}>
        <div className="filter-section">
          <h3 style={{marginBottom: 20}}>Filter By Type</h3>
          <div className="filter-grid">
            <button className={`filter-btn ${filter==='all'?'active':''}`} onClick={() => setFilter('all')}>All Destinations</button>
            <button className={`filter-btn ${filter==='eco'?'active':''}`} onClick={() => setFilter('eco')}>Eco Tourism</button>
            <button className={`filter-btn ${filter==='cultural'?'active':''}`} onClick={() => setFilter('cultural')}>Cultural</button>
            <button className={`filter-btn ${filter==='adventure'?'active':''}`} onClick={() => setFilter('adventure')}>Adventure</button>
            <button className={`filter-btn ${filter==='spiritual'?'active':''}`} onClick={() => setFilter('spiritual')}>Spiritual</button>
            <button className={`filter-btn ${filter==='waterfall'?'active':''}`} onClick={() => setFilter('waterfall')}>Waterfalls</button>
          </div>
        </div>
        <div className="destinations-grid" id="destinationsGrid">
          {filtered.map(d => (
            <div key={d.id} className="destination-card">
              <h4>{d.name}</h4>
              <div className="badge">{d.type}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

