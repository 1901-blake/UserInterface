-- Code to initially create and populate the sql database

--Make the schema
DROP SCHEMA IF EXISTS survey CASCADE;
CREATE SCHEMA survey;

SET SCHEMA 'survey';

-------------------
-- Create Tables --
-------------------

CREATE TABLE surveys (
	id SERIAL PRIMARY KEY,
	title TEXT NOT NULL,
	description TEXT,
	date_created DATE NOT NULL,
	closing_date DATE,
	"template" BOOL NOT NULL,
	published BOOL NOT NULL
);

CREATE TABLE editors (
	id SERIAL PRIMARY KEY,
	email TEXT NOT NULL,
	survey_id INT REFERENCES surveys(id) ON DELETE RESTRICT
);

CREATE TABLE survey_history (
	id SERIAL PRIMARY KEY,
	survey_id INT REFERENCES surveys(id) ON DELETE RESTRICT,
	user_email TEXT NOT NULL,
	date_assigned DATE NOT NULL,
	date_completed DATE
);

CREATE TABLE question_type (
	id SERIAL PRIMARY KEY,
	question_type TEXT NOT NULL UNIQUE
);

CREATE TABLE questions (
	id SERIAL PRIMARY KEY,
	question TEXT NOT NULL,
	type_id INT REFERENCES question_type(id) ON DELETE RESTRICT
);

CREATE TABLE junction_survey_questions (
	id SERIAL PRIMARY KEY,
	survey_id INT REFERENCES surveys(id) ON DELETE RESTRICT,
	question_id INT REFERENCES questions(id) ON DELETE RESTRICT,
	question_order INT
);

CREATE TABLE answers (
	id SERIAL PRIMARY KEY,
	answer TEXT NOT NULL,
	question_id INT REFERENCES questions(id) ON DELETE RESTRICT
);

CREATE TABLE responses (
	id SERIAL PRIMARY KEY,
	user_email TEXT,
	survey_id INT REFERENCES surveys(id) ON DELETE RESTRICT,
	answer_id INT REFERENCES answers(id) ON DELETE RESTRICT
);

------------------
-- Create Views --
------------------
CREATE VIEW user_responses AS
SELECT
	sh.user_email AS "User",
	s.title AS "Title",
	s.description AS "Description",
	s.date_created AS "Survey Created",
	s.closing_date AS "Survey Closes",
	sh.date_assigned AS "Assigned to User",
	sh.date_completed AS "Completed",
	q.question AS "Question",
	a.answer AS "Response"
FROM surveys s
JOIN survey_history sh ON s.id = sh.survey_id
JOIN junction_survey_questions j ON s.id = j.survey_id
JOIN questions q ON  q.id = j.question_id
JOIN answers a ON q.id = a.question_id
JOIN responses r ON a.id = r.answer_id AND r.user_email = sh.user_email;


---------------------
-- Populate Tables --
---------------------
BEGIN
INSERT INTO question_type (question_type) VALUES ('Boolean'), ('Single Choice'), ('Multiple Answer'), ('Rating'), ('Open Ended');
INSERT INTO surveys (title, description, date_created, "template", published) VALUES ('Fried Chicken', 'A survey to determine who has the best fried chicken.', '02-28-2019', TRUE, TRUE);
INSERT INTO editors (email, survey_id) VALUES ('imandavisy@gmail.com', 1);
INSERT INTO survey_history (survey_id, user_email, date_assigned, date_completed) VALUES (1, 'srtucker28@icloud.com', '03-01-2019', '03-06-2019');
INSERT INTO questions (question, type_id) VALUES ('Who has the best fried chicken?', 2);
INSERT INTO questions (question, type_id) VALUES ('Are you biased?', 1);
INSERT INTO junction_survey_questions (survey_id, question_id, question_order) VALUES (1, 1, 1);
INSERT INTO junction_survey_questions (survey_id, question_id, question_order) VALUES (1, 2, 2);
INSERT INTO answers (answer, question_id) VALUES ('KFC', 1);
INSERT INTO answers (answer, question_id) VALUES ('Churchs', 1);
INSERT INTO answers (answer, question_id) VALUES ('Pollo', 1);
INSERT INTO answers (answer, question_id) VALUES ('Chicken Kitchen', 1);
INSERT INTO answers (answer, question_id) VALUES ('Publix', 1);
INSERT INTO answers (answer, question_id) VALUES ('Popeyes', 1);
INSERT INTO answers (answer, question_id) VALUES ('Mom', 1);
INSERT INTO answers (answer, question_id) VALUES ('Yes', 2);
INSERT INTO answers (answer, question_id) VALUES ('No', 2);
INSERT INTO responses (survey_id, answer_id, user_email) VALUES (1, 7, 'srtucker28@icloud.com');
INSERT INTO responses (survey_id, answer_id, user_email) VALUES (1, 8, 'srtucker28@icloud.com');


INSERT INTO survey_history (survey_id, user_email, date_assigned, date_completed) VALUES (1, 'dunieskior@gmail.com', '03-01-2019', '03-06-2019');
INSERT INTO responses (survey_id, answer_id, user_email) VALUES (1, 5, 'dunieskior@gmail.com');
INSERT INTO responses (survey_id, answer_id, user_email) VALUES (1, 9, 'dunieskior@gmail.com');
INSERT INTO survey_history (survey_id, user_email, date_assigned, date_completed) VALUES (1, 'imandavisy@gmail.com', '03-01-2019', '03-06-2019');
INSERT INTO responses (survey_id, answer_id, user_email) VALUES (1, 6, 'imandavisy@gmail.com');
INSERT INTO responses (survey_id, answer_id, user_email) VALUES (1, 9, 'imandavisy@gmail.com');
INSERT INTO survey_history (survey_id, user_email, date_assigned, date_completed) VALUES (1, 'john@revature.com', '03-01-2019', '03-06-2019');
INSERT INTO responses (survey_id, answer_id, user_email) VALUES (1, 5, 'john@revature.com');
INSERT INTO responses (survey_id, answer_id, user_email) VALUES (1, 9, 'john@revature.com');
COMMIT;