import express from "express";
import { createServer } from "http";
import { Server as SocketIO } from "socket.io";
import cors from "cors";

import loginRoute from "./routes/login.js";
import gachaRoute from "./routes/gacha.js";

const app = express();
const server = createServer(app);
const io = new SocketIO(server, { cors: { origin: "*" } });

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/login", loginRoute);
app.use("/gacha/pull", gachaRoute);

// Attach io to app for use in routes
app.set("io", io);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
