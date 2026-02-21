const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const dbPath = path.join(__dirname, '../careertrack.db');
const db = new sqlite3.Database(dbPath);

// Enable foreign keys and initialize schema
db.serialize(() => {
  db.run('PRAGMA foreign_keys = ON');

  // Create users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Backward-compatible patch for DBs created before users.name existed.
  db.run('ALTER TABLE users ADD COLUMN name TEXT', (alterErr) => {
    if (!alterErr) {
      console.log('Patched users table: added name column');
      return;
    }

    const message = alterErr.message || '';
    if (!message.includes('duplicate column name')) {
      console.error('Unable to patch users table with name column:', message);
    }
  });

  // Create applications table
  db.run(`
    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      company_name TEXT NOT NULL,
      position TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'applied',
      opportunity_type TEXT,
      applied_date DATE NOT NULL,
      salary_min INTEGER,
      salary_max INTEGER,
      application_source TEXT,
      stage_reached TEXT,
      learning_notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Create indexes
  db.run('CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id)');
  db.run('CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status)');
  db.run('CREATE INDEX IF NOT EXISTS idx_applications_applied_date ON applications(applied_date)');

  console.log('Database initialized successfully');
});

module.exports = db;
