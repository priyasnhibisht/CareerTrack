const db = require('../config/database');
const { HTTP_STATUS } = require('../config/constants');

const getOverview = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const query = `
      SELECT
        COUNT(*) as total_applications,
        SUM(CASE WHEN status = 'applied' THEN 1 ELSE 0 END) as applied,
        SUM(CASE WHEN status = 'interview' THEN 1 ELSE 0 END) as interviews,
        SUM(CASE WHEN status = 'offer' THEN 1 ELSE 0 END) as offers,
        SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejections
      FROM applications
      WHERE user_id = ?
    `;

    db.get(query, [userId], (err, stats) => {
      if (err) return next(err);
      res.status(HTTP_STATUS.OK).json({
        success: true,
        overview: {
          totalApplications: stats?.total_applications || 0,
          applied: stats?.applied || 0,
          interviews: stats?.interviews || 0,
          offers: stats?.offers || 0,
          rejections: stats?.rejections || 0,
        },
      });
    });
  } catch (error) {
    next(error);
  }
};

const getSourcePerformance = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const query = `
      SELECT
        application_source as source,
        COUNT(*) as total,
        SUM(CASE WHEN status = 'interview' OR status = 'offer' THEN 1 ELSE 0 END) as successes,
        ROUND(
          (CAST(SUM(CASE WHEN status = 'interview' OR status = 'offer' THEN 1 ELSE 0 END) AS FLOAT) / COUNT(*) * 100),
          2
        ) as success_rate
      FROM applications
      WHERE user_id = ? AND application_source IS NOT NULL
      GROUP BY application_source
      ORDER BY total DESC
    `;

    db.all(query, [userId], (err, sources) => {
      if (err) return next(err);
      res.status(HTTP_STATUS.OK).json({
        success: true,
        sources: sources || [],
      });
    });
  } catch (error) {
    next(error);
  }
};

const getPipelineMetrics = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const query = `
      SELECT
        stage_reached as stage,
        COUNT(*) as count
      FROM applications
      WHERE user_id = ? AND stage_reached IS NOT NULL
      GROUP BY stage_reached
      ORDER BY count DESC
    `;

    db.all(query, [userId], (err, pipeline) => {
      if (err) return next(err);
      res.status(HTTP_STATUS.OK).json({
        success: true,
        pipeline: pipeline || [],
      });
    });
  } catch (error) {
    next(error);
  }
};

const getApplicationTimeline = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const query = `
      SELECT
        DATE(applied_date) as date,
        COUNT(*) as applications
      FROM applications
      WHERE user_id = ?
      GROUP BY DATE(applied_date)
      ORDER BY DATE(applied_date) ASC
    `;

    db.all(query, [userId], (err, timeline) => {
      if (err) return next(err);
      res.status(HTTP_STATUS.OK).json({
        success: true,
        timeline: timeline || [],
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOverview,
  getSourcePerformance,
  getPipelineMetrics,
  getApplicationTimeline,
};
