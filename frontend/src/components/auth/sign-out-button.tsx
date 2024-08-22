"use client";

import { LoaderCircle, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignOut() {
    setIsLoading(true);
    await signOut();
    setIsLoading(false);
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={isLoading}
      className="flex w-full items-center gap-2 rounded bg-gradient-to-t from-neutral-800 to-neutral-600 px-4 py-2.5 font-semibold disabled:opacity-50"
    >
      {isLoading ? (
        <>
          <LoaderCircle className="size-5 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          <LogOut className="size-5" />
          <span>Sign Out</span>
        </>
      )}
    </button>
  );
}
