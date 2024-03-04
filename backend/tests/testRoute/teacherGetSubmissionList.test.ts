import app from '../../src/app';
import request from 'supertest';
import TestModel from '../../src/models/test.model';

// Total tests: 20

describe(`using query (12 tests)`, () => {
  describe(`missing crucial params (10 tests)`, () => {
    it('missing classId', async () => {
      const respone = await request(app).get('/test/teacherGetSubmissionList').query({ testId: 'TEST1' });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('classId=null', async () => {
      const respone = await request(app)
        .get('/test/teacherGetSubmissionList')
        .query({ testId: 'TEST1', classId: null });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('classId=null', async () => {
      const respone = await request(app)
        .get('/test/teacherGetSubmissionList')
        .query({ testId: 'TEST1', classId: 'null' });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('classId=undefined', async () => {
      const respone = await request(app)
        .get('/test/teacherGetSubmissionList')
        .query({ testId: 'TEST1', classId: undefined });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('classId=undefined', async () => {
      const respone = await request(app)
        .get('/test/teacherGetSubmissionList')
        .query({ testId: 'TEST1', classId: 'undefined' });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('missing testId', async () => {
      const respone = await request(app).get('/test/teacherGetSubmissionList').query({ classId: 'CLASS1' });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('testId=null', async () => {
      const respone = await request(app)
        .get('/test/teacherGetSubmissionList')
        .query({ testId: null, classId: 'CLASS1' });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('testId=null', async () => {
      const respone = await request(app)
        .get('/test/teacherGetSubmissionList')
        .query({ testId: 'null', classId: 'CLASS1' });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('testId=undefined', async () => {
      const respone = await request(app)
        .get('/test/teacherGetSubmissionList')
        .query({ testId: undefined, classId: 'CLASS1' });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('testId=undefined', async () => {
      const respone = await request(app)
        .get('/test/teacherGetSubmissionList')
        .query({ testId: 'undefined', classId: 'CLASS1' });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });
  });

  describe(`crucial params present (2 tests)`, () => {
    beforeAll(() => {
      jest.spyOn(TestModel.prototype, 'getSubmissionList').mockImplementation(() => 'return mock data');
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('with studentId', async () => {
      const respone = await request(app)
        .get('/test/teacherGetSubmissionList')
        .query({ classId: 'CLASS1', testId: 'TEST1', studentId: 'STUDENT1', testMode: true });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });

    it('without studentId', async () => {
      const respone = await request(app)
        .get('/test/teacherGetSubmissionList')
        .query({ classId: 'CLASS1', testId: 'TEST1', testMode: true });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });
  });
});

describe(`query params directly in url (8 tests)`, () => {
  describe(`missing crucial params (6 tests)`, () => {
    it('missing classId', async () => {
      const respone = await request(app).get('/test/teacherGetSubmissionList?testId=TEST1');
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('classId=null', async () => {
      const respone = await request(app).get('/test/teacherGetSubmissionList?testId=TEST1&classId=null');
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('classId=undefined', async () => {
      const respone = await request(app).get('/test/teacherGetSubmissionList?testId=TEST1&classId=undefined');
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('missing testId', async () => {
      const respone = await request(app).get('/test/teacherGetSubmissionList?classId=CLASS1');
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('testId=null', async () => {
      const respone = await request(app).get('/test/teacherGetSubmissionList?classId=CLASS1&testId=null');
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('testId=undefined', async () => {
      const respone = await request(app).get('/test/teacherGetSubmissionList?classId=CLASS1&testId=undefined');
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });
  });

  describe(`crucial params present (2 tests)`, () => {
    beforeAll(() => {
      jest.spyOn(TestModel.prototype, 'getSubmissionList').mockImplementation(() => 'return mock data');
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('with studentId', async () => {
      const respone = await request(app).get(
        '/test/teacherGetSubmissionList?classId=CLASS1&testId=TEST1&studentId=STUDENT1&testMode=true'
      );
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });

    it('without studentId', async () => {
      const respone = await request(app).get(
        '/test/teacherGetSubmissionList?classId=CLASS1&testId=TEST1&testMode=true'
      );
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });
  });
});
