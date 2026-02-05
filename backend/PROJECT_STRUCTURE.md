# Backend Project Structure

```
backend/
├── src/
│   ├── types/                    # TypeScript type definitions
│   │   ├── models.ts            # Core data models (Account, Rep, Deal, etc.)
│   │   ├── responses.ts         # API response types
│   │   └── index.ts             # Central export
│   │
│   ├── utils/                    # Utility functions
│   │   ├── dateUtils.ts         # Date manipulation & quarter calculations
│   │   ├── calculationUtils.ts  # Math operations (win rate, averages, etc.)
│   │   ├── dealUtils.ts         # Deal filtering & aggregation
│   │   └── index.ts             # Central export
│   │
│   ├── services/                 # Business logic layer
│   │   ├── summaryService.ts    # Quarter revenue & targets
│   │   ├── driversService.ts    # Performance metrics
│   │   ├── riskFactorsService.ts # Risk identification
│   │   ├── recommendationsService.ts # AI recommendations
│   │   └── index.ts             # Central export
│   │
│   ├── routes/                   # API route handlers
│   │   ├── summary.ts           # /api/summary endpoint
│   │   ├── drivers.ts           # /api/drivers endpoint
│   │   ├── riskFactors.ts       # /api/risk-factors endpoint
│   │   ├── recommendations.ts   # /api/recommendations endpoint
│   │   └── index.ts             # Central export
│   │
│   ├── dataLoader.ts            # JSON data loading & access
│   └── server.ts                # Express app & server setup
│
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

## Design Principles

### 1. **Separation of Concerns**
- **Types**: Data models separate from API responses
- **Utils**: Date, calculation, and deal utilities in focused modules
- **Services**: Business logic isolated from routing
- **Routes**: Thin layer handling HTTP concerns only

### 2. **Single Responsibility**
- Each file has one clear purpose
- Functions are focused and testable
- Easy to locate and modify specific functionality

### 3. **Scalability**
- Easy to add new endpoints (create service + route)
- Easy to add new utilities (add to appropriate utils file)
- Easy to add new types (add to models or responses)

### 4. **Maintainability**
- Index files provide clean import paths
- Consistent naming conventions
- Clear module boundaries

## Module Responsibilities

### Types (`/types`)
- **models.ts**: Core business entities from data files
- **responses.ts**: API contract definitions

### Utils (`/utils`)
- **dateUtils.ts**: Quarter calculations, date parsing
- **calculationUtils.ts**: Win rates, averages, percentages
- **dealUtils.ts**: Deal filtering, amount summation, sales cycles

### Services (`/services`)
- **summaryService.ts**: Revenue, targets, gap analysis
- **driversService.ts**: Pipeline, win rate, deal size, cycle time
- **riskFactorsService.ts**: Stale deals, underperforming reps, low activity
- **recommendationsService.ts**: Generate actionable insights

### Routes (`/routes`)
- Thin wrappers around service calls
- Handle HTTP request/response
- Error handling and status codes

## Benefits of This Structure

✅ **Easy to test**: Each module can be tested independently  
✅ **Easy to understand**: Clear file names and responsibilities  
✅ **Easy to extend**: Add new features without touching existing code  
✅ **Easy to debug**: Issues are isolated to specific modules  
✅ **Production-ready**: Follows industry best practices
