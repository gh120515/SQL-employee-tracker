// required modules
const questions = require('./index.js')
// const util = require('util');
// const express = require('express')
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'employee_db',
    password: process.env.password,
    user: 'root'
});

connection.connect (err => {
    if (err) throw err;
    console.log('Connected to the employee database.');
    // grab inquirer prompts from index.js
    questions();
})


// export route for connecting to mysql instance
module.exports = connection;
