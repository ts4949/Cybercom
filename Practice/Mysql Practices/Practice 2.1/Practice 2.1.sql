create database practice2_1;

use practice2_1;

#	Create a database structure for employee leave application. 
#	It should include all the employee's information as well as their leave information

CREATE TABLE employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    department VARCHAR(50),
    position VARCHAR(50),
    hire_date DATE NOT NULL);

CREATE TABLE leave_requests (
    leave_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    leave_type VARCHAR(50) NOT NULL,
    status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending');

#	Write an SQL query to report the movies with an odd-numbered ID and a description that is not "boring". 
#	Return the result table ordered by rating in descending order.

create table cinema (
id int primary key, 
movie varchar(50), 
description varchar(255), 
rating decimal(4,2) not null check (rating >= 0 AND rating <= 10));

insert into cinema values
(1, 'War', 'Great 3D', 8.9),
(2, 'Science', 'Fiction', 8.5),
(3, 'Irish', 'Boring', 6.2),
(4, 'Ice song', 'Fantasy', 8.6),
(5, 'House Card', 'Interesting', 9.1);

select * from cinema where 
(MOD(id, 2) = 1 AND description <> 'boring') order by id desc;

# 	Write an SQL query to swap all 'f' and 'm' values (i.e., change all 'f' values to 'm' and vice versa) with a single update statement and no intermediate temporary tables.
#	Note that you must write a single update statement, do not write any select statement for this problem.

create table salary (
id int primary key, 
name varchar(60),
sex enum('m', 'f'),
salary int(10));

insert into salary values
(1, 'A', 'f', 2500),
(2, 'B', 'm', 1500),
(3, 'C', 'f', 5500),
(4, 'D', 'm', 500);

update salary 
set sex = case
    when sex = 'f' then 'm'
    when sex = 'm' then 'f'	
end;

select * from salary;

# 	Write an SQL query to delete all the duplicate emails, keeping only one unique email with the smallest id. 
#	Return the result table in any order.

create table person (
    id int primary key,
    email varchar(60)
);

create trigger before_insert_person
before insert on person
for each row
set new.email = LOWER(new.email);

INSERT INTO person (id, email)
VALUES
    (1, 'john@example.com'),
    (2, 'bob@example.com'),
    (3, 'John@example.com');
    
DELETE FROM person
WHERE id NOT IN (
    SELECT id
    FROM (
        SELECT MIN(id) AS id
        FROM person
        GROUP BY email
    ) AS subquery
);
   
select * from person;

#	Write an SQL query to report all customers who never order anything. 
#	Return the result table in any order.

create table customers(
customer_id int primary key,
name varchar (60));

create table orders(
id int primary key,
customer_id int, 
foreign key (customer_id) references customers(customer_id));

insert into customers values
(1, 'Joe'),
(2, 'Henry'),
(3, 'Sam'),
(4, 'Max');

insert into orders values
(1, 3),
(2, 1);

SELECT customers.customer_id, customers.name
FROM customers
LEFT JOIN orders ON customers.customer_id = orders.customer_id
WHERE orders.id IS NULL;

# 	Write an SQL query to create index on the email column.

create table test(
id int auto_increment primary key,
email varchar (60));

create unique index idx_email on test(email);

#	Create a database schema for student grade system. 
#	It contains student data and their grade of each subject based on the different semester.

create table students (
    student_id int primary key,
    first_name varchar(50),
    last_name varchar(50),
    date_of_birth date);

create table subjects (
    subject_id int primary key,
    subject_name varchar(100));

create table semesters (
    semester_id int primary key,
    semester_name varchar(20));

create table grades (
    grade_id int primary key,
    student_id int,
    subject_id int,
    semester_id int,
    grade VARCHAR(2), -- Assuming grades are represented as letters (A, B, C, etc.)
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (subject_id) REFERENCES Subjects(subject_id),
    FOREIGN KEY (semester_id) REFERENCES Semesters(semester_id)
);

#	Write an SQL query to report the first name, last name, city, and state of each person in the Person table. 
#	If the address of a personId is not present in the Address table, report null instead. 
#	Return the result table in any order

create table persons(
personId int primary key,
lastName varchar(50),
firstNAme varchar(50));

create table address(
addressId int primary key,
personId int,
city varchar(20),
state varchar(20));

insert into persons values
(1, 'Wang', 'Allen'),
(2, 'Alice', 'Bob');

insert into address values
(1, 2, 'New York City', 'New York'),
(2, 3, 'Leetcode', 'California');

SELECT 
    p.firstName,
    p.lastName,
    a.city,
    a.state
FROM persons p
LEFT JOIN address a ON p.personId = a.personId;