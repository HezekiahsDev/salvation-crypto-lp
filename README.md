# Salvation Crypto LP

## Local-build deploy pipeline

The server already has the repo, Nginx, and PM2 app. Deployment keeps that flow:

1. Run the deploy script locally.
2. Your machine installs dependencies, runs lint/tests when available, runs `pnpm build`, and packages only `.next`.
3. The script prompts for a commit message, commits source changes, and pushes to `origin/main`.
4. The `.next` artifact, and `.env` when present, are uploaded over SSH.
5. The server runs `git pull origin main`, unpacks the uploaded `.next`, runs `pnpm install`, and restarts PM2.

The server does not run `pnpm build`.

The app uses MongoDB. In production it connects to a Dockerized MongoDB on the
server (see "Database (Docker)" below), so the server `.env` must have a working
`MONGODB_URI` before deploying.

### Database (Docker)

On the server, copy `mongo.env.example` to `.env.mongo`, set a long random
`MONGO_ROOT_PASSWORD`, then start the database:

```bash
docker compose -f docker-compose.mongo.yml --env-file .env.mongo up -d
```

MongoDB listens only on `127.0.0.1:27017` and stores data in a named Docker
volume. Create the application user once (replace the password with the one
embedded in `MONGODB_URI`):

```bash
docker exec -it salvation-crypto-lp-mongo mongosh \
  -u salvation_root -p "$MONGO_ROOT_PASSWORD" --authenticationDatabase admin
```

```js
db.getSiblingDB("salvation_crypto_lp").createUser({
  user: "salvation_app",
  pwd: "<password from MONGODB_URI>",
  roles: [{ role: "readWrite", db: "salvation_crypto_lp" }],
});
```

After a fresh database, create the admin login with `pnpm seed-admin` on the
server. It requires `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env`.

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

or:

```bash
pnpm deploy
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

Use a custom commit message:

```bash
COMMIT_MESSAGE="add referral system" pnpm deploy
```

### Required Runtime Env

```bash
MONGODB_URI=mongodb://salvation_app:<password>@127.0.0.1:27017/salvation_crypto_lp?authSource=salvation_crypto_lp
MONGODB_DB=salvation_crypto_lp
PAYSTACK_SECRET_KEY=...
NEXT_PUBLIC_APP_URL=https://your-domain.com # inlined at build time; set before pnpm build
JWT_SECRET=...
ADMIN_USERNAME=... # only needed when running pnpm seed-admin
ADMIN_PASSWORD=...
```

`.env` is gitignored. The deploy script uploads it to the server, so keep the
server's payload/DB secrets there rather than committing them.
