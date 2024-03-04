import app from '../../src/app';
import request from 'supertest';
import TestModel from '../../src/models/test.model';

// Total tests: 17

describe(`send request without crucial properties (9 tests)`, () => {
  it('missing classId', async () => {
    const respone = await request(app)
      .post('/test/createTest')
      .send({
        params: {
          title: 'TEST TITLE!!!',
          period: 30,
          testMode: true
        }
      }); // send = body content of http request
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `classId` property!' });
  });

  it('classId=null', async () => {
    const respone = await request(app)
      .post('/test/createTest')
      .send({
        params: {
          classId: null,
          title: 'TEST TITLE!!!',
          period: 30,
          testMode: true
        }
      }); // send = body content of http request
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `classId` property!' });
  });

  it('classId=undefined', async () => {
    const respone = await request(app)
      .post('/test/createTest')
      .send({
        params: {
          classId: undefined,
          title: 'TEST TITLE!!!',
          period: 30,
          testMode: true
        }
      }); // send = body content of http request
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `classId` property!' });
  });

  it('missing title', (done) => {
    request(app)
      .post('/test/createTest')
      .send({
        params: {
          classId: 'CLASS1',
          period: 30,
          testMode: true
        }
      })
      .expect({ message: 'Missing `title` property!' })
      .expect(400, done);
  });

  it('title=null', (done) => {
    request(app)
      .post('/test/createTest')
      .send({
        params: {
          classId: 'CLASS1',
          period: 30,
          title: null,
          testMode: true
        }
      })
      .expect({ message: 'Missing `title` property!' })
      .expect(400, done);
  });

  it('title=undefined', (done) => {
    request(app)
      .post('/test/createTest')
      .send({
        params: {
          classId: 'CLASS1',
          period: 30,
          title: undefined,
          testMode: true
        }
      })
      .expect({ message: 'Missing `title` property!' })
      .expect(400, done);
  });

  it('missing period', (done) => {
    request(app)
      .post('/test/createTest')
      .send({
        params: {
          classId: 'CLASS1',
          title: 'new title',
          testMode: true
        }
      })
      .expect({ message: 'Missing `period` property!' })
      .expect(400, done);
  });

  it('period=null', (done) => {
    request(app)
      .post('/test/createTest')
      .send({
        params: {
          classId: 'CLASS1',
          title: 'new title',
          period: null,
          testMode: true
        }
      })
      .expect({ message: 'Missing `period` property!' })
      .expect(400, done);
  });

  it('period=undefined', (done) => {
    request(app)
      .post('/test/createTest')
      .send({
        params: {
          classId: 'CLASS1',
          title: 'new title',
          period: undefined,
          testMode: true
        }
      })
      .expect({ message: 'Missing `period` property!' })
      .expect(400, done);
  });
});

