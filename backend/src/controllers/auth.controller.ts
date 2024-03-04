import { NextFunction, Request, Response } from 'express';
import AuthModel from '../models/auth.model';
import { AppError } from '../config/AppError';
import fs from 'fs';
import { dirname } from 'path';

const model: AuthModel = new AuthModel();

export const loginHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    const username: string = req.body.params.username;
    const password: string = req.body.params.password;

    if (!username) throw new AppError(400, 'Username field is empty!');
    if (!password) throw new AppError(400, 'Password field is empty!');
    model.login(username, password, (result, type, err) => {
      if (!err) {
        if (result && result.length) {
          req.session.userID = result[0].id;

          req.session.save(() => {
            // Session saved
            res.status(200).send({ state: type, userID: result[0].id }); // True use
          });
        } else res.status(200).send({ state: 3, userID: null });
      } else next(err);
    });

    // Use for testing purposes only
    if (req.body.params.testMode) {
      req.session.userID = 'Test session';
      req.session.save(() => {
        // Session saved
        res.status(200).send({ message: req.session.userID });
      });
    }
  } catch (error) {
    next(error);
  }
};

export const logoutHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session || !req.session.userID) throw new AppError(400, 'Session cookie not present!');
    else {
      // Specify the session file directory
      const sessionDir: string = `${dirname(__dirname)}/data/sessions`;

      // Define the session ID or session file name for which you want to delete its additional files
      const sessionID: string = req.sessionID;

      // Regular expression pattern for matching the additional session files
      const additionalFilesPattern: RegExp = new RegExp(`^${sessionID}.json.\\d+$`);
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
          console.error('Error destroying session:', err);
        } else {
          res.clearCookie('serverSessionID');
          res.status(200).send({ message: 'Logged out successfully!' });

          // Get a list of files in the session directory
          fs.readdir(sessionDir, (err, files) => {
            if (err) {
              console.error('Error reading session directory:', err);
              return;
            }

            // Filter the list to include only the additional session files for the specified session
            const additionalFiles: string[] = files.filter((file) => additionalFilesPattern.test(file));

            // Delete each additional session file
            additionalFiles.forEach((file) => {
              const filePath = `${sessionDir}/${file}`;
              fs.unlink(filePath, (err) => {
                if (err) {
                  console.error('Error deleting additional session file:', filePath, err);
                } else {
                  console.log('Additional session file deleted:', filePath);
                }
              });
            });
          });
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

export const checkLoginState = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session || !req.session.userID) {
      res.status(200).send({ state: 0 });
      return;
    } else {
      model.validateUser(req.session.userID, (result, err) => {
        if (!err) {
          //if (result !== 3)
          res.status(200).send({ state: result });
          //else res.status(200).send({ state: null });
        } else next(err);
      });

      // Use for testing purposes only
      if ((req.query.testMode as string) === 'true' || (req.query.testMode as string) === '1')
        res.status(200).send({ message: 'Test passed!' });
    }
  } catch (error) {
    next(error);
  }
};
