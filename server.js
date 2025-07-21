const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Shiva@9390',
    database: 'todo_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to DB');
});

app.get('/todos', (req, res) => {
    db.query('SELECT * FROM todos', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/todos', (req, res) => {
    const { task } = req.body;
    db.query('INSERT INTO todos (task) VALUES (?)', [task], (err) => {
        if (err) throw err;
        res.json({ message: 'Task added' });
    });
});

app.listen(3000, () => console.log('Server running'));
