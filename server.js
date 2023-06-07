// required modules
const { questions } = require('./index.js')
const connection = require('./config/connection.js')

connection.connect (err => {
    if (err) throw err;
    console.log('Connected to the employee database.');
    // grab inquirer prompts from index.js
    questions();
});