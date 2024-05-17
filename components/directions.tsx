"use client"

import { useDestinationStore } from "@/contexts/directions"
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { X } from "lucide-react"

export function Directions() {
    const map = useMap("map")
    const routesLibrary = useMapsLibrary('routes')
    const [directionsService, setDirectionsService] =
        useState<google.maps.DirectionsService>();
    const [directionsRenderer, setDirectionsRenderer] =
        useState<google.maps.DirectionsRenderer>();
    const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
    const [routeIndex, setRouteIndex] = useState(0);
    const selected = routes[routeIndex];
    const leg = selected?.legs[0];
    const { origin, destination, updateDirections } = useDestinationStore()

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({map}));
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer || !destination || !origin) return;

    directionsService
      .route({
        origin: { lat: origin.lat, lng: origin.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: google.maps.TravelMode.WALKING,
        provideRouteAlternatives: true
      })
      .then(response => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer, destination, origin]);

  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  if (destination) {
    return (
        <>
            <Card className="absolute left-1.5 top-1.5  right-12">
            <CardHeader>
                <div className="flex items-center justify-between gap-2">
                    <CardTitle>
                        {selected.summary}
                    </CardTitle>
                    <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                        updateDirections(undefined)
                    }}
                    >
                        <X 
                        className="size-4"
                        />
                        <span className="sr-only">Stäng väg ledare</span>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <p>
                    {leg.start_address.split(',')[0]} to {leg.end_address.split(',')[0]}
                </p>
                <p>Avstånd: {leg.distance?.text}</p>
                <p>Tid: {leg.duration?.text}</p>
            </CardContent>
        </Card>
        </>
        
    )
  }

  return null
}