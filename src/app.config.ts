import { Metadata } from "next";

export default {
    title: "Acme",
    description: "Describe the app function and usage.",
    icons: {
        icon: "/assets/favicon.ico",
    }
} satisfies Metadata;

export const cssVars = {
    headerPx: 40,
    marginPx: 8,
    navHeaderPx: 44,
    navItemsMarginPx: 16
} as const;