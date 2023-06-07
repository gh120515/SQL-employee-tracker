// required modules
const questions = require('./index.js')
const util = require('util');
const express = require('express')
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'employee_db',
    password: process.env.password,
    user: 'root'
});

// CREATE a book
router.post('/', (req, res) => {
    // Use Sequelize's `create()` method to add a row to the table
    // Similar to `INSERT INTO` in plain SQL
    Book.create({
      title: req.body.title,
      author: req.body.author,
      is_paperback: true
    })
      .then((newBook) => {
        // Send the newly created row as a JSON object
        res.json(newBook);
      })
      .catch((err) => {
        res.json(err);
      });
  });


// util package to use await on iquirer prompts & database file creation
const createFile = util.promisify(writeToFile)
// run app
// TODO: replace functions
async function init() {
    // try & catch to log error on failure
    // try {
    // // initiate the inquirer module
    // const answers = await inquirer.prompt(questions);
    // // generate the database file 
        // TODO: replace function
    // const generate = logoShape(answers)
    // await createFile('logo.svg', generate);
    // } catch (err) {
    //     console.log(err);
    // }
};

// Function call to initialize app
init();
