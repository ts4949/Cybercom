create database practice5_1;

use practice5_1;

CREATE TABLE customers (
  customer_id INT PRIMARY KEY AUTO_INCREMENT,
  customer_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE,
  country_name VARCHAR(50)
);

CREATE TABLE products (
  product_id INT PRIMARY KEY AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL
);

CREATE TABLE employees (
  employee_id INT PRIMARY KEY AUTO_INCREMENT,
  employee_name VARCHAR(50) NOT NULL,
  department_id INT NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  hire_date DATE NOT NULL
);

CREATE TABLE orders (
  order_id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  order_date DATE NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE order_details (
  order_detail_id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  employee_id INT NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

INSERT INTO customers (customer_name, email, country_name)
VALUES
  ('John Doe', 'john.doe@example.com', 'USA'),
  ('Jane Smith', 'jane.smith@example.com', 'Canada'),
  ('Bob Johnson', 'bob.johnson@example.com', 'UK'),
  ('Alice Williams', 'alice.williams@example.com', 'Australia'),
  ('Michael Brown', 'michael.brown@example.com', 'USA'),
  ('Emily Davis', 'emily.davis@example.com', 'Canada'),
  ('David Wilson', 'david.wilson@example.com', 'UK'),
  ('Sarah Thompson', 'sarah.thompson@example.com', 'Australia'),
  ('Christopher Taylor', 'christopher.taylor@example.com', 'USA'),
  ('Jessica Anderson', 'jessica.anderson@example.com', 'Canada');

INSERT INTO products (product_name, price)
VALUES
  ('Product 1', 9.99),
  ('Product 2', 19.99),
  ('Product 3', 14.99),
  ('Product 4', 24.99),
  ('Product 5', 7.99),
  ('Product 6', 29.99),
  ('Product 7', 12.99),
  ('Product 8', 34.99),
  ('Product 9', 17.99),
  ('Product 10', 39.99);

INSERT INTO employees (employee_name, department_id, salary, hire_date)
VALUES
  ('Employee 1', 1, 5000.00, '2022-01-01'),
  ('Employee 2', 2, 6000.00, '2021-03-15'),
  ('Employee 3', 1, 4500.00, '2020-07-01'),
  ('Employee 4', 3, 7000.00, '2019-11-20'),
  ('Employee 5', 2, 5500.00, '2018-05-10'),
  ('Employee 6', 1, 6500.00, '2017-09-01'),
  ('Employee 7', 3, 4000.00, '2016-02-28'),
  ('Employee 8', 2, 7500.00, '2015-06-15'),
  ('Employee 9', 1, 5000.00, '2014-10-01'),
  ('Employee 10', 3, 6000.00, '2013-12-31');

INSERT INTO orders (customer_id, order_date)
VALUES
  (1, '2023-03-01'),
  (2, '2023-03-02'),
  (3, '2023-03-03'),
  (4, '2023-03-04'),
  (5, '2023-03-05'),
  (6, '2023-03-06'),
  (7, '2023-03-07'),
  (8, '2023-03-08'),
  (9, '2023-03-09'),
  (10, '2023-03-10');

INSERT INTO order_details (order_id, product_id, employee_id, quantity, unit_price)
VALUES
  (1, 1, 1, 2, 9.99),
  (2, 2, 2, 3, 19.99),
  (3, 3, 3, 1, 14.99),
  (4, 4, 4, 4, 24.99),
  (5, 5, 5, 2, 7.99),
  (6, 6, 6, 3, 29.99),
  (7, 7, 7, 1, 12.99),
  (8, 8, 8, 2, 34.99),
  (9, 9, 9, 4, 17.99),
  (10, 10, 10, 3, 39.99);
    
#	Write a SQL query to retrieve the top 10 customers who have made the most orders in the "orders" table, 
#	along with the total number of orders they have made.

SELECT c.customer_name, COUNT(o.order_id) AS total_orders
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id
ORDER BY total_orders DESC
LIMIT 10;

#	Write a SQL query to retrieve the names of all employees who have sold more than $100,000 worth of products 
#	in the "order_details" table, sorted by the amount sold in descending order.

SELECT e.employee_name
FROM employees e
JOIN order_details od ON e.employee_id = od.employee_id
JOIN products p ON od.product_id = p.product_id
GROUP BY e.employee_id
HAVING SUM(od.quantity * od.unit_price) > 100000
ORDER BY SUM(od.quantity * od.unit_price) DESC;


#	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table, 
#	along with the total amount they have spent on all orders and the total amount they have spent on orders made in the last 30 days.

SELECT c.customer_name,
       SUM(od.quantity * od.unit_price) AS total_spend,
       SUM(CASE WHEN o.order_date >= CURDATE() - INTERVAL 30 DAY THEN od.quantity * od.unit_price ELSE 0 END) AS recent_spend
FROM order_details od
INNER JOIN orders o ON od.order_id = o.order_id
INNER JOIN customers c ON o.customer_id = c.customer_id
GROUP BY c.customer_name;
 
#	Write a SQL query to retrieve the names and salaries of all employees who have a salary greater than the average salary 
#	of all employees in the "employees" table, sorted by salary in descending order.


SELECT e.employee_name, e.salary
FROM employees e
WHERE e.salary > (SELECT AVG(salary) FROM employees)
ORDER BY e.salary DESC;
 
#	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table, 
#	but have not made any orders in the last 90 days.

SELECT c.customer_name
FROM customers c
WHERE c.customer_id NOT IN (
  SELECT customer_id
  FROM orders
  WHERE order_date >= CURDATE() - INTERVAL 90 DAY
);

#	Write a SQL query to retrieve the names and salaries of all employees who have a salary greater than the minimum salary 
#	of their department in the "employees" table, sorted by department ID and then by salary in descending order.

SELECT e.employee_name, e.salary
FROM employees e
JOIN (
    SELECT department_id, MIN(salary) AS min_salary
    FROM employees
    GROUP BY department_id
) d ON e.department_id = d.department_id AND e.salary > d.min_salary
ORDER BY e.department_id, e.salary DESC;
 
#	Write a SQL query to retrieve the names and salaries of the five highest paid employees in each department of the "employees" table, 
#	sorted by department ID and then by salary in descending order.

SELECT e.employee_name, e.salary
FROM employees e
INNER JOIN (
  SELECT employee_id, department_id, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS `rank`
  FROM employees
) AS ranked
ON e.employee_id = ranked.employee_id
WHERE ranked.`rank` <= 5
ORDER BY ranked.department_id, e.salary DESC;


#	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table, 
#	but have not made any orders for products in the "products" table with a price greater than $100.

SELECT c.customer_name
FROM customers c
WHERE c.customer_id NOT IN (
  SELECT o.customer_id
  FROM orders o
  INNER JOIN order_details od ON o.order_id = od.order_id
  INNER JOIN products p ON od.product_id = p.product_id
  WHERE p.price > 100
);
 
#	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table, 
#	along with the total amount they have spent on all orders and the average amount they have spent per order.

SELECT c.customer_name,
       SUM(od.quantity * od.unit_price) AS total_spend,
       AVG(od.quantity * od.unit_price) AS avg_spend_per_order
FROM order_details od
INNER JOIN orders o ON od.order_id = o.order_id
INNER JOIN customers c ON o.customer_id = c.customer_id
GROUP BY c.customer_name;
 
#	Write a SQL query to retrieve the names of all products in the "products" table that have been ordered 
#	by customers in more than one country, along with the names of the countries where the products have been ordered.

SELECT p.product_name, GROUP_CONCAT(DISTINCT c.country_name) AS countries
FROM products p
JOIN order_details od ON p.product_id = od.product_id
JOIN orders o ON od.order_id = o.order_id
JOIN customers c ON o.customer_id = c.customer_id
GROUP BY p.product_id
HAVING COUNT(DISTINCT c.country_name) > 1;

