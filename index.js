// required modules
const inquirer = require('inquirer');

const questions = ([
    {
        type: 'list',
        name: 'prompt',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
    }
    
]);




// export module
module.exports = {questions};