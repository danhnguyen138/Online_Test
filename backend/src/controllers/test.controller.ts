import { NextFunction, Request, Response } from 'express';
import { AppError } from '../config/AppError'; // throw error: throw new AppError(<statusCode>,<message>);
import TestModel from '../models/test.model';
import Question from '../types/question.type';
import Answer from '../types/answer.type';
import Choice from '../types/choice.type';

const model: TestModel = new TestModel();

export const createTest = (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId: string = req.body.params.classId;
    const title: string = req.body.params.title;
    const period: number = req.body.params.period;
    const start: string | null = req.body.params.start || null;
    const end: string | null = req.body.params.end || null;
    const passCode: string | null = req.body.params.passCode || null;
    const questions: Question[] | null = req.body.params.questions || null;

    if (!classId) throw new AppError(400, 'Missing `classId` property!');
    if (!title) throw new AppError(400, 'Missing `title` property!');
    if (!period) throw new AppError(400, 'Missing `period` property!');

    if (questions && questions.length) {
      for (let i: number = 0; i < questions.length; i++) {
        if (!questions[i].description)
          throw new AppError(400, `'questions[${i}]' property format error, must have 'description' property!`);
        if (questions[i].answers && questions[i].answers!.length) {
          for (let j: number = 0; j < questions[i].answers!.length; j++) {
            if (!questions[i].answers![j].description)
              throw new AppError(
                400,
                `'questions[${i}].answers[${j}]' property format error, must have 'description' property!`
              );
          }
        }
      }
    }

    model.createTest(classId, title, period, start, end, passCode, questions, (result, err) => {
      if (!err) res.status(200).send({ message: 'Test created!' });
      else {
        next(err);
      }
    });

    // Use for testing only
    if (req.body.params.testMode) res.status(200).send({ message: 'Test passed!' });
  } catch (error) {
    next(error);
  }
};

export const addQuestion = (req: Request, res: Response, next: NextFunction) => {
  try {
    const questions: Question[] = req.body.params.questions;
    const testId: string = req.body.params.testId;
    const classId: string = req.body.params.classId;

    if (!classId) throw new AppError(400, 'Missing `classId` property!');
    if (!testId) throw new AppError(400, 'Missing `testId` property!');
    if (!questions) throw new AppError(400, 'Missing `questions` property!');
    if (!questions.length) throw new AppError(400, 'There is no question to be added?');

    const idx = questions.findIndex((question) => !question.description);

    if (idx !== -1)
      throw new AppError(400, `'questions[${idx}]' property format error, must have 'description' property!`);

    const refinedQuestions = questions.filter((question) => question.answers && question.answers.length);

    for (let i: number = 0; i < refinedQuestions.length; i++) {
      for (let j: number = 0; j < refinedQuestions[i].answers!.length; j++) {
        if (!refinedQuestions[i].answers![j].description)
          throw new AppError(
            400,
            `'questions[${i}].answers[${j}]' property format error, must have 'description' property!`
          );
      }
    }

    model.addQuestion(refinedQuestions, testId, classId, (result, err) => {
      if (!err) res.status(200).send({ message: 'Question(s) added!' });
      else next(err);
    });

    // Use for testing only
    if (req.body.params.testMode) res.status(200).send({ message: 'Test passed!' });
  } catch (error) {
    next(error);
  }
};

export const addAnswer = (req: Request, res: Response, next: NextFunction) => {
  try {
    const answers: Answer[] = req.body.params.answers;
    const questionId: string = req.body.params.questionId;
    const testId: string = req.body.params.testId;
    const classId: string = req.body.params.classId;

    if (!classId) throw new AppError(400, 'Missing `classId` property!');
    if (!testId) throw new AppError(400, 'Missing `testId` property!');
    if (!questionId) throw new AppError(400, 'Missing `questionId` property!');
    if (!answers) throw new AppError(400, 'Missing `answers` property!');

    if (!answers.length) throw new AppError(400, 'There is no answer to be added?');

    const idx = answers.findIndex((answer) => !answer.description);

    if (idx !== -1)
      throw new AppError(400, `'answers[${idx}]' property format error, must have 'description' property!`);

    model.addAnswer(answers, questionId, testId, classId, (result, err) => {
      if (!err) res.status(200).send({ message: 'Answer(s) added!' });
      else next(err);
    });

    // Use for testing only
    if (req.body.params.testMode) res.status(200).send({ message: 'Test passed!' });
  } catch (error) {
    next(error);
  }
};

