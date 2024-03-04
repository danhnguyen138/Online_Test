import app from '../../src/app';
import request from 'supertest';
import TestModel from '../../src/models/test.model';

// Total tests: 32

describe(`using 'query' (19 tests)`, () => {
  beforeAll(() => {
    jest.spyOn(TestModel.prototype, 'updateQuestion').mockImplementation(() => 'return mock data');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe(`send request with crucial parameters (4 tests)`, () => {
    it('missing description', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion')
        .query({ classId: 'CLASS1', testId: 'TEST1', questionId: 'QUESTION1' })
        .send({
          params: {
            testMode: true
          }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `description` property!' });
    });

    it('description=null', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion')
        .query({ classId: 'CLASS1', testId: 'TEST1', questionId: 'QUESTION1' })
        .send({
          params: {
            description: null,
            testMode: true
          }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `description` property!' });
    });

    it('description=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion')
        .query({ classId: 'CLASS1', testId: 'TEST1', questionId: 'QUESTION1' })
        .send({
          params: {
            description: undefined,
            testMode: true
          }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `description` property!' });
    });

    it('update question description successfully', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion')
        .query({ classId: 'CLASS1', testId: 'TEST1', questionId: 'QUESTION1' })
        .send({
          params: {
            description: 'ABC',
            testMode: true
          }
        });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });
  });

  describe(`send request without crucial parameters (15 tests)`, () => {
    it('missing classId', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion')
        .query({ testId: 'TEST1', questionId: 'QUESTION1' })
        .send({
          params: { description: 'ABC', testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('classId=null', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion')
        .query({ classId: null, testId: 'TEST1', questionId: 'QUESTION1' })
        .send({
          params: { description: 'ABC', testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('classId=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion')
        .query({ classId: undefined, testId: 'TEST1', questionId: 'QUESTION1' })
        .send({
          params: { description: 'ABC', testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('classId=null', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion')
        .query({ classId: 'null', testId: 'TEST1', questionId: 'QUESTION1' })
        .send({
          params: { description: 'ABC', testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('classId=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion')
        .query({ classId: 'undefined', testId: 'TEST1', questionId: 'QUESTION1' })
        .send({
          params: { description: 'ABC', testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('missing testId', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion')
        .query({ classId: 'CLASS1', questionId: 'QUESTION1' })
        .send({
          params: { description: 'ABC', testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('testId=null', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion')
        .query({ classId: 'CLASS1', testId: null, questionId: 'QUESTION1' })
        .send({
          params: { description: 'ABC', testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('testId=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion')
        .query({ classId: 'CLASS1', testId: undefined, questionId: 'QUESTION1' })
        .send({
          params: { description: 'ABC', testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('testId=null', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion')
        .query({ classId: 'CLASS1', testId: 'null', questionId: 'QUESTION1' })
        .send({
          params: { description: 'ABC', testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('testId=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion')
        .query({ classId: 'CLASS1', testId: 'undefined', questionId: 'QUESTION1' })
        .send({
          params: { description: 'ABC', testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('missing questionId', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion')
        .query({ classId: 'CLASS1', testId: 'TEST1' })
        .send({
          params: { description: 'ABC', testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `questionId` parameter!' });
    });

    it('questionId=null', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion')
        .query({ classId: 'CLASS1', testId: 'TEST1', questionId: null })
        .send({
          params: { description: 'ABC', testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `questionId` parameter!' });
    });

    it('questionId=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion')
        .query({ classId: 'CLASS1', testId: 'TEST1', questionId: undefined })
        .send({
          params: { description: 'ABC', testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `questionId` parameter!' });
    });

    it('questionId=null', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion')
        .query({ classId: 'CLASS1', testId: 'TEST1', questionId: 'null' })
        .send({
          params: { description: 'ABC', testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `questionId` parameter!' });
    });

    it('questionId=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion')
        .query({ classId: 'CLASS1', testId: 'TEST1', questionId: 'undefined' })
        .send({
          params: { description: 'ABC', testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `questionId` parameter!' });
    });
  });
});

describe(`query params directly in url (13 tests)`, () => {
  beforeAll(() => {
    jest.spyOn(TestModel.prototype, 'updateQuestion').mockImplementation(() => 'return mock data');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe(`send request with crucial parameters (4 tests)`, () => {
    it('missing description', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion?classId=CLASS1&testId=TEST1&questionId=QUESTION1')
        .send({
          params: {
            testMode: true
          }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `description` property!' });
    });

    it('description=null', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion?classId=CLASS1&testId=TEST1&questionId=QUESTION1')
        .send({
          params: {
            description: null,
            testMode: true
          }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `description` property!' });
    });

    it('description=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion?classId=CLASS1&testId=TEST1&questionId=QUESTION1')
        .send({
          params: {
            description: undefined,
            testMode: true
          }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `description` property!' });
    });

    it('update question description successfully', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion?classId=CLASS1&testId=TEST1&questionId=QUESTION1')
        .send({
          params: {
            description: 'ABC',
            testMode: true
          }
        });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });
  });

  describe(`send request without crucial parameters (9 tests)`, () => {
    it('missing classId', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion?testId=TEST1&questionId=QUESION1')
        .send({
          params: { description: 'ABC', testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('classId=null', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion?classId=null&testId=TEST1&questionId=QUESION1')
        .send({
          params: { description: 'ABC', testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('classId=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion?classId=undefined&testId=TEST1&questionId=QUESION1')
        .send({
          params: { description: 'ABC', testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('missing testId', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion?classId=CLASS1&questionId=QUESION1')
        .send({
          params: { description: 'ABC', testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('testId=null', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion?classId=CLASS1&testId=null&questionId=QUESION1')
        .send({
          params: { description: 'ABC', testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('testId=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion?classId=CLASS1&testId=undefined&questionId=QUESION1')
        .send({
          params: { description: 'ABC', testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('missing quesiondId', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion?classId=CLASS1&testId=TEST1')
        .send({
          params: { description: 'ABC', testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `questionId` parameter!' });
    });

    it('quesiondId=null', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion?classId=CLASS1&testId=TEST1&questionId=null')
        .send({
          params: { description: 'ABC', testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `questionId` parameter!' });
    });

    it('quesiondId=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateQuestion?classId=CLASS1&testId=TEST1&questionId=undefined')
        .send({
          params: { description: 'ABC', testMode: true }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `questionId` parameter!' });
    });
  });
});
