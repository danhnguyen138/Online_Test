import mysql from 'mysql2';
import Pool from '../config/Pool.config';

class ClassModel {
  conn: mysql.Pool;

  constructor() {
    this.conn = mysql.createPool(Pool);
  }

  verifyJoinCode(
    classId: string,
    joinCode: string,
    callback: (result: mysql.RowDataPacket[] | null, err: mysql.QueryError | null) => void
  ): void {
    this.conn.query(`select * from Class where id=? and joinCode=?;`, [classId, joinCode], (err, res) => {
      if (err) callback(null, err);
      else callback(res as mysql.RowDataPacket[], null);
    });
  }

  joinClass(
    classId: string,
    studentId: string,
    callback: (result: mysql.ResultSetHeader[] | null, err: mysql.QueryError | null) => void
  ): void {
    this.conn.query(`insert into InClass values(?,?);`, [studentId, classId], (err, res) => {
      if (err) callback(null, err);
      else callback(res as mysql.ResultSetHeader[], null);
    });
  }

  getJoinedAndNotJoinedClasses(
    studentId: string,
    callback: (result: mysql.RowDataPacket[][] | null, err: mysql.QueryError | null) => void
  ): void {
    this.conn.query(
      `select Class.id as classId, Class.name as className, Class.teacherId,User.name as teacherName
      from Class join Teacher on Class.teacherId=Teacher.id
      join User on User.id=Teacher.id
      join InClass on InClass.classId=Class.id where InClass.studentId=?;
      
      select Class.id as classId, Class.name as className, Class.teacherId,User.name as teacherName
      from Class join Teacher on Class.teacherId=Teacher.id
      join User on User.id=Teacher.id
      where Class.id not in (select Class.id
      from Class
      join InClass on InClass.classId=Class.id where InClass.studentId=?);`,
      [studentId, studentId],
      (err, res) => {
        if (err) callback(null, err);
        else callback(res as mysql.RowDataPacket[][], null);
      }
    );
  }

  getClass(
    teacherId: string,
    classId: string | null,
    callback: (result: mysql.RowDataPacket[] | mysql.RowDataPacket[][] | null, err: mysql.QueryError | null) => void
  ): void {
    if (classId)
      this.conn.query(
        `select id, name, joinCode from Class where teacherId=? and id=?;
    select count(*) as totalTest from Test join Class on Class.id=Test.classId where Class.teacherId=? and Class.id=?;
    select count(*) as totalStudent from InClass join Class on Class.id=InClass.classId where Class.teacherId=? and Class.id=?;`,
        [teacherId, classId, teacherId, classId, teacherId, classId],
        (err, res) => {
          if (err) callback(null, err);
          else callback(res as mysql.RowDataPacket[][], null);
        }
      );
    else
      this.conn.query(
        `select id, name, joinCode from Class where teacherId=? order by cast(substr(id,6) AS UNSIGNED);`,
        [teacherId],
        (err, res) => {
          if (err) callback(null, err);
          else callback(res as mysql.RowDataPacket[], null);
        }
      );
  }

  updateClass(
    classId: string,
    newName: string,
    callback: (result: mysql.ResultSetHeader[] | null, err: mysql.QueryError | null) => void
  ): void {
    this.conn.query(`update Class set name=? where id=?;`, [newName, classId], (err, res) => {
      if (err) callback(null, err);
      else callback(res as mysql.ResultSetHeader[], null);
    });
  }

  deleteClass(
    classId: string,
    callback: (result: mysql.ResultSetHeader[] | null, err: mysql.QueryError | null) => void
  ): void {
    this.conn.query(`delete from Class where id=?;`, [classId], (err, res) => {
      if (err) callback(null, err);
      else callback(res as mysql.ResultSetHeader[], null);
    });
  }

  createClass(
    name: string,
    teacherId: string,
    callback: (result: mysql.ResultSetHeader[] | null, err: mysql.QueryError | null) => void
  ): void {
    this.conn.query(`call createClass(?,?);`, [name, teacherId], (err, res) => {
      if (err) callback(null, err);
      else callback(res as mysql.ResultSetHeader[], null);
    });
  }
}

export default ClassModel;
