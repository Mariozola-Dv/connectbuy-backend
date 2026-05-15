import {
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";

import { Server } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class AdminGateway {
  @WebSocketServer()
  server: Server;

  userCreated(user: any) {
    this.server.emit("user-created", user);
  }

  userDeleted(userId: string) {
    this.server.emit("user-deleted", userId);
  }

  userUpdated(user: any) {
    this.server.emit("user-updated", user);
  }
}