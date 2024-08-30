const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = process.env.DATABASE_URL || path.resolve(__dirname, '../db.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Could not connect to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

module.exports = db;

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            completed BOOLEAN DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRNET_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRNET_TIMESTAMP
        )
        `)
})

module.exports = db