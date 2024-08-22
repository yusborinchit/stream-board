"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="flex w-full items-center gap-2 rounded bg-gradient-to-t from-neutral-800 to-neutral-600 px-4 py-2.5 font-semibold"
    >
      <LogOut className="size-5" />
      <span>Sign Out</span>
    </button>
  );
}
