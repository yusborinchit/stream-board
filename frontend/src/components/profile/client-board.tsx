"use client";

import { useEffect, useState } from "react";
import { createWebSocket } from "~/utils/ws";
import { type Trigger } from "./client-deck";
import TriggerDisplay from "./trigger-display/trigger-display";

export type TriggerWithId = Trigger & { id: string };

interface Props {
  userId: string;
}

export default function ClientBoard(props: Readonly<Props>) {
  const [triggers, setTriggers] = useState<TriggerWithId[]>([]);
  const [socket] = useState(() => createWebSocket(props.userId));

  function handleAlert({ trigger }: { trigger: Trigger }) {
    setTriggers((prev) => [...prev, { ...trigger, id: crypto.randomUUID() }]);
  }

  useEffect(() => {
    if (!socket.connected) socket.connect();

    socket.on("display", handleAlert);

    return () => {
      socket.close();
      socket.off("display", handleAlert);
    };
  }, [socket]);

  function handleVideoEnded(triggerId: string) {
    return () => setTriggers((p) => p.filter((t) => t.fileId !== triggerId));
  }

  return (
    <main className="relative grid h-screen place-items-center overflow-hidden bg-transparent">
      <style>{`body { background-color: transparent !important; }`}</style>
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
