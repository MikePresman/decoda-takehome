#!/usr/bin/env bash

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET="${1:-all}"

case "$TARGET" in
  all)
    "$ROOT/scripts/test-backend.sh"
    "$ROOT/scripts/test-frontend.sh"
    ;;
  backend)
    shift
    "$ROOT/scripts/test-backend.sh" "$@"
    ;;
  frontend)
    shift
    "$ROOT/scripts/test-frontend.sh" "$@"
    ;;
  *)
    echo "Usage: test [all|backend|frontend] [extra args]"
    exit 1
    ;;
esac

