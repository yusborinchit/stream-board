import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Inconsolata } from "next/font/google";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Stream Board | Enhance your Stream with us",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const MonoFont = Inconsolata({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mono",
});

interface Props {
  children: React.ReactNode;
}

export default function RootLayout(props: Readonly<Props>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${MonoFont.variable}`}>
      <body className="overflow-x-hidden bg-neutral-950 font-sans text-neutral-50">
        {props.children}
        <Toaster />
      </body>
    </html>
  );
}
