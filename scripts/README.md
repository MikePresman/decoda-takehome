# Scripts

## `scripts/dev.sh`

Starts the local development stack using the Nix shell toolchain:

- workspace-local PostgreSQL
- FastAPI backend
- Next.js frontend

Usage:

```bash
direnv allow
dev
```

The script stores local Postgres data under `tmp/postgres`.
