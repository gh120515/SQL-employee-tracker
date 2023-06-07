// required modules
const inquirer = require('inquirer');
// establish connection to the mysql instance
const connection  = require('./config/connection');
const consoleTable = require('console.table'); 

// inquirer prompts for the user to select on app initialisation
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
            connection.query(`SELECT * FROM employee`, (err, res) => {
                if (err) throw err;
                console.table(res);
                // repeat question prompt until exit; applies to all questions below
                questions();
            })

        } else if (answer.prompt === 'Add Employee') {
            // get role & manager for this employee
            getRole();
            getEmployee();
            // query for new employee details
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Please enter the first name of the employee.',
                    validate: firstNameInput => {
                        if (firstNameInput) {
                            return true;
                        } else {
                            console.log('Field can not be blank!');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Please enter the last name of the employee.',
                    validate: lastNameInput => {
                        if (lastNameInput) {
                            return true;
                        } else {
                            console.log('Field can not be blank!');
                            return false;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'Please select the role of this employee.',
                    choices: roles
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: 'Please select the manager of this employee',
                    choices: employees
                }
            ]).then(function(answers) {
                // split ID from role/manager to insert as either role_id or manager_id into db
                let roleID = answers.role.split(":")
                let employeeID = answers.manager.split(":")
                connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES ('${answers.firstName}','${answers.lastName}','${roleID[0]}','${employeeID[0]}')`,
                    function (err, res) {
                    if (err) throw err;
                    console.log(`\nAdded ${answers.firstName} ${answers.lastName} to the database.`)
                });
                questions();
            });

            }
        })


        

        // arrays to store choices from queries
        let roles = [];
        let employees = [];
        let departments = [];

        // functions to get data from db
        function getRole () {
            connection.query("SELECT * FROM role;", function (err, data) {
                if (err) throw err;
                for (i = 0; i < data.length; i++) {
                    // title: role title
                    roles.push(data[i].id + ": " + data[i].title)
                }
             })
        };

        function getEmployee () {
            connection.query("SELECT * FROM employee;", function (err, data) {
                if (err) throw err;
                for (i = 0; i < data.length; i++) {
                    employees.push(data[i].id + ": " + data[i].first_name + " " + data[i].last_name)
                }
            }) 
        };

    };



// export module
module.exports = {questions};