require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;

let connection;

async function connectToDatabase() {
    connection = await mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    });
    console.log('Connected to MySQL server');
}

connectToDatabase().catch(console.error);

app.get('/api/exercises', async (req, res) => {
    const { name, limit = 10, offset = 0 } = req.query;

    const body_parts = req.query.body_part ? req.query.body_part.split(',') : [];
    const equipments = req.query.equipment ? req.query.equipment.split(',') : [];
    const targets = req.query.target ? req.query.target.split(',') : [];

    let query = 'SELECT * FROM exercises WHERE 1=1';

    if (name) {
        query += ` AND name LIKE '%${name}%'`;
    }

    if (body_parts.length) {
        query += ` AND body_part IN ('${body_parts.join("','")}')`;
    }

    if (equipments.length) {
        query += ` AND equipment IN ('${equipments.join("','")}')`;
    }

    if (targets.length) {
        query += ` AND target IN ('${targets.join("','")}')`;
    }

    query += ` LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`;

    console.log("Final query: " + query);

    const [rows] = await connection.execute(query);
    res.json(rows);
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});