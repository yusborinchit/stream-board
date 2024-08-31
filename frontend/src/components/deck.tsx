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
  const deckSize = Math.ceil(triggers.length / 2);

  const [socket] = useState(() => createWebSocket(props.userId));

  const css = {
    "--deck-size": `${deckSize}`,
  } as React.CSSProperties;

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
    <main
      style={css}
      className="grid h-screen grid-cols-[repeat(var(--deck-size),1fr)] grid-rows-[repeat(var(--deck-size),1fr)] gap-4 p-4"
    >
      {triggers.length > 0 &&
        triggers.map((trigger) => (
          <button
            key={trigger.fileId}
            onClick={handleSendAlert(trigger)}
            data-type={trigger.type}
            className="rounded p-4 shadow data-[type=audio]:bg-purple-600 data-[type=video]:bg-blue-600"
          >
            {trigger.fileName}
          </button>
        ))}
    </main>
  );
}
