// required modules
const inquirer = require('inquirer');
const util = require('util');
const express = require('express')
const mysql = require('mysql2');

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
