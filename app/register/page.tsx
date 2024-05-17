"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { LoadingButton } from "@/components/ui/loading-button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormState } from "react-dom";
import { RegisterAccount } from "@/actions/user";

export default function RegisterPage() {
    const [form, registerAction] = useFormState(RegisterAccount, null)

    return (
        <form action={registerAction} className="mx-auto sm:px-4 px-4 rounded-2xl max-w-lg pt-3 pb-10">
            <h1 className="font-bold text-2xl">Registrering</h1>
            <div className="my-12">
                <Label className="mt-4 block" htmlFor="username">Användarnamn</Label>
                <Input className="mt-2 h-9 w-full" id="username" name="username" />
                {form?.error?.username && <span className="text-sm font-medium text-destructive mt-2 block">{form.error.username}</span>}
                {form?.username && <span className="text-sm font-medium text-destructive mt-2 block">{form.username}</span>}

                <Label className="mt-4 block" htmlFor="displayName">Visningsnamn</Label>
                <Input className="mt-2 h-9 w-full" id="displayName" name="displayName" />
                {form?.error?.displayName && <span className="text-sm font-medium text-destructive mt-2 block">{form.error.displayName}</span>}


                <Label className="mt-4 block" htmlFor="mail">E-mailadress</Label>
                <Input className="mt-2 h-9 w-full" id="mail" name="mail" />
                {form?.error?.email && <span className="text-sm font-medium text-destructive mt-2 block">{form.error.email}</span>}

                <Label className="mt-4 block" htmlFor="password">Lösenord</Label>
                <Input className="mt-2 w-full h-9" type="password" id="password" name="password" />
                {form?.error?.password && <span className="text-sm font-medium text-destructive mt-2 block">{form.error.password}</span>}

                <Label className="mt-4 block" htmlFor="confirmpassword">Bekräfta lösenord</Label>
                <Input className="mt-2 w-full h-9" type="password" id="confirmpassword" name="confirmpassword" />
                {form?.confirmPassword && <span className="text-sm font-medium text-destructive mt-2 block">{form.confirmPassword}</span>}

                <Label className="mt-4 block" htmlFor="password">Land</Label>

                <Select name="country">
                    <SelectTrigger className="mt-2 w-full h-9">
                        <SelectValue placeholder="Land" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="sweden">Sverige</SelectItem>
                        <SelectItem value="england">England</SelectItem>
                        <SelectItem value="usa">USA</SelectItem>
                        <SelectItem value="germany">Tyskland</SelectItem>
                        <SelectItem value="poland">Polen</SelectItem>
                        <SelectItem value="russia">Ryssland</SelectItem>
                        <SelectItem value="france">Frankrike</SelectItem>
                        <SelectItem value="italy">Italien</SelectItem>
                        <SelectItem value="spain">Spanien</SelectItem>
                        <SelectItem value="australia">Australien</SelectItem>
                    </SelectContent>
                </Select>
                {form?.error?.country && <span className="text-sm font-medium text-destructive mt-2 block">{form.error.country}</span>}
                
                <LoadingButton className="mt-6 w-full h-9">Registrera</LoadingButton>

                {form?.message && <span className="text-sm font-medium text-destructive mt-2 block">{form.message}</span>}

                <p className="font-medium mt-3 text-sm underline-offset-4 ">Redan konto?</p>
                <Link href="/login" className="font-medium mt-3 text-sm text-primary underline-offset-4 hover:underline block">Logga in</Link>
            </div>
        </form>
    )
}