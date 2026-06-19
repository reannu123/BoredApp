# BoredApp

A full-stack **MERN** to-do app with JWT authentication. Users register, log in,
and manage a personal task list (create, list, mark done, delete). It was
originally two separate repositories (client and server) and has been
consolidated into this single Dockerized monorepo.

> Revival note: this project was revived from two older repos. The focus was
> making it reproducible — clone, configure from examples, and run with one
> command — not adding features. See [Limitations](#limitations).

## Stack

| Layer    | Tech                                                            |
| -------- | --------------------------------------------------------------- |
| Client   | React 18 (Create React App), React Router, MUI, Bootstrap, axios |
| Server   | Node.js, Express, Passport (JWT), bcrypt                        |
| Database | MongoDB (Mongoose)                                              |
| Delivery | Docker, Docker Compose, nginx (static client)                  |

## Architecture

This is a monorepo with two deployable apps and one database. The **backend runs
as two separate Express processes** that share one MongoDB:

```
                         ┌──────────────────────┐
  Browser ── :3000 ────► │ client (nginx static)│
     │                   └──────────────────────┘
     │  REACT_APP_AUTH_URL                 REACT_APP_API_URL
     ├──────────► :5001  auth server  ─┐   ┌─ :5000  API server ◄────┤
     │            (login / register)   │   │  (task CRUD, protected)  │
     └─────────────────────────────────┼───┼──────────────────────────┘
                                       ▼   ▼
                                  ┌──────────────┐
                                  │   MongoDB    │
                                  └──────────────┘
```

- **auth server** (`server/auth/authServer.js`, port `5001`) issues JWTs on
  `/auth/login` and `/auth/register`.
- **API server** (`server/server.js`, port `5000`) serves task CRUD under
  `/api/task/*`; protected routes verify the JWT with Passport.
- Both sign/verify tokens with the same `ACCESS_TOKEN_SECRET`.

```
BoredApp/
├── client/                 # React app (CRA) + Dockerfile + nginx.conf
├── server/                 # Express API + auth servers + Dockerfile
│   └── docker-compose.yml  # standalone backend (api + auth + mongo)
├── docker-compose.yml      # umbrella stack (client + api + auth + mongo)
└── .env.example
```

## Quick start (Docker — recommended)

Requires Docker with Compose v2. MongoDB is bundled — no external setup.

```bash
cp .env.example .env        # optional; sane dev defaults already exist
docker compose up --build
```

Then open **http://localhost:3000**.

If port 3000 is already in use, pick another host port:

```bash
CLIENT_PORT=8080 docker compose up --build   # → http://localhost:8080
```

Stop and clean up:

```bash
docker compose down          # add -v to also drop the Mongo volume
```

### Backend only

To run just the API + auth + Mongo (e.g. for backend work), use the standalone
compose file:

```bash
cd server
docker compose up --build
# health: http://localhost:5000/health and http://localhost:5001/health
```

## Run locally without Docker

You need Node.js 18+ and a MongoDB instance (local or [Atlas](https://www.mongodb.com/cloud/atlas)).

```bash
# 1. Server (runs BOTH the API and auth processes via concurrently)
cd server
cp .env.example .env         # then edit DB_URL and the two secrets
npm install
npm run dev

# 2. Client (in a second terminal)
cd client
cp .env.example .env         # defaults point at localhost:5000 / :5001
npm install
npm start                    # → http://localhost:3000
```

Generate each JWT secret with:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Configuration

| Variable               | Used by | Default (dev)                     | Purpose                                   |
| ---------------------- | ------- | --------------------------------- | ----------------------------------------- |
| `DB_URL`               | server  | `mongodb://mongo:27017/boredapp`  | MongoDB connection string                 |
| `PORT`                 | server  | `5000`                            | API server port                           |
| `PORT_AUTH`            | server  | `5001`                            | Auth server port                          |
| `ACCESS_TOKEN_SECRET`  | server  | `dev_access_secret_change_me`     | JWT signing/verification secret           |
| `REFRESH_TOKEN_SECRET` | server  | `dev_refresh_secret_change_me`    | Reserved (see Limitations)                |
| `REACT_APP_API_URL`    | client  | `http://localhost:5000`           | API base URL, **baked in at build time**  |
| `REACT_APP_AUTH_URL`   | client  | `http://localhost:5001/auth`      | Auth base URL, **baked in at build time** |
| `CLIENT_PORT` / `API_PORT` / `AUTH_PORT` / `MONGO_PORT` | compose | `3000` / `5000` / `5001` / `27017` | Host port mappings |

The dev defaults let the stack run with zero configuration. **Override the
secrets for any real deployment** — they are Compose-time values, not baked into
the images.

## Verifying it works

```bash
docker compose up --build -d
curl -f http://localhost:5000/health        # API liveness  → {"status":"ok"}
curl -f http://localhost:5001/health        # auth liveness → {"status":"ok"}
curl -fI http://localhost:3000              # client serves the SPA
docker compose down
```

Verified end-to-end on 2026-06-20: client served by nginx; register → login →
add task → list → mark done → delete all succeed; protected routes reject
requests without a token (401).

## API reference

| Method | Endpoint                  | Auth   | Body                  | Purpose             |
| ------ | ------------------------- | ------ | --------------------- | ------------------- |
| POST   | `/auth/register`          | —      | `{username,password}` | Create a user       |
| POST   | `/auth/login`             | —      | `{username,password}` | Get `{accessToken}` |
| GET    | `/api/task/getall/mine`   | Bearer | —                     | List my tasks       |
| POST   | `/api/task/add`           | Bearer | `{task}`              | Add a task          |
| POST   | `/api/task/updatestatus`  | Bearer | `{_id,status}`        | Mark done/undone    |
| DELETE | `/api/task/delete`        | Bearer | `{_id}`               | Delete a task       |

## Limitations

Honest notes on the current state (candidates for future work, not bugs to hide):

- **Refresh tokens are not implemented.** `REFRESH_TOKEN_SECRET`, a token model,
  and a tokens DAO exist, but there is no refresh endpoint; access tokens do not
  expire/rotate.
- **The "task suggestion" generator is a stub** (`client/src/pages/Generator`),
  so the BoredAPI integration mentioned in the original README is not wired up.
- **No automated tests** yet.
- Dependencies are pinned to their original (2022–2023) versions; they were not
  upgraded during the revival.

## Roadmap

- Implement the refresh-token rotation flow.
- Build out the suggestion generator.
- Add a minimal test for one auth path and one task path.
- Add a production-like Compose profile and CI lint/build checks.

## License

ISC (inherited from the original project).
