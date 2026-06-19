# BoredApp — client

React (Create React App) front end for BoredApp. See the [root README](../README.md)
for architecture, setup, and how to run the full stack.

Local dev:

```bash
cp .env.example .env   # API/auth URLs (default to localhost:5000 / :5001)
npm install
npm start              # → http://localhost:3000
```

`REACT_APP_*` vars are baked in at build time — rebuild after changing them.
