const db = require('../config/database');

const createApplication = (userId, appData) => {
  return new Promise((resolve, reject) => {
    const { companyName, position, status, opportunityType, appliedDate, salaryMin, salaryMax, applicationSource, stageReached, learningNotes } = appData;
    const query = `
      INSERT INTO applications
      (user_id, company_name, position, status, opportunity_type, applied_date, salary_min, salary_max, application_source, stage_reached, learning_notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.run(query, [userId, companyName, position, status, opportunityType, appliedDate, salaryMin, salaryMax, applicationSource, stageReached, learningNotes], function(err) {
      if (err) reject(err);
      resolve({ id: this.lastID, ...appData, user_id: userId });
    });
  });
};

const getApplicationsForUser = (userId) => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM applications WHERE user_id = ? ORDER BY applied_date DESC', [userId], (err, rows) => {
      if (err) reject(err);
      resolve(rows || []);
    });
  });
};

const getApplicationById = (id, userId) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM applications WHERE id = ? AND user_id = ?', [id, userId], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

const updateApplication = async (id, userId, appData) => {
  const { companyName, position, status, opportunityType, appliedDate, salaryMin, salaryMax, applicationSource, stageReached, learningNotes } = appData;
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE applications
      SET company_name = ?, position = ?, status = ?, opportunity_type = ?, applied_date = ?,
          salary_min = ?, salary_max = ?, application_source = ?, stage_reached = ?, learning_notes = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND user_id = ?
    `;
    db.run(query, [companyName, position, status, opportunityType, appliedDate, salaryMin, salaryMax, applicationSource, stageReached, learningNotes, id, userId], async (err) => {
      if (err) reject(err);
      const updated = await getApplicationById(id, userId);
      resolve(updated);
    });
  });
};

const deleteApplication = (id, userId) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM applications WHERE id = ? AND user_id = ?', [id, userId], function(err) {
      if (err) reject(err);
      resolve(this.changes > 0 ? { id } : null);
    });
  });
};

module.exports = {
  createApplication,
  getApplicationsForUser,
  getApplicationById,
  updateApplication,
  deleteApplication,
};
