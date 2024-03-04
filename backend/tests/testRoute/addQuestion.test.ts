import app from '../../src/app';
import request from 'supertest';
import TestModel from '../../src/models/test.model';

// Total tests: 13

describe(`send request without crucial properties (9 tests)`, () => {
  it('classId not found', async () => {
    const respone = await request(app)
      .post('/test/addQuestion')
      .send({
        params: {
          testId: 'TEST1',
          questions: [
            {
              description: 'this is quesion 1',
              answers: [
                {
                  description: 'this is answer 1 of question 1',
                  isCorrect: false
                }
              ]
            }
          ]
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `classId` property!' });
  });

  it('classId=null', async () => {
    const respone = await request(app)
      .post('/test/addQuestion')
      .send({
        params: {
          classId: null,
          testId: 'TEST1',
          questions: [
            {
              description: 'this is quesion 1',
              answers: [
                {
                  description: 'this is answer 1 of question 1',
                  isCorrect: false
                }
              ]
            }
          ]
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `classId` property!' });
  });

  it('classId=undefined', async () => {
    const respone = await request(app)
      .post('/test/addQuestion')
      .send({
        params: {
          classId: undefined,
          testId: 'TEST1',
          questions: [
            {
              description: 'this is quesion 1',
              answers: [
                {
                  description: 'this is answer 1 of question 1',
                  isCorrect: false
                }
              ]
            }
          ]
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `classId` property!' });
  });

  it('testId not found', (done) => {
    request(app)
      .post('/test/addQuestion')
      .send({
        params: {
          classId: 'CLASS1',
          questions: [
            {
              description: 'this is quesion 1',
              answers: [
                {
                  description: 'this is answer 1 of question 1',
                  isCorrect: false // optional
                }
              ]
            }
          ]
        }
      })
      .expect({ message: 'Missing `testId` property!' })
      .expect(400, done);
  });

  it('testId=null', (done) => {
    request(app)
      .post('/test/addQuestion')
      .send({
        params: {
          testId: null,
          classId: 'CLASS1',
          questions: [
            {
              description: 'this is quesion 1',
              answers: [
                {
                  description: 'this is answer 1 of question 1',
                  isCorrect: false // optional
                }
              ]
            }
          ]
        }
      })
      .expect({ message: 'Missing `testId` property!' })
      .expect(400, done);
  });

  it('testId=undefined', (done) => {
    request(app)
      .post('/test/addQuestion')
      .send({
        params: {
          testId: undefined,
          classId: 'CLASS1',
          questions: [
            {
              description: 'this is quesion 1',
              answers: [
                {
                  description: 'this is answer 1 of question 1',
                  isCorrect: false // optional
                }
              ]
            }
          ]
        }
      })
      .expect({ message: 'Missing `testId` property!' })
      .expect(400, done);
  });

  it('questions not found', async () => {
    const respone = await request(app)
      .post('/test/addQuestion')
      .send({
        params: {
          classId: 'CLASS1',
          testId: 'TEST1'
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `questions` property!' });
  });

  it('questions=null', async () => {
    const respone = await request(app)
      .post('/test/addQuestion')
      .send({
        params: {
          classId: 'CLASS1',
          testId: 'TEST1',
          questions: null
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `questions` property!' });
  });

  it('questions=undefined', async () => {
    const respone = await request(app)
      .post('/test/addQuestion')
      .send({
        params: {
          classId: 'CLASS1',
          testId: 'TEST1',
          questions: undefined
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `questions` property!' });
  });
});

describe(`send request with crucial properties (4 tests)`, () => {
  beforeAll(() => {
    jest.spyOn(TestModel.prototype, 'addQuestion').mockImplementation(() => 'return mock data');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('questions added successfully', async () => {
    const respone = await request(app)
      .post('/test/addQuestion')
      .send({
        params: {
          testMode: true,
          classId: 'CLASS1',
          testId: 'TEST1',
          questions: [
            {
              description: 'this is quesion 1',
              answers: [
                {
                  description: 'this is answer 1 of question 1',
                  isCorrect: false
                }
              ]
            },
            {
              description: 'this is quesion 2',
              answers: []
            },
            {
              description: 'this is quesion 3'
            },
            {
              description: 'this is quesion 4',
              answers: null
            },
            {
              description: 'this is quesion 5',
              answers: undefined
            }
          ]
        }
      });
    expect(respone.status).toBe(200);
    expect(respone.body).toEqual({ message: 'Test passed!' });
  });

  it('questions is an empty array', async () => {
    const respone = await request(app)
      .post('/test/addQuestion')
      .send({
        params: {
          classId: 'CLASS1',
          testId: 'TEST1',
          questions: []
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'There is no question to be added?' });
  });

  it('questions[idx] missing description property', async () => {
    const respone = await request(app)
      .post('/test/addQuestion')
      .send({
        params: {
          classId: 'CLASS1',
          testId: 'TEST1',
          questions: [
            {
              answers: [
                {
                  description: 'this is answer 1 of question 1',
                  isCorrect: false // optional
                }
              ]
            }
          ]
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({
      message: `'questions[0]' property format error, must have 'description' property!`
    });
  });

  it('questions[idx1].answers[idx2] missing description property', async () => {
    const respone = await request(app)
      .post('/test/addQuestion')
      .send({
        params: {
          classId: 'CLASS1',
          testId: 'TEST1',
          questions: [
            {
              description: 'this is quesion 1',
              answers: [
                {
                  isCorrect: false
                }
              ]
            }
          ]
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({
      message: `'questions[0].answers[0]' property format error, must have 'description' property!`
    });
  });
});
