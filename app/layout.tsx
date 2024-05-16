import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { MapPin, Newspaper, UserRound } from "lucide-react";

import { cn } from "@/lib/utils"
import Link from "next/link";
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased grid place-items-center",
          fontSans.variable
        )}>
          <div className="max-w-md w-full mx-auto border border-border shadow-xl rounded-2xl h-svh overflow-y-auto relative max-h-[840px]">
            {children}
            <nav className="bg-background rounded-t-md overflow-hidden absolute bottom-0 left-0 right-0 h-">
              <div className="flex items-center justify-evenly flex-wrap m-5">
                <Link href={"/news"}><Newspaper className="size-7" /></Link>
                <Link href={"/"}><MapPin className="size-7" /></Link>
                <Link href={""}><UserRound className="size-7"/></Link>
              </div>
            </nav>
          </div>
        </body>
    </html>
  );
}
