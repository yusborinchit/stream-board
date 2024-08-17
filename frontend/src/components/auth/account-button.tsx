"use client";

import { type User } from "next-auth";
import { signIn, signOut } from "next-auth/react";

interface Props {
  user: User | null;
}

export default function AccountButton(props: Readonly<Props>) {
  return props.user ? (
    <button
      onClick={() => signOut()}
      className="rounded-md bg-neutral-50 px-4 py-2.5 text-neutral-950"
    >
      Sign Out
    </button>
  ) : (
    <button
      onClick={() => signIn("twitch")}
      className="rounded-md bg-neutral-50 px-4 py-2.5 text-neutral-950"
    >
      Sign In
    </button>
  );
}
