"use client"

import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./button";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps extends ButtonProps {
    loading: boolean
}

export function LoadingButton({
    loading,
    className,
    children,
    ...props
}: LoadingButtonProps) {
    const { pending } = useFormStatus()

    return (
        <Button
        disabled={loading || pending}
        className={className}
        {...props}
        >
            {loading || pending && (
                <Loader2 
                className="mr-2 size-4 animate-spin"
                />
            )}
            {children}
        </Button>
    )
}