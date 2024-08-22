import { io } from "socket.io-client";

export function createWebSocket(userId: string) {
  return io("ws://localhost:8080", {
    query: { id: userId },
    autoConnect: false,
  });
}
