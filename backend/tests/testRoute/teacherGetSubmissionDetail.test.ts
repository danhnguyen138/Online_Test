import app from '../../src/app';
import request from 'supertest';
import TestModel from '../../src/models/test.model';

// Total tests: 10

describe(`using query (6 tests)`, () => {
  describe(`missing crucial params (5 tests)`, () => {
    it('missing submissionId', async () => {
      const respone = await request(app).get('/test/teacherGetSubmissionDetail');
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `submissionId` parameter!' });
    });

    it('submissionId=null', async () => {
      const respone = await request(app).get('/test/teacherGetSubmissionDetail').query({ submissionId: null });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `submissionId` parameter!' });
    });

    it('submissionId=null', async () => {
      const respone = await request(app).get('/test/teacherGetSubmissionDetail').query({ submissionId: 'null' });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `submissionId` parameter!' });
    });

    it('submissionId=undefined', async () => {
      const respone = await request(app).get('/test/teacherGetSubmissionDetail').query({ submissionId: undefined });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `submissionId` parameter!' });
    });

    it('submissionId=undefined', async () => {
      const respone = await request(app).get('/test/teacherGetSubmissionDetail').query({ submissionId: 'undefined' });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `submissionId` parameter!' });
    });
  });

  describe(`crucial params present (1 test)`, () => {
    beforeAll(() => {
      jest.spyOn(TestModel.prototype, 'getSubmissionDetail').mockImplementation(() => 'return mock data');
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('success!', async () => {
      const respone = await request(app)
        .get('/test/teacherGetSubmissionDetail')
        .query({ submissionId: 'SUBMIT1', testMode: true });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });
  });
});

describe(`query params directly in url (4 tests)`, () => {
  describe(`missing crucial params (3 tests)`, () => {
    it('missing submissionId', async () => {
      const respone = await request(app).get('/test/teacherGetSubmissionDetail');
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `submissionId` parameter!' });
    });

    it('submissionId=null', async () => {
      const respone = await request(app).get('/test/teacherGetSubmissionDetail?submissionId=null');
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `submissionId` parameter!' });
    });

    it('submissionId=undefined', async () => {
      const respone = await request(app).get('/test/teacherGetSubmissionDetail?submissionId=undefined');
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `submissionId` parameter!' });
    });
  });

  describe(`crucial params present (1 test)`, () => {
    beforeAll(() => {
      jest.spyOn(TestModel.prototype, 'getSubmissionDetail').mockImplementation(() => 'return mock data');
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('success!', async () => {
      const respone = await request(app).get('/test/teacherGetSubmissionDetail?submissionId=SUBMIT1&testMode=true');
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });
  });
});