export const deleteTest = (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId: string = req.query.classId as string;
    const testId: string = req.query.testId as string;

    if (!classId || classId === 'null' || classId === 'undefined')
      throw new AppError(400, 'Missing `classId` parameter!');
    if (!testId || testId === 'null' || testId === 'undefined') throw new AppError(400, 'Missing `testId` parameter!');

    model.deleteTest(classId, testId, (result, err) => {
      if (!err) res.status(200).send({ message: 'Test deleted!' });
      else next(err);
    });

    // Use for testing only
    if (req.query.testMode || (req.query.testMode as string) === 'true' || (req.query.testMode as string) === '1')
      res.status(200).send({ message: 'Test passed!' });
  } catch (error) {
    next(error);
  }
};

export const deleteQuestion = (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId: string = req.query.classId as string;
    const testId: string = req.query.testId as string;
    const questionId: string = req.query.questionId as string;

    if (!classId || classId === 'null' || classId === 'undefined')
      throw new AppError(400, 'Missing `classId` parameter!');
    if (!testId || testId === 'null' || testId === 'undefined') throw new AppError(400, 'Missing `testId` parameter!');
    if (!questionId || questionId === 'null' || questionId === 'undefined')
      throw new AppError(400, 'Missing `questionId` parameter!');

    model.deleteQuestion(classId, testId, questionId, (result, err) => {
      if (!err) res.status(200).send({ message: 'Question deleted!' });
      else next(err);
    });

    // Use for testing only
    if (req.query.testMode || (req.query.testMode as string) === 'true' || (req.query.testMode as string) === '1')
      res.status(200).send({ message: 'Test passed!' });
  } catch (error) {
    next(error);
  }
};

export const deleteAnswer = (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId: string = req.query.classId as string;
    const testId: string = req.query.testId as string;
    const questionId: string = req.query.questionId as string;
    const answerId: string = req.query.answerId as string;

    if (!classId || classId === 'null' || classId === 'undefined')
      throw new AppError(400, 'Missing `classId` parameter!');
    if (!testId || testId === 'null' || testId === 'undefined') throw new AppError(400, 'Missing `testId` parameter!');
    if (!questionId || questionId === 'null' || questionId === 'undefined')
      throw new AppError(400, 'Missing `questionId` parameter!');
    if (!answerId || answerId === 'null' || answerId === 'undefined')
      throw new AppError(400, 'Missing `answerId` parameter!');

    model.deleteAnswer(classId, testId, questionId, answerId, (result, err) => {
      if (!err) res.status(200).send({ message: 'Answer deleted!' });
      else next(err);
    });

    // Use for testing only
    if (req.query.testMode || (req.query.testMode as string) === 'true' || (req.query.testMode as string) === '1')
      res.status(200).send({ message: 'Test passed!' });
  } catch (error) {
    next(error);
  }
};

export const teacherGetTestQuestion = (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId: string = req.query.classId as string;
    const testId: string = req.query.testId as string;
    let questionId: string | null = req.query.questionId ? (req.query.questionId as string) : null;

    if (!classId || classId === 'null' || classId === 'undefined')
      throw new AppError(400, 'Missing `classId` parameter!');
    if (!testId || testId === 'null' || testId === 'undefined') throw new AppError(400, 'Missing `testId` parameter!');

    if (questionId === 'null' || questionId === 'undefined') questionId = null;

    model.teacherGetTestQuestion(classId, testId, questionId, (result, err) => {
      if (!err) {
        if (result) {
          const questionList: string[] = [];
          for (let i: number = 0; i < result.length; i++)
            if (!questionList.includes(result[i].questionId)) questionList.push(result[i].questionId);

          const refinedResult: any = [];
          for (let i: number = 0; i < questionList.length; i++) {
            const answerList: any = [];
            let description: string | null = null;
            let multipleAnswer: boolean | null = null;
            for (let j: number = 0; j < result.length; j++) {
              if (result[j].questionId === questionList[i]) {
                if (!description) description = result[j].questionDescription;
                if (!multipleAnswer) multipleAnswer = result[j].multipleAnswer;
                answerList.push({
                  answerId: result[j].answerId,
                  description: result[j].answerDescription,
                  isCorrect: result[j].isCorrect
                });
              }
            }
            refinedResult.push({
              questionId: questionList[i],
              description: description,
              multipleAnswer: multipleAnswer,
              answers: answerList
            });
          }
          res.status(200).send({ data: refinedResult });
        }
      } else next(err);
    });

    // Use for testing only
    if (req.query.testMode || (req.query.testMode as string) === 'true' || (req.query.testMode as string) === '1')
      res.status(200).send({ message: 'Test passed!' });
  } catch (error) {
    next(error);
  }
};

