#!/bin/bash
# Agent team test runner for React Todo App
# --fast: unit tests only (for pre-commit checks)
# --full: all tests + coverage (for CI / QA gate)
# Usage: ./run_tests.sh [--fast|--full]

set -e

MODE="${1:---fast}"

case "$MODE" in
  --fast)
    echo "=== Running fast tests ==="
    pnpm exec vitest run --reporter=verbose
    ;;
  --full)
    echo "=== Running full test suite with coverage ==="
    pnpm exec vitest run --coverage --reporter=verbose
    ;;
  --e2e)
    echo "=== Running Playwright E2E tests ==="
    pnpm exec playwright test --reporter=list
    ;;
  --storybook)
    echo "=== Running Storybook tests ==="
    pnpm exec vitest --project=storybook
    ;;
  *)
    echo "Usage: ./run_tests.sh [--fast|--full|--e2e|--storybook]"
    exit 1
    ;;
esac
