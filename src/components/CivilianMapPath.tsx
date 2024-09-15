"use client";

import { useMap, Path } from "@mappedin/react-sdk";
import { useEffect, useState, useContext } from "react";
import "@mappedin/react-sdk/lib/esm/index.css";
import { PointOfInterest } from "@mappedin/react-sdk/mappedin-js/src";
import { GeolocationContext } from "../../contexts/GeolocationContext";

export default function CivilianMapPath() {
  const { mapData, mapView } = useMap();
  const [fireExits, setFireExits] = useState<PointOfInterest[]>([]);
  const { position, setPosition } = useContext(GeolocationContext);

  const getNearestFireExitPath = () => {
    if (!position || !mapView) return null;

    let minDistance = Number.MAX_VALUE;
    let minPath = null;
    for (let i = 0; i < fireExits.length; i++) {
      const currentPath = mapView.getDirections(
        mapView.createCoordinate(position.latitude, position.longitude),
        fireExits[i]
      );
      if (currentPath && currentPath.distance < minDistance) {
        minDistance = currentPath.distance;
        minPath = currentPath;
      }
    }
    return minPath;
  };

  // Fetch map data & populate points
  useEffect(() => {
    if (mapData) {
      const pointsOfInterest = mapData.getByType("point-of-interest");
      const filteredFireExits = pointsOfInterest.filter((p) =>
        p.name.includes("Fire Exit")
      );
      setFireExits(filteredFireExits);
    }
  }, [mapData]);

  // Determine the nearest fire exit path
  const [nearestFireExitPath, setNearestFireExitPath] = useState<any>(null);

  useEffect(() => {
    if (fireExits.length > 0) {
      const path = getNearestFireExitPath();
      setNearestFireExitPath(path);
    }
  }, [fireExits]);

  useEffect(() => {
    if (nearestFireExitPath) {
      mapView.Navigation.draw(nearestFireExitPath);
    }
  }, [nearestFireExitPath]);

  return null;
}
