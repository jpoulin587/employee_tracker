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
            'update an employee role',
            'exit menu'
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

        case 'exit menu':
            console.log('Signed out. Type "npm start" to run it again')
            connection.end();
        break;
        
        default:
            break;
    }; //end of switch
    
    }

    )}; //end of start menu

// View all Departments
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

//View all Roles
const viewAllRoles = () => {
    const query = `SELECT
    roles.title, 
    roles.id AS role_id, 
    department.dept_name AS department, 
    roles.salary 
    FROM roles 
    LEFT JOIN department on roles.department_id = department.id`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('=======================')
        console.table(res);
        console.log('=======================')
        startMenu();
    })
    
}; //end of view function

// View all employees
//TODO FIX this broken query
const viewAllEmployees = () => {
    const query = `SELECT 
    employee.id as emp_id, 
    employee.first_name, 
    employee.last_name, 
    roles.title, 
    dept_name, 
    roles.salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN roles ON employee.role_id = roles.id
    LEFT JOIN department ON department.id = roles.department_id
    LEFT JOIN employee manager ON manager.id = employee.manager_id`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('=======================')
        console.table(res);
        console.log('=======================')
        startMenu();
    })
    
}; //end of view function

//Add new Department
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

// TODO Add a new Role
const addRole = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'addTitle',
            message: 'Enter the title of the new role.',
        },
        {
            type: 'number',
            name: 'addSalary',
            message: 'Enter the salary of the new role.',
        },
        {
            type: 'number',
            name: 'addDept',
            message: 'Enter the Department number of the new role.',
        },
    ])
    .then ((data) => {
        console.log (data);
        const query = `INSERT INTO roles(title, salary, department_id) VALUES ('${data.addTitle}', '${data.addSalary}', '${data.addDept}')`;
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.log('=======================')
            console.table(res);
            console.log('=======================')
            startMenu();
        })
    });
}; //end of add function



//TODO Add a new employee



//TODO Update employee's role









startMenu();