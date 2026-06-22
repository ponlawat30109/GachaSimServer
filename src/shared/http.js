export function asyncRoute(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}

export function errorHandler(error, _req, res, _next) {
  console.error(error);
  res.status(error.status || 500).json({
    error: error.status ? error.message : "Internal server error",
  });
}

export function requireInternalApiKey(expectedKey) {
  return (req, res, next) => {
    if (req.get("x-internal-api-key") !== expectedKey) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  };
}

export async function proxyRequest(req, res, baseUrl) {
  const target = new URL(req.originalUrl, baseUrl);
  const headers = { "content-type": req.get("content-type") || "application/json" };
  const options = { method: req.method, headers };

  if (!["GET", "HEAD"].includes(req.method)) {
    options.body = JSON.stringify(req.body ?? {});
  }

  try {
    const response = await fetch(target, options);
    const body = await response.text();
    res.status(response.status);
    const contentType = response.headers.get("content-type");
    if (contentType) res.type(contentType);
    res.send(body);
  } catch (error) {
    console.error(`Proxy request failed for ${target}:`, error);
    res.status(503).json({ error: "Service unavailable" });
  }
}
