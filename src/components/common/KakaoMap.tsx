"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Facility } from "@/types";

// Fix default marker icon path issue with bundlers
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapProps {
  lat: number;
  lng: number;
  label?: string;
  facilities?: Facility[];
  activeCategory?: string;
  categoryColors?: Record<string, string>;
}

function makePinIcon(color: string, size = 28) {
  return L.divIcon({
    html: `<svg viewBox="0 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:${size}px;height:${size * 34 / 28}px;filter:drop-shadow(0 2px 3px rgba(0,0,0,0.3))">
      <path d="M14 0C6.27 0 0 6.27 0 14c0 10.5 14 20 14 20S28 24.5 28 14C28 6.27 21.73 0 14 0z" fill="${color}"/>
      <circle cx="14" cy="14" r="6" fill="white"/>
    </svg>`,
    className: "",
    iconSize: [size, size * 34 / 28],
    iconAnchor: [size / 2, size * 34 / 28],
    popupAnchor: [0, -(size * 34 / 28)],
  });
}

function makeHomeIcon() {
  return L.divIcon({
    html: `<svg viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:36px;height:44px;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.4))">
      <path d="M18 0C8.06 0 0 8.06 0 18c0 13.5 18 26 18 26S36 31.5 36 18C36 8.06 27.94 0 18 0z" fill="#B87348"/>
      <circle cx="18" cy="18" r="8" fill="white"/>
    </svg>`,
    className: "",
    iconSize: [36, 44],
    iconAnchor: [18, 44],
    popupAnchor: [0, -44],
  });
}

export default function LeafletMap({
  lat,
  lng,
  label = "펜타힐즈 W스퀘어",
  facilities = [],
  activeCategory = "all",
  categoryColors = {},
}: MapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Initial map setup
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [lat, lng],
      zoom: 15,
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);

    // Main project marker
    const homeMarker = L.marker([lat, lng], { icon: makeHomeIcon() }).addTo(map);
    homeMarker
      .bindPopup(
        `<div style="font-size:13px;font-weight:700;color:#B87348;padding:4px 2px;white-space:nowrap;">${label}</div>`,
        { closeButton: false }
      )
      .openPopup();

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update facility markers when category or facilities change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove old facility markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const toShow = activeCategory === "all"
      ? facilities
      : facilities.filter((f) => f.category === activeCategory);

    toShow.forEach((f) => {
      if (!f.lat || !f.lng) return;
      const color = categoryColors[f.category] ?? "#6B7280";
      const marker = L.marker([f.lat, f.lng], { icon: makePinIcon(color) }).addTo(map);
      marker.bindPopup(
        `<div style="font-size:12px;font-weight:600;color:#222;white-space:nowrap;">${f.name}</div>
         <div style="font-size:11px;color:#666;margin-top:2px;">${f.distance} · ${f.time}</div>`,
        { closeButton: false }
      );
      markersRef.current.push(marker);
    });
  }, [facilities, activeCategory, categoryColors]);

  return <div ref={containerRef} className="h-full w-full z-0" />;
}
