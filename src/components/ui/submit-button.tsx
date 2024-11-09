"use client";

import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type Props = ComponentProps<typeof Button> & {
    pendingText?: string;
};

export function SubmitButton({ children, pendingText, ...props }: Props) {
    const { pending } = useFormStatus();

    return (
        <Button
            aria-disabled={pending}
            disabled={pending}
            type="submit"
            {...props}
        >
            {pending && (
                <Spinner size="small" />
            )}
            {pending && pendingText ? pendingText : children}
        </Button>
    );
}
