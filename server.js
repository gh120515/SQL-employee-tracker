// required modules
const questions = require('./index.js')
// const util = require('util');
// const express = require('express')
const mysql = require('mysql2');

// const connection = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: 'genericpass',
    database: 'employees_db'
});

connection.connect (err => {
    if (err) throw err;
    console.log('Connected to the employee database.');
    // grab inquirer prompts from index.js
    questions();
})


// export route for connecting to mysql instance
module.exports = connection;
