"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { LoadingButton } from "@/components/ui/loading-button";
import { useFormState } from "react-dom";
import { Login } from "@/actions/user";

export default function LoginForm() {
    const [form, loginAction] = useFormState(Login, null)

    return (
        <form action={loginAction} className="mx-auto sm:px-4 px-4 rounded-2xl  max-w-lg pt-3">
            <h1 className="font-bold text-2xl">Inloggning</h1>
            <div className="my-12">
                <Label className="mt-4 block" htmlFor="username">Användarnamn</Label>
                <Input className="mt-2 h-9 w-full" id="username" name="username" />
                {form?.error?.username && <span className="text-sm font-medium text-destructive mt-2 block">{form.error.username}</span>}

                <Label className="mt-4 block" htmlFor="password">Lösenord</Label>
                <Input className="mt-2 w-full h-9" type="password" id="password" name="password" />
                {form?.error?.password && <span className="text-sm font-medium text-destructive mt-2 block">{form.error.password}</span>}
                <LoadingButton className="mt-6 w-full h-9">Logga in</LoadingButton>

                {form?.message && <span className="text-sm font-medium text-destructive mt-2 block">{form.message}</span>}

                <Link href="/register" className="font-medium mt-3 text-sm underline-offset-4 hover:underline block">Skapa konto</Link>
                <Link href="/reset-password" className="font-medium mt-3 text-sm underline-offset-4 hover:underline block">Glömt lösenord?</Link>
            </div>
        </form>
    )
}