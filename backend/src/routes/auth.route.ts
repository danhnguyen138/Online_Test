import express, { Router } from 'express';
import { loginHandler, logoutHandler, checkLoginState } from '../controllers/auth.controller';

export const authRouter: Router = express.Router();

/*
      Use: Log in
      Properties:
      - username:string
      - password:string
      - Client need to send its cookies to the server
      Out come:
      - {state:1} means the user is a teacher
      - {state:2} means the user is a student
      - {state:null} means the user is not found
      Example: http://localhost:4001/auth/
      params:{
      username:"myUsername",
      password:"123"
      }
      withCredentials:true
*/
authRouter.post('/', loginHandler);

/*
      Use: Log out
      Properties: None, but the client need to send its cookies to the server
      Out come: { message: 'Logged out successfully!' }
      Example: http://localhost:4001/auth/logout 
      withCredentials:true
*/
authRouter.delete('/logout', logoutHandler);

/*
      Use: Check login state
      Properties: None, but the client need to send its cookies to the server
      Out come:
      - {state:0} means the user has not logged in yet
      - {state:1} means the user is a teacher
      - {state:2} means the user is a student
      - {state:null} means the user is not found
      Example: http://localhost:4001/auth/isLoggedIn
      withCredentials:true
*/
authRouter.get('/loginState', checkLoginState);
