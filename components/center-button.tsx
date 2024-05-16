import { useMap } from "@vis.gl/react-google-maps";
import { Button, ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export function CenterButton({
    className,
    ...props
}: ButtonProps) {
    const map = useMap("map")

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          if (map && position) {
            map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude })
          }
        });
    }, [map])

    return (
        <Button
        className={cn('absolute rounded-full bottom-1 left-1.5 hover:bg-secondary', className)} 
        variant="secondary"
        size="icon"
        onClick={() => {
          if (map) {
            navigator.geolocation.getCurrentPosition((position) => {
              if (position) {
                map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude })
                map.setZoom(18)
              }
            });
          }
        }}
        {...props}
        ></Button>
    )
}