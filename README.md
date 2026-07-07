# Salvation Crypto LP

## Local-build deploy pipeline

The server already has the repo, Nginx, and PM2 app. Deployment keeps that flow:

1. Run the deploy script locally.
2. Your machine installs dependencies, generates Prisma client, runs lint/tests when available, runs `pnpm build`, and packages only `.next`.
3. The script prompts for a commit message, commits source changes, and pushes to `origin/main`.
4. The `.next` artifact, and `.env` when present, are uploaded over SSH.
5. The server runs `git pull origin main`, unpacks the uploaded `.next`, runs `pnpm install`, runs Prisma generate, and restarts PM2.

The server does not run `pnpm build`.

### Deploy

Edit the local-only `.env.deploy` file:

```bash
DEPLOY_HOST=hezekiah@your-server-host
DEPLOY_PATH=/home/hezekiah/projects/salvation-crypto-lp
APP_NAME=salvation-academy-lp
APP_PORT=9004
ENV_SOURCE=.env
```

If the server repo path is different, update `DEPLOY_PATH`.

Then deploy:

```bash
pnpm run deploy
```

You can also use:

```bash
pnpm ship
```

Skip lint:

```bash
RUN_LINT=0 pnpm run deploy
```

Skip env upload:

```bash
SYNC_ENV=0 pnpm run deploy
```
