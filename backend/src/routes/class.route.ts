import express from 'express';
import {
  joinClass,
  joinedAndNotClass,
  getClass,
  updateClassName,
  deleteClass,
  createClass
} from '../controllers/class.controller';

export const classRouter = express.Router();

/*
      Use: Join the class with the provided passCode as verifier
      Properties: 
      - classId:string
      - studentId:string (for testing purposes only)
      - joinCode: string
      withCredentials: true (true use of this API)
      Out come: { verified: true } or { verified: false }
      Example 1 (testing):
      http://localhost:4001/class/joinClass
      params:{
            classId:'CLASS1',
            studentId:'STUDENT1',
            joinCode:'1234567890'
      }

      Example 2 (true use):
      http://localhost:4001/class/joinClass
      params:{
            classId:'CLASS1',
            joinCode:'1234567890'
      }
      withCredentials: true
*/
classRouter.post('/joinClass', joinClass);

/*
      Use: Get the list of joined and not joined classes
      Properties: 
      - studentId:string (for testing purposes only)
      withCredentials: true (true use of this API)
      Out come: { verified: true } or { verified: false }
      Example 1 (testing):
      http://localhost:4001/class/joinedAndNotClass?studentId=STUDENT1
      or
      http://localhost:4001/class/joinedAndNotClass, {pamras:{studentId:'STUDENT1'}}

      Example 2 (true use):
      http://localhost:4001/class/joinedAndNotClass
      withCredentials: true
*/
classRouter.get('/joinedAndNotClass', joinedAndNotClass);

/*
      Use: Get the list of classes or detail of a class
      Properties: 
      - teacherId:string (for testing purposes only)
      - classId?:string|null|undefined
      withCredentials: true (true use of this API)
      Out come: List of classes or detail of a class
      Example 1 (testing):
      http://localhost:4001/class/getClass?teacherId=TEACHER1
      or http://localhost:4001/class/getClass, {params:{teacherId:'TEACHER1'}}

      http://localhost:4001/class/getClass?teacherId=TEACHER1&classId=CLASS1
      or http://localhost:4001/class/getClass, {params:{teacherId:'TEACHER1',classId:'CLASS1'}}

      Example 2 (true use):
      http://localhost:4001/class/getClass ,withCredentials: true

      http://localhost:4001/class/getClass, {params:{classId:'CLASS1'}} ,withCredentials: true
*/
classRouter.get('/getClass', getClass);

/*
      Use: Update the class name
      Properties: 
      - classId:string
      - newName:string
      Out come: {message: "Class name updated!"}
      Example:
      http://localhost:4001/class/updateClassName?classId=CLASS1, {params:{newName:'New Name'}}
*/
classRouter.put('/updateClassName', updateClassName);

/*
      Use: Delete a class
      Properties: 
      - classId:string
      Out come: {message: "Class deleted!"}
      Example:
      http://localhost:4001/class/deleteClass?classId=CLASS1
      or http://localhost:4001/class/deleteClass, {params:{classId:'CLASS1'}}
*/
classRouter.delete('/deleteClass', deleteClass);

/*
      Use: Create a class
      Properties: 
      - name:string
      - teacherId:string (for testing purposes only)
      withCredentials: true (true use of this API)
      Out come: {message: "Class created!"}
      Example 1 (testing):
      http://localhost:4001/class/createClass, {params:{name:"new name",teacherId:"TEACHER1"}}

      Example 2 (true use):
      http://localhost:4001/class/createClass, {params:{name:"new name"}}, withCredentials:true
*/
classRouter.post('/createClass', createClass);
