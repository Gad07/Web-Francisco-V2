import React from 'react';
import EditorialOverlay from '../components/EditorialOverlay.jsx';

export default function Home({ isLoaded, isAudioActive, onToggleAudio, scrollProgress }) {
  return (
    <EditorialOverlay
      isLoaded={isLoaded}
      isAudioActive={isAudioActive}
      onToggleAudio={onToggleAudio}
      scrollProgress={scrollProgress}
    />
  );
}
