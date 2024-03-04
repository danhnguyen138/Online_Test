import mysql from 'mysql2';
import Pool from '../config/Pool.config';

class AuthModel {
  conn: mysql.Pool;

  constructor() {
    this.conn = mysql.createPool(Pool);
  }

  login(
    username: string,
    password: string,
    callback: (result: mysql.RowDataPacket[] | null, type: number | null, err: mysql.QueryError | null) => void
  ): void {
    this.conn.query(
      `select User.id as id from User join Teacher on Teacher.id=User.id where User.username=? and User.password=?;`,
      [username, password],
      (err, res) => {
        if (err) callback(null, null, err);
        else {
          if (res && (res as mysql.RowDataPacket[]).length) callback(res as mysql.RowDataPacket[], 1, null);
          else if (res && !(res as mysql.RowDataPacket[]).length) {
            this.conn.query(
              `select User.id as id from User join Student on Student.id=User.id where User.username=? and User.password=?;`,
              [username, password],
              (err1, res1) => {
                if (err1) callback(null, null, err1);
                else {
                  if (res1 && (res1 as mysql.RowDataPacket[]).length) callback(res1 as mysql.RowDataPacket[], 2, null);
                  else if (res1 && !(res1 as mysql.RowDataPacket[]).length) callback([], null, null);
                }
              }
            );
          }
        }
      }
    );
  }

  validateUser(id: string, callback: (result: number | null, err: mysql.QueryError | null) => void): void {
    this.conn.query(`select id from Teacher where id=?;`, [id], (err, res) => {
      if (err) callback(null, err);
      else {
        if (res && (res as mysql.RowDataPacket[]).length) callback(1, null);
        else if (res && !(res as mysql.RowDataPacket[]).length) {
          this.conn.query(`select id from Student where id=?;`, [id], (err1, res1) => {
            if (err1) callback(null, err1);
            else {
              if (res1 && (res1 as mysql.RowDataPacket[]).length) callback(2, null);
              else if (res1 && !(res1 as mysql.RowDataPacket[]).length) callback(3, null);
            }
          });
        }
      }
    });
  }
}

export default AuthModel;
