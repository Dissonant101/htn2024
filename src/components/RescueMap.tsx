"use client";

import { MapView, useMap, useMapData } from "@mappedin/react-sdk";
import "@mappedin/react-sdk/lib/esm/index.css";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";
import RescueMapMarkers from "./RescueMapMarkers";

interface Position {
  latitude: number | null;
  longitude: number | null;
}

export default function RescueMap() {
  const { isLoading, error, mapData } = useMapData({
    key: process.env.NEXT_PUBLIC_MAPPEDIN_KEY,
    secret: process.env.NEXT_PUBLIC_MAPPEDIN_SECRET,
    mapId: process.env.NEXT_PUBLIC_MAPPEDIN_MAP_ID,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }


  return (mapData ? (
    <div className="w-full h-full">
      <MapView mapData={mapData}>
        <RescueMapMarkers />
      </MapView>
    </div>
  ) : null
  )
}