describe(`send request with only crucial properties (1 test)`, () => {
  beforeAll(() => {
    jest.spyOn(TestModel.prototype, 'createTest').mockImplementation(() => 'return mock data');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('create new test successfully', async () => {
    const respone = await request(app)
      .post('/test/createTest')
      .send({
        params: {
          classId: 'CLASS1',
          title: `TEST TITLE!!!`,
          period: 30,
          testMode: true
        }
      });
    expect(respone.status).toBe(200);
    expect(respone.body).toEqual({ message: 'Test passed!' });
  });
});

describe(`send request with crucial properties and all other properties (7 tests)`, () => {
  beforeAll(() => {
    jest.spyOn(TestModel.prototype, 'createTest').mockImplementation(() => 'return mock data');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('all properties present', async () => {
    const respone = await request(app)
      .post('/test/createTest')
      .send({
        params: {
          classId: 'CLASS1',
          title: `TEST TITLE!!!`,
          period: 30,
          start: '2023-01-01 09:00:00',
          end: '2023-01-01 10:00:00',
          passCode: '1234567890',
          questions: [
            {
              description: 'question1',
              answers: [
                {
                  description: 'answer1',
                  isCorrect: true
                },
                {
                  description: 'answer2'
                },
                {
                  description: 'answer3',
                  isCorrect: null
                },
                {
                  description: 'answer4',
                  isCorrect: undefined
                }
              ]
            },
            {
              description: 'question2',
              answers: []
            },
            {
              description: 'question3',
              answers: null
            },
            {
              description: 'question4'
            },
            {
              description: 'question5',
              answers: undefined
            }
          ],
          testMode: true
        }
      });
    expect(respone.status).toBe(200);
    expect(respone.body).toEqual({ message: 'Test passed!' });
  });

  it('only start present', async () => {
    const respone = await request(app)
      .post('/test/createTest')
      .send({
        params: {
          classId: 'CLASS1',
          title: `TEST TITLE!!!`,
          period: 30,
          start: '2023-01-01 09:00:00',
          testMode: true
        }
      });
    expect(respone.status).toBe(200);
    expect(respone.body).toEqual({ message: 'Test passed!' });
  });

  it('only end present', async () => {
    const respone = await request(app)
      .post('/test/createTest')
      .send({
        params: {
          classId: 'CLASS1',
          title: `TEST TITLE!!!`,
          period: 30,
          end: '2023-01-01 10:00:00',
          testMode: true
        }
      });
    expect(respone.status).toBe(200);
    expect(respone.body).toEqual({ message: 'Test passed!' });
  });

  it('only passCode present', async () => {
    const respone = await request(app)
      .post('/test/createTest')
      .send({
        params: {
          classId: 'CLASS1',
          title: `TEST TITLE!!!`,
          period: 30,
          passCode: '1234567890',
          testMode: true
        }
      });
    expect(respone.status).toBe(200);
    expect(respone.body).toEqual({ message: 'Test passed!' });
  });

  it('only questions present and is valid', async () => {
    const respone = await request(app)
      .post('/test/createTest')
      .send({
        params: {
          classId: 'CLASS1',
          title: `TEST TITLE!!!`,
          period: 30,
          questions: [
            {
              description: 'question1',
              answers: [
                {
                  description: 'answer1',
                  isCorrect: true
                },
                {
                  description: 'answer2'
                },
                {
                  description: 'answer3',
                  isCorrect: null
                },
                {
                  description: 'answer4',
                  isCorrect: undefined
                }
              ]
            },
            {
              description: 'question2',
              answers: []
            },
            {
              description: 'question3',
              answers: null
            },
            {
              description: 'question4'
            },
            {
              description: 'question5',
              answers: undefined
            }
          ],
          testMode: true
        }
      });
    expect(respone.status).toBe(200);
    expect(respone.body).toEqual({ message: 'Test passed!' });
  });

  it('only questions present and questions[idx] missing description property', async () => {
    const respone = await request(app)
      .post('/test/createTest')
      .send({
        params: {
          classId: 'CLASS1',
          title: `TEST TITLE!!!`,
          period: 30,
          questions: [
            {
              description: 'question1',
              answers: [
                {
                  description: 'answer1',
                  isCorrect: true
                },
                {
                  description: 'answer2'
                },
                {
                  description: 'answer3',
                  isCorrect: null
                },
                {
                  description: 'answer4',
                  isCorrect: undefined
                }
              ]
            },
            {
              answers: []
            },
            {
              description: 'question3',
              answers: null
            },
            {
              description: 'question4'
            },
            {
              description: 'question5',
              answers: undefined
            }
          ],
          testMode: true
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({
      message: `'questions[1]' property format error, must have 'description' property!`
    });
  });

  it('only questions present and questions[idx1].answers[idx2] missing description property', async () => {
    const respone = await request(app)
      .post('/test/createTest')
      .send({
        params: {
          classId: 'CLASS1',
          title: `TEST TITLE!!!`,
          period: 30,
          questions: [
            {
              description: 'question1',
              answers: [
                {
                  description: 'answer1',
                  isCorrect: true
                },
                {
                  description: 'answer2'
                },
                {
                  description: 'answer3',
                  isCorrect: null
                },
                {
                  isCorrect: undefined
                }
              ]
            },
            {
              description: 'question2',
              answers: []
            },
            {
              description: 'question3',
              answers: null
            },
            {
              description: 'question4'
            },
            {
              description: 'question5',
              answers: undefined
            }
          ],
          testMode: true
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({
      message: `'questions[0].answers[3]' property format error, must have 'description' property!`
    });
  });
});
