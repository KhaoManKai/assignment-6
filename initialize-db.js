// const sqlite3 = require('sqlite3').verbose();
// const path = require('path');
// const fs = require('fs');

// const dataDir = path.join(__dirname, 'data');
// if (!fs.existsSync(dataDir)) {
//     fs.mkdirSync(dataDir);
// }


// const dbPath = path.join(dataDir, 'database.db');
// const db = new sqlite3.Database(dbPath, (err) => {
//     if (err) {
//         console.error('Error connecting to database:', err);
//         return;
//     }
//     console.log('Connected to SQLite database at:', dbPath);
// });

// db.run('PRAGMA foreign_keys = ON');

// const initializeDatabase = () => {
//     db.run(`
//         CREATE TABLE IF NOT EXISTS users (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             username TEXT UNIQUE NOT NULL,
//             password TEXT NOT NULL
//         )
//     `);


//     db.run(`
//         CREATE TABLE IF NOT EXISTS posts (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             title TEXT NOT NULL,
//             content TEXT NOT NULL,
//             userId INTEGER,
//             created DATETIME DEFAULT CURRENT_TIMESTAMP,
//             FOREIGN KEY (userId) REFERENCES users(id)
//         )
//     `);

//     console.log('Database tables created successfully');

//     db.close((err) => {
//         if (err) {
//             console.error('Error closing database:', err);
//             return;
//         }
//         console.log('Database connection closed');
//     });
// };

// initializeDatabase();