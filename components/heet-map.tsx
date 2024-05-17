"use client"

import React, { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label"
import { TimePicker } from "@/components/ui/time-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {APIProvider, Map,} from '@vis.gl/react-google-maps';
import { Button } from '@/components/ui/button';
import {Plus, Clock, MapPin } from 'lucide-react';
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
import { CenterButton } from '@/components/center-button';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { ThemeSwapper } from '@/components/theme-swapper';
import { LoadingButton } from './ui/loading-button';
import { useFormState } from 'react-dom';
import { createEvent } from '@/actions/event';

interface Location {
  lng: number,
  lat: number,
  label: string,
}

export function HeetMap({
    children,
  }: Readonly<{
    children?: React.ReactNode;
  }>) {
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const [location, setLocation] = useState<Location>({
    label: "",
    lat: -200,
    lng: -200

  })
  const [form, createEventAction] = useFormState(createEvent, null)

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
        {children}
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
            <form action={createEventAction} id='form' className='p-4'>
              <Label>Titel</Label>
              <Input name='title'></Input>
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
                  <input className='sr-only peer' id='drama' type="radio" name='activity' value="drama" />
                  <label htmlFor='drama' className='text-sm px-2 py-1 border border-border rounded-lg peer-checked:bg-primary'>Teater</label>
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
              <Textarea name='description' />
              <Label>Börjar</Label>
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !from && "text-muted-foreground"
                      )}
                    >
                      <Clock className="mr-2 size-4" />
                      {from ? `${from.toLocaleDateString("sv-se")} ${from.toLocaleTimeString("sv-se", { hour: "2-digit", minute: "2-digit" })}` : <span>Pick a time</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[280px] grid place-items-center">
                    <Calendar
                    fromDate={new Date()}
                      mode="single"
                      selected={from}
                      onSelect={(e: any) => {
                        if (e) {
                          e.setHours(from.getHours());
                          e.setMinutes(from.getMinutes());
                          setFrom(e);
                        }
                      } } />

                    <TimePicker
                      selected={from}
                      onSelected={setFrom}
                      className="w-64" />
                  </PopoverContent>
                </Popover>
                </div>
                <Label>Slutar</Label>
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !to && "text-muted-foreground"
                      )}
                    >
                      <Clock className="mr-2 size-4" />
                      {to ? `${to.toLocaleDateString("sv-se")} ${to.toLocaleTimeString("sv-se", { hour: "2-digit", minute: "2-digit" })}` : <span>Pick a time</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[280px] grid place-items-center">
                    <Calendar
                      fromDate={from}
                      mode="single"
                      selected={to}
                      onSelect={(e: any) => {
                        if (e) {
                          e.setHours(to.getHours());
                          e.setMinutes(to.getMinutes());
                          setTo(e);
                        }
                      } } />

                    <TimePicker
                      selected={to}
                      onSelected={setTo}
                      className="w-64" />
                  </PopoverContent>
                </Popover>
                </div>
                <Label>Plats</Label>
                <div className='flex'>
                  <Input value={location.label} />
                  <input type="hidden" name='lat' value={location.lat} />
                  <input type="hidden" name='lng' value={location.lng} />
                  <Button 
                  className='ml-1 px-2' 
                  variant={'outline'}
                  type='button'
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
                <input type="hidden" name='from' value={from.toString()} />
                <input type="hidden" name='to' value={to.toString()} />
                <LoadingButton className='w-full mt-6'>Submit</LoadingButton>
                <DrawerClose asChild>
                    <Button variant="outline" className='mt-2 w-full' type='button'>Cancel</Button>
                </DrawerClose>
            </form>
          </div>
        </DrawerContent>
      </Drawer>
    
  </APIProvider>
  )
};

