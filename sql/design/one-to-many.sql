DROP TABLE IF EXISTS teachers CASCADE;
DROP TABLE IF EXISTS classes CASCADE;

CREATE TABLE
    teachers (
        teacher_id BIGSERIAL PRIMARY KEY,
        first_name VARCHAR(20) NOT NULL -- other columns
    );

CREATE TABLE
    classes (
        class_id BIGSERIAL PRIMARY KEY,
        name VARCHAR(100),
        teacher_id INTEGER REFERENCES teachers(teacher_id) -- other columns
    );

INSERT INTO teachers (first_name) VALUES ('Bilol');
INSERT INTO teachers (first_name) VALUES('Orzu');

INSERT INTO classes (name, teacher_id) VALUES ('Japanese Language', 1);
INSERT INTO classes (name, teacher_id) VALUES ('Japanese Culture', 1);
INSERT INTO classes (name, teacher_id) VALUES ('Computing', 2);
INSERT INTO classes (name, teacher_id) VALUES ('Computer Science', 2);
INSERT INTO classes (name, teacher_id) VALUES ('Algorithms & Data Structures', 2);

SELECT * FROM classes WHERE teacher_id = 2;