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
  const [zoom, setZoom] = useState(18)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({lat: position?.coords.latitude ?? 0, lng: position?.coords.longitude ?? 0})
    });
  }, [])

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
      <div className=' h-[calc(100svh-20px)]'>
        <Map
          style={{width: '100%', height: '100%'}}
          defaultCenter={{lat: 0, lng: 0}}
          center={location}
          zoom={zoom}
          onZoomChanged={(e) => setZoom(e.detail.zoom)}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          onCenterChanged={(e) => {
            setLocation({lat: e.detail.center.lat, lng: e.detail.center.lng})
          }}
        />
        <Button
        className='absolute rounded-full bottom-1' 
        variant="secondary"
        size="icon"
        onClick={() => {
          setZoom(18)
          navigator.geolocation.getCurrentPosition((position) => {
            setLocation({ lat: position?.coords.latitude ?? 0, lng: position?.coords.longitude ?? 0})
          });
        }}
        ></Button>
      </div>
    
  </APIProvider>
  )
};

