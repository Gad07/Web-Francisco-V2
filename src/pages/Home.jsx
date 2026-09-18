import React from 'react';
import EditorialOverlay from '../components/EditorialOverlay.jsx';

export default function Home({ isLoaded, scrollProgress }) {
  return (
    <EditorialOverlay
      isLoaded={isLoaded}
      scrollProgress={scrollProgress}
    />
  );
}
