create user 'OnlineTest'@'localhost' identified with mysql_native_password by 'OnlineTest123';
-- Or use this line if the above one does not work
-- create user 'owner'@'localhost' identified by 'owner123';

grant all privileges on OnlineTest.* to 'OnlineTest'@'localhost';

grant file on *.* to 'OnlineTest'@'localhost';