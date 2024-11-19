import { Metadata } from "next";

export default {
    title: "Next CF Starter",
    description: "Get started with Next.js + Supabase + Cloudflare Pages quickly with this starter template.",
    icons: {
        icon: "/assets/icon.png",
        apple: "/assets/icon.png",
    }
} satisfies Metadata;

export const cssVars = {
    headerPx: 40,
    marginPx: 16,
    navHeaderPx: 44,
    navItemsMarginPx: 16
} as const;