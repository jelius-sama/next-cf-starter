"use client";

import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type Props = ComponentProps<typeof Button> & {
    pendingText?: string;
    loading?: boolean;
};

export function SubmitButton({ children, pendingText, variant = "default", loading = false, ...props }: Props) {
    const { pending } = useFormStatus();

    return (
        <Button
            aria-disabled={pending || loading}
            disabled={pending || loading}
            type="submit"
            variant={variant}
            {...props}
        >
            {(pending || loading) && (
                <Spinner className={variant === "default" ? "text-background" : variant === "secondary" ? "text-foreground" : "text-muted-foreground"} size="small" />
            )}
            {(pending || loading) && pendingText ? pendingText : children}
        </Button>
    );
}
