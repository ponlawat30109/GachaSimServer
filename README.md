# GachaSimServer

Microservice backend for the GachaSim project.

## Services

- API gateway and Socket.IO: port `3000`
- User service: internal port `3001`
- Gacha service: internal port `3002`
- MySQL database

## Setup

Copy `.env.example` to `.env`, set secure values, then run:

```bash
docker compose up --build
```

The public API is available at `http://localhost:3000`.

## Clients

- Unity client: [GachaSim](https://github.com/ponlawat30109/GachaSim)
- Web client: [GachaSimWeb](https://github.com/ponlawat30109/GachaSimWeb)

## Stop

```bash
docker compose down
```

Use `docker compose down -v` to also delete the database volume.
