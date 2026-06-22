import express from "express";
import cors from "cors";
import { config } from "../shared/config.js";
import { asyncRoute, errorHandler } from "../shared/http.js";
import { getGachaHistory, pullGacha } from "./service.js";

async function publishRarePull(event) {
  try {
    await fetch(`${config.gatewayInternalUrl}/internal/events/rare-pull`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-internal-api-key": config.internalApiKey,
      },
      body: JSON.stringify(event),
    });
  } catch (error) {
    console.error("Could not publish rare-pull event:", error);
  }
}

export function createGachaApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/health", (_req, res) =>
    res.json({ service: "gacha-service", status: "ok" })
  );
  app.post(
    "/gacha/pull",
    asyncRoute(async (req, res) => {
      const username = req.body.username?.trim();
      const count = Number(req.body.count);
      if (!username) return res.status(400).json({ error: "Username is required" });
      if (!Number.isInteger(count) || count < 1 || count > 100) {
        return res.status(400).json({ error: "Count must be an integer from 1 to 100" });
      }

      const result = await pullGacha(username, count);
      if (result.error) return res.status(result.status).json({ error: result.error });
      result.rareItems.forEach(publishRarePull);
      res.json({ success: true, results: result.results });
    })
  );
  app.get(
    "/gacha/history",
    asyncRoute(async (req, res) => {
      const username = req.query.username?.trim();
      const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
      if (!username) return res.status(400).json({ error: "Username is required" });
      res.json({ success: true, ...(await getGachaHistory(username, page, 10)) });
    })
  );
  app.use(errorHandler);
  return app;
}
