"use client";

import { Copy, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface Props {
  boardId: string;
}

const isBrowser = () => typeof window !== "undefined";

export default function BoardLink(props: Readonly<Props>) {
  const [isHidden, setIsHidden] = useState(true);

  const url = isBrowser()
    ? `${window?.location.origin ?? "localhost:3000"}/board/${props.boardId}`
    : "LOADING...";

  const hiddenUrl = url
    .split("")
    .map(() => "*")
    .join("");

  return (
    <div className="flex gap-3">
      <div className="relative flex flex-1 overflow-hidden rounded border border-neutral-800 bg-neutral-900/80 text-neutral-500 backdrop-blur-sm">
        <input
          type="text"
          readOnly
          value={isHidden ? hiddenUrl : url}
          className="flex-1 border-none bg-transparent font-mono"
        />
        <button
          aria-label={isHidden ? "Show" : "Hide"}
          onClick={() => setIsHidden((prev) => !prev)}
          className="absolute right-0 top-0 h-full px-2 transition-colors hover:text-neutral-400"
        >
          {isHidden ? (
            <Eye className="size-5" />
          ) : (
            <EyeOff className="size-5" />
          )}
        </button>
      </div>
      <button
        aria-label="Copy to clipboard"
        onClick={() => navigator.clipboard.writeText(url)}
        className="grid transform place-items-center text-neutral-500 transition-colors hover:text-neutral-400"
      >
        <Copy className="size-5" />
      </button>
    </div>
  );
}
