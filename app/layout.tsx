import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { initializeApp } from "firebase/app";
import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import ForgotPasswordModal from "@/components/ForgotPasswordModal";
import { ToastContainer } from "react-toastify";
import AddPersonModal from "@/components/AddPersonModal";
import AppBar from "./AppBar";
import TransactionModal from "@/components/TransactionModal";
import { Suspense } from "react";

export const app = initializeApp(siteConfig.firebaseConfig);

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={clsx(fontSans.className)}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <AppBar />
          <main className="w-full h-full">{children}</main>
          <ForgotPasswordModal />
          <AddPersonModal />
          <ToastContainer />
          <Suspense fallback={<div>Loading...</div>}>
            <TransactionModal />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
