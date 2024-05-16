"use client"

import React, { useEffect, useState } from 'react';
import {APIProvider, Map} from '@vis.gl/react-google-maps';
import { Button } from '@/components/ui/button';

interface Location {
  lng: number,
  lat: number
}

export default function Page() {
  const [location, setLocation] = useState<Location | null>(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position)
      setLocation({lat: position?.coords.latitude ?? 0, lng: position?.coords.longitude ?? 0})
    });
  })

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
    <Map
      style={{width: '100%', height: '93svh'}}
      defaultCenter={{lat: 0, lng: 0}}
      center={location}
      defaultZoom={18}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
      onCenterChanged={(e) => {
        setLocation({lat: e.detail.center.lat, lng: e.detail.center.lng})
      }}
    />
  </APIProvider>
  )
};

