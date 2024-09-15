"use client";

import { MapView, useMap, useMapData } from "@mappedin/react-sdk";
import "@mappedin/react-sdk/lib/esm/index.css";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";
import { randomInt } from "crypto";

interface Position {
    latitude: number | null;
    longitude: number | null;
}

export default function RescueMapMarkers() {
    const { mapData, mapView } = useMap();

    const fetchMarkers = async () => {
        const coordinates = await useQuery(api.tasks.get)
        return coordinates;
    }

    fetchMarkers().then((coordinates) => {
        if (!coordinates) return;

        coordinates!.forEach((coordinate) => {
            mapView.Markers.add(mapView.createCoordinate(coordinate.lat, coordinate.long), 
            '<div>🔴</div>');
        });
    })

    return null;
}