import app from '../../src/app';
import request from 'supertest';
import TestModel from '../../src/models/test.model';
import AuthModel from '../../src/models/auth.model';

// Total tests: 20

describe(`send request without crucial properties (15 tests)`, () => {
  it('classId not found', async () => {
    const respone = await request(app)
      .post('/test/studentSubmitAnswer')
      .send({
        params: {
          testId: 'TEST1',
          studentId: 'STUDENT1',
          timeSpent: '1:00:00',
          choices: [
            {
              questionId: 'QUESTION1',
              answerIds: ['ANSWER1']
            }
          ]
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `classId` property!' });
  });

  it('classId=null', async () => {
    const respone = await request(app)
      .post('/test/studentSubmitAnswer')
      .send({
        params: {
          classId: null,
          testId: 'TEST1',
          studentId: 'STUDENT1',
          timeSpent: '1:00:00',
          choices: [
            {
              questionId: 'QUESTION1',
              answerIds: ['ANSWER1']
            }
          ]
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `classId` property!' });
  });

  it('classId=undefined', async () => {
    const respone = await request(app)
      .post('/test/studentSubmitAnswer')
      .send({
        params: {
          classId: undefined,
          testId: 'TEST1',
          studentId: 'STUDENT1',
          timeSpent: '1:00:00',
          choices: [
            {
              questionId: 'QUESTION1',
              answerIds: ['ANSWER1']
            }
          ]
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `classId` property!' });
  });

  it('testId not found', async () => {
    const respone = await request(app)
      .post('/test/studentSubmitAnswer')
      .send({
        params: {
          classId: 'CLASS1',
          studentId: 'STUDENT1',
          timeSpent: '1:00:00',
          choices: [
            {
              questionId: 'QUESTION1',
              answerIds: ['ANSWER1']
            }
          ]
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `testId` property!' });
  });

  it('testId=null', async () => {
    const respone = await request(app)
      .post('/test/studentSubmitAnswer')
      .send({
        params: {
          classId: 'CLASS1',
          testId: null,
          studentId: 'STUDENT1',
          timeSpent: '1:00:00',
          choices: [
            {
              questionId: 'QUESTION1',
              answerIds: ['ANSWER1']
            }
          ]
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `testId` property!' });
  });

  it('testId=undefined', async () => {
    const respone = await request(app)
      .post('/test/studentSubmitAnswer')
      .send({
        params: {
          classId: 'CLASS1',
          testId: undefined,
          studentId: 'STUDENT1',
          timeSpent: '1:00:00',
          choices: [
            {
              questionId: 'QUESTION1',
              answerIds: ['ANSWER1']
            }
          ]
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `testId` property!' });
  });

  it('studentId not found', async () => {
    const respone = await request(app)
      .post('/test/studentSubmitAnswer')
      .send({
        params: {
          classId: 'CLASS1',
          testId: 'TEST1',
          timeSpent: '1:00:00',
          choices: [
            {
              questionId: 'QUESTION1',
              answerIds: ['ANSWER1']
            }
          ]
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `studentId` property!' });
  });

  it('studentId=null', async () => {
    const respone = await request(app)
      .post('/test/studentSubmitAnswer')
      .send({
        params: {
          classId: 'CLASS1',
          testId: 'TEST1',
          timeSpent: '1:00:00',
          studentId: null,
          choices: [
            {
              questionId: 'QUESTION1',
              answerIds: ['ANSWER1']
            }
          ]
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `studentId` property!' });
  });

  it('studentId=undefined', async () => {
    const respone = await request(app)
      .post('/test/studentSubmitAnswer')
      .send({
        params: {
          classId: 'CLASS1',
          testId: 'TEST1',
          timeSpent: '1:00:00',
          studentId: undefined,
          choices: [
            {
              questionId: 'QUESTION1',
              answerIds: ['ANSWER1']
            }
          ]
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `studentId` property!' });
  });

  it('timeSpent not found', async () => {
    const respone = await request(app)
      .post('/test/studentSubmitAnswer')
      .send({
        params: {
          classId: 'CLASS1',
          testId: 'TEST1',
          studentId: 'STUDENT1',
          choices: [
            {
              questionId: 'QUESTION1',
              answerIds: ['ANSWER1']
            }
          ]
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `timeSpent` property!' });
  });

  it('timeSpent=null', async () => {
    const respone = await request(app)
      .post('/test/studentSubmitAnswer')
      .send({
        params: {
          classId: 'CLASS1',
          testId: 'TEST1',
          studentId: 'STUDENT1',
          timeSpent: null,
          choices: [
            {
              questionId: 'QUESTION1',
              answerIds: ['ANSWER1']
            }
          ]
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `timeSpent` property!' });
  });

  it('timeSpent=undefined', async () => {
    const respone = await request(app)
      .post('/test/studentSubmitAnswer')
      .send({
        params: {
          classId: 'CLASS1',
          testId: 'TEST1',
          studentId: 'STUDENT1',
          timeSpent: undefined,
          choices: [
            {
              questionId: 'QUESTION1',
              answerIds: ['ANSWER1']
            }
          ]
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `timeSpent` property!' });
  });

  it('choices not found', async () => {
    const respone = await request(app)
      .post('/test/studentSubmitAnswer')
      .send({
        params: {
          classId: 'CLASS1',
          testId: 'TEST1',
          studentId: 'STUDENT1',
          timeSpent: '1:00:00'
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `choices` property!' });
  });

  it('choices=null', async () => {
    const respone = await request(app)
      .post('/test/studentSubmitAnswer')
      .send({
        params: {
          classId: 'CLASS1',
          testId: 'TEST1',
          studentId: 'STUDENT1',
          timeSpent: '1:00:00',
          choices: null
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `choices` property!' });
  });

  it('choices=undefined', async () => {
    const respone = await request(app)
      .post('/test/studentSubmitAnswer')
      .send({
        params: {
          classId: 'CLASS1',
          testId: 'TEST1',
          studentId: 'STUDENT1',
          timeSpent: '1:00:00',
          choices: undefined
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `choices` property!' });
  });
});

describe(`send request with crucial properties (5 tests)`, () => {
  beforeAll(() => {
    jest.spyOn(TestModel.prototype, 'studentSubmitAnswer').mockImplementation(() => 'return mock data');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe(`not using session (2 tests)`, () => {
    it('choices[idx] missing questionId property', async () => {
      const respone = await request(app)
        .post('/test/studentSubmitAnswer')
        .send({
          params: {
            classId: 'CLASS1',
            testId: 'TEST1',
            studentId: 'STUDENT1',
            timeSpent: '1:00:00',
            choices: [
              {
                answerIds: ['ANSWER1']
              }
            ]
          }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({
        message: `'choices[0]' property format error, must have 'questionId' property!`
      });
    });

    it('submission successful', async () => {
      const respone = await request(app)
        .post('/test/studentSubmitAnswer')
        .send({
          params: {
            testMode: true,
            classId: 'CLASS1',
            testId: 'TEST1',
            studentId: 'STUDENT1',
            timeSpent: '1:00:00',
            choices: [
              {
                questionId: 'QUESTION1',
                answerIds: ['ANSWER1']
              }
            ]
          }
        });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });
  });

  describe(`using session (3 tests)`, () => {
    let agent: request.SuperAgentTest;

    beforeAll(() => {
      agent = request.agent(app);
      jest.spyOn(AuthModel.prototype, 'login').mockImplementation(() => 'return mock data');
    });

    it('login first, should return 200 status with message of session.userID', (done) => {
      agent
        .post('/auth/')
        .send({
          params: {
            username: 'username123',
            password: 'password123',
            testMode: true
          }
        })
        .expect({ message: 'Test session' })
        .expect(200, done);
    });

    it('choices[idx] missing questionId property', async () => {
      const respone = await agent.post('/test/studentSubmitAnswer').send({
        params: {
          classId: 'CLASS1',
          testId: 'TEST1',
          timeSpent: '1:00:00',
          choices: [
            {
              answerIds: ['ANSWER1']
            }
          ]
        }
      });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({
        message: `'choices[0]' property format error, must have 'questionId' property!`
      });
    });

    it('submission successful', async () => {
      const respone = await agent.post('/test/studentSubmitAnswer').send({
        params: {
          testMode: true,
          classId: 'CLASS1',
          testId: 'TEST1',
          timeSpent: '1:00:00',
          choices: [
            {
              questionId: 'QUESTION1',
              answerIds: ['ANSWER1']
            }
          ]
        }
      });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });
  });
});
