import express, { Express } from 'express';
import { testRouter } from './test.route';
import { authRouter } from './auth.route';
import { classRouter } from './class.route';
import { signUpRouter } from './signUp.route';
import { forgetPasswordRoute } from './forgetPassword.route';

export const routes: Express = express();

routes.use('/auth', authRouter);
routes.use('/test', testRouter);
routes.use('/class', classRouter);
routes.use('/signUp', signUpRouter);
routes.use('/forgetPassword', forgetPasswordRoute);

export default routes;
