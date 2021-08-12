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

console.log("Welcome to the Employee tracker.");
const startMenu = () => {
    
inquirer
    .prompt({
        type: 'list',
        name: 'startChoice',
        message: 'Please select one of the following options',
        choices: [
            'view all departments', 
            'view all roles', 
            'view all employees', 
            'add a department', 
            'add a role', 
            'add an employee', 
            'update an employee role'
        ]



    }) //end of start menu questions

    .then ((data) => {
    console.log (data)
    
    switch (data.startChoice){
        case "view all departments":
        viewAllDepartments()
        break;

        case 'view all roles':
        viewAllRoles()
        break;

        case 'view all employees':
        viewAllEmployees()
        break;

        case 'add a department':
        addDepartment()
        break;

        case 'add a role':
        addRole()
        break;

        case 'add an employee':
        addEmployee()
        break;

        case 'update an employee role':
        updateEmployeeRole()
        break;
        
        default:
            break;
    }; //end of switch
    
    }

    )}; //end of start menu

const viewAllDepartments = () => {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('=======================')
        console.table(res);
        console.log('=======================')
        startMenu();
    })
    
}; //end of view function

const viewAllRoles = () => {
    const query = 'SELECT roles.title AS title, roles.salary AS salary, department.dept_name AS department FROM roles JOIN  department.id = roles.department_id';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('=======================')
        console.table(res);
        console.log('=======================')
        startMenu();
    })
    
}; //end of view function

const viewAllEmployees = () => {
    const query = 'SELECT * FROM employee';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('=======================')
        console.table(res);
        console.log('=======================')
        startMenu();
    })
    
}; //end of view function

const addDepartment = () => {
    inquirer
    .prompt({
        type: 'input',
        name: 'addDepartment',
        message: 'Enter the name of the new department.',
    })
    .then ((data) => {
        console.log (data)
    
    });

}; //end of add function


startMenu();