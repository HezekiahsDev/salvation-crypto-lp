#!/bin/bash

show_help() {
  echo "Usage: ./sync-repo.sh [--no-build] [commit message]"
  echo "If a commit message is provided as an argument, it will be used. Otherwise, you will be prompted to enter one."
  echo "Commits and pushes with format: USER: Message - Timestamp"
  echo "Options:"
  echo "  --no-build    Skip running 'pnpm build' before git commands"
  echo "  -h, --help    Show this help message"
}

if [[ "$1" == "-h" || "$1" == "--help" ]]; then
  show_help
  exit 0
fi

# Parse optional flags (only --no-build currently supported)
SKIP_BUILD=0
while [[ "$1" == --* ]]; do
  case "$1" in
    --no-build)
      SKIP_BUILD=1
      shift
      ;;
    -h|--help)
      show_help
      exit 0
      ;;
    *)
      break
      ;;
  esac
done

if [[ -n "$1" ]]; then
  message="$1"
else
  read -p "Enter commit message: " message
fi

user=$(whoami)
timestamp=$(date '+%Y-%m-%d %H:%M:%S')
commit_msg="$user: $message - $timestamp"

# Run pnpm build unless explicitly skipped
if [[ "$SKIP_BUILD" -ne 1 ]]; then
  if ! command -v pnpm >/dev/null 2>&1; then
    echo "Error: 'pnpm' is not installed or not in PATH. Install pnpm or run with --no-build to skip."
    exit 1
  fi

  echo "Running 'pnpm build'..."
  if ! pnpm build; then
    echo "pnpm build failed. Aborting git operations."
    exit 1
  fi
fi

git add .
git commit -m "$commit_msg"
git push
echo "Repository synchronized with commit message: '$commit_msg'"