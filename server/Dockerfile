# Server image. The same image runs EITHER the API server (server.js) OR the
# auth server (auth/authServer.js); the process is chosen by the command in
# docker-compose. Debian slim (glibc) plus build tools so the native `bcrypt`
# module installs cleanly on any Node version.

FROM node:20-bookworm-slim AS deps
WORKDIR /app
RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 make g++ \
    && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM node:20-bookworm-slim AS production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
USER node
# API on 5000, auth on 5001 (see compose). Documented for clarity.
EXPOSE 5000 5001
# Default to the API server; compose overrides this for the auth service.
CMD ["node", "server.js"]
