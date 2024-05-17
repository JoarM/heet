import { UserRound, Settings, Cookie, LockKeyhole, PartyPopper, Star} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { validateRequest } from "@/data/user";
import { redirect } from "next/navigation";
import { logout } from "@/actions/user";
import { LoadingButton } from "@/components/ui/loading-button";

export default async function AccountPage() {
    const { user } = await validateRequest()

    if (!user) {
        redirect("/login")
    }

    return (
        <div className="p-3">
            <header className="text-2xl font-bold">Konto</header>
            <div className="mt-4">
                <div className="flex gap-2 items-center">
                    <span className="bg-secondary size-16 rounded-lg inline-flex items-center justify-center">
                        <UserRound className="size-8"/>
                    </span>
                    <div>
                        <header className="text-lg">{user.displayName}</header>
                        <p className="text-muted-foreground text-sm font-medium">@{user.username}</p>
                    </div>
                </div>
                
                <Separator className="my-4"/>
                <div className="my-3">
                    <Link href="/account/settings" className="text-lg px-3 py-2 hover:bg-secondary hover:text-secondary-foreground transition-colors rounded-lg inline-flex items-center w-full"><Settings className="size-4 mr-2"/>Kontoinställningar</Link>
                    <Link href="/account/privacy" className="text-lg px-3 py-2 hover:bg-secondary hover:text-secondary-foreground transition-colors rounded-lg inline-flex items-center w-full"><Cookie className="size-4 mr-2"/>Integritetsinställningar</Link>
                    <Link href="" className="text-lg px-3 py-2 hover:bg-secondary hover:text-secondary-foreground transition-colors rounded-lg inline-flex items-center w-full"><LockKeyhole className="size-4 mr-2"/>Kontots Säkerhet</Link>
                    <Link href="" className="text-lg px-3 py-2 hover:bg-secondary hover:text-secondary-foreground transition-colors rounded-lg inline-flex items-center w-full"><PartyPopper className="size-4 mr-2"/>Mina Event</Link>
                    <form action={logout}>
                        <LoadingButton
                        variant="destructive"
                        className="w-full"
                        >
                            Logout
                        </LoadingButton>
                    </form>
                </div>
                <Separator className="my-4"/>
                <div className="flex">
                    <p className="text-xl w-max inline">Omdömmen</p>
                    <div className="ml-auto flex w-max"><Star className="fill-white"/><Star className="fill-white"/><Star className="fill-white"/><Star className="fill-white"/><Star/></div>
                </div>
                <div className="">
                    <div className="my-3">
                        <div className="flex">
                            <UserRound className="size-12 p-2 bg-secondary rounded-full mt-2"/>
                            <p className="text-foreground m-4 text-2xl">Felix Johansson</p>
                            <p className="text-foreground ml-auto my-auto text-xl">4/5</p>
                        </div>
                        <div className="mt-2">
                            <p className="w-max float-left font text-xl font-bold">Nice Fest</p>
                            <p className="ml-auto w-max text-muted-foreground">3 veckor sedan</p>
                            <p className="mt-3 w-full text-base">Trevlig fest hittade min familj</p>
                        </div>
                    </div>
                    <div className="my-3">
                        <div className="flex">
                            <UserRound className="size-12 p-2 bg-secondary rounded-full mt-2"/>
                            <p className="text-foreground m-4 text-2xl">Felix Johansson</p>
                            <p className="text-foreground ml-auto my-auto text-xl">4/5</p>
                        </div>
                        <div className="mt-2">
                            <p className="w-max float-left font text-xl font-bold">Nice Fest</p>
                            <p className="ml-auto w-max text-muted-foreground">3 veckor sedan</p>
                            <p className="mt-3 w-full text-base">Trevlig fest hittade min familj</p>
                        </div>
                    </div>

                    <div className="my-3">
                        <div className="flex">
                            <UserRound className="size-12 p-2 bg-secondary rounded-full mt-2"/>
                            <p className="text-foreground m-4 text-2xl">Felix Johansson</p>
                            <p className="text-foreground ml-auto my-auto text-xl">4/5</p>
                        </div>
                        <div className="mt-2">
                            <p className="w-max float-left font text-xl font-bold">Nice Fest</p>
                            <p className="ml-auto w-max text-muted-foreground">3 veckor sedan</p>
                            <p className="mt-3 w-full text-base">Trevlig fest hittade min familj</p>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}