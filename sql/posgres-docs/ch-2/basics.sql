-- Dropping tables if they exist
DROP TABLE IF EXISTS wheather;

DROP TABLE IF EXISTS cities;

-- Create a new database called 'tblUsers'
CREATE TABLE
    wheather (
        city VARCHAR(80),
        temp_lo INT,
        --low temperature
        temp_hi INT,
        --high temperature
        prcp REAL,
        for_date DATE
    );

CREATE TABLE
    cities (name VARCHAR(80), location POINT);

-- Inserting values in table
-- this method requires to remember order of columns
INSERT INTO wheather
VALUES ('Samarkand', 16, 45, 0.20, '2022-06-20');

-- alternative way is to specify columns explicitly
INSERT INTO cities (name, location)
VALUES ('Samarkand', '(39.954868, 66.312073)');

INSERT INTO
    wheather (city, temp_lo, temp_hi, prcp, for_date)
VALUES ('Fergana', 20, 40, 0.7, '2022-06-21');

INSERT INTO
    wheather (for_date, city, temp_hi, temp_lo, prcp)
VALUES ('2022-06-19', 'Fergana', 37, 16, 0.5);

-- querying a table
-- * sign is shorthand for all columns
SELECT *
FROM wheather;

-- or specific columns can be specifies
SELECT city, temp_hi, for_date
FROM wheather;

-- we can also make use of expressions in our queries
SELECT
    city, (temp_hi + temp_lo) / 2 AS temp_avg,
    for_date
FROM wheather;

-- queries can be more sspecific with WHERE clauses
SELECT *
FROM wheather
WHERE city = 'Fergana' AND prcp < 0.6;

-- we can sort results of a query with ORDER BY clause
SELECT *
FROM wheather
ORDER BY city;

-- we can request that duplicate  rows to be removed  from the result of query
SELECT DISTINCT city
FROM wheather;

-- consistent results can be ensured by using DISTINCT and ORDER BY together
SELECT DISTINCT city
FROM wheather
ORDER BY city;