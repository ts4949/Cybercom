create database if not exists practice4_2;

use practice4_2;

CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    name VARCHAR(50),
    department_id INT,
    salary DECIMAL(10, 2)
);

INSERT INTO employees VALUES
(1, 'John Doe', 1, 60000.00),
(2, 'Jane Smith', 2, 70000.00),
(3, 'Bob Johnson', 1, 55000.00),
(4, 'Alice Williams', 3, 80000.00),
(5, 'Charlie Brown', 2, 75000.00),
(6, 'Eva Davis', 3, 90000.00),
(7, 'Mike Miller', 1, 62000.00),
(8, 'Olivia Jones', 2, 72000.00),
(9, 'David Davis', 3, 85000.00),
(10, 'Sophia White', 1, 63000.00);

CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(50)
);

INSERT INTO departments VALUES
(1, 'HR'),
(2, 'IT'),
(3, 'Sales');

CREATE TABLE salaries (
    employee_id INT,
    salary DECIMAL(10, 2),
    salary_date DATE,
    PRIMARY KEY (employee_id, salary_date),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

INSERT INTO salaries VALUES
(1, 60000.00, '2024-01-01'),
(2, 70000.00, '2024-01-01'),
(3, 55000.00, '2024-01-01'),
(4, 80000.00, '2024-01-01'),
(5, 75000.00, '2024-01-01'),
(6, 90000.00, '2024-01-01'),
(7, 62000.00, '2024-01-01'),
(8, 72000.00, '2024-01-01'),
(9, 85000.00, '2024-01-01'),
(10, 63000.00, '2024-01-01');

#	Write a query to return the names of all employees who work in the 'Sales' department.

SELECT name
FROM employees
WHERE department_id = (SELECT department_id FROM departments WHERE department_name = 'Sales');

#	Write a query to return the total number of employees in each department, ordered by department name.

SELECT d.department_name, COUNT(e.employee_id) AS employee_count
FROM departments d
LEFT JOIN employees e ON d.department_id = e.department_id
GROUP BY d.department_id, d.department_name
ORDER BY d.department_name;

#	Write a query to return the average salary for each department, ordered by department name.

SELECT d.department_name, AVG(e.salary) AS average_salary
FROM departments d
LEFT JOIN employees e ON d.department_id = e.department_id
GROUP BY d.department_id, d.department_name
ORDER BY d.department_name;

#	Write a query to return the top 10% of highest paid employees, ordered by salary.

SELECT employee_id, name, salary
FROM (
    SELECT employee_id, name, salary,
           ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num
    FROM employees
) ranked_employees
WHERE row_num <= CEIL(0.1 * (SELECT COUNT(*) FROM employees));

#	Write a query to return the salary of each employee for their latest salary entry.

SELECT e.employee_id, e.name, s.salary
FROM employees e
JOIN salaries s ON e.employee_id = s.employee_id
WHERE s.salary_date = (SELECT MAX(salary_date) FROM salaries WHERE employee_id = e.employee_id);