"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";
import { useAtom } from "jotai";
import { mobileAtom, User, userAtom } from "@/components/atoms";
import { Spinner } from "@/components/ui/spinner";
import Image from "next/image";
import { UserMetadata } from "@/types";
import { createBrowserClient } from "@/server/supabase/client";
import { TooltipProvider } from "@/components/ui/tooltip";
import useDeviceType from "@/hooks/useDeviceType";

export interface ContextProvidersProps extends ThemeProviderProps {
}

export function ContextProviders({ children, ...props }: ContextProvidersProps) {
    const [userState, setUserState] = useAtom(userAtom);
    const supabase = createBrowserClient();
    const [user, setUser] = React.useState<User | null>(null);
    const { isMobile } = useDeviceType();
    const [mobile, setMobile] = useAtom(mobileAtom);

    React.useEffect(() => {
        setMobile(isMobile);
    }, [isMobile]);

    React.useEffect(() => {
        (async () => {
            setUser((await supabase.auth.getUser()).data.user as User | null);
        })();
    }, [supabase.auth]);

    React.useEffect(() => {
        if (!user) {
            setUserState({ user: null });
            return;
        }

        setUserState({
            user: {
                ...user,
                user_metadata: user.user_metadata as UserMetadata,
            },
        });
    }, [user, setUserState]);

    return (
        <NextThemesProvider {...props}>
            <TooltipProvider>
                {(userState.user === undefined) && (mobile !== undefined) ? (
                    <section className="w-screen h-screen flex flex-col items-center gap-y-4 justify-center">
                        <Image src={'/assets/favicon.ico'} alt="icon" height={100} width={100} className="size-16 animate-deep-pulse" />
                        <Spinner size={'large'} />
                    </section>
                ) : children}
            </TooltipProvider>
        </NextThemesProvider>
    );
}
