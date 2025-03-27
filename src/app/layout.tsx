import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthProvider";
import { InstallPWAButton } from "@/components/installPWAButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Financerto",
  description: "Aplicativo de controle financeiro pessoal",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["finanças", "controle financeiro", "pwa", "next.js"],
  themeColor: "#ffffff",
  authors: [{ name: "Seu Nome" }],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  icons: [
    { rel: "apple-touch-icon", url: "/icons/icon-192x192.png" },
    { rel: "icon", url: "/favicon.ico" },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Financerto",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <meta name="application-name" content="Financerto" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Financerto" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />
        
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <AuthContextProvider>
          <main className="w-full flex flex-col items-center">
            {children}
            <InstallPWAButton />
          </main>
        </AuthContextProvider>
      </body>
    </html>
  );
}