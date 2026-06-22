import express from "express";
import cors from "cors";
import { config } from "../shared/config.js";
import {
  proxyRequest,
  requireInternalApiKey,
} from "../shared/http.js";

export function createGatewayApp(io) {
  const app = express();
  app.use(cors({ origin: config.corsOrigin }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/health", (_req, res) =>
    res.json({ service: "api-gateway", status: "ok" })
  );
  app.post(
    "/internal/events/rare-pull",
    requireInternalApiKey(config.internalApiKey),
    (req, res) => {
      io.emit("RareNotify", req.body);
      res.sendStatus(202);
    }
  );
  app.use("/login", (req, res) =>
    proxyRequest(req, res, config.userServiceUrl)
  );
  app.use("/gacha", (req, res) =>
    proxyRequest(req, res, config.gachaServiceUrl)
  );

  return app;
}
