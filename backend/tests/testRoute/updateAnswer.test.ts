import app from '../../src/app';
import request from 'supertest';
import TestModel from '../../src/models/test.model';

// Total tests: 56

describe(`using 'query' (32 tests)`, () => {
  beforeAll(() => {
    jest.spyOn(TestModel.prototype, 'updateAnswer').mockImplementation(() => 'return mock data');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe(`send request with crucial parameters (12 tests)`, () => {
    it('missing description', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ classId: 'CLASS1', testId: 'TEST1', questionId: 'QUESTION1', answerId: 'ANSWER1' })
        .send({
          params: {
            isCorrect: true,
            testMode: true
          }
        });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });

    it('description=null', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ classId: 'CLASS1', testId: 'TEST1', questionId: 'QUESTION1', answerId: 'ANSWER1' })
        .send({
          params: { isCorrect: false, description: null, testMode: true }
        });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });

    it('description=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ classId: 'CLASS1', testId: 'TEST1', questionId: 'QUESTION1', answerId: 'ANSWER1' })
        .send({
          params: { isCorrect: false, description: undefined, testMode: true }
        });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });

    it('missing isCorrect', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ classId: 'CLASS1', testId: 'TEST1', questionId: 'QUESTION1', answerId: 'ANSWER1' })
        .send({
          params: {
            description: 'ABC',
            testMode: true
          }
        });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });

    it('isCorrect=null', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ classId: 'CLASS1', testId: 'TEST1', questionId: 'QUESTION1', answerId: 'ANSWER1' })
        .send({
          params: { isCorrect: null, description: 'ABC', testMode: true }
        });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });

    it('isCorrect=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ classId: 'CLASS1', testId: 'TEST1', questionId: 'QUESTION1', answerId: 'ANSWER1' })
        .send({
          params: { isCorrect: undefined, description: 'ABC', testMode: true }
        });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });

    it('both isCorrect and description present and valid', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ classId: 'CLASS1', testId: 'TEST1', questionId: 'QUESTION1', answerId: 'ANSWER1' })
        .send({
          params: { isCorrect: true, description: 'ABC', testMode: true }
        });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });

    it('both isCorrect and description not present', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ classId: 'CLASS1', testId: 'TEST1', questionId: 'QUESTION1', answerId: 'ANSWER1' })
        .send({
          params: { testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({
        message: `Why would you call this API if you don't want to update anything in the answer?`
      });
    });

    it('both isCorrect and description present but invalid', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ classId: 'CLASS1', testId: 'TEST1', questionId: 'QUESTION1', answerId: 'ANSWER1' })
        .send({
          params: { isCorrect: null, description: undefined, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({
        message: `Why would you call this API if you don't want to update anything in the answer?`
      });
    });

    it('both isCorrect and description present but invalid', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ classId: 'CLASS1', testId: 'TEST1', questionId: 'QUESTION1', answerId: 'ANSWER1' })
        .send({
          params: { isCorrect: undefined, description: null, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({
        message: `Why would you call this API if you don't want to update anything in the answer?`
      });
    });

    it('both isCorrect and description present but invalid', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ classId: 'CLASS1', testId: 'TEST1', questionId: 'QUESTION1', answerId: 'ANSWER1' })
        .send({
          params: { isCorrect: null, description: null, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({
        message: `Why would you call this API if you don't want to update anything in the answer?`
      });
    });

    it('both isCorrect and description present but invalid', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ classId: 'CLASS1', testId: 'TEST1', questionId: 'QUESTION1', answerId: 'ANSWER1' })
        .send({
          params: { isCorrect: undefined, description: undefined, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({
        message: `Why would you call this API if you don't want to update anything in the answer?`
      });
    });
  });

  describe(`send request without crucial parameters (20 tests)`, () => {
    it('missing classId', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ testId: 'TEST1', questionId: 'QUESTION1', answerId: 'ANSWER1' })
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('classId=null', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ classId: null, testId: 'TEST1', questionId: 'QUESTION1', answerId: 'ANSWER1' })
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('classId=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ classId: undefined, testId: 'TEST1', questionId: 'QUESTION1', answerId: 'ANSWER1' })
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('classId=null', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ classId: 'null', testId: 'TEST1', questionId: 'QUESTION1', answerId: 'ANSWER1' })
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('classId=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ classId: 'undefined', testId: 'TEST1', questionId: 'QUESTION1', answerId: 'ANSWER1' })
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('missing testId', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ classId: 'CLASS1', questionId: 'QUESTION1', answerId: 'ANSWER1' })
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('testId=null', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ classId: 'CLASS1', testId: null, questionId: 'QUESTION1', answerId: 'ANSWER1' })
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('testId=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ classId: 'CLASS1', testId: undefined, questionId: 'QUESTION1', answerId: 'ANSWER1' })
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('testId=null', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ classId: 'CLASS1', testId: 'null', questionId: 'QUESTION1', answerId: 'ANSWER1' })
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('testId=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ classId: 'CLASS1', testId: 'undefined', questionId: 'QUESTION1', answerId: 'ANSWER1' })
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('missing questionId', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ classId: 'CLASS1', testId: 'TEST1', answerId: 'ANSWER1' })
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `questionId` parameter!' });
    });

    it('questionId=null', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ classId: 'CLASS1', testId: 'TEST1', questionId: null, answerId: 'ANSWER1' })
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `questionId` parameter!' });
    });

    it('questionId=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ classId: 'CLASS1', testId: 'TEST1', questionId: undefined, answerId: 'ANSWER1' })
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `questionId` parameter!' });
    });

    it('questionId=null', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ classId: 'CLASS1', testId: 'TEST1', questionId: 'null', answerId: 'ANSWER1' })
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `questionId` parameter!' });
    });

    it('questionId=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ classId: 'CLASS1', testId: 'TEST1', questionId: 'undefined', answerId: 'ANSWER1' })
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `questionId` parameter!' });
    });

    it('missing answerId', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ classId: 'CLASS1', testId: 'TEST1', questionId: 'QUESTION1' })
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `answerId` parameter!' });
    });

    it('answerId=null', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ classId: 'CLASS1', testId: 'TEST1', questionId: 'QUESTION1', answerId: null })
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `answerId` parameter!' });
    });

    it('answerId=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ classId: 'CLASS1', testId: 'TEST1', questionId: 'QUESTION1', answerId: undefined })
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `answerId` parameter!' });
    });

    it('answerId=null', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ classId: 'CLASS1', testId: 'TEST1', questionId: 'QUESTION1', answerId: 'null' })
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `answerId` parameter!' });
    });

    it('answerId=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer')
        .query({ classId: 'CLASS1', testId: 'TEST1', questionId: 'QUESTION1', answerId: 'undefined' })
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `answerId` parameter!' });
    });
  });
});

