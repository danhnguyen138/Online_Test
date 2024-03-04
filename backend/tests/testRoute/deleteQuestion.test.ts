import app from '../../src/app';
import request from 'supertest';
import TestModel from '../../src/models/test.model';

// Total tests: 26

describe(`query params directly in url (10 tests)`, () => {
  beforeAll(() => {
    jest.spyOn(TestModel.prototype, 'deleteQuestion').mockImplementation(() => 'return mock data');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('delete successfully', (done) => {
    request(app)
      .delete('/test/deleteQuestion?classId=CLASS1&testId=TEST1&questionId=QUESTION1')
      .query({
        testMode: true
      })
      .expect({ message: 'Test passed!' })
      .expect(200, done);
  });

  it('missing classId', (done) => {
    request(app)
      .delete('/test/deleteQuestion?testId=TEST1&questionId=QUESTION1')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=null', (done) => {
    request(app)
      .delete('/test/deleteQuestion?classId=null&testId=TEST1&questionId=QUESTION1')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=undefined', (done) => {
    request(app)
      .delete('/test/deleteQuestion?classId=undefined&testId=TEST1&questionId=QUESTION1')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('missing testId', (done) => {
    request(app)
      .delete('/test/deleteQuestion?classId=CLASS1&questionId=QUESTION1')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `testId` parameter!' })
      .expect(400, done);
  });

  it('testId=null', (done) => {
    request(app)
      .delete('/test/deleteQuestion?classId=CLASS1&testId=null&questionId=QUESTION1')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `testId` parameter!' })
      .expect(400, done);
  });

  it('testId=undefined', (done) => {
    request(app)
      .delete('/test/deleteQuestion?classId=CLASS1&testId=undefined&questionId=QUESTION1')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `testId` parameter!' })
      .expect(400, done);
  });

  it('missing questionId', (done) => {
    request(app)
      .delete('/test/deleteQuestion?classId=CLASS1&testId=TEST1')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `questionId` parameter!' })
      .expect(400, done);
  });

  it('questionId=null', (done) => {
    request(app)
      .delete('/test/deleteQuestion?classId=CLASS1&testId=TEST1&questionId=null')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `questionId` parameter!' })
      .expect(400, done);
  });

  it('questionId=undefined', (done) => {
    request(app)
      .delete('/test/deleteQuestion?classId=CLASS1&testId=TEST1&questionId=undefined')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `questionId` parameter!' })
      .expect(400, done);
  });
});

describe(`using 'query (16 tests)'`, () => {
  beforeAll(() => {
    jest.spyOn(TestModel.prototype, 'deleteQuestion').mockImplementation(() => 'return mock data');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('delete successfully', (done) => {
    request(app)
      .delete('/test/deleteQuestion')
      .query({
        classId: 'CLASS1',
        testId: 'TEST1',
        questionId: 'QUESTION1',
        testMode: true
      })
      .expect({ message: 'Test passed!' })
      .expect(200, done);
  });

  it('missing classId', (done) => {
    request(app)
      .delete('/test/deleteQuestion')
      .query({
        testId: 'TEST1',
        questionId: 'QUESTION1',
        testMode: true
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=null', (done) => {
    request(app)
      .delete('/test/deleteQuestion')
      .query({
        classId: null,
        testId: 'TEST1',
        questionId: 'QUESTION1',
        testMode: true
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=null', (done) => {
    request(app)
      .delete('/test/deleteQuestion')
      .query({
        classId: 'null',
        testId: 'TEST1',
        questionId: 'QUESTION1',
        testMode: true
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=undefined', (done) => {
    request(app)
      .delete('/test/deleteQuestion')
      .query({
        classId: undefined,
        testId: 'TEST1',
        questionId: 'QUESTION1',
        testMode: true
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=undefined', (done) => {
    request(app)
      .delete('/test/deleteQuestion')
      .query({
        classId: 'undefined',
        testId: 'TEST1',
        questionId: 'QUESTION1',
        testMode: true
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('missing testId', (done) => {
    request(app)
      .delete('/test/deleteQuestion')
      .query({
        classId: 'CLASS1',
        questionId: 'QUESTION1',
        testMode: true
      })
      .expect({ message: 'Missing `testId` parameter!' })
      .expect(400, done);
  });

  it('testId=null', (done) => {
    request(app)
      .delete('/test/deleteQuestion')
      .query({
        testId: null,
        classId: 'CLASS1',
        questionId: 'QUESTION1',
        testMode: true
      })
      .expect({ message: 'Missing `testId` parameter!' })
      .expect(400, done);
  });

  it('testId=null', (done) => {
    request(app)
      .delete('/test/deleteQuestion')
      .query({
        testId: 'null',
        classId: 'CLASS1',
        questionId: 'QUESTION1',
        testMode: true
      })
      .expect({ message: 'Missing `testId` parameter!' })
      .expect(400, done);
  });

  it('testId=undefined', (done) => {
    request(app)
      .delete('/test/deleteQuestion')
      .query({
        testId: undefined,
        classId: 'CLASS1',
        questionId: 'QUESTION1',
        testMode: true
      })
      .expect({ message: 'Missing `testId` parameter!' })
      .expect(400, done);
  });

  it('testId=undefined', (done) => {
    request(app)
      .delete('/test/deleteQuestion')
      .query({
        testId: 'undefined',
        classId: 'CLASS1',
        questionId: 'QUESTION1',
        testMode: true
      })
      .expect({ message: 'Missing `testId` parameter!' })
      .expect(400, done);
  });

  it('missing questionId', (done) => {
    request(app)
      .delete('/test/deleteQuestion')
      .query({
        classId: 'CLASS1',
        testId: 'TEST1',
        testMode: true
      })
      .expect({ message: 'Missing `questionId` parameter!' })
      .expect(400, done);
  });

  it('questionId=null', (done) => {
    request(app)
      .delete('/test/deleteQuestion')
      .query({
        testId: 'TEST1',
        classId: 'CLASS1',
        questionId: null,
        testMode: true
      })
      .expect({ message: 'Missing `questionId` parameter!' })
      .expect(400, done);
  });

  it('questionId=null', (done) => {
    request(app)
      .delete('/test/deleteQuestion')
      .query({
        testId: 'TEST1',
        classId: 'CLASS1',
        questionId: 'null',
        testMode: true
      })
      .expect({ message: 'Missing `questionId` parameter!' })
      .expect(400, done);
  });

  it('questionId=undefined', (done) => {
    request(app)
      .delete('/test/deleteQuestion')
      .query({
        testId: 'TEST1',
        classId: 'CLASS1',
        questionId: undefined,
        testMode: true
      })
      .expect({ message: 'Missing `questionId` parameter!' })
      .expect(400, done);
  });

  it('questionId=undefined', (done) => {
    request(app)
      .delete('/test/deleteQuestion')
      .query({
        testId: 'TEST1',
        classId: 'CLASS1',
        questionId: 'undefined',
        testMode: true
      })
      .expect({ message: 'Missing `questionId` parameter!' })
      .expect(400, done);
  });
});
