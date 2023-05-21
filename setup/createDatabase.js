require('dotenv').config();
const mysql = require('mysql2/promise');

async function main() {
    const connection = await mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    });

    console.log('Connected to MySQL server');

    // Create a new database
    await connection.execute('CREATE DATABASE IF NOT EXISTS exerciseDatabase CHARACTER SET latin1 COLLATE latin1_general_ci;');

    await connection.execute(`
    CREATE TABLE IF NOT EXISTS exercises (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        body_part VARCHAR(255) NOT NULL,
        equipment VARCHAR(255) NOT NULL,
        gif_url VARCHAR(255) NOT NULL,
        target VARCHAR(255) NOT NULL
    );
`);

    console.log('Database created');
    connection.end(); // Close the database connection
}

main().catch(console.error);
