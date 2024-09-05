"use client";

import { LoaderCircle, Twitch } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn() {
    setIsLoading(true);
    await signIn("twitch", { callbackUrl: "/profile" });
    setIsLoading(false);
  }

  return (
    <button
      onClick={handleSignIn}
      disabled={isLoading}
      className="mt-4 flex w-full items-center gap-2 rounded bg-gradient-to-t from-purple-800 to-purple-500 px-4 py-2.5 font-semibold text-neutral-50 hover:shadow-lg hover:shadow-purple-600/30 disabled:opacity-50"
    >
      {isLoading ? (
        <>
          <LoaderCircle className="size-5 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          <Twitch className="size-5" />
          <span>Sign In with Twitch</span>
        </>
      )}
    </button>
  );
}
