"use client"

import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./button";

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
        >
            
        </Button>
    )
}