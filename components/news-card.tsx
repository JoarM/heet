"use client"

import { Inter as FontSans } from "next/font/google";
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Beer, Clapperboard, Dices, Drama, Dumbbell, Fish, Music, Utensils } from "lucide-react"

export function NewsCard({
    highlighted,
    title,
    date,
    description,
    adress,
    category,
}: {
    highlighted?: boolean;
    title: string;
    date: string;
    description: string;
    adress: string;
    category: string;
}) {
    const [isExpanded, setIsExpanded] = useState(false);
    let icon = null;
    const handleCardClick = () => {
        setIsExpanded(prevState => !prevState);
    };
        if(category == "food"){
        icon = <Utensils className='text-white size-6'/>
    }
    else if(category == "bar"){
        icon = <Beer className='text-white size-6'/>
    }
    else if(category == "music"){
        icon = <Music className='text-white size-6'/>
    }
    else if(category == "gym"){
        icon = <Dumbbell className='text-white size-6'/>
    }
    else if(category == "fishing"){
        icon = <Fish className='text-white size-6'/>
    }
    else if(category == "drama"){
        icon = <Drama className='text-white size-6'/>
    }
    else if(category == "movie"){
        icon = <Clapperboard className='text-white size-6'/>
    }
    else if(category == "boardgames"){
        icon = <Dices className='text-white size-6'/>
    }

    return (
        <motion.div
                    layout
                    initial={{ borderRadius: 10 }}
                    whileHover={{ scale: 1.025 }}
                    whileTap={{ scale: 1 }}
                    className={cn("bg-secondary overflow-hidden rounded-lg transition-all", highlighted && "drop-shadow-[0_4px_4px_rgba(33,196,88,1)]")}
                    onClick={handleCardClick}
                >
                    <CardContent className="p-6 text-secondary-foreground">
                        <div className="flex items-center gap-2">
                            <div className="">
                                {icon}
                            </div>
                            <div className="">
                                <h2 className="font-bold">{title}</h2>
                                <span className="text-sm">{date}</span>
                            </div>
                        </div>
                        
                        <div className={`grid grid-rows-[0fr] text-muted-foreground transition-all overflow-hidden duration-300 invisible opacity-0 data-[open='true']:mt-4 data-[open='true']:grid-rows-[1fr] data-[open='true']:opacity-100 data-[open='true']:visible`} data-open={isExpanded}>
                            <div className="overflow-hidden">
                                <p>{description}</p>
                                <p>{adress}</p>
                            </div>
                        </div>
                    </CardContent>
                </motion.div>
    )
}