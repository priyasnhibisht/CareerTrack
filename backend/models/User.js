const db = require('../config/database');

const createUser = (name, email, passwordHash) => {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', [name, email, passwordHash], function(err) {
      if (err) reject(err);
      resolve({ id: this.lastID, name, email, created_at: new Date().toISOString() });
    });
  });
};

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT id, name, email, password_hash FROM users WHERE email = ?', [email], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

const findUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT id, name, email, created_at FROM users WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};
