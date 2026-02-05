# RevenueIQ - Revenue Intelligence Console

Full-stack TypeScript application for revenue performance analysis and insights.

<img width="1470" height="836" alt="image" src="https://github.com/user-attachments/assets/2e557f35-43ab-4c0b-821d-ae6ea6f60e2d" />
<img width="1470" height="820" alt="image" src="https://github.com/user-attachments/assets/5cc803df-a000-426b-9064-4fff695f7671" />

## 🎯 Project Overview

A single-page Revenue Intelligence Console that helps CROs answer:
**"Why are we behind (or ahead) on revenue this quarter, and what should we focus on right now?"**

## 🏗️ Architecture

### Backend (Node.js + TypeScript + Express)
- **Port**: 3001
- **API Endpoints**: 4 RESTful endpoints
- **Data Source**: JSON files (accounts, reps, deals, activities, targets)
- **Architecture**: Modular monolith with separation of concerns

### Frontend (React + TypeScript + Material UI)
- **Port**: 3000
- **UI Library**: Material UI v5
- **Charting**: D3.js (ready for visualizations)
- **Theme**: Premium dark mode with indigo/purple gradients
- **Build Tool**: Vite

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Backend Setup
```bash
cd backend
npm install
npm run dev
```
Backend runs on `http://localhost:3001`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:3000`

## 📊 Features

### 1. Q4 2025 Performance Summary
- Current quarter revenue
- Quarterly target
- Gap to target percentage
- Quarter-over-quarter change

### 2. Revenue Performance Drivers
- Pipeline size (active opportunities)
- Win rate (closed won / total closed)
- Average deal size
- Sales cycle time

### 3. Risk Factors & Alerts
- **Stale Deals**: Open > 60 days
- **Underperforming Reps**: Win rate < 40% or below team average
- **Low Activity Accounts**: No contact in 30+ days

### 4. Recommended Actions
- Priority-based (High/Medium/Low)
- Category-tagged (Deals/Coaching/Activity/Strategic)
- Impact-focused insights

## 📁 Project Structure

```
RevenueIQ/
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── types/          # Data models & API responses
│   │   ├── utils/          # Date, calculation, deal utilities
│   │   ├── services/       # Business logic (4 services)
│   │   ├── routes/         # API routes (4 endpoints)
│   │   ├── dataLoader.ts   # JSON data loading
│   │   └── server.ts       # Express app
│   └── package.json
│
├── frontend/                # React SPA
│   ├── src/
│   │   ├── components/     # React components (5 components)
│   │   ├── services/       # API client
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Formatters
│   │   ├── theme.ts        # Material UI theme
│   │   ├── App.tsx         # Main app
│   │   └── main.tsx        # Entry point
│   └── package.json
│
├── data/                    # JSON data files
│   ├── accounts.json
│   ├── reps.json
│   ├── deals.json
│   ├── activities.json
│   └── targets.json
│
├── DATA_STRUCTURE_GUIDE.md  # Data documentation
└── THINKING.md              # Design decisions & tradeoffs
```

## 🎨 UI Design

### Premium Dark Theme
- **Background**: Slate 900 (#0f172a)
- **Cards**: Slate 800 (#1e293b) with subtle borders
- **Primary**: Indigo (#6366f1)
- **Accents**: Purple, Green, Red, Amber
- **Typography**: Inter font family

### Component Highlights
- **MetricCard**: Reusable card with icon, value, trend indicator
- **Gradient Backgrounds**: Subtle color gradients on cards
- **Hover Animations**: Smooth transform and shadow effects
- **Responsive Grid**: 4 → 2 → 1 columns (desktop → tablet → mobile)

## 🔧 Technical Decisions

### Backend
- **Modular Architecture**: Separate files for types, utils, services, routes
- **In-Memory Data**: Load JSON on startup (suitable for ~600 deals)
- **TypeScript Strict Mode**: Catch errors at compile time
- **Functional Style**: Pure functions, easy to test

### Frontend
- **Component-Based**: Reusable, focused components
- **API Integration**: Axios with TypeScript types
- **Loading States**: Spinner while fetching data
- **Error Handling**: User-friendly error messages

### Scalability Considerations
- Current: In-memory data, suitable for < 1000 deals
- At 10x scale: Need database (PostgreSQL), caching (Redis)
- At 100x scale: Load balancing, pre-aggregated metrics

## 📈 Metrics & Calculations

### Revenue Metrics
- **Current Quarter Revenue**: Sum of closed won deals in Q4 2025
- **Gap Percentage**: `((current - target) / target) * 100`
- **QoQ Change**: `((Q4 - Q3) / Q3) * 100`

### Performance Drivers
- **Pipeline Size**: Sum of open deal amounts (Prospecting + Negotiation)
- **Win Rate**: `(won deals / (won + lost deals)) * 100`
- **Average Deal Size**: Total won amount / number of won deals
- **Sales Cycle**: Average days from created_at to closed_at

### Risk Thresholds
- **Stale Deal**: Open > 60 days
- **Underperforming Rep**: Win rate < 40% OR < team avg - 20%
- **Low Activity**: No activity in last 30 days

## 🧪 Testing

### Backend
```bash
cd backend
# Test individual endpoints
curl http://localhost:3001/api/summary
curl http://localhost:3001/api/drivers
curl http://localhost:3001/api/risk-factors
curl http://localhost:3001/api/recommendations
```

### Frontend
- Open `http://localhost:3000` in browser
- Verify all 4 sections load with data
- Check responsive design (resize browser)
- Test on different browsers

## 📝 Documentation

- **[DATA_STRUCTURE_GUIDE.md](./DATA_STRUCTURE_GUIDE.md)**: Data models, relationships, API specs
- **[THINKING.md](./THINKING.md)**: Assumptions, tradeoffs, scalability, AI vs human decisions
- **[backend/README.md](./backend/README.md)**: Backend API documentation
- **[frontend/README.md](./frontend/README.md)**: Frontend architecture

## 🎯 Key Achievements

✅ **Premium Code Quality**: Modular, typed, well-documented  
✅ **Separation of Concerns**: Clear boundaries between layers  
✅ **Production-Ready**: Error handling, loading states, responsive  
✅ **Beautiful UI**: Dark theme, gradients, smooth animations  
✅ **Actionable Insights**: CRO can immediately see what to focus on  

## 🚧 Future Enhancements

- D3 charts for revenue trends over time
- Interactive drill-down views (click to see deal details)
- Export to PDF functionality
- Real-time updates with WebSockets
- User authentication and role-based access
- Database integration for larger datasets

---

**Built with ❤️ using React, TypeScript, Material UI, Express, and D3**
