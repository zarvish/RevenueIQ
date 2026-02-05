import { Router, Request, Response } from 'express';
import { getRiskFactors } from '../services';

const router = Router();

/**
 * GET /api/risk-factors
 * Returns identified risk factors
 */
router.get('/', (req: Request, res: Response) => {
  try {
    const riskFactors = getRiskFactors();
    res.json(riskFactors);
  } catch (error) {
    console.error('Error in /api/risk-factors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
