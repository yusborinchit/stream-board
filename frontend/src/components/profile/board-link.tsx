"use client";

import { Copy, Eye, EyeOff, Info } from "lucide-react";
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
    <>
      <div className="flex flex-col gap-4 rounded border border-red-900/30 bg-red-950/60 p-4">
        <div className="flex items-center gap-2 text-red-600">
          <Info className="size-7" />
          <p className="font-semibold">
            Please don&apos;t share this link with anyone.
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="relative flex flex-1 overflow-hidden rounded border border-neutral-800 bg-neutral-900 text-neutral-500">
          <input
            type="text"
            readOnly
            value={isHidden ? hiddenUrl : url}
            className="flex-1 border-none bg-transparent font-mono text-sm"
          />
          <button
            aria-label={isHidden ? "Show" : "Hide"}
            onClick={() => setIsHidden((prev) => !prev)}
            className="absolute right-0 top-0 h-full bg-neutral-900 px-2 transition-colors hover:text-neutral-400"
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
    </>
  );
}
