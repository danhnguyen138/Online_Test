import { NextFunction, Request, Response } from 'express';
import SignUpModel from '../models/signUp.model';
import { AppError } from '../config/AppError';

const model: SignUpModel = new SignUpModel();

export const signUpHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    const name = req.body.params.name;
    const username = req.body.params.username;
    const password = req.body.params.password;

    if (!name) throw new AppError(400, `Missing 'name' property!`);
    if (!username) throw new AppError(400, `Missing 'username' property!`);
    if (!password) throw new AppError(400, `Missing 'password' property!`);

    model.SignUpHandlerDatabase(name, username, password, (result, err) => {
      if (!err) {
        if (result === -1) {
          res.status(200).send({ state: -1 });
          return;
        }
        res.status(200).send({ state: 1 });
        return;
      } else next(err);
    });

    if (req.body.params.testMode) res.status(200).send({ message: 'Test passed!' });
  } catch (err) {
    next(err);
  }
};
