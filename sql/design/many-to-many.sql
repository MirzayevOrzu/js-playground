DROP TABLE IF EXISTS classes CASCADE;

DROP TABLE IF EXISTS students CASCADE;

DROP TABLE IF EXISTS class_student CASCADE;

CREATE TABLE
    classes (
        class_id BIGSERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL -- other columnsu
    );

CREATE TABLE
    students (
        student_id BIGSERIAL PRIMARY KEY,
        first_name VARCHAR(50) -- other columns
    );

-- Junction table
CREATE TABLE
    class_student (
        class_id INTEGER REFERENCES classes(class_id),
        student_id INTEGER REFERENCES students(student_id)
    );

INSERT INTO classes (name) VALUES ('Computer Science');
INSERT INTO classes (name) VALUES ('Math');
INSERT INTO classes (name) VALUES ('Biology');
INSERT INTO classes (name) VALUES ('Chemistry');
INSERT INTO classes (name) VALUES ('Physics');

INSERT INTO students (first_name) VALUES ('Orzu');
INSERT INTO students (first_name) VALUES ('Davron');
INSERT INTO students (first_name) VALUES ('Rashid');
INSERT INTO students (first_name) VALUES ('Jololiddin');

INSERT INTO class_student VALUES (1, 1);
INSERT INTO class_student VALUES (1, 2);
INSERT INTO class_student VALUES (1, 4);
INSERT INTO class_student VALUES (2, 2);
INSERT INTO class_student VALUES (2, 3);
INSERT INTO class_student VALUES (3, 4);
INSERT INTO class_student VALUES (4, 1);
INSERT INTO class_student VALUES (4, 3);

-- Which classes Orzu is learning at collage
SELECT classes.*
FROM classes
INNER JOIN class_student
ON classes.class_id = class_student.class_id
WHERE class_student.student_id = 1;

-- Who is learning Computer Science
SELECT students.*
FROM students
INNER JOIN class_student
ON students.student_id = class_student.student_id
WHERE class_student.class_id = 1;

-- DROP TABLE classes CASCADE;
-- DROP TABLE students CASCADE;
-- DROP TABLE class_student CASCADE;



