create database practice2_2;

use practice2_2;
 
-- CASE 1

create table activity(
player_id int,
device_id int,
event_date date,
games_played int,
primary key(player_id, event_date));

insert into activity values
(1, 2, '2016-03-01', 5 ),
(1, 2, '2016-05-02', 6),
(2, 3, '2017-06-25', 1),
(3, 1, '2016-03-02', 0),
(3, 4, '2018-07-03', 5);

#	Write an SQL query to report the first login date for each player. 
#	Return the result table in any order.

SELECT player_id, MIN(event_date) AS first_login_date
FROM activity
GROUP BY player_id;

#	Write an SQL query to report the device that is first logged in for each player. 
#	Return the result table in any order.

SELECT
    player_id,
    MIN(device_id) AS first_logged_device
FROM
    activity
GROUP BY
    player_id;
    
#	Write an SQL query to report for each player and date, how many games played so far by the player. 
#	That is, the total number of games played by the player until that date.
#	Check the example for clarity. Return the result table in any order.

update activity set player_id=1 where player_id=2;

SELECT
    player_id,
    event_date,
    games_played,
    (SELECT SUM(games_played)
     FROM activity a2
     WHERE a2.player_id = a1.player_id
       AND a2.event_date <= a1.event_date) AS games_played_so_far
FROM activity a1;
    
-- CASE 2

create table courses(
student varchar(50),
class varchar(20),
primary key (student, class));    

insert into courses values
('A', 'Math'),
('B', 'English'),
('C', 'Math'),
('D', 'Biology'),
('E', 'Math'),
('F', 'Computer'),
('G', 'Math'),
('H', 'Math'),
('I', 'Math');

#	Write an SQL query to report all the classes that have at least five students. 
#	Return the result table in any order.

SELECT class
FROM courses
GROUP BY class
HAVING COUNT(student) >= 5;

-- CASE 3

create table world(
name varchar(30) primary key,
continent varchar(30),
area int,
population int,
gdp bigint);

insert into world values
('Afghanistan', 'Asia', 652230, 25500100, 20343000000),
('Albania', 'Europe', 28748, 2831741, 12960000000),
('Algeria', 'Africa', 2381741, 37100000, 188681000000),
('Andorra', 'Europe', 468, 78115, 3712000000),
('Angola', 'Africa', 1246700, 20609294, 100990000000);

#	Write an SQL query to report the name, population, and area of the big countries.

SELECT name, population, area
FROM world
WHERE area >= 3000000 OR population >= 25000000;