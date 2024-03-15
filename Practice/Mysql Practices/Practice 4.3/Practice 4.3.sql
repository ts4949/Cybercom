create database practice4_3;

use practice4_3;

CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    amount FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
       
INSERT INTO users VALUES
(1, 'John Doe', 'john.doe@example.com', 'password123', NOW(), NOW()),
(2, 'Jane Smith', 'jane.smith@example.com', 'securepass', NOW(), NOW()),
(3, 'Alice Johnson', 'alice.johnson@example.com', 'p@ssw0rd', NOW(), NOW()),
(4, 'Bob Brown', 'bob.brown@example.com', 'brownie123', NOW(), NOW()),
(5, 'Emily Davis', 'emily.davis@example.com', 'dav1semily', NOW(), NOW()),
(6, 'Michael Wilson', 'michael.wilson@example.com', 'wilsonmike', NOW(), NOW()),
(7, 'Sarah Lee', 'sarah.lee@example.com', 'leesarah123', NOW(), NOW()),
(8, 'David Clark', 'david.clark@example.com', 'clarkdavid1', NOW(), NOW()),
(9, 'Laura Martinez', 'laura.martinez@example.com', 'lauram1234', NOW(), NOW()),
(10, 'Kevin Adams', 'kevin.adams@example.com', 'adamskevin!', NOW(), NOW());

INSERT INTO orders VALUES
(101, 1, 100.00, NOW(), NOW()),
(102, 2, 50.00, NOW(), NOW()),
(103, 3, 75.00, NOW(), NOW()),
(104, 4, 25.00, NOW(), NOW()),
(105, 5, 150.00, NOW(), NOW()),
(106, 6, 10.00, NOW(), NOW()),
(107, 7, 50.00, NOW(), NOW()),
(108, 8, 125.00, NOW(), NOW()),
(109, 9, 75.00, NOW(), NOW()),
(110, 10, 50.00, NOW(), NOW());

#	

INSERT INTO users VALUES 
('John Doe', 'john.doe@example.com', '123456', NOW(), NOW());

select * from users;

#	Retrieve the names and email addresses of all users who have placed at least one order.

SELECT name, email
FROM users
WHERE id IN (SELECT DISTINCT user_id FROM orders);

#	Retrieve the total amount of orders placed by each user, sorted in descending order of total amount.
SELECT users.id, users.name, users.email, SUM(orders.amount) AS total_amount
FROM users
JOIN orders ON users.id = orders.user_id
GROUP BY users.id, users.name, users.email
ORDER BY total_amount DESC;

#	Retrieve the email address of the user who has placed the most orders.
SELECT u.email
FROM users u
JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.email
ORDER BY COUNT(o.id) DESC
LIMIT 1;

#	Retrieve the user IDs and the total amount of orders placed by users who have placed at least one order 
#	and whose total amount of orders exceeds $100.

SELECT user_id, SUM(amount) AS total_order_amount
FROM orders
GROUP BY user_id
HAVING SUM(amount) > 100;

#	Retrieve the number of users who have not placed any orders.

SELECT COUNT(*) AS num_users_no_orders
FROM users
WHERE id NOT IN (SELECT DISTINCT user_id FROM orders);

#	Update the user with ID 1 to change their email address to "jane.doe@example.com".

UPDATE users
SET email = 'jane.doe@example.com'
WHERE id = 1;

#	Delete all orders placed by users whose email address contains the string "test".

DELETE FROM orders
WHERE user_id IN (SELECT id FROM users WHERE email LIKE '%test%');

#	Retrieve the total amount of orders placed on each day of the current week, grouped by day.

SELECT DATE(created_at) AS order_day, SUM(amount) AS total_amount
FROM orders
WHERE YEARWEEK(created_at, 1) = YEARWEEK(CURDATE(), 1)
GROUP BY order_day;

#	Retrieve the IDs and email addresses of users who have placed an order in the current year 
#	and whose email address is in the format "example.com".

SELECT users.id, users.email
FROM users
JOIN orders ON users.id = orders.user_id
WHERE YEAR(orders.created_at) = YEAR(CURDATE()) AND users.email LIKE '%example.com';