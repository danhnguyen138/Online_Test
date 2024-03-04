use OnlineTest;

-- select * from User;
-- select * from Teacher;
-- select * from Student;
-- select * from Class;
-- select * from Test;
-- select * from Question;

insert into User values
('Name Teacher 1','TEACHER1','teach1','123'),
('Name Teacher 2','TEACHER2','teach2','123'),
('Name Teacher 3','TEACHER3','teach3','123'),
('Name Teacher 4','TEACHER4','teach4','123'),

('Student Name 1','STUDENT1','stu1','123'),
('Student Name 2','STUDENT2','stu2','123'),
('Student Name 3','STUDENT3','stu3','123'),
('Student Name 4','STUDENT4','stu4','123'),
('Student Name 5','STUDENT5','stu5','123'),
('Student Name 6','STUDENT6','stu6','123'),
('Student Name 7','STUDENT7','stu7','123'),
('Student Name 8','STUDENT8','stu8','123');

insert into Teacher values
('TEACHER1'),
('TEACHER2'),
('TEACHER3'),
('TEACHER4');

insert into Student values
('STUDENT1'),
('STUDENT2'),
('STUDENT3'),
('STUDENT4'),
('STUDENT5'),
('STUDENT6'),
('STUDENT7'),
('STUDENT8');

#Class
INSERT INTO Class (id, name, joinCode, teacherId) VALUES ('CLASS1', 'Class Name 1', 'JCODE01', 'TEACHER2');
INSERT INTO Class (id, name, joinCode, teacherId) VALUES ('CLASS2', 'Class Name 2', 'JCODE02', 'TEACHER3');
INSERT INTO Class (id, name, joinCode, teacherId) VALUES ('CLASS3', 'Class Name 3', 'JCODE03', 'TEACHER4');

#Test
INSERT INTO Test (id, title, period, startTime, endTime, passCode, classId) VALUES ('TEST1', 'Test Title 1', 60, '2023-01-01 09:00:00', '2023-01-01 10:00:00', 'PCODE01', 'CLASS1');
INSERT INTO Test (id, title, period, startTime, endTime, passCode, classId) VALUES ('TEST2', 'Test Title 2', 60, '2023-01-02 09:00:00', '2023-01-02 10:00:00', 'PCODE02', 'CLASS2');
INSERT INTO Test (id, title, period, startTime, endTime, passCode, classId) VALUES ('TEST3', 'Test Title 3', 60, '2023-01-03 09:00:00', '2023-01-03 10:00:00', 'PCODE03', 'CLASS3');

insert into Question (id,testId,classId,description) values
('QUESTION1', 'TEST1', 'CLASS1', N'1 + 1 = mấy ?'),
('QUESTION2', 'TEST1', 'CLASS1', N'2 + 1 = mấy ?'),
('QUESTION3', 'TEST1', 'CLASS1', N'3 + 1 = mấy ?'),

('QUESTION4', 'TEST2', 'CLASS2', N'1 + 2 = mấy ?'),
('QUESTION5', 'TEST2', 'CLASS2', N'2 + 2 = mấy ?'),
('QUESTION6', 'TEST2', 'CLASS2', N'3 + 2 = mấy ?'),

('QUESTION7', 'TEST3', 'CLASS3', N'1 + 3 = mấy ?'),
('QUESTION8', 'TEST3', 'CLASS3', N'2 + 3 = mấy ?'),
('QUESTION9', 'TEST3', 'CLASS3', N'3 + 3 = mấy ?');

#Test 1
insert into Answer (id,description, isCorrect, questionId, testId, classId) values
('ANSWER1','0', false, 'QUESTION1', 'TEST1', 'CLASS1'),
('ANSWER2','1', false, 'QUESTION1', 'TEST1', 'CLASS1'),
('ANSWER3','2', true, 'QUESTION1', 'TEST1', 'CLASS1'),
('ANSWER4','3', false, 'QUESTION1', 'TEST1', 'CLASS1'),

('ANSWER5','1', false, 'QUESTION2', 'TEST1', 'CLASS1'),
('ANSWER6','2', false, 'QUESTION2', 'TEST1', 'CLASS1'),
('ANSWER7','3', true,  'QUESTION2', 'TEST1', 'CLASS1'),
('ANSWER8','4', false, 'QUESTION2', 'TEST1', 'CLASS1'),

('ANSWER9','2', false, 'QUESTION3', 'TEST1', 'CLASS1'),
('ANSWER10','3', false, 'QUESTION3', 'TEST1', 'CLASS1'),
('ANSWER11','4', true, 'QUESTION3', 'TEST1', 'CLASS1'),
('ANSWER12','5', false, 'QUESTION3', 'TEST1', 'CLASS1');

#Test 2
insert into Answer (id,description, isCorrect, questionId, testId, classId) values
('ANSWER13','0', false, 'QUESTION4', 'TEST2', 'CLASS2'),
('ANSWER14','1', false, 'QUESTION4', 'TEST2', 'CLASS2'),
('ANSWER15','2', false,  'QUESTION4', 'TEST2', 'CLASS2'),
('ANSWER16','3', true, 'QUESTION4', 'TEST2', 'CLASS2'),

('ANSWER17','1', false, 'QUESTION5', 'TEST2', 'CLASS2'),
('ANSWER18','2', false, 'QUESTION5', 'TEST2', 'CLASS2'),
('ANSWER19','3', false,  'QUESTION5', 'TEST2', 'CLASS2'),
('ANSWER20','4', true, 'QUESTION5', 'TEST2', 'CLASS2'),

('ANSWER21','2', false, 'QUESTION6', 'TEST2', 'CLASS2'),
('ANSWER22','3', false, 'QUESTION6', 'TEST2', 'CLASS2'),
('ANSWER23','4', false,  'QUESTION6', 'TEST2', 'CLASS2'),
('ANSWER24','5', true, 'QUESTION6', 'TEST2', 'CLASS2');

#Test 3
insert into Answer (id,description, isCorrect, questionId, testId, classId) values
('ANSWER25','1', false, 'QUESTION7', 'TEST3', 'CLASS3'),
('ANSWER26','2', false, 'QUESTION7', 'TEST3', 'CLASS3'),
('ANSWER27','3', false,  'QUESTION7', 'TEST3', 'CLASS3'),
('ANSWER28','4', true, 'QUESTION7', 'TEST3', 'CLASS3'),

('ANSWER29','2', false, 'QUESTION8', 'TEST3', 'CLASS3'),
('ANSWER31','3', false, 'QUESTION8', 'TEST3', 'CLASS3'),
('ANSWER32','4', false,  'QUESTION8', 'TEST3', 'CLASS3'),
('ANSWER33','5', true, 'QUESTION8', 'TEST3', 'CLASS3'),

('ANSWER34','3', false, 'QUESTION9', 'TEST3', 'CLASS3'),
('ANSWER35','4', false, 'QUESTION9', 'TEST3', 'CLASS3'),
('ANSWER36','5', false,  'QUESTION9', 'TEST3', 'CLASS3'),
('ANSWER37','6', true, 'QUESTION9', 'TEST3', 'CLASS3');

#In class
insert into InClass values
('STUDENT1', 'CLASS1'),
('STUDENT1', 'CLASS2'),
('STUDENT1', 'CLASS3'),
('STUDENT2', 'CLASS1'),
('STUDENT2', 'CLASS2'),
('STUDENT3', 'CLASS3');