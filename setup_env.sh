#!/usr/bin/env bash
set -euo pipefail

# Move to repo root
cd "$(dirname "$0")"

# 1) Update/install root node modules if present
if [ -f package.json ]; then
  if [ -f package-lock.json ]; then
    npm ci --no-audit --no-fund
  else
    npm install --no-audit --no-fund
  fi
  # Bring dependencies to latest allowed by semver ranges
  npm update --no-fund || true
  # Attempt to automatically fix known vulnerabilities without forcing majors
  npm audit fix --no-fund || true
fi

# 2) Update/install client node modules and run tests
cd client
if [ -f package-lock.json ]; then
  npm ci --no-audit --no-fund
else
  npm install --no-audit --no-fund
fi
# Update to latest versions allowed by package.json ranges
npm update --no-fund || true
# Attempt non-breaking security fixes
npm audit fix --no-fund || true

# Run client tests in CI mode
CI=true npm test -- --watchAll=false
