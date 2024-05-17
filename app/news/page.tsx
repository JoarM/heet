"use client"

import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { NewsCard } from "@/components/news-card";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
  })

export default function NewsPage() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    return (
        <div className="p-3">
            <div>
                <h3>Nyheter</h3>
            </div>
            <div className="relative flex flex-col items-end">
                <motion.div
                    initial={{ width: 'auto' }}
                    animate={{ width: isDropdownOpen ? '100%' : 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center z-10"
                >
                    <Button onClick={toggleDropdown} className="flex items-center justify-between w-full">
                        <h1 className="mx-2">Filter</h1>
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ArrowDown className="size-4 "/>
                        </motion.div>
                    </Button>
                </motion.div>
                <motion.div
                    initial={{ width: 0, opacity: 0 }}

                    animate={{ width: isDropdownOpen ? '100%' : 0, opacity: isDropdownOpen ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden absolute top-10 right-0 z-20"
                >
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: isDropdownOpen ? 'auto' : 0 }}
                        transition={{ duration: 0.3, delay: isDropdownOpen ? 0.3 : 0 }}
                        className=" bg-secondary shadow-lg rounded-lg py-2 w-full"
                    >
                        <div className="px-4 py-2">
                            <div className="flex space-x-4 mb-2 text-sm ">
                                <label className="inline-flex items-center transition-colors hover:bg-background/50">
                                    Option A <input type="checkbox" className="mr-1"/>
                                </label>
                                <label className="inline-flex items-center transition-colors hover:bg-background/50">
                                    <input type="checkbox" className="mr-1" /> Option B
                                </label>
                                <label className="inline-flex items-center transition-colors hover:bg-background/50">
                                    <input type="checkbox" className="mr-1" /> Option C
                                </label>
                            </div>
                            <a href="#" className="block px-4 py-2 text-sm transition-colors hover:bg-background/50">Option 2</a>
                            <a href="#" className="block px-4 py-2 text-sm transition-colors hover:bg-background/50">Option 3</a>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
            <div> 
                <h1>Aktiva Event</h1>
                <div className="space-y-4">
                    <NewsCard
                    title="Card 1"
                    date="2024-05-17 19.00"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    adress="123 Street, City, Country"
                    highlighted
                    category="movie"
                    />
                    <NewsCard 
                    title="Card 2"
                    date="2024-05-17 20.00"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    adress="123 Street, City, Country"
                    category="food"
                    />
                </div>
            
            </div>
        </div>
    )
}