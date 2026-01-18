
import { prisma } from "@repo/db";

const todos = prisma.todo.findMany();

Bun.serve({
    port: 8080,
    fetch(req, server) {
      // upgrade the request to a WebSocket
      if (server.upgrade(req)) {
        return; // do not return a Response
      }
      return new Response("Upgrade failed", { status: 500 });
    },
    websocket: {
        async message(ws, message) {
            const todos =await  prisma.todo.findMany();
            ws.send(JSON.stringify(todos));
        },
    },
});