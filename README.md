# RideFlow

A full-stack ride-hailing platform built as a Turborepo monorepo — modeled on Uber's core architecture, built to learn and practice production-grade backend engineering patterns end to end.

## Status

🚧 In active development — auth module complete, ride-matching and payments in progress.

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Bun |
| Language | TypeScript |
| Framework | Express |
| Database | PostgreSQL |
| ORM | Prisma |
| Monorepo | Turborepo |
| Frontend Framework | Next.js |


## Monorepo Structure

```
rideflow/
├── apps/
│   ├── admin/            # Admin dashboard
│   ├── driver/            # Driver-facing app
│   └── web/                # Rider-facing web app
├── packages/
│   ├── eslint-config/
│   ├── types/               # Shared TypeScript types
│   ├── typescript-config/
│   ├── ui/                   # Shared UI components
│   └── validation/           # Shared Zod schemas
└── services/
    └── api/                    # Core backend API (Express + Prisma)
        ├── prisma/
        └── src/
            ├── controllers/
            ├── db/
            ├── middlewares/
            ├── routes/
            └── utils/
```


### Installation
```bash
git clone <repo-url>
cd rideflow
bun install
```

### Environment Variables

Create a `.env` file inside `services/api` based on `.env.example`:

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host/db` |
| `PORT` | API server port | `3000` |
| `ACCESS_TOKEN_SECRET` | Secret for signing access tokens | — |
| `ACCESS_TOKEN_EXPIRY` | Access token lifetime | `15m` |
| `REFRESH_TOKEN_SECRET` | Secret for signing refresh tokens | — |
| `REFRESH_TOKEN_EXPIRY` | Refresh token lifetime | `30d` |

### Database Setup
```bash
cd services/api
bunx prisma migrate dev
bunx prisma generate
```

### Run Locally
```bash
bun run dev
```

## License

Not yet decided.
