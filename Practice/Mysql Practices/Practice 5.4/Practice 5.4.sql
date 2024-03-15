create database practice5_4;

use practice5_4;

-- Create the customers table
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(50)
);

-- Create the orders table
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    order_total DECIMAL(10,2),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Create the returns table
CREATE TABLE returns (
    return_id INT PRIMARY KEY,
    order_id INT,
    return_date DATE,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

-- Create the categories table
CREATE TABLE categories (
    category_id INT PRIMARY KEY,
    category_name VARCHAR(50)
);

-- Create the products table
CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(50),
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

-- Create the order_items table
CREATE TABLE order_items (
    order_item_id INT PRIMARY KEY,
    order_id INT,
    product_id INT,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Insert sample data into customers table
INSERT INTO customers (customer_id, customer_name) VALUES
    (1, 'John Doe'), (2, 'Jane Smith'), (3, 'Bob Johnson'), (4, 'Emily Williams'), (5, 'Michael Brown'),
    (6, 'Sarah Davis'), (7, 'David Wilson'), (8, 'Jessica Taylor'), (9, 'Christopher Anderson'), (10, 'Ashley Miller');

-- Insert sample data into orders table
INSERT INTO orders (order_id, customer_id, order_date, order_total) VALUES
    (1, 1, '2022-01-01', 50.00), (2, 2, '2022-01-15', 75.25), (3, 3, '2022-02-01', 100.00), (4, 4, '2022-02-15', 120.50),
    (5, 5, '2022-03-01', 80.75), (6, 6, '2022-03-15', 95.00), (7, 7, '2022-04-01', 60.25), (8, 8, '2022-04-15', 110.00),
    (9, 9, '2022-05-01', 85.50), (10, 10, '2022-05-15', 70.00);

-- Insert sample data into returns table
INSERT INTO returns (return_id, order_id, return_date) VALUES
    (1, 2, '2022-01-20'), (2, 4, '2022-02-20'), (3, 6, '2022-03-20'), (4, 8, '2022-04-20'), (5, 10, '2022-05-20');

-- Insert sample data into categories table
INSERT INTO categories (category_id, category_name) VALUES
    (1, 'Electronics'), (2, 'Clothing'), (3, 'Books'), (4, 'Sports');

-- Insert sample data into products table
INSERT INTO products (product_id, product_name, category_id) VALUES
    (1, 'Laptop', 1), (2, 'Shirt', 2), (3, 'Novel', 3), (4, 'Tennis Ball', 4),
    (5, 'Smartphone', 1), (6, 'Pants', 2), (7, 'Textbook', 3), (8, 'Basketball', 4);

-- Insert sample data into order_items table
INSERT INTO order_items (order_item_id, order_id, product_id) VALUES
    (1, 1, 1), (2, 2, 2), (3, 2, 3), (4, 3, 4), (5, 3, 5), (6, 4, 6), (7, 4, 7), (8, 5, 8),
    (9, 6, 1), (10, 6, 2), (11, 7, 3), (12, 8, 4), (13, 8, 5), (14, 9, 6), (15, 10, 7);
    

#	Write a SQL query to retrieve the names of all customers who have made at least one order in the "orders" table and have not made any orders in the "returns" table.

SELECT c.customer_name
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
LEFT JOIN returns r ON o.order_id = r.order_id
WHERE r.return_id IS NULL
GROUP BY c.customer_name;
 
#	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have returned at least one item in the "returns" table.

SELECT c.customer_name
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
INNER JOIN returns r ON o.order_id = r.order_id
GROUP BY c.customer_name;
 
#	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have not returned any items in the "returns" table.

SELECT c.customer_name
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
LEFT JOIN returns r ON o.order_id = r.order_id
WHERE r.return_id IS NULL
GROUP BY c.customer_name;
 
#	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have returned more items than they have ordered.

SELECT c.customer_name
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
INNER JOIN (
    SELECT order_id, COUNT(*) AS num_returns
    FROM returns
    GROUP BY order_id
) r ON o.order_id = r.order_id
INNER JOIN (
    SELECT order_id, COUNT(*) AS num_order_items
    FROM order_items
    GROUP BY order_id
) oi ON o.order_id = oi.order_id
WHERE r.num_returns > oi.num_order_items
GROUP BY c.customer_name;
 
#	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have not returned more items than they have ordered.

SELECT c.customer_name
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
INNER JOIN (
    SELECT order_id, COUNT(*) AS num_returns
    FROM returns
    GROUP BY order_id
) r ON o.order_id = r.order_id
INNER JOIN (
    SELECT order_id, COUNT(*) AS num_order_items
    FROM order_items
    GROUP BY order_id
) oi ON o.order_id = oi.order_id
WHERE r.num_returns <= oi.num_order_items OR r.num_returns IS NULL
GROUP BY c.customer_name;
 
#	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have spent more than $100 in total on all orders.

SELECT c.customer_name
FROM customers c
INNER JOIN (
    SELECT customer_id, SUM(order_total) AS total_spent
    FROM orders
    GROUP BY customer_id
    HAVING SUM(order_total) > 100
) o ON c.customer_id = o.customer_id;
 
#	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have spent more than $100 in total on all orders, sorted by the total amount spent in descending order.

SELECT c.customer_name, o.total_spent
FROM customers c
INNER JOIN (
    SELECT customer_id, SUM(order_total) AS total_spent
    FROM orders
    GROUP BY customer_id
    HAVING SUM(order_total) > 100
) o ON c.customer_id = o.customer_id
ORDER BY o.total_spent DESC;
 
#	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have ordered products in all categories.

SELECT c.customer_name
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
INNER JOIN order_items oi ON o.order_id = oi.order_id
INNER JOIN products p ON oi.product_id = p.product_id
INNER JOIN categories cat ON p.category_id = cat.category_id
GROUP BY c.customer_name
HAVING COUNT(DISTINCT cat.category_id) = (SELECT COUNT(*) FROM categories);
 
#	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have not ordered products in all categories.

SELECT c.customer_name
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
INNER JOIN order_items oi ON o.order_id = oi.order_id
INNER JOIN products p ON oi.product_id = p.product_id
INNER JOIN categories cat ON p.category_id = cat.category_id
GROUP BY c.customer_name
HAVING COUNT(DISTINCT cat.category_id) < (SELECT COUNT(*) FROM categories);
 
#	Write a SQL query to retrieve the names of all customers who have made orders in the "orders" table and have ordered products in at least two different categories.

SELECT c.customer_name
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
INNER JOIN order_items oi ON o.order_id = oi.order_id
INNER JOIN products p ON oi.product_id = p.product_id
INNER JOIN categories cat ON p.category_id = cat.category_id
GROUP BY c.customer_name
HAVING COUNT(DISTINCT cat.category_id) >= 2;