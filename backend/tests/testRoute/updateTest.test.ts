import app from '../../src/app';
import request from 'supertest';
import TestModel from '../../src/models/test.model';

// Total tests: 30

describe(`using 'query' (17 tests)`, () => {
  beforeAll(() => {
    jest.spyOn(TestModel.prototype, 'updateTest').mockImplementation(() => 'return mock data');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe(`missing crucial params (10 tests)`, () => {
    it('missing classId', async () => {
      const respone = await request(app)
        .put('/test/updateTest')
        .query({ testId: 'TEST1' })
        .send({
          params: {
            title: 'New title',
            startTime: '15:00:00',
            endTime: '18:00:00',
            passCode: '1234567890',
            period: 30,
            testMode: true
          }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('classId=null', async () => {
      const respone = await request(app)
        .put('/test/updateTest')
        .query({ classId: null, testId: 'TEST1' })
        .send({
          params: {
            title: 'New title',
            startTime: '15:00:00',
            endTime: '18:00:00',
            passCode: '1234567890',
            period: 30,
            testMode: true
          }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('classId=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateTest')
        .query({ classId: undefined, testId: 'TEST1' })
        .send({
          params: {
            title: 'New title',
            startTime: '15:00:00',
            endTime: '18:00:00',
            passCode: '1234567890',
            period: 30,
            testMode: true
          }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('classId=null', async () => {
      const respone = await request(app)
        .put('/test/updateTest')
        .query({ classId: 'null', testId: 'TEST1' })
        .send({
          params: {
            title: 'New title',
            startTime: '15:00:00',
            endTime: '18:00:00',
            passCode: '1234567890',
            period: 30,
            testMode: true
          }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('classId=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateTest')
        .query({ classId: 'undefined', testId: 'TEST1' })
        .send({
          params: {
            title: 'New title',
            startTime: '15:00:00',
            endTime: '18:00:00',
            passCode: '1234567890',
            period: 30,
            testMode: true
          }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('missing testId', async () => {
      const respone = await request(app)
        .put('/test/updateTest')
        .query({ classId: 'CLASS1' })
        .send({
          params: {
            title: 'New title',
            startTime: '15:00:00',
            endTime: '18:00:00',
            passCode: '1234567890',
            period: 30,
            testMode: true
          }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('testId=null', async () => {
      const respone = await request(app)
        .put('/test/updateTest')
        .query({ classId: 'CLASS1', testId: null })
        .send({
          params: {
            title: 'New title',
            startTime: '15:00:00',
            endTime: '18:00:00',
            passCode: '1234567890',
            period: 30,
            testMode: true
          }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('testId=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateTest')
        .query({ classId: 'CLASS1', testId: undefined })
        .send({
          params: {
            title: 'New title',
            startTime: '15:00:00',
            endTime: '18:00:00',
            passCode: '1234567890',
            period: 30,
            testMode: true
          }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('testId=null', async () => {
      const respone = await request(app)
        .put('/test/updateTest')
        .query({ classId: 'CLASS1', testId: 'null' })
        .send({
          params: {
            title: 'New title',
            startTime: '15:00:00',
            endTime: '18:00:00',
            passCode: '1234567890',
            period: 30,
            testMode: true
          }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('testId=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateTest')
        .query({ classId: 'CLASS1', testId: 'undefined' })
        .send({
          params: {
            title: 'New title',
            startTime: '15:00:00',
            endTime: '18:00:00',
            passCode: '1234567890',
            period: 30,
            testMode: true
          }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });
  });

  describe(`crucial params present (7 tests)`, () => {
    it('all properties present', async () => {
      const respone = await request(app)
        .put('/test/updateTest')
        .query({ classId: 'CLASS1', testId: 'TEST1' })
        .send({
          params: {
            title: 'New title',
            startTime: '15:00:00',
            endTime: '18:00:00',
            passCode: '1234567890',
            period: 30,
            testMode: true
          }
        });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });

    it('only title present', async () => {
      const respone = await request(app)
        .put('/test/updateTest')
        .query({ classId: 'CLASS1', testId: 'TEST1' })
        .send({
          params: {
            title: 'New title',
            startTime: null,
            endTime: undefined,
            period: null,
            testMode: true
          }
        });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });

    it('only startTime present', async () => {
      const respone = await request(app)
        .put('/test/updateTest')
        .query({ classId: 'CLASS1', testId: 'TEST1' })
        .send({
          params: {
            startTime: '15:00:00',
            endTime: null,
            passCode: undefined,
            testMode: true
          }
        });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });

    it('only endTime present', async () => {
      const respone = await request(app)
        .put('/test/updateTest')
        .query({ classId: 'CLASS1', testId: 'TEST1' })
        .send({
          params: {
            endTime: '18:00:00',
            passCode: null,
            period: undefined,
            testMode: true
          }
        });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });

    it('only passCode present', async () => {
      const respone = await request(app)
        .put('/test/updateTest')
        .query({ classId: 'CLASS1', testId: 'TEST1' })
        .send({
          params: {
            title: undefined,
            passCode: '1234567890',
            period: null,
            testMode: true
          }
        });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });

    it('only period present', async () => {
      const respone = await request(app)
        .put('/test/updateTest')
        .query({ classId: 'CLASS1', testId: 'TEST1' })
        .send({
          params: {
            title: null,
            passCode: undefined,
            period: 30,
            testMode: true
          }
        });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });

    it('no property present', async () => {
      const respone = await request(app)
        .put('/test/updateTest')
        .query({ classId: 'CLASS1', testId: 'TEST1' })
        .send({
          params: {
            testMode: true
          }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({
        message: `Why would you call this API if you don't have anything to change?`
      });
    });
  });
});

describe(`query params directly in url (13 tests)`, () => {
  beforeAll(() => {
    jest.spyOn(TestModel.prototype, 'updateTest').mockImplementation(() => 'return mock data');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe(`missing crucial params (6 tests)`, () => {
    it('missing classId', async () => {
      const respone = await request(app)
        .put('/test/updateTest?testId=TEST1')
        .send({
          params: {
            title: 'New title',
            startTime: '15:00:00',
            endTime: '18:00:00',
            passCode: '1234567890',
            period: 30,
            testMode: true
          }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('classId=null', async () => {
      const respone = await request(app)
        .put('/test/updateTest?classId=null&testId=TEST1')
        .send({
          params: {
            title: 'New title',
            startTime: '15:00:00',
            endTime: '18:00:00',
            passCode: '1234567890',
            period: 30,
            testMode: true
          }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('classId=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateTest?classId=undefined&testId=TEST1')
        .send({
          params: {
            title: 'New title',
            startTime: '15:00:00',
            endTime: '18:00:00',
            passCode: '1234567890',
            period: 30,
            testMode: true
          }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `classId` parameter!' });
    });

    it('missing testId', async () => {
      const respone = await request(app)
        .put('/test/updateTest?classId=CLASS1')
        .send({
          params: {
            title: 'New title',
            startTime: '15:00:00',
            endTime: '18:00:00',
            passCode: '1234567890',
            period: 30,
            testMode: true
          }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('testId=null', async () => {
      const respone = await request(app)
        .put('/test/updateTest?classId=CLASS1&testId=null')
        .send({
          params: {
            title: 'New title',
            startTime: '15:00:00',
            endTime: '18:00:00',
            passCode: '1234567890',
            period: 30,
            testMode: true
          }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });

    it('testId=undefined', async () => {
      const respone = await request(app)
        .put('/test/updateTest?classId=CLASS1&testId=undefined')
        .send({
          params: {
            title: 'New title',
            startTime: '15:00:00',
            endTime: '18:00:00',
            passCode: '1234567890',
            period: 30,
            testMode: true
          }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: 'Missing `testId` parameter!' });
    });
  });

  describe(`crucial params present (7 tests)`, () => {
    it('all properties present', async () => {
      const respone = await request(app)
        .put('/test/updateTest?classId=CLASS1&testId=TEST1')
        .send({
          params: {
            title: 'New title',
            startTime: '15:00:00',
            endTime: '18:00:00',
            passCode: '1234567890',
            period: 30,
            testMode: true
          }
        });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });

    it('only title present', async () => {
      const respone = await request(app)
        .put('/test/updateTest?classId=CLASS1&testId=TEST1')
        .send({
          params: {
            title: 'New title',
            startTime: null,
            endTime: undefined,
            period: null,
            testMode: true
          }
        });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });

    it('only startTime present', async () => {
      const respone = await request(app)
        .put('/test/updateTest?classId=CLASS1&testId=TEST1')
        .send({
          params: {
            startTime: '15:00:00',
            endTime: null,
            passCode: undefined,
            testMode: true
          }
        });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });

    it('only endTime present', async () => {
      const respone = await request(app)
        .put('/test/updateTest?classId=CLASS1&testId=TEST1')
        .send({
          params: {
            endTime: '18:00:00',
            passCode: null,
            period: undefined,
            testMode: true
          }
        });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });

    it('only passCode present', async () => {
      const respone = await request(app)
        .put('/test/updateTest?classId=CLASS1&testId=TEST1')
        .send({
          params: {
            title: undefined,
            passCode: '1234567890',
            period: null,
            testMode: true
          }
        });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });

    it('only period present', async () => {
      const respone = await request(app)
        .put('/test/updateTest?classId=CLASS1&testId=TEST1')
        .send({
          params: {
            title: null,
            passCode: undefined,
            period: 30,
            testMode: true
          }
        });
      expect(respone.status).toBe(200);
      expect(respone.body).toEqual({ message: 'Test passed!' });
    });

    it('no property present', async () => {
      const respone = await request(app)
        .put('/test/updateTest?classId=CLASS1&testId=TEST1')
        .send({
          params: {
            testMode: true
          }
        });
      expect(respone.status).toBe(400);
      expect(respone.body).toEqual({ message: `Why would you call this API if you don't have anything to change?` });
    });
  });
});
