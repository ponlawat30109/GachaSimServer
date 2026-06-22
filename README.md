# GachaSim microservices

The backend now runs as three independent processes:

- API gateway (`3000`): public API and Socket.IO.
- User service (`3001`): login, user creation, and inventory reads.
- Gacha service (`3002`): transactional pulls and rare-pull events.

Existing client routes remain unchanged: `POST /login`,
`GET /login/refresh`, and `POST /gacha/pull`.

## Run

```sh
npm install
npm start
```

Services can run separately with `npm run start:gateway`,
`npm run start:user`, and `npm run start:gacha`.

## Environment variables

`GATEWAY_PORT`, `USER_SERVICE_PORT`, `GACHA_SERVICE_PORT`,
`USER_SERVICE_URL`, `GACHA_SERVICE_URL`, `GATEWAY_INTERNAL_URL`,
`INTERNAL_API_KEY`, `CORS_ORIGIN`, `DB_HOST`, `DB_PORT`, `DB_USER`,
`DB_PASSWORD`, `DB_NAME`, and `DB_CONNECTION_LIMIT` are supported.

Defaults match the original local setup. Set a strong `INTERNAL_API_KEY`
outside local development and import the SQL files in `database/` first.

## Docker

From the project root, double-click `run_docker.bat`, or run:

```sh
cd server
docker compose up --build
```

The Compose stack starts MySQL and all three services. The public API remains
available at `http://localhost:3000`. Copy `.env.example` to `.env` to customize
passwords, the gateway port, the internal API key, or CORS. MySQL is only
available to containers inside the Docker network, avoiding conflicts with a
locally installed MySQL server on port `3306`.

Stop the stack with `Ctrl+C`. Remove containers with `docker compose down`.
To also erase the Docker database, use `docker compose down -v`.
