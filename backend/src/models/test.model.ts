import mysql from 'mysql2';
import Pool from '../config/Pool.config';
import Question from '../types/question.type';
import Answer from '../types/answer.type';
import Choice from '../types/choice.type';

class TestModel {
  conn: mysql.Pool;

  constructor() {
    this.conn = mysql.createPool(Pool);
  }

  destroy() {
    if (this.conn) {
      this.conn.end((err) => {
        if (err) {
          console.error('Error closing MySQL connection:', err);
        } else {
          console.log('MySQL connection closed');
        }
      });
    }
  }

  createTest(
    classId: string,
    title: string,
    period: number | null,
    start: string | null,
    end: string | null,
    passCode: string | null,
    questions: Question[] | null,
    callback: (result: mysql.ResultSetHeader[] | string | null, err: mysql.QueryError | null) => void
  ): void {
    this.conn.query(
      `select addTest(?,?,?,?,?,?) as newTestId;`,
      [title, period, start, end, passCode, classId],
      (err1, result1) => {
        if (err1) callback(null, err1);
        else {
          const testId: string = (result1 as mysql.RowDataPacket[])[0].newTestId;

          let sql: string = ``;
          const params: any = [];
          if (questions) {
            for (let i: number = 0; i < questions.length; i++) {
              sql += `insert into Question values(concat('QUESTION',?),?,?,?,false);`;
              params.push(i + 1, testId, classId, questions[i].description);
              if (questions[i].answers) {
                for (let j: number = 0; j < questions[i].answers!.length; j++) {
                  sql += `insert into Answer values(concat('ANSWER',?),?,?,concat('QUESTION',?),?,?);`;
                  params.push(
                    j + 1,
                    questions[i].answers![j].description,
                    questions[i].answers![j].isCorrect === undefined ? null : questions[i].answers![j].isCorrect,
                    i + 1,
                    testId,
                    classId
                  );
                }
              }
            }
          }
          if (sql !== ``)
            this.conn.query(sql, params, (err2, result2) => {
              if (err2) callback(null, err2);
              else callback(result2 as mysql.ResultSetHeader[], null);
            });
          else callback('Test created, no questions added!', null);
        }
      }
    );
  }

  addQuestion(
    questions: Question[],
    testId: string,
    classId: string,
    callback: (result: mysql.ResultSetHeader[] | null | string, err: mysql.QueryError | null) => void
  ): void {
    if (!questions.length) {
      callback('Recursion finished!', null);
      return;
    }
    this.conn.query(
      `select addQuestion(?,?,?) as newQuestionId;`,
      [testId, classId, questions[0].description],
      (err1, result1) => {
        if (err1) {
          callback(null, err1);
          return;
        } else {
          const questionId: string = (result1 as mysql.RowDataPacket[])[0].newQuestionId;

          let sql: string = ``;
          const params: any = [];
          if (questions[0].answers) {
            for (let j: number = 0; j < questions[0].answers!.length; j++) {
              sql += `insert into Answer values(concat('ANSWER',?),?,?,?,?,?);`;
              params.push(
                j + 1,
                questions[0].answers![j].description,
                questions[0].answers![j].isCorrect === undefined ? null : questions[0].answers![j].isCorrect,
                questionId,
                testId,
                classId
              );
            }
          }
          if (sql !== ``)
            this.conn.query(sql, params, (err2, result2) => {
              if (err2) {
                result2; // clear out unused var error
                callback(null, err2);
                return;
              }
            });
          this.addQuestion(questions.slice(1), testId, classId, callback);
        }
      }
    );
  }

  addAnswer(
    answers: Answer[],
    questionId: string,
    testId: string,
    classId: string,
    callback: (result: mysql.ResultSetHeader[] | null, err: mysql.QueryError | null) => void
  ): void {
    let sql: string = ``;
    const params: any = [];
    for (let i: number = 0; i < answers.length; i++) {
      sql += `call addAnswer(?,?,?,?,?);`;
      params.push(
        answers[i].description,
        answers[i].isCorrect === undefined ? null : answers[i].isCorrect,
        questionId,
        testId,
        classId
      );
    }
    if (sql !== ``)
      this.conn.query(sql, params, (err, result) => {
        if (err) callback(null, err);
        else callback(result as mysql.ResultSetHeader[], null);
      });
  }

  deleteTest(
    classId: string,
    testId: string,
    callback: (result: mysql.ResultSetHeader[] | null, err: mysql.QueryError | null) => void
  ): void {
    this.conn.query('delete from Test where id=? and classId=?', [testId, classId], (err, res) => {
      if (err) callback(null, err);
      else callback(res as mysql.ResultSetHeader[], null);
    });
  }

