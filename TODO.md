# Project TODO

Last updated: 2026-06-20

## Project

- Name: BoredApp
- Path: `/home/reannu123/Projects/portfolio/BoredApp` (monorepo)
- Status: complete (revival milestone met 2026-06-20)
- Stage: revival
- Portfolio role: Full-stack MERN CRUD + JWT authentication example

## Current Milestone

Consolidate the split client/server repos into one monorepo, make it env-driven
and Dockerized, and verify the full stack (auth + task CRUD) runs together with
a single `docker compose up`.

## Architecture (verified 2026-06-20)

- `client/` — Create React App (React 18, MUI + Bootstrap, axios, react-router).
- `server/` — Express + Mongoose + Passport-JWT, run as **two processes**:
  - API server on `PORT` (mounts `/api`, task CRUD, protected routes).
  - Auth server on `PORT_AUTH` (`/auth/login`, `/auth/register`, `/auth/logout`).
- MongoDB — shared by both server processes.

## Definition Of Done

- [x] Another developer can configure and run the project (env examples + one command).
- [x] The main workflow has been verified: register -> login -> add task -> mark done -> delete.
- [x] Setup, purpose, stack, and limitations are documented in one README.
- [x] Portfolio-facing proof is present (screenshots).

## Now

- Revival milestone complete. No active tasks; see `Later` for optional follow-ups.

## Next

- (none)

## Later

- [ ] Finish the refresh-token flow (no refresh endpoint exists today).
- [ ] Implement the BoredAPI suggestion generator (`Generator.jsx` is a stub).
- [ ] Add a minimal test for at least one auth + one task path.
- [ ] Consider a production-like `compose.prod.yaml` per the Docker pattern.

## Blocked

- None

## Done

- 2026-06-20: Diagnosis complete (GO, no large rewrite). Identified dead
  hardcoded production URLs as the main blocker; confirmed client/server route
  wiring is consistent. Decisions: monorepo in existing `BoredApp` repo, bundled
  Docker MongoDB, nginx static client, gh-pages dropped.
- 2026-06-20: Consolidated `server/` into the monorepo (clean copy, no nested
  `.git`). Monorepo now has `client/` + `server/`.
- 2026-06-20: Made the client env-driven (`client/src/api/axios.js` reads
  `REACT_APP_API_URL`/`REACT_APP_AUTH_URL` with localhost defaults); added
  `.env.example` for client, server, and root; removed the gh-pages deploy and
  set `homepage: "."`; added `/health` probes and fixed the misleading port log.
- 2026-06-20: Added Docker — `client/Dockerfile` (multi-stage → nginx) +
  `nginx.conf`, `server/Dockerfile` (debian slim, builds native bcrypt),
  `server/docker-compose.yml` (standalone api+auth+mongo), and root
  `docker-compose.yml` (umbrella client+api+auth+mongo). Both compose files pass
  `docker compose config --quiet`. Regenerated both lockfiles (server lock was
  stale; removed gh-pages from client lock).
- 2026-06-20: Wrote one consolidated README (architecture, quickstart, local
  setup, env table, API reference, verification, limitations); reduced the
  client/server sub-READMEs to pointers.
- 2026-06-20: **Verified the full stack end-to-end** via `docker compose up
  --build`. nginx serves the SPA; `register → login → add task → list → mark
  done → delete` all succeed; protected route returns 401 without a token.
  9/9 checks passed.
- 2026-06-20: Pushed the monorepo and **merged PR #1**
  (https://github.com/reannu123/BoredApp/pull/1) into `master`; deleted the
  revival branch.
- 2026-06-20: Archived the old `BoredApp-server` repo (read-only) after pointing
  its README at this monorepo.
- 2026-06-20: Captured screenshots (`docs/screenshots/landing.png`,
  `dashboard.png`) via headless Chromium against the running stack and added a
  Screenshots section to the README. **Revival milestone complete.**
