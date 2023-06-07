
Select
    employee.id,
    employee.last_name As Last_Name,
    employee.first_name As First_Name,
    role.title As Role,
    CONCAT(employee1.last_name , ', ',  employee1.first_name) as Manager,
    CONCAT('$', FORMAT(role.salary, 2, 'en_AU')) As Salary,
    department.name As Department
From
    employee Left Join
    role On employee.role_id = role.id Left Join
    department On role.department_id = department.id Left Join
    employee employee1 On employee.manager_id = employee1.id
Order By
    Department,
    Last_Name,
    First_Name;

            SELECT
                employee.id,
                employee.first_name,
                employee.last_name,
                role.title AS role,
                department.name AS department,
                role.salary AS salary,
            CONCAT(manager_column.first_name,' ', manager_column.last_name) AS manager
            FROM employee
            LEFT JOIN role ON employee.role_id = role.id
            LEFT JOIN department ON role.department_id = department.id
            LEFT JOIN employee manager_column ON employee.manager_id = manager_column.id;
