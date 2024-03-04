import mysql from 'mysql2';
import Pool from '../config/Pool.config';

interface resultId {
  number: number;
  // Add other properties here if needed
}

class SignUpModel {
  conn: mysql.Pool;

  constructor() {
    this.conn = mysql.createPool(Pool);
  }

  SignUpHandlerDatabase(
    name: string,
    username: string,
    password: string,
    callback: (result: number | null, err: mysql.QueryError | null) => void
  ): void {
    this.conn.query(`select Username from User where username=?;`, [username], (err, res) => {
      if (err) callback(null, err);
      else {
        let result = Object.values(JSON.parse(JSON.stringify(res)));
        if (res === null || result.length === 0) {
          var lastId: number = -1;
          this.getNewId((resultNextId, err) => {
            //lastId = result;
            const queryString: string = `
            insert into User(name, id, username, password) values (?, ?, ?, ?);
            insert into Student(id) values (?);
            `;
            this.conn.query(
              queryString,
              [name, 'STUDENT' + resultNextId, username, password, 'STUDENT' + resultNextId],
              (err, res) => {
                if (err) {
                  callback(null, err);
                } else {
                  console.log(111111);
                  callback(1, null);
                }
              }
            );
          });
        } else {
          callback(-1, null);
        }
      }
    });
  }

  getNewId(callback: (resultNextId: number | null, err: mysql.QueryError | null) => void) {
    const queryGetLastId: string = `
    select cast(substr(id,8) AS UNSIGNED) as 'number' from Student
    ORDER BY cast(substr(id,8) AS UNSIGNED)  desc
    LIMIT 1;
    `;
    this.conn.query(queryGetLastId, (err: any, res: resultId[]) => {
      if (err) callback(null, err);
      else {
        callback(res[0].number + 1, null);
      }
    });
  }
}

export default SignUpModel;
