const express = require('express');
const analyticsController = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/overview', analyticsController.getOverview);
router.get('/sources', analyticsController.getSourcePerformance);
router.get('/pipeline', analyticsController.getPipelineMetrics);
router.get('/timeline', analyticsController.getApplicationTimeline);

module.exports = router;
