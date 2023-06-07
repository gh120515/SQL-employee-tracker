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
            // get role & employee (to be the manager) for this employee
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

        } else if (answer.prompt === 'Update Employee Role') {
            getRole();
            getEmployee();
            connection.query(`SELECT * FROM employee, role`, (err, result) => {
                if (err) throw err;
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employee',
                        message: 'Please select the employee to update.',
                        choices: employees
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'Select the new role for this employee.',
                        choices: roles
                    }
                ]).then((answers) => {
                    let roleID = answers.role.split(":")
                    let employeeID = answers.employee.split(":")
                    let values = [roleID[0], employeeID[0]]

                    connection.query(`UPDATE employee SET role_id = ? WHERE id = ?`, values, (err, result) => {
                        if (err) throw err;
                        console.log(`Updated ${answers.employee}\'s role to the database.`)

                        questions();
                    });
                })
            }
        )
        } else if (answer.prompt === 'View All Roles') {
            connection.query(
                "SELECT * FROM role;", 
                function(err, result, fields) {
                  if (err) throw err;
                  console.table(result);
                 
                  questions();
                }
              );
        } else if (answer.prompt === 'Add Role') {
              // get all roles & departments
              getRole();
              getDepartments();
              // query for new role details
              inquirer.prompt([
                  {
                      type: 'input',
                      name: 'role',
                      message: 'Please enter the name of the new role.',
                      validate: roleInput => {
                          if (roleInput) {
                              return true;
                          } else {
                              console.log('Field can not be blank!');
                              return false;
                          }
                      }
                  },
                  {
                      type: 'list',
                      name: 'department',
                      message: 'Please select the department this new role will belong in.',
                      choices: departments
                  },
                  {
                      type: 'number',
                      name: 'salary',
                      message: 'Please enter the salary for this new role (in numerical values)',
                      validate: salaryInput => {
                        if (salaryInput) {
                            return true;
                        } else {
                            console.log('Field can not be blank!');
                            return false;
                        }
                    }
                  },
              ]).then(function(answers) {
                  // split ID from role/manager to insert as either role_id or manager_id into db
                  let departmentID = answers.department.split(":")
                  connection.query(`INSERT INTO role (title, salary, department_id)
                  VALUES ('${answers.role}','${answers.salary}','${departmentID[0]}')`,
                      function (err, res) {
                      if (err) throw err;
                      console.log(`\nAdded new role: ${answers.role} to the database.`)
                  });
                  questions();
              });
        } else if (answer.prompt === 'View All Departments') {
            connection.query("SELECT * FROM department", function(err, result, fields) {
                if (err) throw err;
                console.table(result);

                questions();
            });
        } else if (answer.prompt === 'Add Department') {
            // get all departments
              getDepartments();
              // query for new deparment details
              inquirer.prompt([
                  {
                      type: 'input',
                      name: 'department',
                      message: 'Please enter the name of this new department.',
                      validate: deptInput => {
                          if (deptInput) {
                              return true;
                          } else {
                              console.log('Field can not be blank!');
                              return false;
                          }
                      }
                  },
              ]).then(function(answers) {
                  connection.query(`INSERT INTO department (name)
                  VALUES ('${answers.department}')`,
                      function (err, res) {
                      if (err) throw err;
                      console.log(`\nAdded new role: ${answers.department} to the database.`)
                  });
                  questions();
              });
        } else {
            connection.end();
            console.log(`\x1b[33m%s\x1b[0m`, `\nConnection ended. See you next time!`);
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

        function getDepartments () {
            connection.query("SELECT * FROM department;", function (err, data) {
                if (err) throw err;
                for (i = 0; i < data.length; i++) {
                    departments.push(data[i].id + ": " + data[i].name)
                }
            }) 
        };

    };



// export module
module.exports = {questions};