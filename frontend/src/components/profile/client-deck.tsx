"use client";

import { useEffect, useState } from "react";
import { createWebSocket } from "~/utils/ws";

export interface File {
  fileId: string;
  fileName: string;
  fileUrl: string;
  color: string;
}

export interface Video extends File {
  type: "video";
  position: string;
  size: string;
  isFullscreen: boolean;
  isRandom: boolean;
}

export interface Audio extends File {
  type: "audio";
}

export type Trigger = Video | Audio;

interface Props {
  userId: string;
  videos: Video[];
  audios: Audio[];
}

export default function ClientDeck(props: Readonly<Props>) {
  const [socket] = useState(() => createWebSocket(props.userId));

  const triggers = [...props.videos, ...props.audios];
  const size = Math.round(triggers.length / 2);

  const css = {
    "--cols": `${size}`,
    "--rows": `${size}`,
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
      className="grid h-screen grid-cols-[max(repeat(var(--cols),1),1fr)] grid-rows-[repeat(max(var(--rows),2),1fr)] gap-4 p-4"
    >
      {triggers.length > 0 &&
        triggers.map((trigger) => (
          <button
            key={trigger.fileId}
            onClick={handleSendAlert(trigger)}
            style={{ "--color": trigger.color } as React.CSSProperties}
            className="break-all rounded bg-[var(--color)] p-4 shadow-xl"
          >
            {trigger.fileName}
          </button>
        ))}
    </main>
  );
}
