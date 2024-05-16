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
  lat: number,
  label: string,
}

export default function Page() {
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState<Location>({
    label: "",
    lat: -200,
    lng: -200

  })

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
      <Map
        id='map'
        style={{ width: '100%', height: '100%' }}
        defaultCenter={{ lat: 0, lng: 0 }}
        defaultZoom={18}
        gestureHandling={'greedy'}
        disableDefaultUI
        mapId={"edc7a72af363afe4"}>
        <AdvancedMarker
          position={{
            lat: 57.718755200000004, lng: 12.943874899999987
          }}
          title={'AdvancedMarker with customized pin.'}>
          <Pin background={'#27272A'} borderColor={'#935C1F'} scale={1.4}>
            <Utensils className='text-white' />
          </Pin>
        </AdvancedMarker>
        <AdvancedMarker
          position={{
            lat: 57.72, lng: 12.943874899999987
          }}
          title={'AdvancedMarker with customized pin.'}>
          <Pin background={'#27272A'} borderColor={'#1F9346'} scale={1.4}>
            <Beer className='text-white' />
          </Pin>
        </AdvancedMarker>
        <AdvancedMarker
          position={{
            lat: 57.723, lng: 12.943874899999987
          }}
          title={'AdvancedMarker with customized pin.'}>
          <Pin background={'#27272A'} borderColor={'#93881F'} scale={1.4}>
            <Music className='text-white' />
          </Pin>
        </AdvancedMarker>
        <AdvancedMarker
          position={{
            lat: 57.726, lng: 12.943874899999987
          }}
          title={'AdvancedMarker with customized pin.'}>
          <Pin background={'#27272A'} borderColor={'#1F5793'} scale={1.4}>
            <Dumbbell className='text-white' />
          </Pin>
        </AdvancedMarker>
        <AdvancedMarker
          position={{
            lat: 57.728, lng: 12.943874899999987
          }}
          title={'AdvancedMarker with customized pin.'}>
          <Pin background={'#27272A'} borderColor={'#1995D4'} scale={1.4}>
            <Fish className='text-white' />
          </Pin>
        </AdvancedMarker>
        <AdvancedMarker
          position={{
            lat: 57.73000000554, lng: 12.943874899999987
          }}
          title={'AdvancedMarker with customized pin.'}>
          <Pin background={'#27272A'} borderColor={'#5E1669'} scale={1.4}>
            <Drama className='text-white' />
          </Pin>
        </AdvancedMarker>
        <AdvancedMarker
          position={{
            lat: 57.73000000554, lng: 12.963874899999987
          }}
          title={'AdvancedMarker with customized pin.'}>
          <Pin background={'#27272A'} borderColor={'#931F2D'} scale={1.4}>
            <Clapperboard className='text-white' />
          </Pin>
        </AdvancedMarker>
        <AdvancedMarker
          position={{
            lat: 57.73000000554, lng: 12.983874899999987
          }}
          title={'AdvancedMarker with customized pin.'}>
          <Pin background={'#27272A'} borderColor={'#FFFFFF'} scale={1.4}>
            <Dices className='text-white' />
          </Pin>
        </AdvancedMarker>
      </Map>
      <CenterButton />
      <Drawer>
        <DrawerTrigger asChild>
          <Button size="icon" className='rounded-full bottom-20 absolute right-2 hover:bg-primary'><Plus /></Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Lägg till aktivitet</DrawerTitle>
            </DrawerHeader>
            <div className='p-4'>
              <Label>Titel</Label>
              <Input></Input>
              <Label>Kategori</Label>
              <div className='flex flex-wrap gap-2'>
                <div>
                  <input className='sr-only peer' id='food' type="radio" name='activity' value="food" />
                  <label htmlFor='food' className='text-sm px-2 py-1 border border-border rounded-lg peer-checked:bg-primary'>Mat</label>
                </div>
                <div>
                  <input className='sr-only peer' id='bar' type="radio" name='activity' value="bar" />
                  <label htmlFor='bar' className='text-sm px-2 py-1 border border-border rounded-lg peer-checked:bg-primary'>Bar</label>
                </div>
                <div>
                  <input className='sr-only peer' id='music' type="radio" name='activity' value="music" />
                  <label htmlFor='music' className='text-sm px-2 py-1 border border-border rounded-lg peer-checked:bg-primary'>Musik</label>
                </div>
                <div>
                  <input className='sr-only peer' id='gym' type="radio" name='activity' value="gym" />
                  <label htmlFor='gym' className='text-sm px-2 py-1 border border-border rounded-lg peer-checked:bg-primary'>Gymma</label>
                </div>
                <div>
                  <input className='sr-only peer' id='fishing' type="radio" name='activity' value="fishing" />
                  <label htmlFor='fishing' className='text-sm px-2 py-1 border border-border rounded-lg peer-checked:bg-primary'>Fiska</label>
                </div>
                <div>
                  <input className='sr-only peer' id='theater' type="radio" name='activity' value="theater" />
                  <label htmlFor='theater' className='text-sm px-2 py-1 border border-border rounded-lg peer-checked:bg-primary'>Teater</label>
                </div>
                <div>
                  <input className='sr-only peer' id='movie' type="radio" name='activity' value="movie" />
                  <label htmlFor='movie' className='text-sm px-2 py-1 border border-border rounded-lg peer-checked:bg-primary'>Bio</label>
                </div>
                <div>
                  <input className='sr-only peer' id='boardgames' type="radio" name='activity' value="boardgames" />
                  <label htmlFor='boardgames' className='text-sm px-2 py-1 border border-border rounded-lg peer-checked:bg-primary'>Sällskapsspel</label>
                </div>
              </div>
              <Label>Beskrivning</Label>
              <Textarea />
              <Label>Börjar</Label>
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <Clock className="mr-2 size-4" />
                      {date ? `${date.toLocaleDateString("sv-se")} ${date.toLocaleTimeString("sv-se", { hour: "2-digit", minute: "2-digit" })}` : <span>Pick a time</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[280px] grid place-items-center">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(e: any) => {
                        if (e) {
                          e.setHours(date.getHours());
                          e.setMinutes(date.getMinutes());
                          setDate(e);
                        }
                      } } />

                    <TimePicker
                      selected={date}
                      onSelected={setDate}
                      className="w-64" />
                  </PopoverContent>
                </Popover>
                <Label>Plats</Label>
                <div className='flex'>
                  <Input value={location.label} />
                  <input type="hidden" name='lat' value={location.lat} />
                  <input type="hidden" name='lng' value={location.lng} />
                  <Button 
                  className='ml-1 px-2' 
                  variant={'outline'}
                  onClick={() => {
                    navigator.geolocation.getCurrentPosition((position) => {
                      if (position) {
                        setLocation({
                          label: "Nuvarande plats",
                          lat: position.coords.latitude,
                          lng: position.coords.longitude
                        })
                      }
                    });
                  }}
                  >
                    <MapPin className='size-4' />
                  </Button>
                </div>
              </div>
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    
  </APIProvider>
  )
};
