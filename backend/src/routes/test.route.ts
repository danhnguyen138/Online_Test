import express from 'express';
import {
  createTest,
  deleteTest,
  deleteQuestion,
  deleteAnswer,
  teacherGetTestQuestion,
  addQuestion,
  addAnswer,
  updateQuestion,
  updateAnswer,
  studentSubmitAnswer,
  passCodeCheck,
  getAllTest,
  studentGetTestQuestion,
  updateTest,
  studentGetSubmissionList,
  teacherGetSubmissionList,
  teacherGetSubmissionDetail,
  studentGetSubmissionDetail
  //teacherGetStudentScore,
  //studentGetStudentScore
} from '../controllers/test.controller';

export const testRouter = express.Router();

// Note: var?:<type> means that the `var` property don't have to be in the `params` property in order to use the API

// URL for these APIs: <server-base-url>/test/<API url> (e.g. http://localhost:4001/test/createTest)

/*
      Use: Create a test
      Properties:
      - classId: string
      - title: string
      - period: number
      - start?: string|null|undefined
      - end?: string|null|undefined
      - passCode?: string|null|undefined
      - questions?: {description:string; answers?:{description:string; isCorrect?:boolean|null|undefined}[]|null|undefined}[]|null|undefined
      Out come: { message: 'Test created! '}
      Example:
      - http://localhost:4001/test/createTest
      params:{
      classId:"CLASS1",
      title:"TEST TITLE!!!",
      period: 30,
      start:'2023-11-28 15:00:00', // optional
      end:'2023-11-28 22:00:00', // optional
      passCode:'1234567890', // optional
      quesions:[ // optional
            {
            description:"this is quesion 1",
            answers:[ // optional
                  {
                       description:"this is answer 1 of question 1",
                       isCorrect:false // optional
                  }
                  ]
            }
            ]
      }
*/
testRouter.post('/createTest', createTest);

/*
      Use: Add one or more questions to the test
      Properties: 
      - classId:string
      - testId:string
      - questions: {description:string;answers?:{description:string;isCorrect?:boolean|null|undefined}[]|null|undefined}[]
      Out come: { message: 'Question(s) added!' }
      Example:
      - http://localhost:4001/test/addQuestion
      params:{
            classId:"CLASS1",
            testId:"TEST1",
            questions:[
            {
            description:"this is quesion 1",
            answers:[ // optional
                  {
                       description:"this is answer 1 of question 1",
                       isCorrect:false // optional
                  }
                  ]
            }
            ]
      }
*/
testRouter.post('/addQuestion', addQuestion);

/*
      Use: Add one or more answers to the question
      Properties: 
      - classId:string
      - testId:string
      - questionId:string
      - answers: {description:string,isCorrect?:boolean|null|undefined}[]
      Out come: { message: 'Answer(s) added!' }
      Example:
      - http://localhost:4001/test/addAnswer
      params:{
            classId:"CLASS1",
            testId:"TEST1",
            questionId:"QUESTION1",
            description:"this is quesion 1",
            answers:[
                  {
                       description:"this is answer 1 of question 1",
                       isCorrect:false // optional
                  }
            ]
      }
*/
testRouter.post('/addAnswer', addAnswer);

/*
      Use: Delete a test
      Properties: 
      - classId:string
      - testId:string
      *** Note: testMode is only use for testing purposes
      Out come: { message: 'Test deleted!' }
      Example: http://localhost:4001/test/deleteTest/classId=CLASS1&testId=TEST1 
      or http://localhost:4001/test/deleteTest, {params:{classId:"CLASS1", testId:"TEST1"}}
*/
testRouter.delete('/deleteTest', deleteTest);

/*
      Use: Delete a question
      Properties: 
      - classId:string
      - testId:string
      - questionId:string
      Out come: { message: 'Question deleted!' }
      Example: http://localhost:4001/test/deleteQuestion/classId=CLASS1&testId=TEST1&questionId=QUESTION1 
      or http://localhost:4001/test/deleteQuestion, {params:{classId:"CLASS1", testId:"TEST1",quesionId:"QUESTION1"}}
*/
testRouter.delete('/deleteQuestion', deleteQuestion);

