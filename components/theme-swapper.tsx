"use client"

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function ThemeSwapper() {
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = useState(false)
    
    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <>
            {mounted ? (
                <Select value={theme} onValueChange={(e) => setTheme(e)}>
                    <SelectTrigger className="p-2 h-8 text-sm bg-primary w-28">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent className="text-sm bg-background w-28">
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>)
            :
                <Skeleton className="w-28 h-8 border" />
            }
        </>
    )
}