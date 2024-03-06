create database practice3_2;

use practice3_2;

-- CASE 1

CREATE TABLE blog_posts (
    id INT PRIMARY KEY,
    title VARCHAR(255),
    body TEXT,
    author_id INT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
CREATE TABLE blog_comments (
    id INT PRIMARY KEY,
    post_id INT,
    body TEXT,
    author_id INT,
    created_at TIMESTAMP
);

#	Write a query to retrieve the title and body of the five most recent blog posts
#	Along with the number of comments each post has.

-- CASE 2

CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    created_at TIMESTAMP
);
CREATE TABLE posts (
    id INT PRIMARY KEY,
    user_id INT,
    body TEXT,
    created_at TIMESTAMP
);
CREATE TABLE likes (
    id INT PRIMARY KEY,
    user_id INT,
    post_id INT,
    created_at TIMESTAMP
);

#	Write a query to retrieve the name and number of posts for each user who joined the platform in the year 2022
#	Along with the total number of likes received for each user's posts.

-- CASE 3

create table employees(
id int primary key,
name varchar(30),
department varchar(20),
salary bigint);

insert into employees values
(1, 'A', ' Developer', 20000),
(2, 'B', 'BDE', 51000),
(3, 'C', 'HR', 15000),
(4, 'D', 'Sales', 100000);

#	Write a SQL query to retrieve the names and salaries of all employees in the "sales" department who earn more than $50,000 per year.

SELECT name, salary
FROM employees
WHERE department = 'Sales' AND salary > 50000;

-- CASE 4

create table orders(
id int primary key,
customer_id int,
order_date date,
total_amount int);

insert into orders values
(1, '1001', '2024-02-25', 900),
(2, '1002', '2024-01-31', 1800),
(3, '1003', '2024-03-06', 2100),
(4, '1004', '2024-02-02', 2000);

# Write a SQL query to calculate the total amount of orders for each customer, sorted in descending order by total amount.

SELECT customer_id, SUM(total_amount) AS total_order_amount
FROM orders
GROUP BY customer_id
ORDER BY total_order_amount DESC;