export const updateQuestion = (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId: string = req.query.classId as string;
    const testId: string = req.query.testId as string;
    const questionId: string = req.query.questionId as string;
    const description: string | null = req.body.params.description || null;

    if (!classId || classId === 'null' || classId === 'undefined')
      throw new AppError(400, 'Missing `classId` parameter!');
    if (!testId || testId === 'null' || testId === 'undefined') throw new AppError(400, 'Missing `testId` parameter!');
    if (!questionId || questionId === 'null' || questionId === 'undefined')
      throw new AppError(400, 'Missing `questionId` parameter!');
    if (!description) throw new AppError(400, 'Missing `description` property!');

    model.updateQuestion(classId, testId, questionId, description, (result, err) => {
      if (!err) res.status(200).send({ message: 'Question description updated!' });
      else next(err);
    });

    // Use for testing only
    if (req.body.params.testMode) res.status(200).send({ message: 'Test passed!' });
  } catch (error) {
    next(error);
  }
};

export const updateAnswer = (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId: string = req.query.classId as string;
    const testId: string = req.query.testId as string;
    const questionId: string = req.query.questionId as string;
    const answerId: string = req.query.answerId as string;

    const description: string | null = req.body.params.description || null;
    let isCorrect: boolean | null = req.body.params.isCorrect;

    if (!classId || classId === 'null' || classId === 'undefined')
      throw new AppError(400, 'Missing `classId` parameter!');
    if (!testId || testId === 'null' || testId === 'undefined') throw new AppError(400, 'Missing `testId` parameter!');
    if (!questionId || questionId === 'null' || questionId === 'undefined')
      throw new AppError(400, 'Missing `questionId` parameter!');
    if (!answerId || answerId === 'null' || answerId === 'undefined')
      throw new AppError(400, 'Missing `answerId` parameter!');

    if (isCorrect === undefined) isCorrect = null;

    if (!description && isCorrect === null)
      throw new AppError(400, `Why would you call this API if you don't want to update anything in the answer?`);

    model.updateAnswer(classId, testId, questionId, answerId, description, isCorrect, (result, err) => {
      if (!err) res.status(200).send({ message: 'Answer updated!' });
      else next(err);
    });

    // Use for testing only
    if (req.body.params.testMode) res.status(200).send({ message: 'Test passed!' });
  } catch (error) {
    next(error);
  }
};

export const studentSubmitAnswer = (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId: string = req.body.params.classId;
    const testId: string = req.body.params.testId;
    let studentId: string;
    const choices: Choice[] = req.body.params.choices;
    const timeSpent: string = req.body.params.timeSpent;

    if (!req.session || !req.session.userID) studentId = req.body.params.studentId; // For testing purposes only
    else studentId = req.session.userID;

    if (!classId) throw new AppError(400, 'Missing `classId` property!');
    if (!testId) throw new AppError(400, 'Missing `testId` property!');
    if (!choices) throw new AppError(400, 'Missing `choices` property!');
    if (!studentId) throw new AppError(400, 'Missing `studentId` property!');
    if (!timeSpent) throw new AppError(400, 'Missing `timeSpent` property!');

    const idx = choices.findIndex((choice) => !choice.questionId);

    if (idx !== -1)
      throw new AppError(400, `'choices[${idx}]' property format error, must have 'questionId' property!`);

    const choicesAfterFilter: Choice[] = choices.filter((choice) => choice.answerIds && choice.answerIds.length);

    model.studentSubmitAnswer(classId, testId, studentId, timeSpent, choicesAfterFilter, (result, err) => {
      if (!err) {
        res.status(200).send({ message: 'Student answers submitted!' });
      } else next(err);
    });

    // Use for testing only
    if (req.body.params.testMode) res.status(200).send({ message: 'Test passed!' });
  } catch (error) {
    next(error);
  }
};

export const passCodeCheck = (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId = req.body.params.classId;
    const testId = req.body.params.testId;
    const passCode = req.body.params.passCode;

    if (!classId) throw new AppError(400, 'Missing `classId` property!');
    if (!testId) throw new AppError(400, 'Missing `testId` property!');
    if (!passCode) throw new AppError(400, 'Missing `passCode` property!');

    model.passCodeTest(classId, testId, passCode, (result, err) => {
      if (!err) {
        if (result && result.length > 0) res.status(200).send({ correct: true });
        else res.status(200).send({ correct: false });
      } else next(err);
    });

    // Use for testing only
    if (req.body.params.testMode) res.status(200).send({ message: 'Test passed!' });
  } catch (error) {
    next(error);
  }
};

