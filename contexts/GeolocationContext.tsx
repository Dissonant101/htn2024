"use client";

import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

interface Position {
  latitude: number | null;
  longitude: number | null;
}

interface GeolocationContextProps {
  position: Position;
}

const GeolocationContext = createContext<GeolocationContextProps | undefined>(undefined);

export const GeolocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [position, setPosition] = useState<Position>({ latitude: null, longitude: null });

  useEffect(() => {
    if (navigator.geolocation) {
      const handlePosition = (position: GeolocationPosition) => {
        console.log('New position:', position.coords.latitude, position.coords.longitude); // Debugging log
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      };

      const handleError = (error: GeolocationPositionError) => {
        console.error('Error getting geolocation:', error);
      };

      const watchId = navigator.geolocation.watchPosition(handlePosition, handleError);

      // Clean up the watcher on component unmount
      return () => {
        console.log('Clearing watch'); // Debugging log
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.warn('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <GeolocationContext.Provider value={{ position }}>
      {children}
    </GeolocationContext.Provider>
  );
};

export const useGeolocation = (): GeolocationContextProps => {
  const context = useContext(GeolocationContext);
  if (!context) {
    throw new Error('useGeolocation must be used within a GeolocationProvider');
  }
  return context;
};
