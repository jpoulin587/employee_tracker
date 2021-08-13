USE emp_tracker_db;

INSERT INTO department(dept_name)
VALUES  ("Command"),
        ("Medical"),
        ("Engineering"),
        ("Security");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Captian", 100000, 1),
        ("First Officer", 95000, 1),
        ("Doctor", 90000, 2),
        ("Botanist", 80000, 2),
        ("Engineer", 90000, 3),
        ("Security Officer", 30000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Jean-Luc", "Picard", 1, 1),
        ("William", "Riker", 2, 1),
        ("Beverly", "Crusher", 3, 1),
        ("Keko", "O'Brian", 4, 3),
        ("Geordi", "LaForge", 5, 2),
        ("Mister", "Worf", 6, 2),
        ("Reginald", "Barkley", 5, 2);