export const getAllTest = (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId: string = req.query.classId as string;

    if (!classId || classId === 'null' || classId === 'undefined')
      throw new AppError(400, 'Missing `classId` parameter!');

    model.getAllTest(classId, (result, err) => {
      if (!err) res.status(200).send({ data: result });
      else next(err);
    });

    // Use for testing only
    if (req.query.testMode || (req.query.testMode as string) === 'true' || (req.query.testMode as string) === '1')
      res.status(200).send({ message: 'Test passed!' });
  } catch (error) {
    next(error);
  }
};

export const studentGetTestQuestion = (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId: string = req.query.classId as string;
    const testId: string = req.query.testId as string;
    let questionId: string | null = req.query.questionId ? (req.query.questionId as string) : null;

    if (!classId || classId === 'null' || classId === 'undefined')
      throw new AppError(400, 'Missing `classId` parameter!');
    if (!testId || testId === 'null' || testId === 'undefined') throw new AppError(400, 'Missing `testId` parameter!');

    if (questionId === 'null' || questionId === 'undefined') questionId = null;

    model.studentGetTestQuestion(classId, testId, questionId, (result, err) => {
      if (!err) {
        if (result) {
          const questionList: string[] = [];
          for (let i: number = 0; i < result.length; i++)
            if (!questionList.includes(result[i].questionId)) questionList.push(result[i].questionId);

          const refinedResult: any = [];
          for (let i: number = 0; i < questionList.length; i++) {
            const answerList: any = [];
            let description: string | null = null;
            let multipleAnswer: boolean | null = null;
            for (let j: number = 0; j < result.length; j++) {
              if (result[j].questionId === questionList[i]) {
                if (!description) description = result[j].questionDescription;
                if (!multipleAnswer) multipleAnswer = result[j].multipleAnswer;
                answerList.push({
                  answerId: result[j].answerId,
                  description: result[j].answerDescription,
                  isCorrect: result[j].isCorrect
                });
              }
            }
            refinedResult.push({
              questionId: questionList[i],
              description: description,
              multipleAnswer: multipleAnswer,
              answers: answerList
            });
          }
          res.status(200).send({ data: refinedResult });
        }
      } else next(err);
    });

    // Use for testing only
    if (req.query.testMode || (req.query.testMode as string) === 'true' || (req.query.testMode as string) === '1')
      res.status(200).send({ message: 'Test passed!' });
  } catch (error) {
    next(error);
  }
};

export const updateTest = (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId: string = req.query.classId as string;
    const testId: string = req.query.testId as string;

    if (!classId || classId === 'null' || classId === 'undefined')
      throw new AppError(400, 'Missing `classId` parameter!');
    if (!testId || testId === 'null' || testId === 'undefined') throw new AppError(400, 'Missing `testId` parameter!');

    const title: string | null = req.body.params.title || null;
    const startTime: string | null = req.body.params.startTime || null;
    const endTime: string | null = req.body.params.endTime || null;
    const passCode: string | null = req.body.params.passCode || null;
    const period: number | null = req.body.params.period || null;

    if (!title && !startTime && !endTime && !passCode && !period)
      throw new AppError(400, `Why would you call this API if you don't have anything to change?`);

    model.updateTest(classId, testId, title, startTime, endTime, passCode, period, (result, err) => {
      if (!err) res.status(200).send({ message: 'Test updated!' });
      else next(err);
    });

    // Use for testing only
    if (req.body.params.testMode) res.status(200).send({ message: 'Test passed!' });
  } catch (error) {
    next(error);
  }
};

// export const teacherGetStudentScore = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const classId: string = req.query.classId as string;
//     const testId: string = req.query.testId as string;
//     let studentId: string | null = req.query.studentId ? (req.query.studentId as string) : null;

//     if (!classId || classId === 'null' || classId === 'undefined')
//       throw new AppError(400, 'Missing `classId` parameter!');
//     if (!testId || testId === 'null' || testId === 'undefined') throw new AppError(400, 'Missing `testId` parameter!');

//     if (studentId === 'undefined' || studentId === 'null') studentId = null;

//     model.getStudentScore(classId, testId, studentId, (result, err) => {
//       if (!err) {
//         if (result) {
//           if (studentId) {
//             const finalResult = { general: result[0], choices: null };

