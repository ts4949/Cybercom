create database practice5_2;

use practice5_2;

CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY,
    CustomerName VARCHAR(100)
);

CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    EmployeeName VARCHAR(100),
    City VARCHAR(50)
);

CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    ProductName VARCHAR(100),
    Category VARCHAR(50)
);

CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    CustomerID INT,
    EmployeeID INT,
    ProductID INT,
    Quantity INT,
    Price DECIMAL(10, 2),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

CREATE TABLE ShippingAddresses (
    CustomerID INT,
    City VARCHAR(50),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

INSERT INTO Customers (CustomerID, CustomerName)
VALUES 
(1, 'Customer 1'),
(2, 'Customer 2'),
(3, 'Customer 3'),
(4, 'Customer 4'),
(5, 'Customer 5'),
(6, 'Customer 6'),
(7, 'Customer 7'),
(8, 'Customer 8'),
(9, 'Customer 9'),
(10, 'Customer 10');

INSERT INTO Employees (EmployeeID, EmployeeName, City)
VALUES 
(1, 'Employee 1', 'City 1'),
(2, 'Employee 2', 'City 2'),
(3, 'Employee 3', 'City 3'),
(4, 'Employee 4', 'City 4'),
(5, 'Employee 5', 'City 5'),
(6, 'Employee 6', 'City 6'),
(7, 'Employee 7', 'City 7'),
(8, 'Employee 8', 'City 8'),
(9, 'Employee 9', 'City 9'),
(10, 'Employee 10', 'City 10');

INSERT INTO Products (ProductID, ProductName, Category)
VALUES 
(1, 'Product 1', 'Electronics'),
(2, 'Product 2', 'Clothing'),
(3, 'Product 3', 'Electronics'),
(4, 'Product 4', 'Clothing'),
(5, 'Product 5', 'Electronics'),
(6, 'Product 6', 'Clothing'),
(7, 'Product 7', 'Electronics'),
(8, 'Product 8', 'Clothing'),
(9, 'Product 9', 'Electronics'),
(10, 'Product 10', 'Clothing');

INSERT INTO Orders (OrderID, CustomerID, EmployeeID, ProductID, Quantity, Price)
VALUES 
(1, 1, 1, 1, 2, 100.00),
(2, 2, 2, 2, 1, 200.00),
(3, 3, 3, 3, 3, 300.00),
(4, 4, 4, 4, 1, 400.00),
(5, 5, 5, 5, 2, 500.00),
(6, 6, 6, 6, 3, 600.00),
(7, 7, 7, 7, 1, 700.00),
(8, 8, 8, 8, 2, 800.00),
(9, 9, 9, 9, 3, 900.00),
(10, 10, 10, 10, 1, 1000.00);

INSERT INTO ShippingAddresses (CustomerID, City)
VALUES 
(1, 'City 1'),
(2, 'City 2'),
(3, 'City 3'),
(4, 'City 4'),
(5, 'City 5'),
(6, 'City 6'),
(7, 'City 7'),
(8, 'City 8'),
(9, 'City 9'),
(10, 'City 10');

#	Write a SQL query to retrieve the names of all customers who have placed orders for products in the "Electronics" category, 
#	along with the total amount they have spent on all orders. The output should be sorted by the total amount spent in descending order.

SELECT c.CustomerName, SUM(o.Quantity * o.Price) AS TotalSpent
FROM Customers c
JOIN Orders o ON c.CustomerID = o.CustomerID
JOIN Products p ON o.ProductID = p.ProductID
WHERE p.Category = 'Electronics'
GROUP BY c.CustomerName
ORDER BY TotalSpent DESC;
 
#	Write a SQL query to retrieve the names of all employees who have sold at least one product in the "Clothing" category, 
#	along with the total revenue they have generated from those sales. The output should be sorted by total revenue generated in descending order.

SELECT e.EmployeeName, SUM(o.Quantity * o.Price) AS TotalRevenue
FROM Employees e
JOIN Orders o ON e.EmployeeID = o.EmployeeID
JOIN Products p ON o.ProductID = p.ProductID
WHERE p.Category = 'Clothing'
GROUP BY e.EmployeeName
HAVING TotalRevenue > 0
ORDER BY TotalRevenue DESC;
 
#	Write a SQL query to retrieve the names of all customers who have placed orders for products in both the "Electronics" and 
#	"Clothing" categories. The output should only include customers who have ordered products in both categories.

SELECT c.CustomerName
FROM Customers c
WHERE EXISTS (
    SELECT 1 FROM Orders o
    JOIN Products p ON o.ProductID = p.ProductID
    WHERE o.CustomerID = c.CustomerID AND p.Category = 'Electronics'
) AND EXISTS (
    SELECT 1 FROM Orders o
    JOIN Products p ON o.ProductID = p.ProductID
    WHERE o.CustomerID = c.CustomerID AND p.Category = 'Clothing'
);
 
#	Write a SQL query to retrieve the names of all employees who have sold at least one product to a customer who has a 
#	shipping address in the same city as the employee. The output should only include employees who have made at least one such sale.

SELECT DISTINCT e.EmployeeName
FROM Employees e
JOIN Orders o ON e.EmployeeID = o.EmployeeID
JOIN ShippingAddresses s ON o.CustomerID = s.CustomerID
WHERE e.City = s.City;
 
#	Write a SQL query to retrieve the names of all customers who have placed orders for products in the "Electronics" category, 
#	but have never placed an order for products in the "Clothing" category.

SELECT c.CustomerName
FROM Customers c
WHERE EXISTS (
    SELECT 1 FROM Orders o
    JOIN Products p ON o.ProductID = p.ProductID
    WHERE o.CustomerID = c.CustomerID AND p.Category = 'Electronics'
) AND NOT EXISTS (
    SELECT 1 FROM Orders o
    JOIN Products p ON o.ProductID = p.ProductID
    WHERE o.CustomerID = c.CustomerID AND p.Category = 'Clothing'
);
 
#	Write a SQL query to retrieve the names of all employees who have sold at least one product to customers who have placed orders 
#	for products in the "Electronics" category, but have never placed an order for products in the "Clothing" category. The output should only include employees who have made at least one such sale.

SELECT e.EmployeeName
FROM Employees e
WHERE EXISTS (
    SELECT 1 FROM Orders o
    JOIN Products p ON o.ProductID = p.ProductID
    WHERE o.EmployeeID = e.EmployeeID AND p.Category = 'Electronics'
    AND o.CustomerID NOT IN (
        SELECT o.CustomerID FROM Orders o
        JOIN Products p ON o.ProductID = p.ProductID
        WHERE p.Category = 'Clothing'
    )
);
 
#	Write a SQL query to retrieve the names of all customers who have placed orders for more than 
#	five different products in the "Electronics" category.

SELECT c.CustomerName
FROM Customers c
JOIN Orders o ON c.CustomerID = o.CustomerID
JOIN Products p ON o.ProductID = p.ProductID
WHERE p.Category = 'Electronics'
GROUP BY c.CustomerName
HAVING COUNT(DISTINCT p.ProductID) > 5;
 
#	Write a SQL query to retrieve the names of all employees who have sold products to customers who have placed orders for more than 
#	five different products in the "Electronics" category. The output should only include employees who have made at least one such sale.

SELECT e.EmployeeName
FROM Employees e
JOIN Orders o ON e.EmployeeID = o.EmployeeID
JOIN Products p ON o.ProductID = p.ProductID
WHERE p.Category = 'Electronics'
GROUP BY e.EmployeeName
HAVING COUNT(DISTINCT p.ProductID) > 5;