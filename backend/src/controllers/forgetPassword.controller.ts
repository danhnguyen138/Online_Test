import { NextFunction, Request, Response } from 'express';
import ForgetPassword from '../models/forgetPassword.model';
import { AppError } from '../config/AppError';
import nodemailer from 'nodemailer';
const model: ForgetPassword = new ForgetPassword();

export const sendEmail = (req: Request, res: Response, next: NextFunction) => {
  try {
    const username = req.body.params.username;
    const email = req.body.params.email;

    if (!username) throw new AppError(400, `Missing 'username' property!`);
    if (!email) throw new AppError(400, `Missing 'email' property!`);

    model.checkUser(username, (result, err) => {
      if (!err) {
        if (result === -1) {
          res.status(200).send({ state: -1 });
          return;
        } else {
          const otpCode = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
          // Create a transporter with your email service provider's SMTP settings
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'tpthanhphong111@gmail.com',
              pass: 'qmjr gulf tloi dsdn'
            }
          });

          // Email data
          const mailOptions = {
            from: 'tpthanhphong111@gmail.com',
            to: email,
            subject: 'Test Email',
            text: 'Your OTP code is: ' + otpCode
          };

          // Send the email
          try {
            transporter.sendMail(mailOptions, function (error, info) {
              if (!error) {
                console.log('Email sent: ' + info.response);
                res.status(200).send({ otpCode: otpCode, userId: result, state: 1 });
              } else {
                console.log(3333, error);
                res.status(200).send({ state: -2 });
                return;
              }
            });
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        res.status(400).send({ state: -2 });
      }
    });

    if (req.body.params.testMode) res.status(200).send({ message: `Test passed!` });
  } catch (err) {
    next(err);
  }
};

export const updatePassword = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.body.params.userId;
    const password = req.body.params.password;

    if (!userId) throw new AppError(400, `Missing 'userId' property!`);
    if (!password) throw new AppError(400, `Missing 'password' property!`);

    model.updatePassword(userId, password, (result, err) => {
      if (!err) {
        res.status(200).send({ state: 1 });
        return;
      } else next(err);
    });
    if (req.body.params.testMode) res.status(200).send({ message: `Test passed!` });
  } catch (err) {
    next(err);
  }
};
