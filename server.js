import express, { json } from "express";
import { createServer } from "http";
import { Server as socketIO } from "socket.io";
import cors from "cors";
import pool from "./config.js";

const app = express();
const server = createServer(app);
const io = new socketIO(server, { cors: { origin: "*" } });

app.use(cors());
app.use(json());

import loginRoute from "./routes/login.js";
import gachaRoute from "./routes/gacha.js";

app.use(express.urlencoded({ extended: true }));
app.use("/login", loginRoute);
app.use("/gacha/pull", gachaRoute);

app.set("io", io);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

server.listen(3000, () => {
  console.log("Server running");
});
