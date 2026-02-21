const express = require('express');
const authRoutes = require('./authRoutes');
const applicationRoutes = require('./applicationRoutes');
const analyticsRoutes = require('./analyticsRoutes');

const router = express.Router();

router.use('/api/auth', authRoutes);
router.use('/api/applications', applicationRoutes);
router.use('/api/analytics', analyticsRoutes);

module.exports = router;
