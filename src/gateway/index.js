import { createServer } from "node:http";
import { Server as SocketIO } from "socket.io";
import { config } from "../shared/config.js";
import { createGatewayApp } from "./app.js";

const httpServer = createServer();
const io = new SocketIO(httpServer, {
  cors: { origin: config.corsOrigin },
});
const app = createGatewayApp(io);
httpServer.on("request", app);

io.on("connection", (socket) =>
  console.log("Gateway socket connected:", socket.id)
);

httpServer.listen(config.gatewayPort, () =>
  console.log(`API gateway running on port ${config.gatewayPort}`)
);
