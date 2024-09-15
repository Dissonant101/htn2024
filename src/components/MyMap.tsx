"use client";

import { MapView, useMapData } from "@mappedin/react-sdk";
import "@mappedin/react-sdk/lib/esm/index.css";
import { useEffect, useState } from "react";

interface Position {
  latitude: number | null;
  longitude: number | null;
}

export default function MyMap() {
  const { isLoading, error, mapData } = useMapData({
    key: process.env.NEXT_PUBLIC_MAPPEDIN_KEY,
    secret: process.env.NEXT_PUBLIC_MAPPEDIN_SECRET,
    mapId: process.env.NEXT_PUBLIC_MAPPEDIN_MAP_ID,
  });

  const [location, setLocation] = useState<Position>({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return mapData ? (
    <div className="w-full h-full">
      <MapView mapData={mapData}></MapView>
    </div>
  ) : null;
}
