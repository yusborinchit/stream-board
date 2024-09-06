import { io } from "socket.io-client";
import { env } from "~/env";

export function createWebSocket(userId: string) {
  return io(`${env.NEXT_PUBLIC_WS_URL}`, {
    query: { id: userId },
    autoConnect: false,
  });
}
