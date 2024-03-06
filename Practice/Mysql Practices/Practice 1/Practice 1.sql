create database practice1;

use practice1;

#	Create a database structure for product and categories. 
#	One product can be in more than one category and one category can have multiple products.

create table products (
    product_id int primary key,
    product_name varchar(255) not null);


create table categories (
    category_id int primary key,
    category_name varchar(255) not null);


create table product_category (
    product_id int,
    category_id int,
    primary key (product_id, category_id),
    foreign key (product_id) REFERENCES products(product_id),
    foreign key (category_id) REFERENCES categories(category_id));

#	Create a database structure for students and its college. 
#	One student can be on one college only.

CREATE TABLE Colleges (
    college_id INT PRIMARY KEY AUTO_INCREMENT,
    college_name VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL);

CREATE TABLE Students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    student_name VARCHAR(100) NOT NULL,
    student_email VARCHAR(100) UNIQUE NOT NULL,
    college_id INT,
    FOREIGN KEY (college_id) REFERENCES Colleges(college_id));

#	Create a database structure for worldwide cricket team. 
#	Database will contain, each player’s name, its country, it’s expertise and so on

CREATE TABLE Countries (
    country_id INT PRIMARY KEY AUTO_INCREMENT,
    country_name VARCHAR(100) NOT NULL);

CREATE TABLE Players (
    player_id INT PRIMARY KEY AUTO_INCREMENT,
    player_name VARCHAR(100) NOT NULL,
    country_id INT,
    expertise VARCHAR(50),
    batting_style VARCHAR(50),
    bowling_style VARCHAR(50),
    date_of_birth DATE,
    FOREIGN KEY (country_id) REFERENCES Countries(country_id));