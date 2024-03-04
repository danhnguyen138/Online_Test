import express, { Router } from 'express';
import { signUpHandler } from '../controllers/signUp.controller';

export const signUpRouter: Router = express.Router();
signUpRouter.post('/', signUpHandler);
