"use client";

import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

interface Position {
  latitude: number | null;
  longitude: number | null;
}

// Create context with a default value
export const GeolocationContext = createContext<any>(null);

// Geolocation provider component
export const GeolocationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [position, setPosition] = useState<any>(null);

  return (
    <GeolocationContext.Provider
      value={{ position: position, setPosition: setPosition }}
    >
      {children}
    </GeolocationContext.Provider>
  );
};
