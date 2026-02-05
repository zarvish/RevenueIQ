import { Router, Request, Response } from 'express';
import { getDrivers } from '../services';

const router = Router();

/**
 * GET /api/drivers
 * Returns revenue performance drivers
 */
router.get('/', (req: Request, res: Response) => {
  try {
    const drivers = getDrivers();
    res.json(drivers);
  } catch (error) {
    console.error('Error in /api/drivers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
