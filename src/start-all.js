import { spawn } from "node:child_process";

const services = [
  ["gateway", "src/gateway/index.js"],
  ["user-service", "src/user-service/index.js"],
  ["gacha-service", "src/gacha-service/index.js"],
];

const children = services.map(([name, entry]) => {
  const child = spawn(process.execPath, [entry], {
    stdio: "inherit",
    env: process.env,
  });
  child.on("exit", (code) => {
    if (code && code !== 0) console.error(`${name} stopped with code ${code}`);
  });
  return child;
});

function shutdown() {
  children.forEach((child) => child.kill());
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
