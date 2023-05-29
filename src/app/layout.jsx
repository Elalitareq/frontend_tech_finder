"use client";
import Header from "./components/Header";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider refetchOnWindowFocus={false}>
          <Header />
          <main className="pt-32  mx-8  " >
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
