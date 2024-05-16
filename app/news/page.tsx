import { cn } from "@/lib/utils";
import "../globals.css";
import { Inter as FontSans } from "next/font/google";
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDown } from "lucide-react";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
  })

export default async function NewsPage() {
    return (
        <div className="p-3">
            <div>
                <h3>Nyheter</h3>
            </div>
            <div className="flex">
                <h1>Filter</h1>
                <ArrowDown className="size-4" />
            </div>
            <div> 
                <h1>Aktiva Event</h1>
                <div className={cn("grid grid-rows-[1fr] transition-all overflow-hidden duration-300",
                    "group-data-[profile-state='open']:invisible group-data-[profile-state='open']:grid-rows-[0fr] group-data-[profile-state='open']:opacity-0 ",
                    "group-data-[profile-transition='true']:visible")}
                >
                    <Card className="bg-secondary drop-shadow-[0_4px_4px_rgba(33,196,88,1)]">
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
                </div>
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