import app from '../../src/app';
import request from 'supertest';
import TestModel from '../../src/models/test.model';

// Total tests: 42

describe(`using 'query' (26 tests)`, () => {
  beforeAll(() => {
    jest.spyOn(TestModel.prototype, 'teacherGetTestQuestion').mockImplementation(() => 'return mock data');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe(`crucial properties present (6 tests)`, () => {
    describe(`get a list of questions (5 tests)`, () => {
      it('missing questionId', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion')
          .query({ classId: 'CLASS1', testId: 'TEST1', testMode: true }); // query = query in http request
        expect(respone.status).toBe(200);
        expect(respone.body).toEqual({ message: 'Test passed!' });
      });

      it('questionId=null', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion')
          .query({ classId: 'CLASS1', testId: 'TEST1', questionId: null, testMode: true });
        expect(respone.status).toBe(200);
        expect(respone.body).toEqual({ message: 'Test passed!' });
      });

      it('questionId=undefined', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion')
          .query({ classId: 'CLASS1', testId: 'TEST1', questionId: undefined, testMode: true });
        expect(respone.status).toBe(200);
        expect(respone.body).toEqual({ message: 'Test passed!' });
      });

      it('questionId=null', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion')
          .query({ classId: 'CLASS1', testId: 'TEST1', questionId: 'null', testMode: true });
        expect(respone.status).toBe(200);
        expect(respone.body).toEqual({ message: 'Test passed!' });
      });

      it('questionId=undefined', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion')
          .query({ classId: 'CLASS1', testId: 'TEST1', questionId: 'undefined', testMode: true });
        expect(respone.status).toBe(200);
        expect(respone.body).toEqual({ message: 'Test passed!' });
      });
    });

    describe(`get a specific question (1 test)`, () => {
      it('get a specific questions successfully', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion')
          .query({ classId: 'CLASS1', testId: 'TEST1', questionId: 'QUESTION1', testMode: true });
        expect(respone.status).toBe(200);
        expect(respone.body).toEqual({ message: 'Test passed!' });
      });
    });
  });

  describe(`crucial properties not present (20 tests)`, () => {
    describe(`trying to get a list of questions (10 tests)`, () => {
      it('missing classId', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion')
          .query({ testId: 'TEST1', testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
      });

      it('classId=null', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion')
          .query({ classId: null, testId: 'TEST1', testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
      });

      it('classId=undefined', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion')
          .query({ classId: undefined, testId: 'TEST1', testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
      });

      it('classId=null', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion')
          .query({ classId: 'null', testId: 'TEST1', testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
      });

      it('classId=undefined', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion')
          .query({ classId: 'undefined', testId: 'TEST1', testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
      });

      it('missing testId', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion')
          .query({ classId: 'CLASS1', testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
      });

      it('testId=null', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion')
          .query({ classId: 'CLASS1', testId: null, testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
      });

      it('testId=undefined', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion')
          .query({ classId: 'CLASS1', testId: undefined, testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
      });

      it('testId=null', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion')
          .query({ classId: 'CLASS1', testId: 'null', testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
      });

      it('testId=undefined', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion')
          .query({ classId: 'CLASS1', testId: 'undefined', testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
      });
    });

    describe(`trying to get a specific question (10 tests)`, () => {
      it('missing classId', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion')
          .query({ testId: 'TEST1', questionId: 'QUESTION1', testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
      });

      it('classId=null', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion')
          .query({ classId: null, testId: 'TEST1', questionId: 'QUESTION1', testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
      });

      it('classId=undefined', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion')
          .query({ classId: undefined, testId: 'TEST1', questionId: 'QUESTION1', testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
      });

      it('classId=null', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion')
          .query({ classId: 'null', testId: 'TEST1', questionId: 'QUESTION1', testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
      });

      it('classId=undefined', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion')
          .query({ classId: 'undefined', testId: 'TEST1', questionId: 'QUESTION1', testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
      });

      it('missing testId', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion')
          .query({ classId: 'CLASS1', questionId: 'QUESTION1', testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
      });

      it('testId=null', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion')
          .query({ classId: 'CLASS1', testId: null, questionId: 'QUESTION1', testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
      });

      it('testId=undefined', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion')
          .query({ classId: 'CLASS1', testId: undefined, questionId: 'QUESTION1', testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
      });

      it('testId=null', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion')
          .query({ classId: 'CLASS1', testId: 'null', questionId: 'QUESTION1', testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
      });

      it('testId=undefined', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion')
          .query({ classId: 'CLASS1', testId: 'undefined', questionId: 'QUESTION1', testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
      });
    });
  });
});

describe(`query params directly in url (16 tests)`, () => {
  beforeAll(() => {
    jest.spyOn(TestModel.prototype, 'teacherGetTestQuestion').mockImplementation(() => 'return mock data');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe(`crucial properties present (4 tests)`, () => {
    describe(`get a list of questions (3 tests)`, () => {
      it('missing questionId', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion?classId=CLASS1&testId=TEST1')
          .query({ testMode: true });
        expect(respone.status).toBe(200);
        expect(respone.body).toEqual({ message: 'Test passed!' });
      });

      it('questionId=null', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion?classId=CLASS1&testId=TEST1&questionId=null')
          .query({ testMode: true });
        expect(respone.status).toBe(200);
        expect(respone.body).toEqual({ message: 'Test passed!' });
      });

      it('questionId=undefined', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion?classId=CLASS1&testId=TEST1&questionId=undefined')
          .query({ testMode: true });
        expect(respone.status).toBe(200);
        expect(respone.body).toEqual({ message: 'Test passed!' });
      });
    });

    describe(`get a specific question (1 tests)`, () => {
      it('get a specific question successfully', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion?classId=CLASS1&testId=TEST1&questionId=QUESTION1')
          .query({ testMode: true });
        expect(respone.status).toBe(200);
        expect(respone.body).toEqual({ message: 'Test passed!' });
      });
    });
  });

  describe(`crucial properties not present (12 tests)`, () => {
    describe(`trying to get a list of questions (6 tests)`, () => {
      it('missing classId', async () => {
        const respone = await request(app).get('/test/teacherGetTestQuestion?testId=TEST1').query({ testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
      });

      it('classId=null', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion?classId=null&testId=TEST1')
          .query({ testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
      });

      it('classId=undefined', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion?classId=undefined&testId=TEST1')
          .query({ testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
      });

      it('missing testId', async () => {
        const respone = await request(app).get('/test/teacherGetTestQuestion?classId=CLASS1').query({ testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
      });

      it('testId=null', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion?classId=CLASS1&testId=null')
          .query({ testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
      });

      it('testId=undefined', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion?classId=CLASS1&testId=undefined')
          .query({ testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
      });
    });

    describe(`trying to get a specific question (6 tests)`, () => {
      it('missing classId', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion?testId=TEST1&questionId=QUESTION1')
          .query({ testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
      });

      it('classId=null', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion?classId=null&testId=TEST1&questionId=QUESTION1')
          .query({ testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
      });

      it('classId=undefined', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion?classId=undefined&testId=TEST1&questionId=QUESTION1')
          .query({ testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
      });

      it('missing testId', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion?classId=CLASS1&questionId=QUESTION1')
          .query({ testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
      });

      it('testId=null', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion?classId=CLASS1&testId=null&questionId=QUESTION1')
          .query({ testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
      });

      it('testId=undefined', async () => {
        const respone = await request(app)
          .get('/test/teacherGetTestQuestion?classId=CLASS1&testId=undefined&questionId=QUESTION1')
          .query({ testMode: true });
        expect(respone.status).toBe(400);
        expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
      });
    });
  });
});
