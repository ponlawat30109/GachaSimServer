const numberFromEnv = (name, fallback) => {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
};

export const requiredEnv = (name) => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
};

export const config = {
  gatewayPort: numberFromEnv("GATEWAY_PORT", 3000),
  userServicePort: numberFromEnv("USER_SERVICE_PORT", 3001),
  gachaServicePort: numberFromEnv("GACHA_SERVICE_PORT", 3002),
  userServiceUrl:
    process.env.USER_SERVICE_URL ||
    `http://127.0.0.1:${numberFromEnv("USER_SERVICE_PORT", 3001)}`,
  gachaServiceUrl:
    process.env.GACHA_SERVICE_URL ||
    `http://127.0.0.1:${numberFromEnv("GACHA_SERVICE_PORT", 3002)}`,
  gatewayInternalUrl:
    process.env.GATEWAY_INTERNAL_URL ||
    `http://127.0.0.1:${numberFromEnv("GATEWAY_PORT", 3000)}`,
  internalApiKey: requiredEnv("INTERNAL_API_KEY"),
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3001",
  database: {
    host: process.env.DB_HOST || "localhost",
    port: numberFromEnv("DB_PORT", 3306),
    user: process.env.DB_USER || "gacha_app",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "gacha_game",
    connectionLimit: numberFromEnv("DB_CONNECTION_LIMIT", 10),
  },
};
