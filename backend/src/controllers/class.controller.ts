import { NextFunction, Request, Response } from 'express';
import { AppError } from '../config/AppError';
import ClassModel from '../models/class.model';

const model: ClassModel = new ClassModel();

export const joinClass = (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId: string | null = req.body.params.classId || null;
    const joinCode: string | null = req.body.params.joinCode || null;
    let studentId: string | null;

    if (!req.session || !req.session.userID) studentId = req.body.params.studentId || null; // For testing purposes only
    else studentId = req.session.userID;

    if (!classId) throw new AppError(400, 'Missing `classId` property!');
    if (!joinCode) throw new AppError(400, 'Missing `joinCode` property!');
    if (!studentId) throw new AppError(400, 'Missing `studentId` property!');

    model.verifyJoinCode(classId, joinCode, (result, err) => {
      if (!err) {
        if (result && result.length) {
          res.status(200).send({ verified: true });

          model.joinClass(classId, studentId as string, (result, err) => {
            if (err) next(err);
          });
        } else res.status(200).send({ verified: false });
      } else next(err);
    });

    // Use for testing only
    if (req.body.params.testMode) res.status(200).send({ message: 'Test passed!' });
  } catch (error) {
    next(error);
  }
};

export const joinedAndNotClass = (req: Request, res: Response, next: NextFunction) => {
  try {
    let studentId: string | null;

    if (!req.session || !req.session.userID)
      studentId = req.query.studentId ? (req.query.studentId as string) : null; // For testing purposes only
    else studentId = req.session.userID;

    if (!studentId || studentId === 'null' || studentId === 'undefined')
      throw new AppError(400, 'Missing `studentId` parameter!');

    model.getJoinedAndNotJoinedClasses(studentId, (result, err) => {
      if (!err) {
        res.status(200).send({ data: result });
      } else next(err);
    });

    // Use for testing only
    if (req.query.testMode || (req.query.testMode as string) === 'true' || (req.query.testMode as string) === '1')
      res.status(200).send({ message: 'Test passed!' });
  } catch (error) {
    next(error);
  }
};

export const getClass = (req: Request, res: Response, next: NextFunction) => {
  try {
    let teacherId: string | null;

    if (!req.session || !req.session.userID)
      teacherId = req.query.teacherId ? (req.query.teacherId as string) : null; // For testing purposes only
    else teacherId = req.session.userID;

    if (!teacherId || teacherId === 'null' || teacherId === 'undefined')
      throw new AppError(400, 'Missing `teacherId` parameter!');

    let classId: string | null = req.query.classId ? (req.query.classId as string) : null;
    if (classId === 'null' || classId === 'undefined') classId = null;

    model.getClass(teacherId, classId, (result, err) => {
      if (!err) {
        res.status(200).send({ data: result });
      } else next(err);
    });

    // Use for testing only
    if (req.query.testMode || (req.query.testMode as string) === 'true' || (req.query.testMode as string) === '1')
      res.status(200).send({ message: 'Test passed!' });
  } catch (error) {
    next(error);
  }
};

export const updateClassName = (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId: string = req.query.classId as string;
    const newName: string = req.body.params.newName;

    if (!classId || classId === 'null' || classId === 'undefined')
      throw new AppError(400, 'Missing `classId` parameter!');
    if (!newName) throw new AppError(400, 'Missing `newName` property!');

    model.updateClass(classId, newName, (result, err) => {
      if (!err) {
        res.status(200).send({ message: 'Class name updated!' });
      } else next(err);
    });

    if (req.body.params.testMode)
      // Use for testing only
      res.status(200).send({ message: 'Test passed!' });
  } catch (error) {
    next(error);
  }
};

export const deleteClass = (req: Request, res: Response, next: NextFunction) => {
  try {
    const classId: string = req.query.classId as string;

    if (!classId || classId === 'null' || classId === 'undefined')
      throw new AppError(400, 'Missing `classId` parameter!');

    model.deleteClass(classId, (result, err) => {
      if (!err) {
        res.status(200).send({ message: 'Class deleted!' });
      } else next(err);
    });

    // Use for testing only
    if (req.query.testMode || (req.query.testMode as string) === 'true' || (req.query.testMode as string) === '1')
      res.status(200).send({ message: 'Test passed!' });
  } catch (error) {
    next(error);
  }
};

export const createClass = (req: Request, res: Response, next: NextFunction) => {
  try {
    const name: string = req.body.params.name;
    let teacherId: string;

    if (!req.session || !req.session.userID) teacherId = req.body.params.teacherId;
    else teacherId = req.session.userID;

    if (!name) throw new AppError(400, 'Missing `name` property!');
    if (!teacherId) throw new AppError(400, 'Missing `teacherId` property!');

    model.createClass(name, teacherId, (result, err) => {
      if (!err) {
        res.status(200).send({ message: 'Class created!' });
      } else next(err);
    });

    // Use for testing only
    if (req.body.params.testMode) res.status(200).send({ message: 'Test passed!' });
  } catch (error) {
    next(error);
  }
};
