import app from '../../src/app';
import request from 'supertest';
import TestModel from '../../src/models/test.model';
import AuthModel from '../../src/models/auth.model';

// Total tests: 30

describe(`using query (18 tests)`, () => {
  describe(`missing crucial params (15 tests)`, () => {
    it('missing classId', async () => {
      const respone = await request(app)
        .get('/test/studentGetSubmissionList')
        .query({ testId: 'TEST1', studentId: 'STUDENT1' });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('classId=null', async () => {
      const respone = await request(app)
        .get('/test/studentGetSubmissionList')
        .query({ testId: 'TEST1', studentId: 'STUDENT1', classId: null });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('classId=null', async () => {
      const respone = await request(app)
        .get('/test/studentGetSubmissionList')
        .query({ testId: 'TEST1', studentId: 'STUDENT1', classId: 'null' });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('classId=undefined', async () => {
      const respone = await request(app)
        .get('/test/studentGetSubmissionList')
        .query({ testId: 'TEST1', studentId: 'STUDENT1', classId: undefined });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('classId=undefined', async () => {
      const respone = await request(app)
        .get('/test/studentGetSubmissionList')
        .query({ testId: 'TEST1', studentId: 'STUDENT1', classId: 'undefined' });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('missing testId', async () => {
      const respone = await request(app)
        .get('/test/studentGetSubmissionList')
        .query({ studentId: 'STUDENT1', classId: 'CLASS1' });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('testId=null', async () => {
      const respone = await request(app)
        .get('/test/studentGetSubmissionList')
        .query({ testId: null, studentId: 'STUDENT1', classId: 'CLASS1' });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('testId=null', async () => {
      const respone = await request(app)
        .get('/test/studentGetSubmissionList')
        .query({ testId: 'null', studentId: 'STUDENT1', classId: 'CLASS1' });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('testId=undefined', async () => {
      const respone = await request(app)
        .get('/test/studentGetSubmissionList')
        .query({ testId: undefined, studentId: 'STUDENT1', classId: 'CLASS1' });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('testId=undefined', async () => {
      const respone = await request(app)
        .get('/test/studentGetSubmissionList')
        .query({ testId: 'undefined', studentId: 'STUDENT1', classId: 'CLASS1' });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('missing studentId', async () => {
      const respone = await request(app)
        .get('/test/studentGetSubmissionList')
        .query({ testId: 'TEST1', classId: 'CLASS1' });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `studentId` parameter!' });
    });

    it('studentId=null', async () => {
      const respone = await request(app)
        .get('/test/studentGetSubmissionList')
        .query({ testId: 'TEST1', studentId: null, classId: 'CLASS1' });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `studentId` parameter!' });
    });

    it('studentId=null', async () => {
      const respone = await request(app)
        .get('/test/studentGetSubmissionList')
        .query({ testId: 'TEST1', studentId: 'null', classId: 'CLASS1' });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `studentId` parameter!' });
    });

    it('studentId=undefined', async () => {
      const respone = await request(app)
        .get('/test/studentGetSubmissionList')
        .query({ testId: 'TEST1', studentId: undefined, classId: 'CLASS1' });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `studentId` parameter!' });
    });

    it('studentId=undefined', async () => {
      const respone = await request(app)
        .get('/test/studentGetSubmissionList')
        .query({ testId: 'TEST1', studentId: 'undefined', classId: 'CLASS1' });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `studentId` parameter!' });
    });
  });

  describe(`crucial params present (3 tests)`, () => {
    beforeAll(() => {
      jest.spyOn(TestModel.prototype, 'getSubmissionList').mockImplementation(() => 'return mock data');
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('without session', async () => {
      const respone = await request(app)
        .get('/test/studentGetSubmissionList')
        .query({ classId: 'CLASS1', testId: 'TEST1', studentId: 'STUDENT1', testMode: true });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });

    describe(`with session (2 tests)`, () => {
      let agent: request.SuperAgentTest;

      beforeAll(() => {
        agent = request.agent(app);
        jest.spyOn(AuthModel.prototype, 'login').mockImplementation(() => 'return mock data');
      });

      afterAll(() => {
        jest.restoreAllMocks();
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

      it('with session', async () => {
        const respone = await agent
          .get('/test/studentGetSubmissionList')
          .query({ classId: 'CLASS1', testId: 'TEST1', testMode: true });
        expect(respone.status).toBe(200);
        expect(respone.body).toEqual({ message: 'Test passed!' });
      });
    });
  });
});

describe(`query params directly in url (12 tests)`, () => {
  describe(`missing crucial params (9 tests)`, () => {
    it('missing classId', async () => {
      const respone = await request(app).get('/test/studentGetSubmissionList?testId=TEST1&studentId=STUDENT1');
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('classId=null', async () => {
      const respone = await request(app).get(
        '/test/studentGetSubmissionList?testId=TEST1&studentId=STUDENT1&classId=null'
      );
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('classId=undefined', async () => {
      const respone = await request(app).get(
        '/test/studentGetSubmissionList?testId=TEST1&studentId=STUDENT1&classId=undefined'
      );
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('missing testId', async () => {
      const respone = await request(app).get('/test/studentGetSubmissionList?studentId=STUDENT1&classId=CLASS1');
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('testId=null', async () => {
      const respone = await request(app).get(
        '/test/studentGetSubmissionList?studentId=STUDENT1&classId=CLASS1&testId=null'
      );
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('testId=undefined', async () => {
      const respone = await request(app).get(
        '/test/studentGetSubmissionList?studentId=STUDENT1&classId=CLASS1&testId=undefined'
      );
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('missing studentId', async () => {
      const respone = await request(app).get('/test/studentGetSubmissionList?classId=CLASS1&testId=TEST1');
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `studentId` parameter!' });
    });

    it('studentId=null', async () => {
      const respone = await request(app).get(
        '/test/studentGetSubmissionList?classId=CLASS1&testId=TEST1&studentId=null'
      );
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `studentId` parameter!' });
    });

    it('studentId=undefined', async () => {
      const respone = await request(app).get(
        '/test/studentGetSubmissionList?classId=CLASS1&testId=TEST1&studentId=undefined'
      );
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `studentId` parameter!' });
    });
  });

  describe(`crucial params present (3 tests)`, () => {
    beforeAll(() => {
      jest.spyOn(TestModel.prototype, 'getSubmissionList').mockImplementation(() => 'return mock data');
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('without session', async () => {
      const respone = await request(app).get(
        '/test/studentGetSubmissionList?classId=CLASS1&testId=TEST1&studentId=STUDENT1&testMode=true'
      );
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });

    describe(`with session (2 tests)`, () => {
      let agent: request.SuperAgentTest;

      beforeAll(() => {
        agent = request.agent(app);
        jest.spyOn(AuthModel.prototype, 'login').mockImplementation(() => 'return mock data');
      });

      afterAll(() => {
        jest.restoreAllMocks();
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

      it('with session', async () => {
        const respone = await agent.get('/test/studentGetSubmissionList?classId=CLASS1&testId=TEST1&testMode=true');
        expect(respone.status).toBe(200);
        expect(respone.body).toEqual({ message: 'Test passed!' });
      });
    });
  });
});
