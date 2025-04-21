'use client';

import { useEffect, useState } from 'react';

interface Location {
  lat: number;
  lng: number;
}

export function useGeoLocation() {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    const geoOptions: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 5000, // 5 seconds
      maximumAge: 0,  // don't use cached location
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        setError(`Geolocation error: ${err.message}`);
      },
      geoOptions
    );
  }, []);

  return { location, error};
}
