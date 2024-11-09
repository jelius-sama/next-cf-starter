"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

export interface ContextProvidersProps extends ThemeProviderProps {
}

export function ContextProviders({ children, ...props }: ContextProvidersProps) {

    return (
        <NextThemesProvider {...props}>
            {children}
        </NextThemesProvider>
    );
}
