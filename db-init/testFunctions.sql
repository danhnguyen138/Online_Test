drop function if exists addTest;
delimiter //
SET GLOBAL log_bin_trust_function_creators = 1//
create function addTest(
	title TEXT,
	period INT,
	startTime DATETIME,
	endTime DATETIME,
	passCode VARCHAR(20),
	classId varchar(20)
) returns varchar(20)
begin
	DECLARE counter INT DEFAULT 0;
	SELECT cast(substr(id,5) AS UNSIGNED) INTO counter FROM Test WHERE Test.classId=classId ORDER BY cast(substr(id,5) AS UNSIGNED) DESC LIMIT 1;
	SET counter=1+counter;
	INSERT INTO Test VALUES(CONCAT('TEST',counter),title, period, startTime, endTime, passCode, classId);
    return CONCAT('TEST',counter);
end//
SET GLOBAL log_bin_trust_function_creators = 0//
delimiter ;

drop function if exists addQuestion;
delimiter //
SET GLOBAL log_bin_trust_function_creators = 1//
create function addQuestion(
	testId varchar(20),
    classId varchar(20),
    description text
) returns varchar(20)
begin
	declare counter int default 0;
    select cast(substr(id,9) as unsigned) into counter from Question where Question.classId=classId and Question.testId=testId order by cast(substr(id,9) as unsigned) desc limit 1;
    set counter:=1+ counter;
    insert into Question values(concat('QUESTION',counter),testId,classId,description,false);
    return CONCAT('QUESTION',counter);
end;
SET GLOBAL log_bin_trust_function_creators = 0//
delimiter ;

drop function if exists addSubmission;
delimiter //
SET GLOBAL log_bin_trust_function_creators = 1//
create function addSubmission(
	testId varchar(20),
    classId varchar(20),
    studentId varchar(20),
    timeSpent time,
    totalQuestionAttempt int
) returns varchar(20)
begin
	declare isFound boolean default false;
	select exists(select* from InClass where InClass.studentId=studentId and InClass.classId=classId) into isFound;
    if not isFound then
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'This student is not in this class, no submissions allowed!';
    end if;

	begin
	declare counter int default 0;
    select cast(substr(id,7) as unsigned) into counter from Submission order by cast(substr(id,7) as unsigned) desc limit 1;
    set counter:=1+ counter;
    insert into Submission values(concat('SUBMIT',counter),0.0,now(),timeSpent,totalQuestionAttempt,0,0,studentId,testId,classId);
    return CONCAT('SUBMIT',counter);
    end;
end;
SET GLOBAL log_bin_trust_function_creators = 0//
delimiter ;