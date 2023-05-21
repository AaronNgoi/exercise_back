// require('dotenv').config();
// const mysql = require('mysql2/promise');
//
// async function main() {
//     const connection = await mysql.createConnection({
//         host: process.env.HOST,
//         user: process.env.USER,
//         password: process.env.PASSWORD,
//         database: process.env.DATABASE
//     });
//
//     console.log('connected to db');
//
//     you can now use the `connection` object to query your database
//     const [rows, fields] = await connection.execute('SELECT * FROM `your_table_name`');
//     console.log(rows);
// }
//
// main().catch(console.error);