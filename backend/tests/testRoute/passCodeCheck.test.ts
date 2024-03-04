import app from '../../src/app';
import request from 'supertest';
import TestModel from '../../src/models/test.model';

// Total tests: 10

describe(`send request without crucial properties (9 tests)`, () => {
  it('missing classId', async () => {
    const respone = await request(app)
      .post('/test/passCodeCheck')
      .send({
        params: {
          testId: 'TEST1',
          passCode: '123456789'
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `classId` property!' });
  });

  it('classId=null', async () => {
    const respone = await request(app)
      .post('/test/passCodeCheck')
      .send({
        params: {
          classId: null,
          testId: 'TEST1',
          passCode: '123456789'
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `classId` property!' });
  });

  it('classId=undefined', async () => {
    const respone = await request(app)
      .post('/test/passCodeCheck')
      .send({
        params: {
          classId: undefined,
          testId: 'TEST1',
          passCode: '123456789'
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `classId` property!' });
  });

  it('missing testId', async () => {
    const respone = await request(app)
      .post('/test/passCodeCheck')
      .send({
        params: {
          classId: 'CLASS1',
          passCode: '123456789'
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `testId` property!' });
  });

  it('testId=null', async () => {
    const respone = await request(app)
      .post('/test/passCodeCheck')
      .send({
        params: {
          classId: 'CLASS1',
          testId: null,
          passCode: '123456789'
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `testId` property!' });
  });

  it('testId=undefined', async () => {
    const respone = await request(app)
      .post('/test/passCodeCheck')
      .send({
        params: {
          classId: 'CLASS1',
          testId: undefined,
          passCode: '123456789'
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `testId` property!' });
  });

  it('missing passCode', async () => {
    const respone = await request(app)
      .post('/test/passCodeCheck')
      .send({
        params: {
          classId: 'CLASS1',
          testId: 'TEST1'
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `passCode` property!' });
  });

  it('passCode=null', async () => {
    const respone = await request(app)
      .post('/test/passCodeCheck')
      .send({
        params: {
          classId: 'CLASS1',
          testId: 'TEST1',
          passCode: null
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `passCode` property!' });
  });

  it('passCode=undefined', async () => {
    const respone = await request(app)
      .post('/test/passCodeCheck')
      .send({
        params: {
          classId: 'CLASS1',
          testId: 'TEST1',
          passCode: undefined
        }
      });
    expect(respone.status).toBe(400);
    expect(respone.body).toEqual({ message: 'Missing `passCode` property!' });
  });
});

describe(`send request with only crucial properties (1 test)`, () => {
  beforeAll(() => {
    jest.spyOn(TestModel.prototype, 'passCodeTest').mockImplementation(() => 'return mock data');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('enter passcode successfully', async () => {
    const respone = await request(app)
      .post('/test/passCodeCheck')
      .send({
        params: {
          classId: 'CLASS1',
          testId: 'TEST1',
          passCode: '123456789',
          testMode: true
        }
      });
    expect(respone.status).toBe(200);
    expect(respone.body).toEqual({ message: 'Test passed!' });
  });
});
