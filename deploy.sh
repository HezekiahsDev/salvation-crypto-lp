#!/usr/bin/env bash
set -euo pipefail

# Move to repository root (script assumed to live in project root)
cd "$(dirname "$0")" || exit 1

# Pull latest changes (optional; remove if deploy is handled externally)
git pull

# Install dependencies (use lockfile when possible)
pnpm install --frozen-lockfile || pnpm install

pnpm run build



# Restart the PM2 process
pm2 stop salvation-academy-lp || true
pm2 delete salvation-academy-lp || true
pm2 start pnpm --name "salvation-academy-lp" -- start
pm2 save