describe(`query params directly in url (24 tests)`, () => {
  beforeAll(() => {
    jest.spyOn(TestModel.prototype, 'updateAnswer').mockImplementation(() => 'return mock data');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe(`send request with crucial parameters (12 tests)`, () => {
    it('missing description', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer?classId=CLASS1&testId=TEST1&questionId=QUESTION1&answerId=ANSWER1')
        .send({
          params: {
            isCorrect: true,
            testMode: true
          }
        });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });

    it('description=null', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer?classId=CLASS1&testId=TEST1&questionId=QUESTION1&answerId=ANSWER1')
        .send({
          params: {
            description: null,
            isCorrect: false,
            testMode: true
          }
        });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });

    it('description=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer?classId=CLASS1&testId=TEST1&questionId=QUESTION1&answerId=ANSWER1')
        .send({
          params: {
            description: undefined,
            isCorrect: true,
            testMode: true
          }
        });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });

    it('missing isCorrect', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer?classId=CLASS1&testId=TEST1&questionId=QUESTION1&answerId=ANSWER1')
        .send({
          params: { description: 'ABC', testMode: true }
        });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });

    it('isCorrect=null', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer?classId=CLASS1&testId=TEST1&questionId=QUESTION1&answerId=ANSWER1')
        .send({
          params: {
            description: 'ABC',
            isCorrect: null,
            testMode: true
          }
        });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });

    it('isCorrect=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer?classId=CLASS1&testId=TEST1&questionId=QUESTION1&answerId=ANSWER1')
        .send({
          params: {
            description: 'ABC',
            isCorrect: undefined,
            testMode: true
          }
        });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });

    it('both isCorrect and description present and valid', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer?classId=CLASS1&testId=TEST1&questionId=QUESTION1&answerId=ANSWER1')
        .send({
          params: {
            description: 'ABC',
            isCorrect: false,
            testMode: true
          }
        });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });

    it('both isCorrect and description not present', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer?classId=CLASS1&testId=TEST1&questionId=QUESTION1&answerId=ANSWER1')
        .send({
          params: {
            testMode: true
          }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({
        message: `Why would you call this API if you don't want to update anything in the answer?`
      });
    });

    it('both isCorrect and description present but invalid', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer?classId=CLASS1&testId=TEST1&questionId=QUESTION1&answerId=ANSWER1')
        .send({
          params: {
            description: null,
            isCorrect: undefined,
            testMode: true
          }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({
        message: `Why would you call this API if you don't want to update anything in the answer?`
      });
    });

    it('both isCorrect and description present but invalid', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer?classId=CLASS1&testId=TEST1&questionId=QUESTION1&answerId=ANSWER1')
        .send({
          params: {
            description: undefined,
            isCorrect: null,
            testMode: true
          }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({
        message: `Why would you call this API if you don't want to update anything in the answer?`
      });
    });

    it('both isCorrect and description present but invalid', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer?classId=CLASS1&testId=TEST1&questionId=QUESTION1&answerId=ANSWER1')
        .send({
          params: {
            description: undefined,
            isCorrect: undefined,
            testMode: true
          }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({
        message: `Why would you call this API if you don't want to update anything in the answer?`
      });
    });

    it('both isCorrect and description present but invalid', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer?classId=CLASS1&testId=TEST1&questionId=QUESTION1&answerId=ANSWER1')
        .send({
          params: {
            description: null,
            isCorrect: null,
            testMode: true
          }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({
        message: `Why would you call this API if you don't want to update anything in the answer?`
      });
    });
  });

  describe(`send request without crucial parameters (12 tests)`, () => {
    it('missing classId', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer?testId=TEST1&questionId=QUESION1&answerId=ANSWER1')
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('classId=null', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer?classId=null&testId=TEST1&questionId=QUESION1&answerId=ANSWER1')
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('classId=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer?classId=undefined&testId=TEST1&questionId=QUESION1&answerId=ANSWER1')
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('missing testId', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer?classId=CLASS1&questionId=QUESION1&answerId=ANSWER1')
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('testId=null', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer?classId=CLASS1&testId=null&questionId=QUESION1&answerId=ANSWER1')
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('testId=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer?classId=CLASS1&testId=undefined&questionId=QUESION1&answerId=ANSWER1')
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('missing quesiondId', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer?classId=CLASS1&testId=TEST1&answerId=ANSWER1')
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `questionId` parameter!' });
    });

    it('quesiondId=null', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer?classId=CLASS1&testId=TEST1&questionId=null&answerId=ANSWER1')
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `questionId` parameter!' });
    });

    it('quesiondId=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer?classId=CLASS1&testId=TEST1&questionId=undefined&answerId=ANSWER1')
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `questionId` parameter!' });
    });

    it('missing answerId', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer?classId=CLASS1&testId=TEST1&questionId=QUESTION1')
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `answerId` parameter!' });
    });

    it('answerId=null', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer?classId=CLASS1&testId=TEST1&questionId=QUESTION1&answerId=null')
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `answerId` parameter!' });
    });

    it('answerId=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateAnswer?classId=CLASS1&testId=TEST1&questionId=QUESTION1&answerId=undefined')
        .send({
          params: { description: 'ABC', isCorrect: true, testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `answerId` parameter!' });
    });
  });
});
