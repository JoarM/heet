"use client"

import { cn } from "@/lib/utils";
import { Newspaper, MapPin, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
    const pathname = usePathname()

    return (
        <div className="flex items-center justify-evenly flex-wrap m-5">
            <Link href={"/news"}>
                <Newspaper className={cn("size-7 transition-colors", pathname === "/news" && "text-primary")} />
                <span className="sr-only">News</span>
            </Link>
            <Link href={"/"}>
                <MapPin className={cn("size-7 transition-colors", pathname === "/" && "text-primary")} />
                <span className="sr-only">Home</span>
            </Link>
            <Link href={"/account"}>
                <UserRound className={cn("size-7 transition-colors", pathname === "/account" && "text-primary")}/>
                <span className="sr-only">Account</span>
            </Link>
        </div>
    )
}