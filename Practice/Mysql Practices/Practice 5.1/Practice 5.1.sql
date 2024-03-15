create database practice5_1;

use practice5_1;

-- Create customers table
CREATE TABLE customers (
  customer_id INT PRIMARY KEY AUTO_INCREMENT,
  customer_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE
);

-- Insert 10 sample customers
INSERT INTO customers (customer_name, email)
VALUES ('John Doe', 'john.doe@example.com'),
       ('Jane Smith', 'jane.smith@example.com'),
       ('Michael Lee', 'michael.lee@example.com'),
       ('Sarah Jones', 'sarah.jones@example.com'),
       ('David Williams', 'david.williams@example.com'),
       ('Emily Brown', 'emily.brown@example.com'),
       ('Charles Miller', 'charles.miller@example.com'),
       ('Amanda Johnson', 'amanda.johnson@example.com'),
       ('Robert Thompson', 'robert.thompson@example.com'),
       ('Jessica Garcia', 'jessica.garcia@example.com');

-- Create products table
CREATE TABLE products (
  product_id INT PRIMARY KEY AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL
);

-- Insert 10 sample products
INSERT INTO products (product_name, price)
VALUES ('Shirt', 25.99),
       ('Pants', 39.99),
       ('Shoes', 79.95),
       ('Hat', 19.99),
       ('Book', 14.95),
       ('Electronics', 199.99),
       ('Appliance', 499.99),
       ('Toy', 12.99),
       ('Kitchenware', 45.99),
       ('Office Supplies', 9.99);

-- Create employees table
CREATE TABLE employees (
  employee_id INT PRIMARY KEY AUTO_INCREMENT,
  employee_name VARCHAR(50) NOT NULL,
  department_id INT NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  hire_date DATE NOT NULL
);

-- Insert 10 sample employees (assuming two departments)
INSERT INTO employees (employee_name, department_id, salary, hire_date)
VALUES ('Alice Johnson', 1, 55000.00, '2020-01-01'),
       ('Bob Smith', 2, 42000.00, '2021-02-15'),
       ('Charlie Brown', 1, 62000.00, '2019-07-10'),
       ('David Miller', 2, 38000.00, '2022-05-20'),
       ('Emily Williams', 1, 50000.00, '2018-12-05'),
       ('Frank Garcia', 2, 45000.00, '2023-09-01'),
       ('Grace Thompson', 1, 68000.00, '2020-03-12'),
       ('Henry Jones', 2, 40000.00, '2021-04-23'),
       ('Isabella Lee', 1, 53000.00, '2019-11-08'),
       ('Jack Brown', 2, 39000.00, '2022-06-14');

-- Create orders table
CREATE TABLE orders (
  order_id INT PRIMARY KEY AUTO_INCREMENT,
  customer_id INT NOT NULL,
  order_date DATE NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Insert 10 sample orders (assuming random customer assignments)
INSERT INTO orders (customer_id, order_date)
SELECT customer_id, DATE_ADD(CURDATE(), INTERVAL RAND() * 10 DAY)
FROM customers
ORDER BY RAND()
LIMIT 10;

-- Create order_details table
CREATE TABLE order_details (
  order_detail_id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Insert 10 sample order details (linking existing orders and products)
INSERT INTO order_details (order_id, product_id, quantity, unit_price)
SELECT o.order_id, p.product_id, FLOOR(RAND() * 3) + 1, 
       p.price + (RAND() - 0.5) * 5  -- Random price variation within +- $5
FROM orders o
INNER JOIN products p ON 1  -- Dummy join to access product prices
ORDER BY RAND()
LIMIT 10;


drop table products;
    
#	Write a SQL query to retrieve the top 10 customers who have made the most orders in the "orders" table, 
#	along with the total number of orders they have made.

SELECT c.customer_name, COUNT(*) AS total_orders
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id
GROUP BY c.customer_name
ORDER BY total_orders DESC
LIMIT 10;

#	Write a SQL query to retrieve the names of all employees who have sold more than $100,000 worth of products 
#	in the "order_details" table, sorted by the amount sold in descending order.

SELECT e.employee_name, SUM(od.quantity * od.unit_price) AS total_sold
FROM order_details od
INNER JOIN orders o ON od.order_id = o.order_id
INNER JOIN employees e ON o.employee_id = e.employee_id
GROUP BY e.employee_name
HAVING total_sold > 100000
ORDER BY total_sold DESC;

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

WITH avg_salary AS (
  SELECT AVG(salary) AS average_salary
  FROM employees
)
SELECT e.employee_name, e.salary
FROM employees e
INNER JOIN avg_salary a ON e.salary > a.average_salary
ORDER BY salary DESC;
 
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

WITH dept_min_salary AS (
  SELECT department_id, MIN(salary) AS min_salary
  FROM employees
  GROUP BY department_id
)
SELECT e.employee_name, e.salary
FROM employees e
INNER JOIN dept_min_salary d ON e.department_id = d.department_id AND e.salary > d.min_salary
ORDER BY department_id, salary DESC;
 
#	Write a SQL query to retrieve the names and salaries of the five highest paid employees in each department of the "employees" table, 
#	sorted by department ID and then by salary in descending order.

SELECT e.employee_name, e.salary
FROM employees e
INNER JOIN (
  SELECT department_id, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rank
  FROM employees
) AS ranked ON e.employee_id = ranked.employee_id
WHERE ranked.rank <= 5
ORDER BY department_id, salary DESC;
 
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

SELECT p.product_name, c.country_name
FROM products p
INNER JOIN order_details od ON p.product_id = od.product_id
INNER JOIN orders o ON od.order_id = o.order_id
INNER JOIN customers c ON o.customer_id = c.customer_id  -- No change
INNER JOIN (
  SELECT o.customer_id AS o_customer_id, COUNT(DISTINCT country_name) AS order_countries  -- Alias for customer_id
  FROM orders o  -- No change
  INNER JOIN customers c ON o.customer_id = c.customer_id  -- No change
  GROUP BY o_customer_id  -- Use the aliased customer_id
  HAVING order_countries > 1
) AS multi_country_orders ON o.customer_id = multi_country_orders.o_customer_id  -- Use the aliased customer_id
GROUP BY p.product_id, c.country_name
HAVING COUNT(DISTINCT c.country_name) > 1;

