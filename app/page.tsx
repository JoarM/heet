"use client"

import React, { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label"
import { TimePicker } from "@/components/ui/time-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AdvancedMarker, APIProvider, InfoWindow, Map, Marker, Pin, useMap} from '@vis.gl/react-google-maps';
import { Button } from '@/components/ui/button';
import { Utensils, Beer, Music, Dumbbell, Fish, Drama, Clapperboard, Dices, Plus, Clock, MapPin } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { profile } from 'console';
import { CenterButton } from '@/components/center-button';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { ThemeSwapper } from '@/components/theme-swapper';

interface Location {
  lng: number,
  lat: number
}

export default function Page() {
  const [date, setDate] = useState(new Date());

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
        <Map
          id='map'
          style={{width: '100%', height: '100%'}}
          defaultCenter={{lat: 0, lng: 0}}
          defaultZoom={18}
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

