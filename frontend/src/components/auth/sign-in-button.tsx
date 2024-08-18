"use client";

import { Twitch } from "lucide-react";
import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <button
      onClick={() => signIn("twitch", { callbackUrl: "/" })}
      className="mt-4 flex w-full items-center gap-2 rounded bg-purple-600 px-4 py-2.5 font-semibold text-neutral-50"
    >
      <Twitch className="size-5" />
      <span>Sign In with Twitch</span>
    </button>
  );
}
