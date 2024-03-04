use OnlineTest;

drop trigger if exists AnswerInsertTrigger;
delimiter //
create trigger AnswerInsertTrigger
after insert on Answer
for each row
begin
	declare counter int default 0;
    select count(*) into counter from Answer where Answer.classId=new.classId and Answer.testId=new.testId and Answer.questionId=new.questionId and Answer.isCorrect=true;
    
    if counter>1 then
		update Question set multipleAnswer=true where Question.classId=new.classId and Question.testId=new.testId and Question.id=new.questionId;
	else
		update Question set multipleAnswer=false where Question.classId=new.classId and Question.testId=new.testId and Question.id=new.questionId;
    end if;
end//
delimiter ;

drop trigger if exists AnswerUpdateTrigger;
delimiter //
create trigger AnswerUpdateTrigger
after update on Answer
for each row
begin
	declare counter int default 0;
    select count(*) into counter from Answer where Answer.classId=old.classId and Answer.testId=old.testId and Answer.questionId=old.questionId and Answer.isCorrect=true;
    
    if counter>1 then
		update Question set multipleAnswer=true where Question.classId=old.classId and Question.testId=old.testId and Question.id=old.questionId;
	else
		update Question set multipleAnswer=false where Question.classId=old.classId and Question.testId=old.testId and Question.id=old.questionId;
    end if;
end//
delimiter ;

drop trigger if exists AnswerDeleteTrigger;
delimiter //
create trigger AnswerDeleteTrigger
after delete on Answer
for each row
begin
	declare counter int default 0;
    select count(*) into counter from Answer where Answer.classId=old.classId and Answer.testId=old.testId and Answer.questionId=old.questionId and Answer.isCorrect=true;
    
    if counter>1 then
		update Question set multipleAnswer=true where Question.classId=old.classId and Question.testId=old.testId and Question.id=old.questionId;
	else
		update Question set multipleAnswer=false where Question.classId=old.classId and Question.testId=old.testId and Question.id=old.questionId;
    end if;
end//
delimiter ;