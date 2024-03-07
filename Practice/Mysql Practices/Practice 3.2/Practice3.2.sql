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

insert into blog_posts values
(1, 'Example', 'Hello', 456, '2024-03-07 10:30:00', '2024-03-07 12:34:59'),
(2, 'Example1', 'Hii', 789, '2024-03-07 11:15:00', '2024-03-07 20:36:59'),
(3, 'Example2', 'Holla', 101, '2024-03-07 12:00:00', '2024-03-07 21:34:59'),
(4, 'Example3', 'Hey', 202, '2024-03-07 13:45:00', '2024-03-07 22:34:59');

INSERT INTO blog_comments VALUES
(123, 1, 'Great post!', 456, '2024-03-07 10:30:00'),
(231, 2, 'I have a question.', 789, '2024-03-07 11:15:00'),
(312, 3, 'Interesting topic!', 101, '2024-03-07 12:00:00'),
(423, 4, 'Nice work!', 202, '2024-03-07 13:45:00');

#	Write a query to retrieve the title and body of the five most recent blog posts
#	Along with the number of comments each post has.

SELECT
    bp.id AS post_id,
    bp.title,
    bp.body AS post_body,
    COUNT(bc.id) AS comment_count
FROM
    blog_posts bp
LEFT JOIN
    blog_comments bc ON bp.id = bc.post_id
GROUP BY
    bp.id, bp.title, bp.body
ORDER BY
    bp.created_at DESC
LIMIT 5;

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

INSERT INTO users VALUES
(1, 'John Doe', '2024-03-07 12:00:00'),
(2, 'Jane Smith', '2022-03-07 12:15:00'),
(3, 'Alice Johnson', '2024-03-07 12:30:00'),
(4, 'Bob Miller', '2022-03-07 12:45:00'),
(5, 'Eva Davis', '2024-03-07 13:00:00');

INSERT INTO posts VALUES
(101, 1, 'This is the first post.', '2024-03-07 12:17:00'),
(102, 2, 'Another post by Jane.', '2022-03-07 12:27:00'),
(103, 3, 'Greetings from Alice!', '2024-03-07 12:41:00'),
(104, 4, 'Random thoughts by Bob.', '2022-03-07 12:50:00'),
(105, 5, 'Evas post here!', '2024-03-07 13:10:00');

INSERT INTO likes VALUES
(1001, 1, 101, '2024-03-07 12:20:00'),
(1002, 2, 102, '2022-03-07 12:35:00'),
(1003, 3, 103, '2024-03-07 12:45:00'),
(1004, 4, 104, '2022-03-07 12:55:00'),
(1005, 5, 105, '2024-03-07 13:15:00');
 
#	Write a query to retrieve the name and number of posts for each user who joined the platform in the year 2022
#	Along with the total number of likes received for each user's posts.

SELECT
    u.name AS user_name,
    COUNT(p.id) AS num_posts,
    SUM(CASE WHEN l.id IS NOT NULL THEN 1 ELSE 0 END) AS num_likes
FROM
    users u
LEFT JOIN
    posts p ON u.id = p.user_id
LEFT JOIN
    likes l ON p.id = l.post_id
WHERE
    EXTRACT(YEAR FROM u.created_at) = 2022
GROUP BY
    u.id, u.name;

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