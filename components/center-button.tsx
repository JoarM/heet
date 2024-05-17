import { useMap } from "@vis.gl/react-google-maps";
import { Button, ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { LocateFixed } from "lucide-react";

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
        })
    }, [map])

    return (
        <Button
        className={cn('bottom-20 absolute rounded-full left-1.5 hover:bg-secondary', className)} 
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
        >
          <LocateFixed className="size-5 text-secondary-foreground" />
        </Button>
    )
}