/*
      Use: Delete an answer of a question
      Properties: 
      - classId:string
      - testId:string
      - questionId:string
      - answerId:string
      *** Note: testMode is only use for testing purposes
      Out come: { message: 'Answer deleted!' }
      Example: http://localhost:4001/test/deleteAnswer/classId=CLASS1&testId=TEST1&answerId=ANSWER1 
      or http://localhost:4001/test/deleteAnswer, {params:{classId:"CLASS1", testId:"TEST1",quesionId:"QUESTION1",answerId:"ANSWER1"}}
*/
testRouter.delete('/deleteAnswer', deleteAnswer);

/*
      Use: Get the list of all questions and theirs answers or a specific question and its answers
      Properties: 
      - classId:string
      - testId:string
      - questionId?:string|null
      Out come:
      - OC1: if `questionId` is present in `query`: get a specific question and its answers
      - OC2: if `questionId` is not present in `query`: get the list of all questions and theirs answers
      Example:
      http://localhost:4001/test/teacherGetTestQuestion?classId=CLASS1&testId=TEST1&questionId=QUESTION1 
      or http://localhost:4001/test/teacherGetTestQuestion, {params:{classId:"CLASS1",testId:"TEST1",questionId:"QUESTION1"}}

      http://localhost:4001/test/teacherGetTestQuestion?classId=CLASS1&testId=TEST1 
      or http://localhost:4001/test/teacherGetTestQuestion, {params:{classId:"CLASS1",testId:"TEST1"}}
*/
testRouter.get('/teacherGetTestQuestion', teacherGetTestQuestion);

/*
      Use: Update the description of the question
      Properties: 
      - classId:string
      - testId:string
      - questionId:string
      - description:string
      Out come: { message: 'Question description updated!' }
      Example: http://localhost:4001/test/updateQuestion/classId=CLASS1&testId=TEST1&questionId=QUESTION1
      params:{
            description:"new description for question"
      }
*/
testRouter.put('/updateQuestion', updateQuestion);

/*
      Use: Update the answer of the question
      Properties: 
      - classId:string
      - testId:string
      - questionId:string
      - answerId:string
      - description?:string|null|undefined
      - isCorrect?:boolean|null|undefined
      Out come: { message: 'Answer updated!' }
      Example: http://localhost:4001/test/updateAnswer/classId=CLASS1&testId=TEST1&questionId=QUESTION1&answerId=ANSWER1
      params:{
            description:"new description for answer", // optional
            isCorrect:true // option
      }

      ## if both description and isCorrect is not present in params, server send error message
*/
testRouter.put('/updateAnswer', updateAnswer);

/*
      Use: Add student answers of a test
      Properties: 
      - classId:string
      - testId:string
      - studentId:string (for testing purposes only)
      - choices:{questionId:string, answerIds?:string[]|null|undefined}[]
      withCredentials: true (true use of this API)
      Out come: { message: 'Student answers submitted!' }
      Example 1 (testing): http://localhost:4001/test/studentSubmitAnswer
      params:{
      classId:'CLASS1',
      testId:'TEST1',
      studentId:'STUDENT1',
      timeSpent:'00:30:00',
      choices:[
            {
                  questionId:'QUESTION1',
                  answerIds:["ANSWER1","ANSWER2"]
            },
            {
                  questionId:'QUESTION2'
            }
      ]
      }

      Example 2 (true use): http://localhost:4001/test/studentSubmitAnswer
      params:{
      classId:'CLASS1',
      testId:'TEST1',
      timeSpent:'00:30:00',
      choices:[
            {
                  questionId:'QUESTION1',
                  answerIds:["ANSWER1","ANSWER2"]
            },
            {
                  questionId:'QUESTION2'
            }
      ]
      }
      withCredentials: true
*/
testRouter.post('/studentSubmitAnswer', studentSubmitAnswer);

