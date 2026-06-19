# BoredApp — server

Express backend for BoredApp. It runs as **two processes** from this one
codebase, sharing one MongoDB:

- API server — `server.js` (port `5000`), task CRUD under `/api/task/*`.
- Auth server — `auth/authServer.js` (port `5001`), `/auth/login` & `/auth/register`.

See the [root README](../README.md) for full details and the umbrella stack.

Local dev (runs both processes via `concurrently`):

```bash
cp .env.example .env   # set DB_URL and the two JWT secrets
npm install
npm run dev
```

Standalone backend with bundled MongoDB:

```bash
docker compose up --build   # api :5000, auth :5001, mongo :27017
```
