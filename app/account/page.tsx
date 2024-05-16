import { UserRound, Settings, Cookie, LockKeyhole, PartyPopper, Star} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default async function AccountPage() {
    return (
        <div className="p-3">
            <header className="text-2xl">Konto</header>
            <div className="mt-4">
                <UserRound className="size-20 bg-slate-700 rounded-md inline-block"/>
                <div className="inline-block max-w-10 mx-5">
                    <header>Name</header>
                    <p className="text-slate-800">display</p>
                </div>
                <Separator className="my-3"/>
                <div className="my-3">
                    <Link href="" className="block text-xl"><Settings className="inline m-2"/>Konto Inställningar</Link>
                    <Link href="" className="block text-xl"><Cookie className="inline m-2"/>Integritets Inställningar</Link>
                    <Link href="" className="block text-xl"><LockKeyhole className="inline m-2"/>Konto Säkerhet</Link>
                    <Link href="" className="block text-xl"><PartyPopper className="inline m-2"/>Mina Event</Link>
                </div>
                <Separator className="my-3"/>
                <div className="flex">
                    <p className="text-xl w-max inline">Omdömmen</p>
                    <div className="ml-auto flex w-max"><Star className="fill-black" /><Star className="fill-black"/><Star className="fill-black"/><Star className="fill-black"/><Star/></div>
                </div>
                    <div className="flex">
                        <UserRound className="size-12 bg-slate-700 rounded-full mt-2"/>
                        <p className="text-slate-800 m-4">John Doe</p>
                        <p className="text-slate-800 ml-auto my-auto text-xl">4/5</p>
                    </div>
                    <div>
                        <p className="w-max float-left font">Nice</p>
                        <p className="ml-auto w-max">Balls</p>
                        <p>Nice</p>
                    </div>
            </div>
        </div>
    )
}