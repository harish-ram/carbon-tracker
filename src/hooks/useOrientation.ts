import { useState, useEffect } from 'react';

export interface OrientationState {
  angle: number;
  type: 'portrait-primary' | 'portrait-secondary' | 'landscape-primary' | 'landscape-secondary';
  isPortrait: boolean;
  isLandscape: boolean;
}

export const useOrientation = (): OrientationState => {
  const [orientation, setOrientation] = useState<OrientationState>(() => {
    if (typeof window !== 'undefined' && 'screen' in window && 'orientation' in screen) {
      const { angle, type } = (screen as any).orientation || {};
      const isPortrait = type?.includes('portrait') || window.innerHeight > window.innerWidth;
      const isLandscape = type?.includes('landscape') || window.innerWidth > window.innerHeight;

      return {
        angle: angle || 0,
        type: type || 'portrait-primary',
        isPortrait,
        isLandscape,
      };
    }

    // Fallback for browsers without orientation API
    return {
      angle: 0,
      type: 'portrait-primary',
      isPortrait: window.innerHeight > window.innerWidth,
      isLandscape: window.innerWidth > window.innerHeight,
    };
  });

  useEffect(() => {
    const handleOrientationChange = () => {
      if ('screen' in window && 'orientation' in screen) {
        const { angle, type } = (screen as any).orientation || {};
        const isPortrait = type?.includes('portrait') || window.innerHeight > window.innerWidth;
        const isLandscape = type?.includes('landscape') || window.innerWidth > window.innerHeight;

        setOrientation({
          angle: angle || 0,
          type: type || 'portrait-primary',
          isPortrait,
          isLandscape,
        });
      } else {
        // Fallback: check window dimensions
        setOrientation(prev => ({
          ...prev,
          isPortrait: window.innerHeight > window.innerWidth,
          isLandscape: window.innerWidth > window.innerHeight,
        }));
      }
    };

    // Listen for orientation change events
    const orientationChangeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
    window.addEventListener(orientationChangeEvent, handleOrientationChange);

    return () => {
      window.removeEventListener(orientationChangeEvent, handleOrientationChange);
    };
  }, []);

  return orientation;
};

export default useOrientation;