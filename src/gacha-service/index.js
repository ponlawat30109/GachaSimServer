import { config } from "../shared/config.js";
import { createGachaApp } from "./app.js";

createGachaApp().listen(config.gachaServicePort, () =>
  console.log(`Gacha service running on port ${config.gachaServicePort}`)
);
