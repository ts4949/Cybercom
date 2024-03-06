create database practice3_1;

use practice3_1;

-- CASE 1

create table customers(
id int primary key,
name varchar(60),
email varchar(30),
created_at timestamp); 

insert into customers values
(1,	'John Smith', 'johnsmith@gmail.com', '2022-01-01 10:00:00'),
(2,	'Jane Doe',	'janedoe@yahoo.com', '2022-01-02 11:00:00'),
(3,	'Bob Johnson', 'bobjohnson@hotmail.com', '2022-01-03 12:00:00'),
(4,	'Sarah Lee', 'sarahlee@gmail.com', '2022-01-04 13:00:00'),
(5,	'David Kim', 'davidkim@yahoo.com', '2022-01-05 14:00:00');

# 	Write a query that selects all customers whose email address ends with "@gmail.com".

SELECT *
FROM customers
WHERE email LIKE '%@gmail.com';

# 	Write a query that selects the customer with the earliest created_at date.

SELECT *
FROM customers
ORDER BY created_at
LIMIT 1;

#	Write a query that selects the name and email of customers who were created on or after January 3, 2022. 

SELECT name, email
FROM customers
WHERE created_at >= '2022-01-03';

#	Write a query that updates the email address of the customer with id=5 to "davidkim@gmail.com".

UPDATE customers
SET email = 'davidkim@gmail.com'
WHERE id = 5;

#	Write a query that deletes the customer with id=2.

DELETE FROM customers
WHERE id = 2;

#	Write a query that calculates the total number of customers in the "customers" table.

SELECT COUNT(*) AS total_customers
FROM customers;

-- CASE 2 

CREATE TABLE inventory (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    quantity INT,
    price DECIMAL(10,2),
    category VARCHAR(50)
);

insert into inventory values
(1, 'Smartphone', 20, 45000, 'Electronics'),
(2, 'Chair', 50, 3500, 'Furniture'),
(3, 'Laptop', 20, 95000, 'Electronics'),
(4, 'Tablet', 0, 4500, 'Electronics'),
(5, 'Table', 17, 26000, 'Furniture');

# 	Write a query to retrieve the name and price of all items in the inventory where the 
#	quantity is greater than 0 and the category is 'electronics', sorted in descending order by price.

SELECT name, price
FROM inventory
WHERE quantity > 0 AND category = 'electronics'
ORDER BY price DESC;

-- CASE 3

CREATE TABLE sales (
    id INT PRIMARY KEY,
    date DATE,
    customer_id INT,
    product_id INT,
    quantity INT,
    total_price DECIMAL(10,2)
);

insert into sales values
(1, '2021-12-01', 101, 501, 30, 1000000),
(2, '2022-03-01', 102, 502, 40, 2500000),
(3, '2021-10-04', 103, 503, 50, 300000),
(4, '2023-09-03', 104, 504, 20, 9000000),
(5, '2021-11-05', 105, 505, 03, 90000);

#	Write a query to retrieve the total sales for each month in the year 2021, sorted in ascending order by month.

SELECT
    MONTH(date) AS month,
    SUM(total_price) AS total_sales
FROM
    sales
WHERE
    YEAR(date) = 2021
GROUP BY
    MONTH(date)
ORDER BY
    MONTH(date);