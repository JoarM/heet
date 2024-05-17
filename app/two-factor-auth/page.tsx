"use client"

import { addTwoFactorAuth, verifyTwoFactorAuth } from "@/actions/user"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import { LoadingButton } from "@/components/ui/loading-button"
import { useRef } from "react"
import { useFormState } from "react-dom"

export default function Page() {
    const formRef = useRef<HTMLFormElement>(null)
    const [form, confirmTwoFactorAction] = useFormState(verifyTwoFactorAuth, null)

    return (
        <main className="h-full grid place-items-center">
            <Card className="w-[calc(100%-32px)] bg-background">
                <CardHeader>
                    <CardTitle>Fyll i två-stegs verifierings kod</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={confirmTwoFactorAction} ref={formRef} className="flex flex-col items-center">
                        <InputOTP 
                        maxLength={6}
                        onComplete={() => {
                            formRef.current?.requestSubmit()
                        }}
                        name="code"
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        <LoadingButton className="mt-2 w-full">Confirm</LoadingButton>
                        {form?.message && (<span className="mt-2 block text-sm font-medium text-destructive self-start">{form.message}</span>)}
                    </form>
                </CardContent>
            </Card>
        </main>
    )
}