  deleteQuestion(
    classId: string,
    testId: string,
    questionId: string,
    callback: (result: mysql.ResultSetHeader[] | null, err: mysql.QueryError | null) => void
  ): void {
    this.conn.query(
      'delete from Question where id=? and testId=? and classId=?',
      [questionId, testId, classId],
      (err, res) => {
        if (err) callback(null, err);
        else callback(res as mysql.ResultSetHeader[], null);
      }
    );
  }

  deleteAnswer(
    classId: string,
    testId: string,
    questionId: string,
    answerId: string,
    callback: (result: mysql.ResultSetHeader[] | null, err: mysql.QueryError | null) => void
  ): void {
    this.conn.query(
      'delete from Answer where questionId=? and testId=? and id=? and classId=?',
      [questionId, testId, answerId, classId],
      (err, res) => {
        if (err) callback(null, err);
        else callback(res as mysql.ResultSetHeader[], null);
      }
    );
  }

  teacherGetTestQuestion(
    classId: string,
    testId: string,
    questionId: string | null,
    callback: (result: mysql.RowDataPacket[] | null, err: mysql.QueryError | null) => void
  ): void {
    if (questionId)
      this.conn.query(
        `select Question.id as questionId,Question.description as questionDescription,Question.multipleAnswer, Answer.id as answerId, Answer.description as answerDescription, Answer.isCorrect
      from Question join Answer on Question.id=Answer.questionId and Question.testId=Answer.testId and Question.classId=Answer.classId
      where Question.id =? and Question.testId =? and Question.classId=? order by cast(substr(questionId,9) as unsigned),cast(substr(answerId,7) as unsigned)`,
        [questionId, testId, classId],
        (err, res) => {
          if (err) callback(null, err);
          else callback(res as mysql.RowDataPacket[], null);
        }
      );
    else
      this.conn.query(
        `select Question.id as questionId,Question.description as questionDescription,Question.multipleAnswer,Answer.id as answerId,Answer.description as answerDescription,Answer.isCorrect
            from Test
            join Question on Question.testId=Test.id and Question.classId=Test.classId
            join Answer on Answer.testId=Question.testId and Answer.questionId=Question.id and Question.classId=Answer.classId
            where Test.id=? and Test.classId=? order by cast(substr(questionId,9) as unsigned),cast(substr(answerId,7) as unsigned)`,
        [testId, classId],
        (err, res) => {
          if (err) callback(null, err);
          else callback(res as mysql.RowDataPacket[], null);
        }
      );
  }

  updateQuestion(
    classId: string,
    testId: string,
    questionId: string,
    description: string,
    callback: (result: mysql.ResultSetHeader[] | null, err: mysql.QueryError | null) => void
  ): void {
    this.conn.query(
      `update Question set description=? where id=? and testId=? and classId=?`,
      [description, questionId, testId, classId],
      (err, res) => {
        if (err) callback(null, err);
        else callback(res as mysql.ResultSetHeader[], null);
      }
    );
  }

  updateAnswer(
    classId: string,
    testId: string,
    questionId: string,
    answerId: string,
    description: string | null,
    isCorrect: boolean | null,
    callback: (result: mysql.ResultSetHeader[] | null, err: mysql.QueryError | null) => void
  ): void {
    let sql: string = ``;
    const params: any = [];
    if (description) {
      sql += `update Answer set description=? where id=? and questionId=? and testId=? and classId=?;`;
      params.push(description, answerId, questionId, testId, classId);
    }
    if (isCorrect !== null) {
      sql += `update Answer set isCorrect=? where id=? and questionId=? and testId=? and classId=?;`;
      params.push(isCorrect, answerId, questionId, testId, classId);
    }
    this.conn.query(sql, params, (err, res) => {
      if (err) callback(null, err);
      else callback(res as mysql.ResultSetHeader[], null);
    });
  }

  passCodeTest(
    classId: string,
    testId: string,
    passCode: string,
    callback: (result: mysql.RowDataPacket[] | null, err: mysql.QueryError | null) => void
  ): void {
    this.conn.query(
      `select * from Test where classId=? and id=? and passCode=?;`,
      [classId, testId, passCode],
      (err, res) => {
        if (err) callback(null, err);
        else callback(res as mysql.RowDataPacket[], null);
      }
    );
  }

  getAllTest(
    classId: string,
    callback: (result: mysql.RowDataPacket[] | null, err: mysql.QueryError | null) => void
  ): void {
    this.conn.query('SELECT * FROM Test WHERE classId=?', [classId], (err, results) => {
      if (err) {
        callback(null, err);
      } else {
        callback(results as mysql.RowDataPacket[], null);
      }
    });
  }

