# Local Development and Railway Plan

## Recommendation

Use **a lightweight Nix flake for local development**, not Docker.

### Why Nix is the better fit here

- You already use Nix comfortably, so the team cost here is low.
- This repo only needs a **small toolchain**:
  - Python
  - Node
  - pnpm
  - PostgreSQL tools
- A slim flake is enough to make local setup reproducible without introducing container orchestration overhead.
- Railway deployment does **not** depend on the local workflow, so Nix is a local ergonomics choice only.
- For this project, a local shell plus a small run script is simpler than maintaining Docker for a stack that is still being scaffolded.

### Why not copy the Pollynate setup directly

- The Pollynate flake is much broader than this project needs.
- This repo should keep its local setup narrow and explicit.
- Real app configuration should live in `.env.example` and local overrides, not in a large `.envrc`.

## Local Development Plan

### Target local architecture

Run these services locally:

1. `postgres`
2. `backend`
3. `frontend`

### Recommended local setup

Use:

- `flake.nix`
- `.envrc`
- `scripts/dev.sh`
- `bin/dev`
- workspace-local Postgres data under `tmp/`

### Local environment variables

Backend:

- `DATABASE_URL`
- `APP_ENV=development`
- `CORS_ORIGINS=http://localhost:3000`

Frontend:

- `NEXT_PUBLIC_API_BASE_URL=http://localhost:8000`

Database:

- `POSTGRES_DB`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`

### Expected developer workflow

1. Run `direnv allow`.
2. Install backend dependencies with `pip install -r requirements.txt`.
3. Start everything with `dev`.
4. Backend runs on `localhost:8000`.
5. Frontend runs on `localhost:3000`.
6. Postgres runs on `localhost:5432`.
7. Run migrations and seed scripts against the local Postgres instance.

### Files to add later

- `.env.example`
- backend migration and seed commands
- production data wiring for the scaffolded `frontend/`

## Railway Production Plan

### Recommended Railway architecture

Deploy as **three separate Railway services** inside one Railway project:

1. **Postgres**
2. **Backend API**
3. **Frontend web app**

This is better than trying to deploy everything as one service because:

- frontend and backend have different runtimes,
- each service can be deployed independently,
- env vars and healthchecks stay cleaner,
- scaling and debugging are simpler.

### Service responsibilities

#### 1. Postgres service

- Use Railway-managed PostgreSQL
- Store all relational data here
- Use Railway-provided connection variables

#### 2. Backend service

- FastAPI app
- Connects to Railway Postgres
- Runs migrations
- Exposes API routes and `/health`

#### 3. Frontend service

- Next.js app
- Talks to backend using backend public URL
- Serves the user-facing dashboard

## Railway Deployment Sequence

### Phase 1: Prepare the repo

1. Split code into:
   - `backend/`
   - `frontend/`
2. Add production-ready dependency manifests.
3. Add healthcheck route to backend.
4. Add migration and seed flow.
5. Add environment variable loading for both apps.

### Phase 2: Create Railway services

1. Create a Railway project.
2. Add a PostgreSQL service.
3. Add the backend service from the repo root or `backend/`.
4. Add the frontend service from the repo root or `frontend/`.

### Phase 3: Configure backend

Set backend environment variables:

- `DATABASE_URL` from Railway Postgres
- `APP_ENV=production`
- `PORT` provided by Railway
- any CORS or app-specific settings

Backend start requirements:

- install dependencies
- run database migrations
- optionally run seed if production bootstrap requires it
- start FastAPI on `0.0.0.0:$PORT`

### Phase 4: Configure frontend

Set frontend environment variables:

- `NEXT_PUBLIC_API_BASE_URL=<backend-public-url>`

Frontend start requirements:

- install dependencies
- build Next.js
- run Next.js on Railway port

### Phase 5: Deploy and verify

1. Deploy Postgres first.
2. Deploy backend second.
3. Verify:
   - backend boots
   - migrations succeed
   - healthcheck passes
   - API responds
4. Deploy frontend third.
5. Verify:
   - frontend loads
   - frontend can call backend
   - patient page and analytics page work against production DB

## Operational decisions to lock now

1. **Use separate Railway services**, not one combined app service.
2. **Use Nix locally**, not Docker.
3. **Use Postgres in both local and production**, never SQLite.
4. **Keep seeding as an explicit command**, not an automatic behavior on every production boot.

## Immediate next implementation tasks

1. Restructure the repo into `backend/` and `frontend/`.
2. Keep the lightweight `flake.nix` and `scripts/dev.sh` flow working as the repo evolves.
3. Create the frontend app under `frontend/`.
4. Build migrations and seed commands.
5. After that, wire Railway services around the finished app.
