# RevenueIQ Backend

Revenue Intelligence API built with TypeScript, Node.js, and Express.

## Features

- **4 API Endpoints** for sales analytics:
  - `/api/summary` - Current quarter performance overview
  - `/api/drivers` - Revenue performance metrics
  - `/api/risk-factors` - Identify problems (stale deals, underperforming reps, low activity)
  - `/api/recommendations` - Actionable suggestions

## Tech Stack

- **TypeScript** - Type-safe development
- **Node.js** - Runtime environment
- **Express** - Web framework
- **CORS** - Cross-origin resource sharing

## Testing

The backend has comprehensive test coverage for all business logic.

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

**Test Coverage:**
- 4 test suites
- 45 tests total
- All utilities and services tested

See [TESTING.md](./TESTING.md) for detailed testing documentation.

## Project Structure

```
backend/
├── src/
│   ├── server.ts          # Express server and routes
│   ├── services.ts        # Business logic for all endpoints
│   ├── dataLoader.ts      # JSON data loading utilities
│   ├── utils.ts           # Helper functions (date, calculations)
│   └── types.ts           # TypeScript interfaces
├── package.json
├── tsconfig.json
└── README.md
```

## Setup & Installation

```bash
# Install dependencies
npm install

# Run in development mode (with auto-reload)
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

## API Endpoints

### GET /api/summary

Returns current quarter performance metrics.

**Response:**
```json
{
  "currentQuarterRevenue": 500000,
  "target": 619785,
  "gapPercentage": -19.3,
  "qoqChange": 25.0
}
```

### GET /api/drivers

Returns key revenue performance drivers.

**Response:**
```json
{
  "pipelineSize": 2000000,
  "winRate": 60.0,
  "averageDealSize": 16667,
  "salesCycleTime": 45
}
```

### GET /api/risk-factors

Identifies potential problems in the sales pipeline.

**Response:**
```json
{
  "staleDeals": [...],
  "underperformingReps": [...],
  "lowActivityAccounts": [...]
}
```

### GET /api/recommendations

Provides 3-5 actionable recommendations.

**Response:**
```json
{
  "recommendations": [
    {
      "priority": "high",
      "category": "deals",
      "message": "Focus on Enterprise deals older than 30 days",
      "impact": "Could recover $250K in revenue"
    }
  ]
}
```

## Development

The server runs on `http://localhost:3001` by default.

Use `npm run dev` for development with hot-reload.

## Data Source

Reads from JSON files in `../data/`:
- `accounts.json` - Customer accounts
- `reps.json` - Sales representatives
- `deals.json` - Sales deals
- `activities.json` - Sales activities (calls, emails, demos)
- `targets.json` - Monthly revenue targets
