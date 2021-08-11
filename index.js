const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');

const connection = mysql.createConnection({ 
    host: "localhost",
    port: "3306",
    user: "root",
    password: "Bootcamp1121!",
    database: "emp_tracker_db"
});

const startMenu = () => {
inquirer
    .prompt({
        type: 'list',
        name: 'startChoice',
        message: 'Welcome to the Employee tracker. Please select one of the following options',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']



    }); //end of start menu questions

};

startMenu();