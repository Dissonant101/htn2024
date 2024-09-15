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
  }, []);

  useEffect(() => {
    const minPath = getNearestFireExitPath();
    if (minPath) {
      mapView.Navigation.clear();
      mapView.Navigation.draw(minPath);
    }
  }, [position]);

  return null;
}