/*
      Use: Check whether the sent passCode is correct or not
      Properties: 
      - classId:string
      - testId:string
      - passCode:string
      Out come:
      - OC1: res.status(200).send({ message: 'Passcode correct!' })
      - OC2: res.status(401).send({ message: 'Passcode incorrect!' })
      Example: http://localhost:4001/test/passCodeCheck
      params:{
      classId:'CLASS1',
      testId:'TEST1',
      passCode:'1234567980'
      }
*/
testRouter.post('/passCodeCheck', passCodeCheck);

/*
      Use: Get the list of tests of a class
      Properties: 
      - classId:string
      Example: http://localhost:4001/test/getAllTest?classId=CLASS1 
      or http://localhost:4001/test/getAllTest, {params:{classId:'CLASS1'}}
*/
testRouter.get('/getAllTest', getAllTest);

/*
      Use: Get the list of all questions and theirs answers or a specific question and its answers
      Properties: 
      - classId:string
      - testId:string
      - questionId?:string|null
      Out come:
      - OC1: if `questionId` is present in `query`: get a specific question and its answers
      - OC2: if `questionId` is not present in `query`: get the list of all questions and theirs answers
      Example:
      http://localhost:4001/test/studentGetTestQuestion?classId=CLASS1&testId=TEST1&questionId=QUESION1 
      or http://localhost:4001/test/studentGetTestQuestion, {params:{classId:'CLASS1',testId:"TEST1",questionId:"QUESTION1"}}

      http://localhost:4001/test/studentGetTestQuestion?classId=CLASS1&testId=TEST1 
      or http://localhost:4001/test/studentGetTestQuestion, {params:{classId:'CLASS1',testId:"TEST1"}}
*/
testRouter.get('/studentGetTestQuestion', studentGetTestQuestion);

/*
      Use: Update the description of the question
      Properties: 
      - classId:string
      - testId:string
      - title?:string|null|undefined
      - startTime?:string|null|undefined
      - endTime?:string|null|undefined
      - passCode?:string|null|undefined
      - period?:number|null|undefined
      Out come: { message: 'Test updated!' }
      Example:
      http://localhost:4001/test/updateTest/classId=CLASS1&testId=TEST1
      params:{
            title:"new title", // optional,
            startTime:"2023-11-28 15:00:00", // optional
            endTime:"2023-11-28 22:00:00", // optional
            passCode:"1234567890", // optional
            period:30 // optional
      }

      ## if all properties in `params` are not present, server send error messagge
*/
testRouter.put('/updateTest', updateTest);

/*
      Use: Get the list of students and their scores of a test or a specfic student and his/her score
      Properties: 
      - classId:string
      - testId:string
      - studentId?:string|null
      Out come:
      - OC1: if `studentId` is present in `query`: get a student and his/her score
      - OC2: if `studentId` is not present in `query`: get the list of students and their scores
      Example: 
      http://localhost:4001/test/teacherGetStudentScore?classId=CLASS1&testId=TEST1&studentId=STUDENT1 
      or http://localhost:4001/test/teacherGetStudentScore, {params:{classId:"CLASS1",testId:"TEST1",studentId:"STUDENT1"}}

      http://localhost:4001/test/teacherGetStudentScore?classId=CLASS1&testId=TEST1 
      or http://localhost:4001/test/teacherGetStudentScore, {params:{classId:"CLASS1",testId:"TEST1"}}
*/
//testRouter.get('/teacherGetStudentScore', teacherGetStudentScore);

