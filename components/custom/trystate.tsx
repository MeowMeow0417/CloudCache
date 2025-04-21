'use client';

import React from 'react';
import { useGeoLocation } from '@/lib/hooks/useGeolocation'

const GeoLocationComponent = () => {
    const { location, error, loading } = useGeoLocation();

    return (
      <div className='flex flex-row space-x-1'>
        <h2>📍 Your Location</h2>
        <p>Lat: {location?.lat}</p>
        <p>Long: {location?.lng}</p>
      </div>
    );
};

export default GeoLocationComponent;
