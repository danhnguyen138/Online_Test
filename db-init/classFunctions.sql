use OnlineTest;

drop function if exists generateJoinCode;
SET GLOBAL log_bin_trust_function_creators = 1;
delimiter //
CREATE FUNCTION generateJoinCode()
RETURNS VARCHAR(10)
BEGIN
    DECLARE characters VARCHAR(62) DEFAULT 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    DECLARE random_string VARCHAR(10) DEFAULT '';
    DECLARE i INT DEFAULT 1;

    WHILE i <= 10 DO
        SET random_string = CONCAT(random_string, SUBSTRING(characters, FLOOR(1 + RAND() * 62), 1));
        SET i = i + 1;
    END WHILE;

    RETURN random_string;
END //
delimiter ;
SET GLOBAL log_bin_trust_function_creators = 0;