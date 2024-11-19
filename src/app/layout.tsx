import type { Metadata } from "next";
import "@/styles/globals.css";
import { ContextProviders } from "@/components/context-providers";
import Sidenav from "@/components/layout/sidenav";
import { Toaster } from "@/components/ui/sonner";
import appConfig from "@/app.config";
import ServerMessage from "@/components/server-message";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    default: appConfig.title,
    template: `%s - ${appConfig.title}`,
  },
  description: appConfig.description,
  icons: appConfig.icons,
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <ContextProviders
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Sidenav />
          {children}
          <Toaster />
          <Suspense>
            <ServerMessage />
          </Suspense>
        </ContextProviders>
      </body>
    </html >
  );
}
