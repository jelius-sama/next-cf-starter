import type { Metadata } from "next";
import "@/styles/globals.css";
import { ContextProviders } from "@/components/context-providers";
import Sidenav from "@/components/layout/sidenav";
import { Toaster } from "@/components/ui/sonner";
import appConfig from "@/app.config";

export const metadata: Metadata = {
  title: {
    default: appConfig.title,
    template: `%s - ${appConfig.title}`,
  },
  description: appConfig.description,
  icons: appConfig.icons,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
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
        </ContextProviders>
      </body>
    </html >
  );
}
