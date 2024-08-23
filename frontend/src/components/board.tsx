"use client";

import { useEffect, useState } from "react";
import { createWebSocket } from "~/utils/ws";
import { type Trigger } from "./deck";
import TriggerDisplay from "./trigger-display/trigger-display";

export type TriggerWithId = Trigger & { id: string };

interface Props {
  userId: string;
}

export default function Board(props: Readonly<Props>) {
  const [triggers, setTriggers] = useState<TriggerWithId[]>([]);
  const [socket] = useState(() => createWebSocket(props.userId));

  function handleAlert({ trigger }: { trigger: Trigger }) {
    setTriggers((prev) => [...prev, { ...trigger, id: crypto.randomUUID() }]);
  }

  function handleVideoEnded(triggerId: string) {
    return () => setTriggers((p) => p.filter((t) => t.fileId !== triggerId));
  }

  useEffect(() => {
    if (!socket.connected) socket.connect();

    socket.on("display", handleAlert);

    return () => {
      socket.close();
      socket.off("display", handleAlert);
    };
  }, [socket]);

  return (
    <main className="relative grid h-screen place-items-center overflow-hidden">
      {triggers.map((trigger) => (
        <TriggerDisplay
          key={trigger.id}
          onEnded={handleVideoEnded(trigger.id)}
          trigger={trigger}
        />
      ))}
    </main>
  );
}
