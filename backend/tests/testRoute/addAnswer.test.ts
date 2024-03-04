import app from '../../src/app';
import request from 'supertest';
import TestModel from '../../src/models/test.model';

// Total tests: 15

describe(`send request without crucial properties (12 tests)`, () => {
  it('classId not found', async () => {
    const respone = await request(app)
      .post('/test/addAnswer')
      .send({
        params: {
          testId: 'TEST1',
          questionId: 'QUESTION1',
          answers: [
            {
              description: 'this is answer 1 of question 1',
              isCorrect: false
            }
          ]
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `classId` property!' });
  });

  it('classId=null', async () => {
    const respone = await request(app)
      .post('/test/addAnswer')
      .send({
        params: {
          classId: null,
          testId: 'TEST1',
          questionId: 'QUESTION1',
          answers: [
            {
              description: 'this is answer 1 of question 1',
              isCorrect: false
            }
          ]
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `classId` property!' });
  });

  it('classId=undefined', async () => {
    const respone = await request(app)
      .post('/test/addAnswer')
      .send({
        params: {
          classId: undefined,
          testId: 'TEST1',
          questionId: 'QUESTION1',
          answers: [
            {
              description: 'this is answer 1 of question 1',
              isCorrect: false
            }
          ]
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `classId` property!' });
  });

  it('testId not found', (done) => {
    request(app)
      .post('/test/addAnswer')
      .send({
        params: {
          classId: 'CLASS1',
          questionId: 'QUESTION1',
          answers: [
            {
              description: 'this is answer 1 of question 1',
              isCorrect: false
            }
          ]
        }
      })
      .expect({ message: 'Missing `testId` property!' })
      .expect(400, done);
  });

  it('testId=null', (done) => {
    request(app)
      .post('/test/addAnswer')
      .send({
        params: {
          classId: 'CLASS1',
          testId: null,
          questionId: 'QUESTION1',
          answers: [
            {
              description: 'this is answer 1 of question 1',
              isCorrect: false
            }
          ]
        }
      })
      .expect({ message: 'Missing `testId` property!' })
      .expect(400, done);
  });

  it('testId=undefined', (done) => {
    request(app)
      .post('/test/addAnswer')
      .send({
        params: {
          classId: 'CLASS1',
          testId: undefined,
          questionId: 'QUESTION1',
          answers: [
            {
              description: 'this is answer 1 of question 1',
              isCorrect: false
            }
          ]
        }
      })
      .expect({ message: 'Missing `testId` property!' })
      .expect(400, done);
  });

  it('questionId not found', (done) => {
    request(app)
      .post('/test/addAnswer')
      .send({
        params: {
          classId: 'CLASS1',
          testId: 'TEST1',
          answers: [
            {
              description: 'this is answer 1 of question 1',
              isCorrect: false
            }
          ]
        }
      })
      .expect({ message: 'Missing `questionId` property!' })
      .expect(400, done);
  });

  it('questionId=null', (done) => {
    request(app)
      .post('/test/addAnswer')
      .send({
        params: {
          classId: 'CLASS1',
          testId: 'TEST1',
          questionId: null,
          answers: [
            {
              description: 'this is answer 1 of question 1',
              isCorrect: false
            }
          ]
        }
      })
      .expect({ message: 'Missing `questionId` property!' })
      .expect(400, done);
  });

  it('questionId=undefined', (done) => {
    request(app)
      .post('/test/addAnswer')
      .send({
        params: {
          classId: 'CLASS1',
          testId: 'TEST1',
          questionId: undefined,
          answers: [
            {
              description: 'this is answer 1 of question 1',
              isCorrect: false
            }
          ]
        }
      })
      .expect({ message: 'Missing `questionId` property!' })
      .expect(400, done);
  });

  it('answers not found', async () => {
    const respone = await request(app)
      .post('/test/addAnswer')
      .send({
        params: {
          classId: 'CLASS1',
          testId: 'TEST1',
          questionId: 'QUESTION1'
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `answers` property!' });
  });

  it('answers=null', async () => {
    const respone = await request(app)
      .post('/test/addAnswer')
      .send({
        params: {
          classId: 'CLASS1',
          testId: 'TEST1',
          questionId: 'QUESTION1',
          answers: null
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `answers` property!' });
  });

  it('answers=undefined', async () => {
    const respone = await request(app)
      .post('/test/addAnswer')
      .send({
        params: {
          classId: 'CLASS1',
          testId: 'TEST1',
          questionId: 'QUESTION1',
          answers: undefined
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `answers` property!' });
  });
});

describe(`send request with crucial properties (3 tests)`, () => {
  beforeAll(() => {
    jest.spyOn(TestModel.prototype, 'addAnswer').mockImplementation(() => 'return mock data');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('answers added successfully', async () => {
    const respone = await request(app)
      .post('/test/addAnswer')
      .send({
        params: {
          testMode: true,
          classId: 'CLASS1',
          testId: 'TEST1',
          questionId: 'QUESTION1',
          answers: [
            {
              description: 'this is answer 1 of question 1',
              isCorrect: false // optional
            },
            {
              description: 'this is answer 2 of question 1'
            },
            {
              description: 'this is answer 2 of question 1',
              isCorrect: null
            },
            {
              description: 'this is answer 2 of question 1',
              isCorrect: undefined
            }
          ]
        }
      });
    expect(respone.status).toBe(200);
    expect(respone.body).toEqual({ message: 'Test passed!' });
  });

  it('answers is an empty array', async () => {
    const respone = await request(app)
      .post('/test/addAnswer')
      .send({
        params: {
          classId: 'CLASS1',
          testId: 'TEST1',
          questionId: 'QUESTION1',
          answers: []
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'There is no answer to be added?' });
  });

  it('answers[idx] missing description property', async () => {
    const respone = await request(app)
      .post('/test/addAnswer')
      .send({
        params: {
          classId: 'CLASS1',
          testId: 'TEST1',
          questionId: 'QUESTION1',
          answers: [
            {
              // description:"this is answer 1 of question 1",
              isCorrect: false // optional
            }
          ]
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: `'answers[0]' property format error, must have 'description' property!` });
  });
});