  studentGetTestQuestion(
    classId: string,
    testId: string,
    questionId: string | null,
    callback: (result: mysql.RowDataPacket[] | null, err: mysql.QueryError | null) => void
  ): void {
    if (questionId)
      this.conn.query(
        `select Question.id as questionId,Question.description as questionDescription,Question.multipleAnswer, Answer.id as answerId, Answer.description as answerDescription, Answer.isCorrect
      from Question join Answer on Question.id=Answer.questionId and Question.testId=Answer.testId and Question.classId=Answer.classId
      where Question.id =? and Question.testId =? and Question.classId=? order by cast(substr(questionId,9) as unsigned),cast(substr(answerId,7) as unsigned)`,
        [questionId, testId, classId],
        (err, res) => {
          if (err) callback(null, err);
          else callback(res as mysql.RowDataPacket[], null);
        }
      );
    else
      this.conn.query(
        `select Question.id as questionId,Question.description as questionDescription,Question.multipleAnswer,Answer.id as answerId,Answer.description as answerDescription, Answer.isCorrect
            from Test
            join Question on Question.testId=Test.id and Question.classId=Test.classId
            join Answer on Answer.testId=Question.testId and Answer.questionId=Question.id and Question.classId=Answer.classId
            where Test.id=? and Test.classId=? order by cast(substr(questionId,9) as unsigned),cast(substr(answerId,7) as unsigned)`,
        [testId, classId],
        (err, res) => {
          if (err) callback(null, err);
          else callback(res as mysql.RowDataPacket[], null);
        }
      );
  }

  updateTest(
    classId: string,
    testId: string,
    title: string | null,
    startTime: string | null,
    endTime: string | null,
    passCode: string | null,
    period: number | null,
    callback: (result: mysql.ResultSetHeader[] | null, err: mysql.QueryError | null) => void
  ): void {
    let sql = '';
    const params: any = [];

    if (title) {
      sql += `update Test set title=? where id=? and classId=?;`;
      params.push(title, testId, classId);
    }
    if (startTime) {
      sql += `update Test set startTime=? where id=? and classId=?;`;
      params.push(startTime, testId, classId);
    }
    if (endTime) {
      sql += `update Test set endTime=? where id=? and classId=?;`;
      params.push(endTime, testId, classId);
    }
    if (period) {
      sql += `update Test set period=? where id=? and classId=?;`;
      params.push(period, testId, classId);
    }
    if (passCode) {
      sql += `update Test set passCode=? where id=? and classId=?;`;
      params.push(passCode, testId, classId);
    }

    this.conn.query(sql, params, (err, res) => {
      if (err) callback(null, err);
      else callback(res as mysql.ResultSetHeader[], null);
    });
  }

  studentSubmitAnswer(
    classId: string,
    testId: string,
    studentId: string,
    timeSpent: string,
    choices: Choice[],
    callback: (result: mysql.ResultSetHeader[] | null, err: mysql.QueryError | null) => void
  ): void {
    this.conn.query(
      `select addSubmission(?,?,?,?,?) as newSubmissionId;`,
      [testId, classId, studentId, timeSpent, choices.length],
      (err1, res1) => {
        if (err1) callback(null, err1);
        else {
          const submitId: string = (res1 as mysql.RowDataPacket[])[0].newSubmissionId;

          let sql: string = ``;
          const params: any = [];
          for (let i: number = 0; i < choices.length; i++) {
            if (choices[i].answerIds) {
              for (let j: number = 0; j < choices[i].answerIds!.length; j++) {
                sql += `insert into StudentChoice values(?,?,?,?,?);`;
                params.push(submitId, choices[i].answerIds![j], choices[i].questionId, testId, classId);
              }
            }
          }
          sql += `call grading(?);`;
          params.push(submitId);
          this.conn.query(sql, params, (err2, res2) => {
            if (err2) callback(null, err2);
            else callback(res2 as mysql.ResultSetHeader[], null);
          });
        }
      }
    );
  }

  // getStudentScore(
  //   classId: string,
  //   testId: string,
  //   studentId: string | null,
  //   callback: (result: mysql.RowDataPacket[][] | mysql.RowDataPacket[] | null, err: mysql.QueryError | null) => void
  // ): void {
  //   if (studentId)
  //     this.conn.query(
  //       `select Test.title,User.id,User.name,Submission.score,Submission.submissionTime,Submission.timeSpent,Submission.totalQuestionAttempt,Submission.totalCorrect,Submission.totalWrong from User
  //       join Student on Student.id=User.id
  //       join Submission on Student.id=Submission.studentId
  //       join Test on Test.id=Submission.testId and Test.classId=Submission.classId
  //       where Submission.classId=? and Submission.testId=? and Student.id=?;

