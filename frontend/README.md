# RevenueIQ Frontend

Premium Revenue Intelligence Console built with React, TypeScript, and Material UI.

## Features

- **Real-time Dashboard**: Live data from backend API
- **Premium Dark Theme**: Beautiful gradient-based design
- **Responsive Layout**: Works on all screen sizes
- **Performance Metrics**: Revenue, pipeline, win rate, sales cycle
- **Risk Alerts**: Stale deals, underperforming reps, low activity accounts
- **AI Recommendations**: Actionable insights prioritized by impact

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Material UI** - Component library
- **D3.js** - Data visualization (ready for charts)
- **Vite** - Build tool & dev server
- **Axios** - HTTP client

## Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── MetricCard.tsx
│   │   ├── SummarySection.tsx
│   │   ├── DriversSection.tsx
│   │   ├── RiskFactorsSection.tsx
│   │   └── RecommendationsSection.tsx
│   ├── services/            # API client
│   │   └── api.ts
│   ├── types/               # TypeScript types
│   │   └── api.ts
│   ├── utils/               # Utility functions
│   │   └── formatters.ts
│   ├── theme.ts             # Material UI theme
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── index.html
```

## Setup & Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Development

The app runs on `http://localhost:3000` by default.

API calls are proxied to `http://localhost:3001` (backend server).

## Design Features

### Premium Dark Theme
- Indigo & Purple gradient accents
- Smooth hover animations
- Card-based layout with glassmorphism effects

### Component Architecture
- **MetricCard**: Reusable metric display with icons and trends
- **SummarySection**: Q4 2025 performance overview
- **DriversSection**: Key revenue performance metrics
- **RiskFactorsSection**: Three-column risk alerts with tables
- **RecommendationsSection**: Priority-based action items

### Responsive Grid
- 4 columns on desktop (lg)
- 2 columns on tablet (md)
- 1 column on mobile (xs)

## API Integration

All data is fetched from the backend API:
- `GET /api/summary` - Quarterly performance
- `GET /api/drivers` - Revenue drivers
- `GET /api/risk-factors` - Risk alerts
- `GET /api/recommendations` - Action items

## Future Enhancements

- D3 charts for revenue trends
- Interactive drill-down views
- Export to PDF functionality
- Real-time updates with WebSockets
