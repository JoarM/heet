"use client"

import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps"
import { Beer, Clapperboard, Dices, Drama, Dumbbell, Fish, Music, Utensils } from "lucide-react"
import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerDescription } from "./ui/drawer"

export function CustomPin({
    lat,
    lng,
    title,
    category,
    description,
    startTime,
    endTime
}: {
    lat: number,
    lng: number,
    title: string,
    category: string,
    description: string,
    startTime: string,
    endTime: string
}) {
    let border = null;
    let icon = null;

    if(category == "food"){
        border = "#935C1F"
        icon = <Utensils className='text-white'/>
    }
    else if(category == "bar"){
        border = "#1F9346"
        icon = <Beer className='text-white'/>
    }
    else if(category == "music"){
        border = "#93881F"
        icon = <Music className='text-white'/>
    }
    else if(category == "gym"){
        border = "#1F5793"
        icon = <Dumbbell className='text-white'/>
    }
    else if(category == "fishing"){
        border = "#1995D4"
        icon = <Fish className='text-white'/>
    }
    else if(category == "drama"){
        border = "#5E1669"
        icon = <Drama className='text-white'/>
    }
    else if(category == "movie"){
        border = "#931F2D"
        icon = <Clapperboard className='text-white'/>
    }
    else if(category == "boardgames"){
        border = "#FFFFFF"
        icon = <Dices className='text-white'/>
    }

    return (
        <Drawer>
                <DrawerTrigger asChild>
                    <AdvancedMarker
                    position={{
                        lat: lat, lng: lng
                    }}
                    title={title}>
                            <Pin background={'#27272A'} borderColor={border} scale={1.4}>
                                {icon}
                            </Pin>
                    </AdvancedMarker>
                </DrawerTrigger>

            <DrawerContent>
                <div className="p-2">
                    <DrawerTitle className="p-4">{title}</DrawerTitle>
                    <DrawerDescription className="border border-border w-max max-w-full rounded-xl mb-2 p-4">{category}</DrawerDescription>
                    <div className="flex border border-border w-max max-w-full rounded-xl mb-2">
                        <DrawerDescription className="p-4">{startTime}</DrawerDescription>
                        <p className="p-4">-</p>
                        <DrawerDescription className="p-4">{endTime}</DrawerDescription>
                    </div>

                    <DrawerDescription className="p-4 mb-2 border border-border w-max max-w-full rounded-xl">{description}</DrawerDescription>
                </div>
            </DrawerContent>
        </Drawer>
    )
}