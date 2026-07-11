#!/usr/bin/env bash

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if ! command -v initdb >/dev/null 2>&1; then
  echo "initdb not found. Enter the Nix shell first with 'direnv allow' or 'nix develop'."
  exit 1
fi

if ! command -v pip >/dev/null 2>&1; then
  echo "pip not found. Enter the Nix shell first with 'direnv allow' or 'nix develop'."
  exit 1
fi

if ! command -v pnpm >/dev/null 2>&1; then
  echo "pnpm not found. Enter the Nix shell first with 'direnv allow' or 'nix develop'."
  exit 1
fi

mkdir -p "$ROOT/tmp"

source "$ROOT/config/dev.env"

if [[ -f "$ROOT/.envrc.local" ]]; then
  source "$ROOT/.envrc.local"
fi

PGDATA_DIR="${PGDATA_DIR:-$ROOT/tmp/postgres}"
PGLOG_FILE="${PGLOG_FILE:-$ROOT/tmp/postgres.log}"

echo "Installing backend dependencies from requirements.txt"
pip install -r "$ROOT/requirements.txt"

if ! command -v uvicorn >/dev/null 2>&1; then
  echo "uvicorn is still unavailable after installing requirements."
  exit 1
fi

cleanup() {
  local exit_code=$?

  if [[ -n "${FRONTEND_PID:-}" ]] && kill -0 "$FRONTEND_PID" >/dev/null 2>&1; then
    kill "$FRONTEND_PID" >/dev/null 2>&1 || true
  fi

  if [[ -n "${BACKEND_PID:-}" ]] && kill -0 "$BACKEND_PID" >/dev/null 2>&1; then
    kill "$BACKEND_PID" >/dev/null 2>&1 || true
  fi

  if pg_ctl -D "$PGDATA_DIR" status >/dev/null 2>&1; then
    pg_ctl -D "$PGDATA_DIR" -m fast stop >/dev/null 2>&1 || true
  fi

  exit "$exit_code"
}

trap cleanup EXIT INT TERM

if [[ ! -d "$PGDATA_DIR" ]]; then
  echo "Initializing local Postgres cluster in $PGDATA_DIR"
  initdb -D "$PGDATA_DIR" >/dev/null
  {
    echo "listen_addresses = '127.0.0.1'"
    echo "port = $PGPORT"
  } >>"$PGDATA_DIR/postgresql.conf"
  echo "host all all 127.0.0.1/32 trust" >>"$PGDATA_DIR/pg_hba.conf"
fi

if ! pg_ctl -D "$PGDATA_DIR" status >/dev/null 2>&1; then
  echo "Starting local Postgres on port $PGPORT"
  pg_ctl -D "$PGDATA_DIR" -l "$PGLOG_FILE" start >/dev/null
fi

until pg_isready -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" >/dev/null 2>&1; do
  sleep 1
done

psql -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" -d postgres -tc "SELECT 1 FROM pg_database WHERE datname = '$PGDATABASE'" | grep -q 1 || \
  createdb -h "$PGHOST" -p "$PGPORT" -U "$PGUSER" "$PGDATABASE"

echo "Starting backend on $BACKEND_URL"
(
  cd "$ROOT"
  exec uvicorn app.main:app --host 0.0.0.0 --port "$BACKEND_PORT" --reload
) &
BACKEND_PID=$!

if [[ -f "$ROOT/frontend/package.json" ]]; then
  echo "Installing frontend dependencies from frontend/package.json"
  (
    cd "$ROOT/frontend"
    pnpm install
  )
  echo "Starting frontend on $FRONTEND_URL"
  (
    cd "$ROOT/frontend"
    exec pnpm dev --port "$FRONTEND_PORT"
  ) &
  FRONTEND_PID=$!
fi

echo "Local stack is running. Press Ctrl+C to stop."
wait
