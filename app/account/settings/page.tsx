import { UserRound, Settings, Cookie, LockKeyhole, PartyPopper, Star} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Label } from "@/components/ui/label";

export default async function AccountPage() {
    return (
        <div className="p-3">
            <header className="text-2xl font-bold">
            <Link href={"/account"} className="hover:underline underline-offset-4"> 
                Konto</Link> {">"} Kontoinställningar
                </header>
            <div className="mt-8">
                <Label className="text-xl w-max inline font-bold">Användarnamn</Label>
                <header className="w-full mb-8 text-muted-foreground">@feluxfelixus</header>

                <Label className="text-xl w-max inline font-bold">Visningsnamn</Label>
                <header className="w-full mb-8 text-muted-foreground">Felix Johansson</header>

                <Label className="text-xl w-max inline font-bold">Telefonnummer</Label>
                <header className="w-full mb-8 text-muted-foreground">+46 72-505 05 31</header>

                <Label className="text-xl w-max inline font-bold">E-mailadress</Label>
                <header className="w-full mb-8 text-muted-foreground">feluxfelixus@gmail.com</header>

                <Label className="text-xl w-max inline font-bold">Land</Label>
                <header className="w-full mb-8 text-muted-foreground">Sverige</header>
                
            </div>
        </div>
    )
}