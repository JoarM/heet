import Link from "next/link";
import { Label } from "@/components/ui/label";

export default async function AccountPage() {
    return (
        <div className="p-3">
            <header className="text-2xl font-bold">
            <Link href={"/account"} className="hover:underline underline-offset-4"> 
                Konto</Link> {">"} integritet
            </header>

            <div className="mt-8">
                <Label className="text-xl w-max inline font-bold">Kakor</Label>
                <header className="w-full mb-8 text-muted-foreground">Hantera hur vi använder kakor. </header>

                <Label className="text-xl w-max inline font-bold">Platsinformation</Label>
                <header className="w-full mb-8 text-muted-foreground">Hantera den platsinformation som vi använder</header>
            </div>
        </div>
    )
}