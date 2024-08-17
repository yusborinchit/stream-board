"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Board() {
  const [socket] = useState(() =>
    io("ws://localhost:8080", { autoConnect: false }),
  );

  useEffect(() => {
    if (!socket.connected) socket.connect();

    const onConnect = () => console.log("connected");
    const onDisconnect = () => console.log("disconnected");
    const onPong = () => console.log("pong");

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.close();
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("pong", onPong);
    };
  }, [socket]);

  return (
    <button
      onClick={() => socket.emit("ping")}
      className="rounded-md bg-blue-500 px-4 py-2.5 text-neutral-50"
    >
      Ping WS
    </button>
  );
}