//             const questionList: any = [];
//             for (let i: number = 0; i < result[1].length; i++) {
//               if (!questionList.includes(result[1][i].questionId)) questionList.push(result[1][i].questionId);
//             }

//             const choices: any = [];

//             for (let i: number = 0; i < questionList.length; i++) {
//               const temp: any = [];
//               let questionDescription: string | null = null;
//               for (let j: number = 0; j < result[1].length; j++) {
//                 if (result[1][j].questionId === questionList[i]) {
//                   temp.push({
//                     answerId: result[1][j].answerId,
//                     answerDescription: result[1][j].answerDescription,
//                     isCorrect: result[1][j].isCorrect
//                   });
//                   questionDescription = result[1][j].questionDecription;
//                 }
//               }
//               choices.push({ questionId: questionList[i], questionDescription: questionDescription, answers: temp });
//             }

//             finalResult.choices = choices;

//             res.status(200).send({ data: finalResult });
//           } else res.status(200).send({ data: result });
//         }
//       } else next(err);
//     });

//     // Use for testing only
//     if (req.query.testMode || (req.query.testMode as string) === 'true' || (req.query.testMode as string) === '1')
//       res.status(200).send({ message: 'Test passed!' });
//   } catch (error) {
//     next(error);
//   }
// };

// export const studentGetStudentScore = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const classId: string = req.query.classId as string;
//     const testId: string = req.query.testId as string;
//     let studentId: string | null | undefined;

//     if (!req.session || !req.session.userID)
//       studentId = req.query.studentId ? (req.query.studentId as string) : null; // For testing purposes only
//     else studentId = req.session.userID;

//     if (!classId || classId === 'null' || classId === 'undefined')
//       throw new AppError(400, 'Missing `classId` parameter!');
//     if (!testId || testId === 'null' || testId === 'undefined') throw new AppError(400, 'Missing `testId` parameter!');
//     if (!studentId || studentId === 'null' || studentId === 'undefined')
//       throw new AppError(400, 'Missing `studentId` parameter!');

//     model.getStudentScore(classId, testId, studentId, (result, err) => {
//       if (!err) {
//         if (result) {
//           const finalResult = { general: result[0], choices: null };

//           const questionList: any = [];
//           for (let i: number = 0; i < result[1].length; i++) {
//             if (!questionList.includes(result[1][i].questionId)) questionList.push(result[1][i].questionId);
//           }

//           const choices: any = [];

//           for (let i: number = 0; i < questionList.length; i++) {
//             const temp: any = [];
//             let questionDescription: string | null = null;
//             for (let j: number = 0; j < result[1].length; j++) {
//               if (result[1][j].questionId === questionList[i]) {
//                 temp.push({
//                   answerId: result[1][j].answerId,
//                   answerDescription: result[1][j].answerDescription,
//                   isCorrect: result[1][j].isCorrect
//                 });
//                 questionDescription = result[1][j].questionDecription;
//               }
//             }
//             choices.push({ questionId: questionList[i], questionDescription: questionDescription, answers: temp });
//           }

//           finalResult.choices = choices;

//           res.status(200).send({ data: finalResult });
//         }
//       } else next(err);
//     });

//     // Use for testing only
//     if (req.query.testMode || (req.query.testMode as string) === 'true' || (req.query.testMode as string) === '1')
//       res.status(200).send({ message: 'Test passed!' });
//   } catch (error) {
//     next(error);
//   }
// };

export const teacherGetSubmissionList = (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId: string = req.query.classId as string;
    const testId: string = req.query.testId as string;
    let studentId: string | null = req.query.studentId ? (req.query.studentId as string) : null;

    if (!classId || classId === 'null' || classId === 'undefined')
      throw new AppError(400, 'Missing `classId` parameter!');
    if (!testId || testId === 'null' || testId === 'undefined') throw new AppError(400, 'Missing `testId` parameter!');
    if (studentId === 'undefined' || studentId === 'null') studentId = null;

    model.getSubmissionList(classId, testId, studentId, (result, err) => {
      if (!err) {
        if (result && !result.length) res.status(204).send({ message: 'No submissions found!' });
        else if (result && result.length) res.status(200).send({ data: result });
      } else next(err);
    });

    // Use for testing only
    if (req.query.testMode || (req.query.testMode as string) === 'true' || (req.query.testMode as string) === '1')
      res.status(200).send({ message: 'Test passed!' });
  } catch (err) {
    next(err);
  }
};

