"use client";

import { useEffect, useState } from "react";
import { createWebSocket } from "~/utils/ws";

export interface Video {
  type: "video";
  fileId: string;
  fileName: string;
  position: string;
  size: string;
  fileUrl: string;
  isFullscreen: boolean;
  isRandom: boolean;
}

export interface Audio {
  type: "audio";
  fileId: string;
  fileName: string;
  fileUrl: string;
}

export type Trigger = Video | Audio;

interface Props {
  userId: string;
  videos: Video[];
  audios: Audio[];
}

export default function Deck(props: Readonly<Props>) {
  const triggers = [...props.audios, ...props.videos];
  const [socket] = useState(() => createWebSocket(props.userId));

  useEffect(() => {
    if (!socket.connected) socket.connect();

    return () => {
      socket.close();
    };
  }, [socket]);

  function handleSendAlert(trigger: Trigger) {
    return () => {
      if (!socket.connected) return;
      socket.emit("send-display", { trigger });
    };
  }

  return (
    <main className="grid h-screen grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 p-4">
      {triggers.length > 0 ? (
        triggers.map((trigger) => (
          <button
            key={trigger.fileId}
            onClick={handleSendAlert(trigger)}
            className="rounded bg-blue-500 p-4"
          >
            {trigger.fileName}
          </button>
        ))
      ) : (
        <p className="place-self-center text-4xl font-semibold tracking-tight text-neutral-500">
          There is no triggers :(
        </p>
      )}
    </main>
  );
}
