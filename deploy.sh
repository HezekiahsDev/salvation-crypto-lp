#!/usr/bin/env bash
set -euo pipefail

APP_NAME="${APP_NAME:-salvation-academy-lp}"
APP_PORT="${APP_PORT:-9004}"
DEPLOY_PATH="${DEPLOY_PATH:-$(cd "$(dirname "$0")" && pwd)}"
DEPLOY_BRANCH="${DEPLOY_BRANCH:-main}"
BUILD_ARTIFACT="${BUILD_ARTIFACT:-}"
ENV_FILE="${ENV_FILE:-}"

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  cat <<EOF
Usage: ./deploy.sh

Server-side deploy script. The server keeps using the git repo, pnpm install,
Prisma generation, and PM2 restart flow. The only thing skipped here is pnpm
build; .next must be uploaded from your local machine first.

Environment:
  APP_NAME        PM2 app name. Default: salvation-academy-lp
  APP_PORT        Port used by pnpm start. Default: 9004
  DEPLOY_PATH     Server repo path. Default: directory containing deploy.sh
  DEPLOY_BRANCH   Branch to pull. Default: main
  BUILD_ARTIFACT  Optional tar.gz containing local .next build output
  ENV_FILE        Optional uploaded env file to copy to .env
EOF
  exit 0
fi

cd "$DEPLOY_PATH"

load_runtime_path() {
  local had_nounset=0
  if [[ $- == *u* ]]; then
    had_nounset=1
    set +u
  fi

  for profile in "$HOME/.bashrc" "$HOME/.bash_profile" "$HOME/.profile" "$HOME/.nvm/nvm.sh"; do
    if [[ -f "$profile" ]]; then
      # shellcheck disable=SC1090
      source "$profile" >/dev/null 2>&1 || true
    fi
  done

  if [[ "$had_nounset" == "1" ]]; then
    set -u
  fi

  if ! command -v pnpm >/dev/null 2>&1 && command -v corepack >/dev/null 2>&1; then
    corepack enable >/dev/null 2>&1 || true
  fi
}

load_runtime_path

if ! command -v pnpm >/dev/null 2>&1; then
  echo "pnpm is required on the server but was not found in PATH."
  echo "Install pnpm or make it available to non-interactive SSH sessions."
  exit 1
fi

if ! command -v pm2 >/dev/null 2>&1; then
  echo "pm2 is required on the server but was not found in PATH."
  echo "Install pm2 or make it available to non-interactive SSH sessions."
  exit 1
fi

PNPM_BIN="$(command -v pnpm)"
PM2_BIN="$(command -v pm2)"

echo "Pulling latest code..."
git pull origin "$DEPLOY_BRANCH"

if [[ -n "$ENV_FILE" ]]; then
  if [[ ! -f "$ENV_FILE" ]]; then
    echo "ENV_FILE was provided but does not exist: $ENV_FILE"
    exit 1
  fi

  echo "Updating .env..."
  cp "$ENV_FILE" .env
fi

if [[ -n "$BUILD_ARTIFACT" ]]; then
  if [[ ! -f "$BUILD_ARTIFACT" ]]; then
    echo "BUILD_ARTIFACT was provided but does not exist: $BUILD_ARTIFACT"
    exit 1
  fi

  echo "Installing uploaded build..."
  rm -rf .next
  tar -xzf "$BUILD_ARTIFACT" -C "$DEPLOY_PATH"
fi

if [[ ! -d .next ]]; then
  echo "Missing .next build output. Run pnpm run deploy from your local machine first."
  exit 1
fi

echo "Installing dependencies..."
"$PNPM_BIN" install --frozen-lockfile || "$PNPM_BIN" install

if [[ -d prisma ]]; then
  echo "Generating Prisma client..."
  "$PNPM_BIN" exec prisma generate
fi

echo "Restarting $APP_NAME with PM2..."
"$PM2_BIN" stop "$APP_NAME" || true
"$PM2_BIN" delete "$APP_NAME" || true
PORT="$APP_PORT" "$PM2_BIN" start "$PNPM_BIN" --name "$APP_NAME" -- start
"$PM2_BIN" save

echo "Deploy complete."
