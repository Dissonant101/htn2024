"use client";

import { useState, useContext, useEffect } from "react";
import { MapView, useMapData } from "@mappedin/react-sdk";
import "@mappedin/react-sdk/lib/esm/index.css";
import CivilianMapPath from "./CivilianMapPath";
import { GeolocationContext } from "../../contexts/GeolocationContext";

export default function CivilianMap() {
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

  return mapData ? (
    <div className="w-full h-full">
      <MapView mapData={mapData}>
        <CivilianMapPath />
      </MapView>
    </div>
  ) : null;
}