  //       select StudentChoice.questionId as questionId,Question.description as questionDecription,StudentChoice.answerId as answerId,Answer.description as answerDescription,Answer.isCorrect
  //       from StudentChoice
  //       join Answer on Answer.id=StudentChoice.answerId and Answer.questionId=StudentChoice.questionId and Answer.testId=StudentChoice.testId and Answer.classId=StudentChoice.classId
  //       join Question on Question.id=Answer.questionId and Question.testId=Answer.testId and Question.classId=Answer.classId
  //       join Submission on StudentChoice.submissionId=Submission.id
  //       join Student on Student.id=Submission.studentId
  //       where Submission.classId=? and Submission.testId=? and Student.id=? order by cast(substr(StudentChoice.questionId,9) as unsigned),cast(substr(StudentChoice.answerId,7) as unsigned);`,
  //       [classId, testId, studentId, classId, testId, studentId],
  //       (err, res) => {
  //         if (err) callback(null, err);
  //         else callback(res as mysql.RowDataPacket[][], null);
  //       }
  //     );
  //   else
  //     this.conn.query(
  //       `select Test.title,User.id,User.name,Submission.score,Submission.submissionTime,Submission.timeSpent,Submission.totalQuestionAttempt,Submission.totalCorrect,Submission.totalWrong from User
  //       join Student on Student.id=User.id
  //       join Submission on Student.id=Submission.studentId
  //       join Test on Test.id=Submission.testId and Test.classId=Submission.classId
  //       where Submission.classId=? and Submission.testId=?;`,
  //       [classId, testId],
  //       (err, res) => {
  //         if (err) callback(null, err);
  //         else callback(res as mysql.RowDataPacket[], null);
  //       }
  //     );
  // }

  getSubmissionList(
    classId: string,
    testId: string,
    studentId: string | null,
    callback: (result: mysql.RowDataPacket[] | null, err: mysql.QueryError | null) => void
  ): void {
    if (studentId)
      this.conn.query(
        `select User.id as studentId,User.name,Submission.id as submissionId,Submission.score,Submission.submissionTime,Submission.timeSpent,Submission.totalQuestionAttempt,Submission.totalCorrect,Submission.totalWrong from User
        join Student on Student.id=User.id
        join Submission on Student.id=Submission.studentId
        where Submission.classId=? and Submission.testId=? and Submission.studentId=?
        order by Submission.submissionTime desc;`,
        [classId, testId, studentId],
        (err, res) => {
          if (err) callback(null, err);
          else callback(res as mysql.RowDataPacket[], null);
        }
      );
    else
      this.conn.query(
        `select User.id as studentId,User.name,Submission.id as submissionId,Submission.score,Submission.submissionTime,Submission.timeSpent,Submission.totalQuestionAttempt,Submission.totalCorrect,Submission.totalWrong from User
        join Student on Student.id=User.id
        join Submission on Student.id=Submission.studentId
        where Submission.classId=? and Submission.testId=?
        order by Submission.submissionTime desc;`,
        [classId, testId],
        (err, res) => {
          if (err) callback(null, err);
          else callback(res as mysql.RowDataPacket[], null);
        }
      );
  }

  getSubmissionDetail(
    submissionId: string,
    callback: (result: mysql.RowDataPacket[][] | null, err: mysql.QueryError | null) => void
  ): void {
    this.conn.query(
      `select User.id as studentId,User.name as studentName,Submission.score,Submission.submissionTime,Submission.timeSpent,Submission.totalQuestionAttempt,Submission.totalCorrect,Submission.totalWrong
from Submission
join Student on Student.id=Submission.studentId
join User on User.id=Student.id
where Submission.id=?;

select StudentChoice.questionId as questionId,Question.description as questionDecription,StudentChoice.answerId as answerId,Answer.description as answerDescription,Answer.isCorrect
from StudentChoice
join Answer on Answer.id=StudentChoice.answerId and Answer.questionId=StudentChoice.questionId and Answer.testId=StudentChoice.testId and Answer.classId=StudentChoice.classId
join Question on Question.id=Answer.questionId and Question.testId=Answer.testId and Question.classId=Answer.classId
join Submission on StudentChoice.submissionId=Submission.id
where Submission.id=? order by cast(substr(StudentChoice.questionId,9) as unsigned),cast(substr(StudentChoice.answerId,7) as unsigned);`,
      [submissionId, submissionId],
      (err, res) => {
        if (err) callback(null, err);
        else callback(res as mysql.RowDataPacket[][], null);
      }
    );
  }
}

export default TestModel;
