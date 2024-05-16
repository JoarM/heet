"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { LoadingButton } from "@/components/ui/loading-button";

export default function LoginForm() {

    
    return (
        <form className="mx-auto sm:px-4 px-4 rounded-2xl  max-w-lg mt-3">
            <h1 className="font-bold text-2xl mb-20">Inloggning</h1>
            <div className="my-auto">
                <Label className="mt-4 block" htmlFor="mail">Användarnamn</Label>
                <Input className="mt-2 h-9 w-full" id="mail" name="mail" />
                {/* {form?.error?.email && <span className="text-sm font-medium text-destructive mt-2 block">{form.error.email}</span>} */}

                <Label className="mt-4 block" htmlFor="password">Lösenord</Label>
                <Input className="mt-2 w-full h-9" type="password" id="password" name="password" />
                {/* {form?.error?.password && <span className="text-sm font-medium text-destructive mt-2 block">{form.error.password}</span>} */}
                
                <LoadingButton className="mt-6 w-full h-9">Logga in</LoadingButton>

                {/* {form?.message && <span className="text-sm font-medium text-destructive mt-2 block">{form.message}</span>} */}

                <Link href="/reset-password" className="font-medium mt-3 text-sm text-primary underline-offset-4 hover:underline block">Glömt lösenord?</Link>
            </div>
        </form>
    )
}