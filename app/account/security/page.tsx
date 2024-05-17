import { sendEmailConfirmation } from "@/actions/user";
import { Label } from "@/components/ui/label";
import { validateRequest } from "@/data/user";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
    const { user } = await validateRequest()

    if (!user) {
        redirect("/login")
    }

    return (
        <div className="py-3">
            <header className="text-lg font-bold px-4">
            <Link href={"/account"} className="hover:underline underline-offset-4"> 
                Konto</Link> {">"} Kontoinställningar
                </header>
            <div className="mt-8">
                <Link href="" className="px-4 py-3 hover:bg-secondary/50 transition-colors block">
                    <span className="text-sm font-medium block">Byt lösenord</span>
                    <span className="text-xs font-medium text-muted-foreground block mt-1">Byt ditt lösenord</span>
                </Link>
                
                <form action={sendEmailConfirmation}>
                    <button className="px-4 py-3 hover:bg-secondary/50 transition-colors block w-full text-start" type={!user.setupTwoFactor ? "button" : "submit"}>
                        <span className="text-sm font-medium block">Två stegs-verifikation</span>
                        <span className="text-xs font-medium text-muted-foreground block mt-1">{!user.setupTwoFactor ? "Du har två stegs-verifikation aktiverat" : "Lägg till två stegs-verifering för extra skydd"}</span>
                    </button>
                </form>

                <Link href="" className="px-4 py-3 hover:bg-secondary/50 transition-colors block">
                    <span className="text-sm font-medium block">Byt e-post</span>
                    <span className="text-xs font-medium text-muted-foreground block mt-1">Byt e-post adress för detta konto</span>
                </Link>

                <Link href="" className="px-4 py-3 hover:bg-secondary/50 transition-colors block">
                    <span className="text-sm font-medium block">App sessioner</span>
                    <span className="text-xs font-medium text-muted-foreground block mt-1">Hantera inloggade konton</span>
                </Link>
            </div>
        </div>
    )
}