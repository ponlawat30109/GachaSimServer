import express from "express";
import cors from "cors";
import { asyncRoute, errorHandler } from "../shared/http.js";
import {
  createUser,
  findUserByName,
  getInventory,
} from "./repository.js";

const publicUser = ({ name, gacha_remaining }) => ({ name, gacha_remaining });

export function createUserApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/health", (_req, res) =>
    res.json({ service: "user-service", status: "ok" })
  );
  app.post(
    "/login",
    asyncRoute(async (req, res) => {
      const username = req.body.username?.trim();
      if (!username) return res.status(400).json({ error: "Username is required" });

      let user = await findUserByName(username);
      if (!user) user = await createUser(username);
      const inventory = await getInventory(user.id);
      res.json({ success: true, user: publicUser(user), inventory });
    })
  );
  app.get(
    "/login/refresh",
    asyncRoute(async (req, res) => {
      const username = req.query.username?.trim();
      if (!username) return res.status(400).json({ error: "Username is required" });

      const user = await findUserByName(username);
      if (!user) return res.status(404).json({ error: "User not found" });
      const inventory = await getInventory(user.id);
      res.json({ success: true, user: publicUser(user), inventory });
    })
  );
  app.use(errorHandler);
  return app;
}
