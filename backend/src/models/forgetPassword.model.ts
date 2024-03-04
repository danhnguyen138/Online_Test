import mysql from 'mysql2';
import Pool from '../config/Pool.config';

interface resultId {
  Id: number;
  // Add other properties here if needed
}

class ForgetPassword {
  conn: mysql.Pool;

  constructor() {
    this.conn = mysql.createPool(Pool);
  }

  checkUser(username: string, callback: (result: any | null, err: mysql.QueryError | null) => void): void {
    this.conn.query(`select Id from User where username=?;`, [username], (err: any, res: any) => {
      if (err) callback(null, err);
      else {
        if (res === null || res.length === 0) {
          callback(-1, null);
        } else {
          console.log(22222, res);
          callback(res[0].Id, null);
        }
      }
    });
  }

  updatePassword(
    userId: string,
    password: string,
    callback: (result: any | null, err: mysql.QueryError | null) => void
  ): void {
    this.conn.query(`update User set password  = ? where  id = ?;`, [password, userId], (err, res) => {
      if (err) callback(null, err);
      else {
        callback(1, null);
      }
    });
  }
}

export default ForgetPassword;
