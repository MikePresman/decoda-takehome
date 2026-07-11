#!/usr/bin/env bash

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VENV_PYTHON="${VENV_PYTHON:-$ROOT/.venv/bin/python}"

if [[ ! -x "$VENV_PYTHON" ]]; then
  echo "Missing Python virtualenv interpreter at $VENV_PYTHON"
  exit 1
fi

cd "$ROOT"
exec "$VENV_PYTHON" -m pytest "$@"

