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
    <div className="grid h-screen place-items-center">
      <h1>Board for {props.userId}</h1>
    </div>
  );
}
