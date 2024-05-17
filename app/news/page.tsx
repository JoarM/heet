"use client"

import { cn } from "@/lib/utils";
import "../globals.css";
import { Inter as FontSans } from "next/font/google";
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";

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
            <div className="relative flex flex-col items-start">
                <motion.div
                    initial={{ width: 'auto' }}
                    animate={{ width: isDropdownOpen ? '200px' : 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center z-10"
                >
                    <Button onClick={toggleDropdown} className="flex items-center justify-between w-full">
                        <h1>Filter</h1>
                        <ArrowDown className="size-4 ml-2" />
                    </Button>
                </motion.div>
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: isDropdownOpen ? '200px' : 0, opacity: isDropdownOpen ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden absolute top-10 left-0 z-20"
                >
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: isDropdownOpen ? 'auto' : 0 }}
                        transition={{ duration: 0.3, delay: isDropdownOpen ? 0.3 : 0 }}
                        className=" bg-white shadow-lg rounded-lg py-2"
                    >
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 1</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 2</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 3</a>
                    </motion.div>
                </motion.div>
            </div>
            <div> 
                <h1>Aktiva Event</h1>
                <Card className="bg-secondary drop-shadow-[0_4px_4px_rgba(33,196,88,1)] grid grid-rows-[0fr] transition-all overflow-hidden duration-300 data-[open='true']:grid-rows-[1fr]">
                    <CardContent className="p-6 text-secondary-foreground">
                        <div className="flex gap-12">
                            <img className="ml-2" src="" alt="PING"></img>
                            <h2>GinaTricot Utförsäljning</h2>
                        </div>
                        <div className="ml-24">
                            <h1>2024</h1>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-secondary mt-5">
                    <CardContent className="p-6 text-secondary-foreground">
                        <div className="flex gap-12">
                            <img className="ml-2" src="" alt="PING"></img>
                            <h2>Eton Supersale</h2>
                        </div>
                        <div className="ml-24">
                            <h1>2024</h1>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-secondary mt-5">
                    <CardContent className="p-6 text-secondary-foreground">
                        <div className="flex gap-12">
                            <img className="ml-2" src="" alt="PING"></img>
                            <h2>Netonnet Flash Sales</h2>
                        </div>
                        <div className="ml-24">
                            <h1>2024</h1>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}