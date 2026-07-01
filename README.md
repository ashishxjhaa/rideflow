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
| Validation | Zod |
| Auth | JWT (access + refresh tokens), Argon2 password hashing |

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

## Features

### Implemented
- User registration with email/password, hashed with Argon2
- Login issuing a short-lived JWT access token + long-lived refresh token
- Centralized Zod-based request validation middleware
- Standardized handling of duplicate-email conflicts (Prisma unique constraint)

### Planned
- `GET /api/v1/users/me` — authenticated profile fetch
- `/auth/refresh` and `/auth/logout` (session revocation)
- Refresh token rotation + reuse detection
- Rider / driver role separation
- Ride request & matching engine
- Real-time location tracking (WebSockets)
- Payments integration

## Getting Started

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

## API Reference

### Auth — `/api/v1/auth`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/register` | Create a new user account | No |
| POST | `/login` | Authenticate and receive tokens | No |

**POST `/register`**
```json
// Request
{
  "firstName": "Ashish",
  "lastName": "Jha",
  "email": "ashish@example.com",
  "password": "strongpassword123"
}

// Response 201
{
  "success": true,
  "data": {
    "id": "uuid",
    "firstName": "Ashish",
    "lastName": "Jha",
    "email": "ashish@example.com",
    "createdAt": "2026-07-01T00:00:00.000Z"
  }
}

// Response 409 — email already registered
{ "error": "Email already exists" }
```

**POST `/login`**
```json
// Request
{ "email": "ashish@example.com", "password": "strongpassword123" }

// Response 200
{ "success": true, "accessToken": "eyJhbGciOi..." }
// Also sets an httpOnly `refreshToken` cookie
```

### Users — `/api/v1/users`
🚧 In progress — `GET /me` planned next.

## Security Notes

- Passwords are hashed with Argon2 and never stored or returned in plaintext.
- Access tokens are short-lived and verified statelessly (no DB lookup); refresh tokens are long-lived and used to mint new access tokens.
- Refresh tokens are delivered via an `httpOnly`, `secure`, `sameSite=strict` cookie to reduce XSS exposure.

## License

Not yet decided.
