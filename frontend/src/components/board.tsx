"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

interface Props {
  userId: string;
}

export default function Board(props: Readonly<Props>) {
  const [socket] = useState(() =>
    io("ws://localhost:8080", {
      query: { id: props.userId },
      autoConnect: false,
    }),
  );

  useEffect(() => {
    if (!socket.connected) socket.connect();

    function handleAlert(data: { message: string }) {
      alert(data.message);
    }

    socket.on("display", handleAlert);

    return () => {
      socket.close();
      socket.off("display", handleAlert);
    };
  }, [socket]);

  return (
    <main className="grid h-screen place-items-center">
      <h1>
        <span className="text-neutral-500">Board for</span>{" "}
        <span className="font-bold">{props.userId}</span>
      </h1>
    </main>
  );
}
