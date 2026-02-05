import express, { Request, Response } from 'express';
import cors from 'cors';
import { loadData } from './dataLoader';
import {
  summaryRouter,
  driversRouter,
  riskFactorsRouter,
  recommendationsRouter,
} from './routes';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Load data on startup
try {
  loadData();
} catch (error) {
  console.error('Failed to load data:', error);
  process.exit(1);
}

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'RevenueIQ API is running' });
});

// API Routes
app.use('/api/summary', summaryRouter);
app.use('/api/drivers', driversRouter);
app.use('/api/risk-factors', riskFactorsRouter);
app.use('/api/recommendations', recommendationsRouter);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 RevenueIQ API Server running on http://localhost:${PORT}`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  GET /health`);
  console.log(`  GET /api/summary`);
  console.log(`  GET /api/drivers`);
  console.log(`  GET /api/risk-factors`);
  console.log(`  GET /api/recommendations\n`);
});

export default app;

