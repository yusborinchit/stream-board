"use client";

import { type User } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

interface Props {
  user: User;
}

export default function SignOutButton(props: Readonly<Props>) {
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
      aria-label="Sign Out"
      className="size-12 rounded-full disabled:opacity-50"
    >
      <Image
        src={props.user.image!}
        alt={`${props.user.name} avatar`}
        width={48}
        height={48}
        className="h-full w-full rounded-full object-cover"
      />
    </button>
  );
}
