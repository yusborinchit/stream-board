import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { type Metadata } from "next";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "../api/uploadthing/core";

export const metadata: Metadata = {
  title: "Stream Board | Profile",
};

interface Props {
  children: React.ReactNode;
}

export default function ProfileLayout(props: Readonly<Props>) {
  return (
    <>
      <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
      {props.children}
    </>
  );
}
