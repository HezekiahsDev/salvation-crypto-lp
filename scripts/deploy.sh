#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [[ -f .env.deploy ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env.deploy
  set +a
fi

APP_NAME="${APP_NAME:-salvation-academy-lp}"
APP_PORT="${APP_PORT:-9004}"
DEPLOY_PATH="${DEPLOY_PATH:-/home/hezekiah/projects/salvation-crypto-lp}"
DEPLOY_SSH_PORT="${DEPLOY_SSH_PORT:-22}"
DEPLOY_BRANCH="${DEPLOY_BRANCH:-main}"
RUN_LINT="${RUN_LINT:-1}"
RUN_TESTS="${RUN_TESTS:-1}"
SKIP_GIT_PUSH="${SKIP_GIT_PUSH:-0}"
SYNC_ENV="${SYNC_ENV:-1}"
ENV_SOURCE="${ENV_SOURCE:-.env}"

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  cat <<EOF
Usage: pnpm run deploy

Runs checks locally, builds this Next.js app locally, commits and pushes source
changes, uploads the .next build output to the existing repo on the server,
optionally syncs .env, then runs deploy.sh on the server. The server still runs
git pull, pnpm install, Prisma generate, and PM2 restart.

Required:
  DEPLOY_HOST       SSH target, for example hezekiah@203.0.113.10.
                    Set this in .env.deploy or inline before pnpm run deploy.

Optional:
  DEPLOY_PATH       Existing repo path on server. Default: /home/hezekiah/projects/salvation-crypto-lp
  DEPLOY_BRANCH     Branch the server pulls. Default: main
  DEPLOY_SSH_PORT   SSH port. Default: 22
  APP_NAME          PM2 process name. Default: salvation-academy-lp
  APP_PORT          App port used by pnpm start. Default: 9004
  RUN_LINT=0        Skip pnpm lint
  RUN_TESTS=0       Skip pnpm test when a test script exists
  SYNC_ENV=0        Do not upload .env
  ENV_SOURCE=.env   Env file to upload. Default: .env
  SKIP_GIT_PUSH=1   Do not commit and push before deploy
EOF
  exit 0
fi

if [[ -z "${DEPLOY_HOST:-}" ]]; then
  echo "DEPLOY_HOST is required. Example: DEPLOY_HOST=hezekiah@your-server pnpm run deploy"
  exit 1
fi

for cmd in git pnpm ssh scp tar; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "$cmd is required."
    exit 1
  fi
done

echo "Installing dependencies locally..."
pnpm install --frozen-lockfile

if [[ -d prisma ]]; then
  echo "Generating Prisma client locally..."
  pnpm exec prisma generate
fi

if [[ "$RUN_LINT" == "1" ]]; then
  echo "Running lint..."
  pnpm lint
fi

if [[ "$RUN_TESTS" == "1" ]] && node -e "const p=require('./package.json'); process.exit(p.scripts && p.scripts.test ? 0 : 1)" >/dev/null 2>&1; then
  echo "Running tests..."
  pnpm test
fi

echo "Building locally..."
pnpm build

release_id="$(date -u +%Y%m%d%H%M%S)-$(git rev-parse --short HEAD)"
build_artifact="/tmp/${APP_NAME}-next-${release_id}.tar.gz"
remote_build_artifact="/tmp/${APP_NAME}-next-${release_id}.tar.gz"
remote_env_file="/tmp/${APP_NAME}-env-${release_id}"
env_arg=""

cleanup() {
  rm -f "$build_artifact"
}
trap cleanup EXIT

echo "Packaging .next build..."
tar -czf "$build_artifact" .next

if [[ "$SKIP_GIT_PUSH" != "1" ]]; then
  if [[ -n "$(git status --porcelain)" ]]; then
    echo "Changes to commit:"
    git status --short

    if [[ -z "${COMMIT_MESSAGE:-}" ]]; then
      read -r -p "Enter commit message: " COMMIT_MESSAGE
    fi

    if [[ -z "$COMMIT_MESSAGE" ]]; then
      echo "Commit message is required."
      exit 1
    fi

    user="$(whoami)"
    timestamp="$(date '+%Y-%m-%d %H:%M:%S')"
    commit_msg="$user: $COMMIT_MESSAGE - $timestamp"

    echo "Committing changes..."
    git add -A
    git commit -m "$commit_msg"
  else
    echo "No source changes to commit."
  fi

  echo "Pushing $DEPLOY_BRANCH..."
  git push origin "$DEPLOY_BRANCH"
fi

if [[ "$SYNC_ENV" == "1" && -f "$ENV_SOURCE" ]]; then
  echo "Uploading $ENV_SOURCE..."
  scp -P "$DEPLOY_SSH_PORT" "$ENV_SOURCE" "$DEPLOY_HOST:$remote_env_file"
  env_arg="ENV_FILE='$remote_env_file'"
elif [[ "$SYNC_ENV" == "1" ]]; then
  echo "Warning: SYNC_ENV=1 but $ENV_SOURCE was not found locally."
fi

echo "Uploading build artifact..."
scp -P "$DEPLOY_SSH_PORT" "$build_artifact" "$DEPLOY_HOST:$remote_build_artifact"

echo "Deploying on server..."
ssh -p "$DEPLOY_SSH_PORT" "$DEPLOY_HOST" "\
  set -euo pipefail; \
  cd '$DEPLOY_PATH'; \
  git pull origin '$DEPLOY_BRANCH'; \
  chmod +x ./deploy.sh; \
  DEPLOY_PATH='$DEPLOY_PATH' \
  DEPLOY_BRANCH='$DEPLOY_BRANCH' \
  BUILD_ARTIFACT='$remote_build_artifact' \
  $env_arg \
  APP_NAME='$APP_NAME' \
  APP_PORT='$APP_PORT' \
  bash ./deploy.sh; \
  rm -f '$remote_build_artifact' '$remote_env_file'"

echo "Local build deployed to $DEPLOY_HOST:$DEPLOY_PATH"
