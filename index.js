// required modules
const inquirer = require('inquirer');
// establish connection to the mysql instance
const connection  = require('./config/connection');
const consoleTable = require('console.table'); 

const questions = function () {
    inquirer.prompt([
        {
            type: 'list',
            name: 'prompt',
            message: 'What would you like to do?',
            choices: [
            'View All Employees', 
            'Add Employee', 
            'Update Employee Role', 
            'View All Roles', 
            'Add Role', 
            'View All Departments',
            'Add Department',
            'Quit'
            ]
        }
    ]).then((answer) => {
        if (answer.prompt === 'View All Employees') {
            connection.query(`SELECT * FROM employee`, (err, result) => {
                if (err) throw err;
                console.table(result);
                // repeat question prompt until exit; applies to all questions below
                questions();
            })
        }
    });
};





// export module
module.exports = {questions};