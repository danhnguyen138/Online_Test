drop schema if exists OnlineTest;
create schema OnlineTest;
use OnlineTest;

create table User(
name varchar(255) not null,
id varchar(20) primary key,
username varchar(20) unique not null,
password varchar(20) not null) ENGINE = InnoDB;

CREATE TABLE
      Teacher (
            id varchar(20) primary key references User(id) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE = InnoDB;
      
-- insert into User values('TEACHER_NAME','TEACHER1','teacher1','teacher123');
-- insert into Teacher values('TEACHER1');
      
CREATE TABLE
      Student (
            id varchar(20) PRIMARY KEY references User(id) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE = InnoDB;

CREATE TABLE
      Class (
            id varchar(20) primary key,
            name varchar(255) not null,
            joinCode varchar(10) unique not null,
            teacherId varchar(20) not null,
            foreign key (teacherId) references Teacher (id) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE = InnoDB;
      
-- insert into Class values('CLASS1','CLASS_NAME','AKSDA45S31','TEACHER1');

-- insert into Class values('CLASS2','CLASS_NAME_2','AKSDA45S21','TEACHER1');

-- select * from Class order by id;
-- select * from Test order by id;
-- select * from Question where testId='TEST2' order by id;
-- select * from Answer where testId='TEST2' order by questionId,id;

CREATE TABLE
      Test (
            id varchar(20),
            title VARCHAR(100) NOT NULL,
            period INT not null check(period>0 and period<24*60),
            startTime DATETIME,
            endTime DATETIME,
            passCode varchar(10),
            classId varchar(20),
            PRIMARY KEY (id, classId),
            FOREIGN KEY (classId) REFERENCES Class (id) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE = InnoDB;

CREATE TABLE
      Question (
            id varchar(20),
            testId varchar(20),
            classId varchar(20),
            description TEXT NOT NULL,
            multipleAnswer boolean not null default false,
            PRIMARY KEY (id, testId, classId),
            FOREIGN KEY (testId, classId) REFERENCES Test (id, classId) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE = InnoDB;

CREATE TABLE
      Answer (
            id varchar(20),
            description TEXT NOT NULL,
            isCorrect BOOLEAN,
            questionId varchar(20),
            testId varchar(20),
            classId varchar(20),
            PRIMARY KEY (id, questionId, testId, classId),
            FOREIGN KEY (questionId, testId, classId) REFERENCES Question (id, testId, classId) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE = InnoDB;

CREATE TABLE
      InClass (
            studentId varchar(20),
            classId varchar(20),
            PRIMARY KEY (studentId, classId),
            FOREIGN KEY (studentId) REFERENCES Student (id) ON DELETE CASCADE ON UPDATE CASCADE,
            FOREIGN KEY (classId) REFERENCES Class (id) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE = InnoDB;

CREATE TABLE
      Submission (
		id varchar(20) primary key,
        score double not null default 0.0,
        submissionTime datetime not null,
        timeSpent time not null,
        totalQuestionAttempt int not null,
        totalCorrect int not null default 0,
        totalWrong int not null default 0,
        studentId varchar(20) not null references Student(id) ON DELETE CASCADE ON UPDATE CASCADE,
        testId varchar(20) not null, -- references Test(id) ON DELETE CASCADE ON UPDATE CASCADE,
        classId varchar(20) not null, -- references Test(classId) ON DELETE CASCADE ON UPDATE CASCADE,
        foreign key(testId,classId) references Test(id,classId) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE = InnoDB;
      
CREATE TABLE
      StudentChoice (
      submissionId varchar(20) references Submission(id) ON DELETE CASCADE ON UPDATE CASCADE,
      answerId varchar(20), -- references Answer(id) ON DELETE CASCADE ON UPDATE CASCADE,
      questionId varchar(20), -- references Answer(questionId) ON DELETE CASCADE ON UPDATE CASCADE,
      testId varchar(20), -- references Answer(testId) ON DELETE CASCADE ON UPDATE CASCADE,
      classId varchar(20), -- references Answer(classId) ON DELETE CASCADE ON UPDATE CASCADE,
      primary key(submissionId,answerId,questionId,testId,classId),
      foreign key(answerId,questionId,testId,classId) references Answer(id,questionId,testId,classId) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE = InnoDB;