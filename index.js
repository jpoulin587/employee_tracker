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
    const query = 'SELECT roles.title, roles.id, department.dept_name AS department, roles.salary FROM roles LEFT JOIN department on roles.department_id = department.id';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('=======================')
        console.table(res);
        console.log('=======================')
        startMenu();
    })
    
}; //end of view function

//TODO FIX this broken query
const viewAllEmployees = () => {
    const query = "SELECT employee.id, employee.first_name, employee.last_name, roles.title,department.dept_name AS department, roles.salary, CONCAT(manager.first_name,' ',manager.last_name) AS manager FROM employee LEFT JOIN roles on employee.role_id = roles.id, LEFT JOIN department on roles.department_id = department.id";
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
        console.log (data.addDepartment)
        const query = `INSERT INTO department(dept_name) VALUES ('${data.addDepartment}')`;
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.log('=======================')
            console.table(res);
            console.log('=======================')
            startMenu();
        })


    });

}; //end of add function


startMenu();