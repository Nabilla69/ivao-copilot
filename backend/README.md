# IVAO Copilot Backend

Node.js/Express backend for IVAO flight monitoring.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with required variables

3. Start development server:
```bash
npm run dev
```

## API Endpoints

### Users
- `POST /api/users/subscribe` - Create/Update subscription
- `GET /api/users/:vid` - Get user subscription
- `PUT /api/users/:vid` - Update subscription
- `DELETE /api/users/:vid` - Delete subscription

### Health
- `GET /api/health` - Health check
