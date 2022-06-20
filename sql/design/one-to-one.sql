DROP TABLE IF EXISTS capitals
DROP TABLE IF EXISTS countries;

CREATE TABLE
    capitals (
        capital_id BIGSERIAL PRIMARY KEY,
        name VARCHAR(100),
        country_id INT
    );

CREATE TABLE
    countries (
        country_id BIGSERIAL PRIMARY KEY,
        name VARCHAR(100),
        capital_id INT,
        CONSTRAINT fk_capital_id FOREIGN KEY(capital_id) REFERENCES capitals(capital_id)
    );

ALTER TABLE capitals
ADD
    FOREIGN KEY (country_id) REFERENCES countries(country_id);

INSERT INTO countries (name)
VALUES ('Uzbekistan');

INSERT INTO capitals (name)
VALUES ('Tashkent');

UPDATE countries
SET capital_id = 1
WHERE country_id = 1;

UPDATE capitals
SET country_id = 1
WHERE capital_id = 1;

SELECT *
FROM capitals;

SELECT *
FROM countries;

-- join
SELECT
    countries.country_id,
    countries.name,
    capitals.name AS capital
FROM countries
    LEFT JOIN capitals
    ON countries.capital_id = capitals.capital_id;