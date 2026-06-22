import { config } from "../shared/config.js";
import { createUserApp } from "./app.js";

createUserApp().listen(config.userServicePort, () =>
  console.log(`User service running on port ${config.userServicePort}`)
);
