import { cn } from "@/lib/utils";
import "../globals.css";
import { Inter as FontSans } from "next/font/google";
import { Card, CardContent } from '@/components/ui/card';

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
            <div>
                <h1>Filter</h1>
            </div>
            <Card className="">
                <CardContent className="p-6">
                    <div className="flex gap-12">
                        <img className="ml-2" src="" alt="PING"></img>
                        <h2>UtFörsäljning</h2>
                    </div>
                    <div className="ml-24">
                        <h1>2024</h1>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}