import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "Stream Board | Enhance your Stream with us",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout(props: Readonly<Props>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="bg-neutral-950 text-neutral-50">{props.children}</body>
    </html>
  );
}
