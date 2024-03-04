import app from '../../src/app';
import request from 'supertest';
import TestModel from '../../src/models/test.model';

// Total tests: 18

describe(`query params directly in url (7 tests)`, () => {
  beforeAll(() => {
    jest.spyOn(TestModel.prototype, 'deleteTest').mockImplementation(() => 'return mock data');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('delete successfully', (done) => {
    request(app)
      .delete('/test/deleteTest?classId=CLASS1&testId=TEST1')
      .query({
        testMode: true
      })
      .expect({ message: 'Test passed!' })
      .expect(200, done);
  });

  it('missing classId', (done) => {
    request(app)
      .delete('/test/deleteTest?testId=TEST1')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=null', (done) => {
    request(app)
      .delete('/test/deleteTest?classId=null&testId=TEST1')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=undefined', (done) => {
    request(app)
      .delete('/test/deleteTest?classId=undefined&testId=TEST1')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('missing testId', (done) => {
    request(app)
      .delete('/test/deleteTest?classId=CLASS1')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `testId` parameter!' })
      .expect(400, done);
  });

  it('testId=null', (done) => {
    request(app)
      .delete('/test/deleteTest?classId=CLASS1&testId=null')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `testId` parameter!' })
      .expect(400, done);
  });

  it('testId=undefined', (done) => {
    request(app)
      .delete('/test/deleteTest?classId=CLASS1&testId=undefined')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `testId` parameter!' })
      .expect(400, done);
  });
});

describe(`using 'query (11 tests)'`, () => {
  beforeAll(() => {
    jest.spyOn(TestModel.prototype, 'deleteTest').mockImplementation(() => 'return mock data');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('delete successfully', (done) => {
    request(app)
      .delete('/test/deleteTest')
      .query({
        classId: 'CLASS1',
        testId: 'TEST1',
        testMode: true
      })
      .expect({ message: 'Test passed!' })
      .expect(200, done);
  });

  it('missing classId', (done) => {
    request(app)
      .delete('/test/deleteTest')
      .query({
        testId: 'TEST1',
        testMode: true
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=null', (done) => {
    request(app)
      .delete('/test/deleteTest')
      .query({
        classId: null,
        testId: 'TEST1',
        testMode: true
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=null', (done) => {
    request(app)
      .delete('/test/deleteTest')
      .query({
        classId: 'null',
        testId: 'TEST1',
        testMode: true
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=undefined', (done) => {
    request(app)
      .delete('/test/deleteTest')
      .query({
        classId: undefined,
        testId: 'TEST1',
        testMode: true
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=undefined', (done) => {
    request(app)
      .delete('/test/deleteTest')
      .query({
        classId: 'undefined',
        testId: 'TEST1',
        testMode: true
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('missing testId', (done) => {
    request(app)
      .delete('/test/deleteTest')
      .query({
        classId: 'CLASS1',
        testMode: true
      })
      .expect({ message: 'Missing `testId` parameter!' })
      .expect(400, done);
  });

  it('testId=null', (done) => {
    request(app)
      .delete('/test/deleteTest')
      .query({
        testId: null,
        classId: 'CLASS1',
        testMode: true
      })
      .expect({ message: 'Missing `testId` parameter!' })
      .expect(400, done);
  });

  it('testId=null', (done) => {
    request(app)
      .delete('/test/deleteTest')
      .query({
        testId: 'null',
        classId: 'CLASS1',
        testMode: true
      })
      .expect({ message: 'Missing `testId` parameter!' })
      .expect(400, done);
  });

  it('testId=undefined', (done) => {
    request(app)
      .delete('/test/deleteTest')
      .query({
        testId: undefined,
        classId: 'CLASS1',
        testMode: true
      })
      .expect({ message: 'Missing `testId` parameter!' })
      .expect(400, done);
  });

  it('testId=undefined', (done) => {
    request(app)
      .delete('/test/deleteTest')
      .query({
        testId: 'undefined',
        classId: 'CLASS1',
        testMode: true
      })
      .expect({ message: 'Missing `testId` parameter!' })
      .expect(400, done);
  });
});
