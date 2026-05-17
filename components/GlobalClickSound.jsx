'use client';
import { useEffect } from 'react';

export default function GlobalClickSound() {
  useEffect(() => {
    // Create the audio element pointing to the user's uploaded MP3
    const clickAudio = new Audio('/universfield-computer-mouse-click-352734.mp3');
    clickAudio.volume = 0.5;

    const playClick = () => {
      try {
        clickAudio.currentTime = 0;
        clickAudio.play().catch(e => {
          console.error("Audio playback failed", e);
        });
      } catch (e) {
        console.error("Audio error", e);
      }
    };

    const handleClick = (e) => {
      // Check if the click happened on or inside a link or a button
      const target = e.target.closest('a, button');
      // Do not play if the element explicitly opts out via the 'no-click-sound' class
      if (target && !target.closest('.no-click-sound')) {
        playClick();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
