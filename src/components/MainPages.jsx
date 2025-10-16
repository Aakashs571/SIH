import React from 'react';
import Hero from './Hero';
import SectionWhy from './SectionWhy';
import Destinations from './Destinations';
import Packages from './Packages';
import Services from './Services';
import Reviews from './Reviews';
import Profile from './Profile';
import Login from './Login';

export default function MainPages({ page }) {
  switch (page) {
    case 'home':
      return <><Hero /><SectionWhy /></>;
    case 'destinations':
      return <Destinations />;
    case 'packages':
      return <Packages />;
    case 'services':
      return <Services />;
    case 'reviews':
      return <Reviews />;
    case 'profile':
      return <Profile />;
    case 'login':
      return <Login />;
    default:
      return <><Hero /><SectionWhy /></>;
  }
}
