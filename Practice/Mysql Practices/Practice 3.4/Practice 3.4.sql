create database practice3_4;

use practice3_4;

-- CASE 1

CREATE TABLE Cars (
    CarID INT PRIMARY KEY,
    Brand VARCHAR(50),
    Model VARCHAR(50),
    Year INT,
    Mileage INT,
    Price DECIMAL(10,2),
    Available BIT);

CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100),
    PhoneNumber VARCHAR(20));

CREATE TABLE Sales (
    SaleID INT PRIMARY KEY,
    CarID INT,
    CustomerID INT,
    SaleDate DATE,
    SalePrice DECIMAL(10,2),
    FOREIGN KEY (CarID) REFERENCES Cars(CarID),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID));

INSERT INTO Cars (CarID, Brand, Model, Year, Mileage, Price, Available)
VALUES
    (1, 'Toyota', 'Camry', 2022, 5000, 25000.00, 1),
    (2, 'Honda', 'Accord', 2021, 8000, 28000.00, 1),
    (3, 'Ford', 'Focus', 2020, 6000, 20000.00, 1),
    (4, 'Chevrolet', 'Malibu', 2021, 7000, 22000.00, 0),
    (5, 'Nissan', 'Altima', 2022, 3000, 26000.00, 1),
    (6, 'Hyundai', 'Elantra', 2020, 9000, 18000.00, 1),
    (7, 'Kia', 'Optima', 2021, 7500, 23000.00, 0),
    (8, 'Mazda', 'Mazda3', 2022, 4000, 24000.00, 1),
    (9, 'Volkswagen', 'Jetta', 2020, 8500, 21000.00, 1),
    (10, 'Subaru', 'Impreza', 2021, 5500, 27000.00, 1);

INSERT INTO Customers (CustomerID, FirstName, LastName, Email, PhoneNumber)
VALUES
    (1, 'John', 'Doe', 'john.doe@example.com', '555-1234'),
    (2, 'Jane', 'Smith', 'jane.smith@example.com', '555-5678'),
    (3, 'Robert', 'Johnson', 'robert.johnson@example.com', '555-9101'),
    (4, 'Emily', 'Davis', 'emily.davis@example.com', '555-1122'),
    (5, 'Michael', 'Anderson', 'michael.anderson@example.com', '555-3344'),
    (6, 'Olivia', 'Wilson', 'olivia.wilson@example.com', '555-5566'),
    (7, 'David', 'Taylor', 'david.taylor@example.com', '555-7788'),
    (8, 'Sophia', 'Moore', 'sophia.moore@example.com', '555-9900'),
    (9, 'Ethan', 'Martin', 'ethan.martin@example.com', '555-2233'),
    (10, 'Emma', 'Brown', 'emma.brown@example.com', '555-4455');

INSERT INTO Sales (SaleID, CarID, CustomerID, SaleDate, SalePrice)
VALUES
    (1, 1, 1, '2022-02-15', 24000.00),
    (2, 2, 2, '2022-03-20', 26000.00),
    (3, 3, 3, '2022-04-10', 18000.00),
    (4, 4, 4, '2022-05-05', 22000.00),
    (5, 5, 5, '2022-06-12', 27000.00),
    (6, 6, 6, '2022-07-08', 20000.00),
    (7, 7, 7, '2022-08-25', 23000.00),
    (8, 8, 8, '2022-09-30', 25000.00),
    (9, 9, 9, '2022-10-15', 21000.00),
    (10, 10, 10, '2022-11-20', 28000.00);
    
#	Retrieve the top 10 most expensive cars from the Cars table.

SELECT *
FROM Cars
ORDER BY Price DESC
LIMIT 10;

#	Retrieve the average price of all available cars from the Cars table.

SELECT AVG(Price) AS average_price
FROM Cars
WHERE Available = 1;

#	Retrieve the list of customers who have purchased a car, along with the total number of cars each customer has purchased:

SELECT c.CustomerID, c.FirstName, c.LastName, COUNT(s.CarID) AS TotalPurchases
FROM Customers c
LEFT JOIN Sales s ON c.CustomerID = s.CustomerID
GROUP BY c.CustomerID, c.FirstName, c.LastName;

#	Retrieve the list of customers who have not yet made a purchase.

SELECT CustomerID, FirstName, LastName
FROM Customers
WHERE CustomerID NOT IN (SELECT DISTINCT CustomerID FROM Sales);

#	Insert a new car into the Cars table.

INSERT INTO Cars VALUES (11, 'Toyota', 'Corolla', 2022, 0, 20000.00, 1);

#	Update the price of all cars in the Cars table by adding 10% to their current price.

UPDATE Cars
SET Price = Price * 1.10;

#	Delete all sales from the Sales table that occurred before January 1, 2022.

DELETE FROM Sales
WHERE SaleDate < '2022-01-01';

-- CASE 2

CREATE TABLE employees (
    employeeID INT PRIMARY KEY,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    title VARCHAR(100),
    departmentName VARCHAR(50),
    salary DECIMAL(10,2),
    hireDate DATE
);

INSERT INTO employees VALUES
    (1, 'John', 'Doe', 'Manager of Sales', 'Sales', 75000.00, '1998-05-15'),
    (2, 'Jane', 'Smith', 'Senior Developer', 'IT', 80000.00, '2005-09-20'),
    (3, 'Robert', 'Johnson', 'Manager of HR', 'HR', 70000.00, '2002-11-10'),
    (4, 'Emily', 'Davis', 'Manager of Marketing', 'Marketing', 78000.00, '2008-03-25'),
    (5, 'Michael', 'Anderson', 'Developer', 'IT', 70000.00, '2010-08-12'),
    (6, 'Olivia', 'Wilson', 'Marketing Coordinator', 'Marketing', 55000.00, '2012-02-28'),
    (7, 'David', 'Taylor', 'HR Specialist', 'HR', 60000.00, '2015-07-05'),
    (8, 'Sophia', 'Moore', 'Sales Associate', 'Sales', 62000.00, '2016-11-15'),
    (9, 'Ethan', 'Martin', 'Developer', 'IT', 75000.00, '2018-04-20'),
    (10, 'Emma', 'Brown', 'Marketing Manager', 'Marketing', 78000.00, '2019-09-10'),
    (11, 'Aiden', 'Johnson', 'Sales Manager', 'Sales', 80000.00, '2020-03-08'),
    (12, 'Chloe', 'Davis', 'HR Manager', 'HR', 78000.00, '2021-01-25'),
    (13, 'Logan', 'Smith', 'Developer', 'IT', 72000.00, '2022-05-14'),
    (14, 'Ava', 'Johnson', 'Marketing Specialist', 'Marketing', 60000.00, '2023-09-30');
    
    