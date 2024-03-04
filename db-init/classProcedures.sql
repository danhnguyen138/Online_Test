use OnlineTest;

drop procedure if exists createClass;
delimiter //
create procedure createClass(
	in name varchar(255),
    in teacherId varchar(20)
)
begin
	declare counter int default 0;
    declare joinCode varchar(10) default null;
	SELECT cast(substr(id,6) AS UNSIGNED) INTO counter FROM Class ORDER BY cast(substr(id,6) AS UNSIGNED) DESC LIMIT 1;
    while joinCode is null or exists(select * from Class where Class.joinCode=joinCode) do
		select generateJoinCode() into joinCode;
    end while;
    set counter:=1+counter;
    insert into Class values(concat('CLASS',counter),name,joinCode,teacherId);
end//
delimiter ;