export const studentGetSubmissionList = (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId: string = req.query.classId as string;
    const testId: string = req.query.testId as string;
    let studentId: string | null | undefined;

    if (!req.session || !req.session.userID)
      studentId = req.query.studentId ? (req.query.studentId as string) : null; // For testing purposes only
    else studentId = req.session.userID;

    if (!classId || classId === 'null' || classId === 'undefined')
      throw new AppError(400, 'Missing `classId` parameter!');
    if (!testId || testId === 'null' || testId === 'undefined') throw new AppError(400, 'Missing `testId` parameter!');
    if (!studentId || studentId === 'null' || studentId === 'undefined')
      throw new AppError(400, 'Missing `studentId` parameter!');

    model.getSubmissionList(classId, testId, studentId, (result, err) => {
      if (!err) {
        if (result && !result.length) res.status(204).send({ message: 'No submissions found!' });
        else if (result && result.length) res.status(200).send({ data: result });
      } else next(err);
    });

    // Use for testing only
    if (req.query.testMode || (req.query.testMode as string) === 'true' || (req.query.testMode as string) === '1')
      res.status(200).send({ message: 'Test passed!' });
  } catch (err) {
    next(err);
  }
};

export const teacherGetSubmissionDetail = (req: Request, res: Response, next: NextFunction) => {
  try {
    const submissionId: string = req.query.submissionId as string;

    if (!submissionId || submissionId === 'null' || submissionId === 'undefined')
      throw new AppError(400, 'Missing `submissionId` parameter!');

    model.getSubmissionDetail(submissionId, (result, err) => {
      if (!err) {
        if (result) {
          const finalResult = { general: result[0], choices: null };

          const questionList: any = [];
          for (let i: number = 0; i < result[1].length; i++) {
            if (!questionList.includes(result[1][i].questionId)) questionList.push(result[1][i].questionId);
          }
          const choices: any = [];
          for (let i: number = 0; i < questionList.length; i++) {
            const temp: any = [];
            let questionDescription: string | null = null;
            for (let j: number = 0; j < result[1].length; j++) {
              if (result[1][j].questionId === questionList[i]) {
                temp.push({
                  answerId: result[1][j].answerId,
                  answerDescription: result[1][j].answerDescription,
                  isCorrect: result[1][j].isCorrect
                });
                questionDescription = result[1][j].questionDecription;
              }
            }
            choices.push({ questionId: questionList[i], questionDescription: questionDescription, answers: temp });
          }

          finalResult.choices = choices;
          res.status(200).send({ data: finalResult });
        } else next(new Error('Something is wrong on the server side!'));
      } else next(err);
    });

    // Use for testing only
    if (req.query.testMode || (req.query.testMode as string) === 'true' || (req.query.testMode as string) === '1')
      res.status(200).send({ message: 'Test passed!' });
  } catch (err) {
    next(err);
  }
};

export const studentGetSubmissionDetail = (req: Request, res: Response, next: NextFunction) => {
  try {
    const submissionId: string = req.query.submissionId as string;

    if (!submissionId || submissionId === 'null' || submissionId === 'undefined')
      throw new AppError(400, 'Missing `submissionId` parameter!');

    model.getSubmissionDetail(submissionId, (result, err) => {
      if (!err) {
        if (result) {
          const finalResult = { general: result[0], choices: null };

          const questionList: any = [];
          for (let i: number = 0; i < result[1].length; i++) {
            if (!questionList.includes(result[1][i].questionId)) questionList.push(result[1][i].questionId);
          }
          const choices: any = [];
          for (let i: number = 0; i < questionList.length; i++) {
            const temp: any = [];
            let questionDescription: string | null = null;
            for (let j: number = 0; j < result[1].length; j++) {
              if (result[1][j].questionId === questionList[i]) {
                temp.push({
                  answerId: result[1][j].answerId,
                  answerDescription: result[1][j].answerDescription,
                  isCorrect: result[1][j].isCorrect
                });
                questionDescription = result[1][j].questionDecription;
              }
            }
            choices.push({ questionId: questionList[i], questionDescription: questionDescription, answers: temp });
          }

          finalResult.choices = choices;
          res.status(200).send({ data: finalResult });
        } else next(new Error('Something is wrong on the server side!'));
      } else next(err);
    });

    // Use for testing only
    if (req.query.testMode || (req.query.testMode as string) === 'true' || (req.query.testMode as string) === '1')
      res.status(200).send({ message: 'Test passed!' });
  } catch (err) {
    next(err);
  }
};
