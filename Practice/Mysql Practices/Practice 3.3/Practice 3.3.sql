create database practice3_3;

use practice3_3;

-- CASE 1
CREATE TABLE books (
    id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    publication_year INT);
    
INSERT INTO books VALUES
    (1, 'The Great Gatsby', 'F. Scott Fitzgerald', 1925),
    (2, 'To Kill a Mockingbird', 'Harper Lee', 1960),
    (3, '1984', 'George Orwell', 1949),
    (4, 'The Catcher in the Rye', 'J.D. Salinger', 1951);
    
#	Write a SQL query to retrieve the title and author of the oldest book in the table. 

SELECT title, author
FROM books
WHERE publication_year = (SELECT MIN(publication_year) FROM books);

-- CASE 2

CREATE TABLE employees (
    id INT PRIMARY KEY,
    name TEXT NOT NULL,
    age INT,
    salary INT);

INSERT INTO employees VALUES
    (1, 'John', 35, 60000),
    (2, 'Mary', 27, 50000),
    (3, 'Peter', 42, 75000),
    (4, 'Olivia', 29, 55000),
    (5, 'Michael', 38, 80000);
    
#	Write a SQL query to select all employees from the "employees" table.

SELECT * FROM employees;

#	Write a SQL query to select the name and salary of all employees with a salary greater than 60000.

SELECT name, salary
FROM employees
WHERE salary > 60000;

#	Write a SQL query to update Peter's age to 43.

UPDATE employees
SET age = 43
WHERE name = 'Peter';

#	Write a SQL query to delete the employee with the id of 4.

DELETE FROM employees
WHERE id = 4;

#	Write a SQL query to calculate the average salary of all employees.

SELECT AVG(salary) AS average_salary
FROM employees;

#	Write a SQL query to select the name and age of the oldest employee.

SELECT name, age
FROM employees
ORDER BY age DESC
LIMIT 1;

#	Write a SQL query to select the name and age of the youngest employee.

SELECT name, age
FROM employees
ORDER BY age ASC
LIMIT 1;

#	Write a SQL query to select the name of the employee with the highest salary.

SELECT name
FROM employees
ORDER BY salary DESC
LIMIT 1;