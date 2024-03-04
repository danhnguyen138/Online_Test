use OnlineTest;

drop procedure if exists addAnswer;
delimiter //
create procedure addAnswer(
	in description text,
    in isCorrect boolean,
    in questionId varchar(20),
	in testId varchar(20),
    in classId varchar(20)
)
begin
	declare counter int default 0;
    select cast(substr(id,7) as unsigned) into counter from Answer where Answer.questionId=questionId and Answer.testId=testId and Answer.classId=classId ORDER BY cast(substr(id,7) as unsigned) DESC LIMIT 1;
    set counter:=1+counter;
    insert into Answer values(concat('ANSWER',counter),description,isCorrect,questionId, testId, classId);
end//
delimiter ;

-- select * from Submission;
-- select * from StudentChoice order by questionId,answerId;
-- call grading('SUBMIT2');

drop procedure if exists grading;
delimiter //
create procedure grading(
    in submissionId varchar(20)
)
begin
	declare totalQuestion int default 0;
    declare point double default 0;
    declare correctAnswers int default 0;
    declare wrongAnswers int default 0;
    begin
		declare classId varchar(20) default null;
        declare testId varchar(20) default null;
        select Submission.classId,Submission.testId into classId,testId from Submission where id=submissionId;
        select count(*) into totalQuestion from Question q1 where q1.classId=classId and q1.testId=testId and not exists(select * from Answer where Answer.isCorrect is null and Answer.questionId=q1.id and Answer.testId=q1.testId and Answer.classId=q1.classId);
    end;
    
    begin
		declare done BOOLEAN DEFAULT FALSE;
        declare questionId varchar(20) default null;
        DECLARE myCursor CURSOR FOR SELECT distinct StudentChoice.questionId FROM StudentChoice join Submission on Submission.id=StudentChoice.submissionId where Submission.id=submissionId;
		DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
        OPEN myCursor;
				loop_start: LOOP
                set questionId=null;
                FETCH myCursor INTO questionId;
				IF done THEN
					LEAVE loop_start;
				END IF;
				begin
					declare classId varchar(20) default null;
					declare testId varchar(20) default null;
                    declare multipleAnswer boolean default null;
					select Submission.classId,Submission.testId into classId,testId from Submission where id=submissionId;
                    if not exists(select * from Answer where Answer.isCorrect is null and Answer.questionId=questionId and Answer.testId=testId and Answer.classId=classId) then
						select Question.multipleAnswer into multipleAnswer from Question where Question.classId=classId and Question.testId=testId and Question.id=questionId;
						if not multipleAnswer then
							begin
								declare studentAnswer varchar(20) default null;
								declare testAnswer varchar(20) default null;
                            
								select Answer.id into testAnswer from Answer where Answer.questionId=questionId and Answer.testId=testId and Answer.classId=classId and Answer.isCorrect=true;
								select StudentChoice.answerId into studentAnswer from StudentChoice join Submission on Submission.id=StudentChoice.submissionId where StudentChoice.questionId=questionId and Submission.id=submissionId;
                            
								if studentAnswer=testAnswer then
									set point=point+1;
									set correctAnswers=correctAnswers+1;
								else
									set wrongAnswers=wrongAnswers+1;
								end if;
							end;
						else
							begin
								declare numberOfAnswer int default 0;
								declare counter int default 0;
								select count(*) into numberOfAnswer from Answer where Answer.questionId=questionId and Answer.classId=classId and Answer.testId=testId and Answer.isCorrect=true;
                            
								begin
									declare done1 BOOLEAN DEFAULT FALSE;
									declare answerId varchar(20) default null;
									DECLARE myCursor1 CURSOR FOR SELECT StudentChoice.answerId FROM StudentChoice join Submission on Submission.id=StudentChoice.submissionId where Submission.id=submissionId and StudentChoice.questionId=questionId;
									DECLARE CONTINUE HANDLER FOR NOT FOUND SET done1 = TRUE;
									OPEN myCursor1;
										loop_start1: LOOP
										set answerId=null;
										FETCH myCursor1 INTO answerId;
										IF done1 THEN
											LEAVE loop_start1;
										END IF;
										if (select isCorrect from Answer where Answer.id=answerId and Answer.questionId=questionId and Answer.testId=testId and Answer.classId=classId) then
											set counter=counter+1;
											set correctAnswers=correctAnswers+1;
										else
											set counter=counter-1;
											set wrongAnswers=wrongAnswers+1;
										end if;
										END LOOP loop_start1;
									close myCursor1;
								end;
                            
								if counter<0 then
									set counter=0;
								end if;
								set point=point+counter/numberOfAnswer;
							end;
						end if;
                    end if;
                end;
				END LOOP loop_start;
		CLOSE myCursor;
    end;
    set point=point/totalQuestion*10.0;
    update Submission set score=point,totalCorrect=correctAnswers,totalWrong=wrongAnswers where id=submissionId;
end//
delimiter ;