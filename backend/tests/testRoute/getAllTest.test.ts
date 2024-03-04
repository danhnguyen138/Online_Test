import app from '../../src/app';
import request from 'supertest';
import TestModel from '../../src/models/test.model';

// Total tests: 10

describe(`using 'query' (6 tests)`, () => {
  beforeAll(() => {
    jest.spyOn(TestModel.prototype, 'getAllTest').mockImplementation(() => 'return mock data');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('get test list successfully', (done) => {
    request(app)
      .get('/test/getAllTest')
      .query({
        classId: 'CLASS1',
        testMode: true
      })
      .expect({ message: 'Test passed!' })
      .expect(200, done);
  });

  it('missing classId', (done) => {
    request(app)
      .get('/test/getAllTest')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=null', (done) => {
    request(app)
      .get('/test/getAllTest')
      .query({ classId: null, testMode: true })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=undefined', (done) => {
    request(app)
      .get('/test/getAllTest')
      .query({ classId: undefined, testMode: true })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=null', (done) => {
    request(app)
      .get('/test/getAllTest')
      .query({ classId: 'null', testMode: true })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=undefined', (done) => {
    request(app)
      .get('/test/getAllTest')
      .query({ classId: 'undefined', testMode: true })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });
});

describe(`query params directly in url (4 tests)`, () => {
  beforeAll(() => {
    jest.spyOn(TestModel.prototype, 'getAllTest').mockImplementation(() => 'return mock data');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('get test list successfully', (done) => {
    request(app)
      .get('/test/getAllTest?classId=CLASS1')
      .query({
        testMode: true
      })
      .expect({ message: 'Test passed!' })
      .expect(200, done);
  });

  it('missing classId', (done) => {
    request(app)
      .get('/test/getAllTest')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=null', (done) => {
    request(app)
      .get('/test/getAllTest?classId=null')
      .query({ testMode: true })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=undefined', (done) => {
    request(app)
      .get('/test/getAllTest?classId=undefined')
      .query({ testMode: true })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });
});
