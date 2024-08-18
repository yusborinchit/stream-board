"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

interface Props {
  id: string;
}

export default function ButtonDeck(props: Readonly<Props>) {
  const [socket] = useState(() =>
    io("ws://localhost:8080", {
      query: { id: props.id },
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
    <>
      <button
        onClick={handleSendAlert("John")}
        className="rounded-md bg-blue-500 px-4 py-2.5 text-neutral-50"
      >
        Send Alert for John
      </button>
      <button
        onClick={handleSendAlert("Camila")}
        className="rounded-md bg-blue-500 px-4 py-2.5 text-neutral-50"
      >
        Send Alert for Camila
      </button>
      <button
        onClick={handleSendAlert("Santiago")}
        className="rounded-md bg-blue-500 px-4 py-2.5 text-neutral-50"
      >
        Send Alert for Santiago
      </button>
    </>
  );
}