/*
      Use: Get the list of students and their scores of a test or a specfic student and his/her score
      Properties: 
      - classId:string
      - testId:string
      - studentId?:string|null (for testing purposes only)
      withCredentials: true (true use of this API)
      Out come:
      - OC1: if `studentId` is present in `query`: get a student and his/her score
      - OC2: if `studentId` is not present in `query`: get the list of students and their scores
      Example 1 (testing): 
      http://localhost:4001/test/studentGetStudentScore?classId=CLASS1&testId=TEST1&studentId=STUDENT1 
      or http://localhost:4001/test/studentGetStudentScore, {params:{classId:"CLASS1",testId:"TEST1",studentId:"STUDENT1"}}
      
      http://localhost:4001/test/studentGetStudentScore?classId=CLASS1&testId=TEST1 
      or http://localhost:4001/test/studentGetStudentScore, {params:{classId:"CLASS1",testId:"TEST1"}}

      Example 2 (true use): 
      http://localhost:4001/test/studentGetStudentScore?classId=CLASS1&testId=TEST1 
      or http://localhost:4001/test/studentGetStudentScore, {params:{classId:"CLASS1",testId:"TEST1"}}

      http://localhost:4001/test/studentGetStudentScore?classId=CLASS1&testId=TEST1, withCredentials: true 
      or http://localhost:4001/test/studentGetStudentScore, {params:{classId:"CLASS1",testId:"TEST1"}}, withCredentials: true
*/
//testRouter.get('/studentGetStudentScore', studentGetStudentScore);

/*
      Use: Get the list of submissions of all students or of a specific student in a test
      Properties: 
      - classId:string
      - testId:string
      - studentId?:string|null
      Out come:
      - OC1: if `studentId` is present in `query`: get the list of all submissions of a student
      - OC2: if `studentId` is not present in `query`: get the list of all submissions of all students
      Example: 
      http://localhost:4001/test/teacherGetSubmissionList?classId=CLASS1&testId=TEST1&studentId=STUDENT1 
      or http://localhost:4001/test/teacherGetSubmissionList, {params:{classId:"CLASS1",testId:"TEST1",studentId:"STUDENT1"}}

      http://localhost:4001/test/teacherGetSubmissionList?classId=CLASS1&testId=TEST1 
      or http://localhost:4001/test/teacherGetSubmissionList, {params:{classId:"CLASS1",testId:"TEST1"}}
*/
testRouter.get('/teacherGetSubmissionList', teacherGetSubmissionList);

/*
      Use: Get the list of submissions of a specific student in a test
      Properties: 
      - classId:string
      - testId:string
      - studentId:string (for testing purposes only)
      withCredentials: true (true use of this API)
      Out come: the list of all submissions of a student
      Example 1 (testing only): 
      http://localhost:4001/test/studentGetSubmissionList?classId=CLASS1&testId=TEST1&studentId=STUDENT1 
      or http://localhost:4001/test/studentGetSubmissionList, {params:{classId:"CLASS1",testId:"TEST1",studentId:"STUDENT1"}}

      Example 2 (true use):
      http://localhost:4001/test/studentGetSubmissionList?classId=CLASS1&testId=TEST1, withCredentials: true 
      or http://localhost:4001/test/studentGetSubmissionList, {params:{classId:"CLASS1",testId:"TEST1"}}, withCredentials: true
*/
testRouter.get('/studentGetSubmissionList', studentGetSubmissionList);

/*
      Use: Get the detail of a submission
      Properties: 
      - submissionId:string
      Out come: the details of the submission
      Example: 
      http://localhost:4001/test/teacherGetSubmissionDetail?submissionId=SUBMIT1
      or http://localhost:4001/test/teacherGetSubmissionDetail, {params:{submissionId:"SUBMIT1"}}
*/
testRouter.get('/teacherGetSubmissionDetail', teacherGetSubmissionDetail);

/*
      Use: Get the detail of a submission
      Properties: 
      - submissionId:string
      Out come: the details of the submission
      Example: 
      http://localhost:4001/test/studentGetSubmissionDetail?submissionId=SUBMIT1
      or http://localhost:4001/test/studentGetSubmissionDetail, {params:{submissionId:"SUBMIT1"}}
*/
testRouter.get('/studentGetSubmissionDetail', studentGetSubmissionDetail);
