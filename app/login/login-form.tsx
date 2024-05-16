"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useFormState } from "react-dom";
import { LoadingButton } from "../ui/loading-button";
import { useState } from "react";

export default function LoginForm() {
    return (
        <form className="mx-auto sm:px-16 px-8 py-28 rounded-2xl border border-border max-w-lg mt-16">
            <h1 className="font-bold text-2xl">Login</h1>

            <Label className="mt-4 block" htmlFor="mail">Email</Label>
            <Input className="mt-2" id="mail" name="mail" />
            {/* {form?.error?.email && <span className="text-sm font-medium text-destructive mt-2 block">{form.error.email}</span>} */}

            <Label className="mt-4 block" htmlFor="password">Password</Label>
            <Input className="mt-2" type="password" id="password" name="password" />
            {/* {form?.error?.password && <span className="text-sm font-medium text-destructive mt-2 block">{form.error.password}</span>} */}
            
            <LoadingButton className="mt-6 w-full">Login</LoadingButton>

            {/* {form?.message && <span className="text-sm font-medium text-destructive mt-2 block">{form.message}</span>} */}

            <Link href="/reset-password" className="font-medium mt-3 text-sm text-primary underline-offset-4 hover:underline block">Forgot password?</Link>
        </form>
    )
}