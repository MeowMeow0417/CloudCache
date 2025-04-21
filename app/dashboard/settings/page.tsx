'use client'

import React, { useState } from 'react'
import {
  Card, CardHeader, CardTitle, CardContent, CardFooter
} from '@/components/ui/card'
import { ThemeSwitcher } from '@/components/custom/DarkMode'
import { useGeoLocation } from '@/lib/hooks/useGeolocation'
import { GeoLocationToggle } from '@/components/custom/GeoLocationToggle'

const SettingsPage = () => {
  const [geoEnabled, setGeoEnabled] = useState(false);
  const geo = useGeoLocation();

  const locationInfo = geoEnabled && geo.location
    ? `Lat: ${geo.location.lat}, Lng: ${geo.location.lng}`
    : 'Geolocation disabled';

    // Todo: add conversion between imperial and metric
  return (
    <section className='flex flex-col items-center'>
      <Card className='w-96'>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ThemeSwitcher />
          <GeoLocationToggle enabled={geoEnabled} onChange={setGeoEnabled} />
          <p className="text-sm text-muted-foreground">{locationInfo}</p>


        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </section>
  )
}

export default SettingsPage;
