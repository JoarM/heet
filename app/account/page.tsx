import { UserRound, Settings, Cookie, LockKeyhole, PartyPopper, Star} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default async function AccountPage() {
    return (
        <div className="p-3">
            <header className="text-2xl font-bold">Konto</header>
            <div className="mt-4">
                <UserRound className="size-20 p-3 bg-secondary rounded-md inline-block"/>
                <div className="inline-block mx-5">
                    <header className="w-full text-2xl">Felix Johansson</header>
                    <p className="text-muted-foreground">@feluxfelixus</p>
                </div>
                <Separator className="my-4"/>
                <div className="my-3">
                    <Link href="/account-settings" className="block text-xl"><Settings className="inline m-2"/>Konto Inställningar</Link>
                    <Link href="" className="block text-xl"><Cookie className="inline m-2"/>Integritets Inställningar</Link>
                    <Link href="" className="block text-xl"><LockKeyhole className="inline m-2"/>Konto Säkerhet</Link>
                    <Link href="" className="block text-xl"><PartyPopper className="inline m-2"/>Mina Event</Link>
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