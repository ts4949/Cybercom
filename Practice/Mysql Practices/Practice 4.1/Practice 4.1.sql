create database if not exists practice4_1;

use practice4_1;

-- Create authors table
CREATE TABLE authors (
    id INT PRIMARY KEY,
    name VARCHAR(255)
);

-- Insert data into authors table
INSERT INTO authors (id, name) VALUES
(1, 'Author 1'),
(2, 'Author 2'),
(3, 'Author 3'),
(4, 'Author 4'),
(5, 'Author 5');

-- Create book_categories table
CREATE TABLE book_categories (
    id INT PRIMARY KEY,
    name VARCHAR(255)
);

-- Insert data into book_categories table
INSERT INTO book_categories (id, name) VALUES
(1, 'Fiction'),
(2, 'Non-Fiction'),
(3, 'Mystery'),
(4, 'Science Fiction'),
(5, 'Biography');

-- Create books table
CREATE TABLE books (
    id INT PRIMARY KEY,
    title VARCHAR(255),
    author_id INT,
    publication_date DATE,
    FOREIGN KEY (author_id) REFERENCES authors(id)
);

-- Insert data into books table
INSERT INTO books (id, title, author_id, publication_date) VALUES
(1, 'Book 1', 1, '2023-01-15'),
(2, 'Book 2', 2, '2022-05-20'),
(3, 'Book 3', 3, '2021-11-08'),
(4, 'Book 4', 4, '2020-09-25'),
(5, 'Book 5', 5, '2019-04-12'),
(6, 'Book 6', 1, '2023-08-03'),
(7, 'Book 7', 2, '2022-02-28'),
(8, 'Book 8', 3, '2021-06-17'),
(9, 'Book 9', 4, '2020-12-05'),
(10, 'Book 10', 5, '2019-10-22');

-- Create book_category_mappings table
CREATE TABLE book_category_mappings (
    id INT PRIMARY KEY,
    book_id INT,
    category_id INT,
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (category_id) REFERENCES book_categories(id)
);

-- Insert data into book_category_mappings table
INSERT INTO book_category_mappings (id, book_id, category_id) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5),
(6, 6, 1),
(7, 7, 2),
(8, 8, 3),
(9, 9, 4),
(10, 10, 5);

-- Create customers table
CREATE TABLE customers (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255)
);

-- Insert data into customers table
INSERT INTO customers (id, name, email) VALUES
(1, 'Customer 1', 'customer1@example.com'),
(2, 'Customer 2', 'customer2@example.com'),
(3, 'Customer 3', 'customer3@example.com'),
(4, 'Customer 4', 'customer4@example.com'),
(5, 'Customer 5', 'customer5@example.com');

-- Create book_borrowings table
CREATE TABLE book_borrowings (
    id INT PRIMARY KEY,
    book_id INT,
    customer_id INT,
    borrow_date DATE,
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- Insert data into book_borrowings table
INSERT INTO book_borrowings (id, book_id, customer_id, borrow_date) VALUES
(1, 1, 1, '2023-02-01'),
(2, 2, 2, '2022-06-15'),
(3, 3, 3, '2021-12-10'),
(4, 4, 4, '2020-10-05'),
(5, 5, 5, '2019-05-20'),
(6, 6, 1, '2023-09-15'),
(7, 7, 2, '2022-03-01'),
(8, 8, 3, '2021-07-20'),
(9, 9, 4, '2021-01-10'),
(10, 10, 5, '2020-11-03');

#	Write a query to find all books published in the year 2020.

SELECT *
FROM books
WHERE YEAR(publication_date) = 2020;

#	Write a query to find the name of the author who has written the most number of books.

SELECT authors.name
FROM authors
JOIN books ON authors.id = books.author_id
GROUP BY authors.id
ORDER BY COUNT(books.id) DESC
LIMIT 1;

#	Write a query to find the name of the category with the most number of books.

SELECT bc.name
FROM book_categories bc
JOIN book_category_mappings bcm ON bc.id = bcm.category_id
GROUP BY bc.id
ORDER BY COUNT(bcm.book_id) DESC
LIMIT 1;

#	Write a query to find the name of the author who has written the most number of books in the category "fiction".

SELECT authors.name
FROM authors
JOIN books ON authors.id = books.author_id
JOIN book_category_mappings bcm ON books.id = bcm.book_id
JOIN book_categories bc ON bcm.category_id = bc.id
WHERE bc.name = 'Fiction'
GROUP BY authors.id
ORDER BY COUNT(books.id) DESC
LIMIT 1;

#	Write a query to find the titles of the top 5 most popular books. 
#	The popularity of a book is defined as the number of times it has been borrowed by customers. 

SELECT books.title
FROM books
JOIN book_borrowings bb ON books.id = bb.book_id
GROUP BY books.id
ORDER BY COUNT(bb.id) DESC
LIMIT 5;