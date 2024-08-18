"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

interface Props {
  userId: string;
  videos: {
    fileId: string;
    fileName: string;
    fileUrl: string;
    isFullscreen: boolean;
    isRandom: boolean;
  }[];
  audios: {
    fileId: string;
    fileName: string;
    fileUrl: string;
  }[];
}

export default function Deck(props: Readonly<Props>) {
  const [socket] = useState(() =>
    io("ws://localhost:8080", {
      query: { id: props.userId },
      autoConnect: false,
    }),
  );

  useEffect(() => {
    if (!socket.connected) socket.connect();
    return () => {
      socket.close();
    };
  }, [socket]);

  function handleSendAlert(name: string) {
    return () => {
      if (!socket.connected) return;
      socket.emit("send-display", { message: `hello ${name}` });
    };
  }

  return (
    <main className="grid h-screen grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 p-4">
      {props.videos.map((video) => (
        <button
          key={video.fileId}
          onClick={handleSendAlert(video.fileName)}
          className="rounded bg-blue-500 p-4"
        >
          {video.fileName}
        </button>
      ))}
    </main>
  );
}
