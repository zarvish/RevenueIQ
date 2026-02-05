import { Router, Request, Response } from 'express';
import { getRecommendations } from '../services';

const router = Router();

/**
 * GET /api/recommendations
 * Returns actionable recommendations
 */
router.get('/', (req: Request, res: Response) => {
  try {
    const recommendations = getRecommendations();
    res.json(recommendations);
  } catch (error) {
    console.error('Error in /api/recommendations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
