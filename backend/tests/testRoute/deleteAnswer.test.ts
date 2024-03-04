import app from '../../src/app';
import request from 'supertest';
import TestModel from '../../src/models/test.model';

// Total tests: 34

describe(`query params directly in url (13 tests)`, () => {
  beforeAll(() => {
    jest.spyOn(TestModel.prototype, 'deleteAnswer').mockImplementation(() => 'return mock data');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('delete successfully', (done) => {
    request(app)
      .delete('/test/deleteAnswer?classId=CLASS1&testId=TEST1&questionId=QUESTION1&answerId=ANSWER1')
      .query({
        testMode: true
      })
      .expect({ message: 'Test passed!' })
      .expect(200, done);
  });

  it('missing classId', (done) => {
    request(app)
      .delete('/test/deleteAnswer?testId=TEST1&questionId=QUESTION1')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=null', (done) => {
    request(app)
      .delete('/test/deleteAnswer?classId=null&testId=TEST1&questionId=QUESTION1')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=undefined', (done) => {
    request(app)
      .delete('/test/deleteAnswer?classId=undefined&testId=TEST1&questionId=QUESTION1')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('missing testId', (done) => {
    request(app)
      .delete('/test/deleteAnswer?classId=CLASS1&questionId=QUESTION1')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `testId` parameter!' })
      .expect(400, done);
  });

  it('testId=null', (done) => {
    request(app)
      .delete('/test/deleteAnswer?classId=CLASS1&testId=null&questionId=QUESTION1')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `testId` parameter!' })
      .expect(400, done);
  });

  it('testId=undefined', (done) => {
    request(app)
      .delete('/test/deleteAnswer?classId=CLASS1&testId=undefined&questionId=QUESTION1')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `testId` parameter!' })
      .expect(400, done);
  });

  it('missing questionId', (done) => {
    request(app)
      .delete('/test/deleteAnswer?classId=CLASS1&testId=TEST1')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `questionId` parameter!' })
      .expect(400, done);
  });

  it('questionId=null', (done) => {
    request(app)
      .delete('/test/deleteAnswer?classId=CLASS1&testId=TEST1&questionId=null')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `questionId` parameter!' })
      .expect(400, done);
  });

  it('questionId=undefined', (done) => {
    request(app)
      .delete('/test/deleteAnswer?classId=CLASS1&testId=TEST1&questionId=undefined')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `questionId` parameter!' })
      .expect(400, done);
  });

  it('missing answerId', (done) => {
    request(app)
      .delete('/test/deleteAnswer?classId=CLASS1&testId=TEST1&questionId=QUESTION1')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `answerId` parameter!' })
      .expect(400, done);
  });

  it('answerId=null', (done) => {
    request(app)
      .delete('/test/deleteAnswer?classId=CLASS1&testId=TEST1&questionId=QUESTION1&answerId=null')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `answerId` parameter!' })
      .expect(400, done);
  });

  it('answerId=undefined', (done) => {
    request(app)
      .delete('/test/deleteAnswer?classId=CLASS1&testId=TEST1&questionId=QUESTION1&answerId=undefined')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `answerId` parameter!' })
      .expect(400, done);
  });
});

describe(`using 'query (21 tests)'`, () => {
  beforeAll(() => {
    jest.spyOn(TestModel.prototype, 'deleteAnswer').mockImplementation(() => 'return mock data');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('delete successfully', (done) => {
    request(app)
      .delete('/test/deleteAnswer')
      .query({
        classId: 'CLASS1',
        testId: 'TEST1',
        questionId: 'QUESTION1',
        answerId: 'ANSWER1',
        testMode: true
      })
      .expect({ message: 'Test passed!' })
      .expect(200, done);
  });

  it('missing classId', (done) => {
    request(app)
      .delete('/test/deleteAnswer')
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
      .delete('/test/deleteAnswer')
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
      .delete('/test/deleteAnswer')
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
      .delete('/test/deleteAnswer')
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
      .delete('/test/deleteAnswer')
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
      .delete('/test/deleteAnswer')
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
      .delete('/test/deleteAnswer')
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
      .delete('/test/deleteAnswer')
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
      .delete('/test/deleteAnswer')
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
      .delete('/test/deleteAnswer')
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
      .delete('/test/deleteAnswer')
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
      .delete('/test/deleteAnswer')
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
      .delete('/test/deleteAnswer')
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
      .delete('/test/deleteAnswer')
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
      .delete('/test/deleteAnswer')
      .query({
        testId: 'TEST1',
        classId: 'CLASS1',
        questionId: 'undefined',
        testMode: true
      })
      .expect({ message: 'Missing `questionId` parameter!' })
      .expect(400, done);
  });

  it('missing answerId', (done) => {
    request(app)
      .delete('/test/deleteAnswer')
      .query({
        classId: 'CLASS1',
        testId: 'TEST1',
        questionId: 'QUESTION1',
        testMode: true
      })
      .expect({ message: 'Missing `answerId` parameter!' })
      .expect(400, done);
  });

  it('answerId=null', (done) => {
    request(app)
      .delete('/test/deleteAnswer')
      .query({
        testId: 'TEST1',
        classId: 'CLASS1',
        questionId: 'QUESTION1',
        answerId: null,
        testMode: true
      })
      .expect({ message: 'Missing `answerId` parameter!' })
      .expect(400, done);
  });

  it('answerId=null', (done) => {
    request(app)
      .delete('/test/deleteAnswer')
      .query({
        testId: 'TEST1',
        classId: 'CLASS1',
        questionId: 'QUESTION1',
        answerId: 'null',
        testMode: true
      })
      .expect({ message: 'Missing `answerId` parameter!' })
      .expect(400, done);
  });

  it('answerId=undefined', (done) => {
    request(app)
      .delete('/test/deleteAnswer')
      .query({
        testId: 'TEST1',
        classId: 'CLASS1',
        questionId: 'QUESTION1',
        answerId: undefined,
        testMode: true
      })
      .expect({ message: 'Missing `answerId` parameter!' })
      .expect(400, done);
  });

  it('answerId=undefined', (done) => {
    request(app)
      .delete('/test/deleteAnswer')
      .query({
        testId: 'TEST1',
        classId: 'CLASS1',
        questionId: 'QUESTION1',
        answerId: 'undefined',
        testMode: true
      })
      .expect({ message: 'Missing `answerId` parameter!' })
      .expect(400, done);
  });
});
