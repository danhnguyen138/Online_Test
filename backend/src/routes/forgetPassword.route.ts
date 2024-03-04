import express, { Router } from 'express';
import { sendEmail, updatePassword } from '../controllers/forgetPassword.controller';

export const forgetPasswordRoute: Router = express.Router();
forgetPasswordRoute.post('/send-email', sendEmail);
forgetPasswordRoute.post('/update-password', updatePassword);
