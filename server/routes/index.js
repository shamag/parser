import express from 'express';
import convRoutes from './conversation';
import messageRoutes from './message';

const router = express.Router();	// eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/conv', convRoutes);
router.use('/messages', messageRoutes);

export default router;
