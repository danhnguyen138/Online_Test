import app from '../../src/app';
import request from 'supertest';
import ClassModel from '../../src/models/class.model';

// Total tests: 10

describe(`query params directly in the url (4 tests)`, () => {
  beforeAll(() => {
    jest.spyOn(ClassModel.prototype, 'deleteClass').mockImplementation(() => 'return mock data');
  });

  it('delete successfully', (done) => {
    request(app)
      .delete('/class/deleteClass?classId=CLASS1')
      .query({
        testMode: true
      })
      .expect({ message: 'Test passed!' })
      .expect(200, done);
  });

  it('missing classId', (done) => {
    request(app)
      .delete('/class/deleteClass')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=null', (done) => {
    request(app)
      .delete('/class/deleteClass?classId=null')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=undefined', (done) => {
    request(app)
      .delete('/class/deleteClass?classId=undefined')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});

describe(`use 'query' (6 tests)`, () => {
  beforeAll(() => {
    jest.spyOn(ClassModel.prototype, 'deleteClass').mockImplementation(() => 'return mock data');
  });

  it('delete successfully', (done) => {
    request(app)
      .delete('/class/deleteClass')
      .query({
        classId: 'CLASS1',
        testMode: true
      })
      .expect({ message: 'Test passed!' })
      .expect(200, done);
  });

  it('missing classId', (done) => {
    request(app)
      .delete('/class/deleteClass')
      .query({
        testMode: true
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=null', (done) => {
    request(app)
      .delete('/class/deleteClass')
      .query({
        classId: null,
        testMode: true
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=null', (done) => {
    request(app)
      .delete('/class/deleteClass')
      .query({
        classId: 'null',
        testMode: true
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=undefined', (done) => {
    request(app)
      .delete('/class/deleteClass')
      .query({
        classId: undefined,
        testMode: true
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=undefined', (done) => {
    request(app)
      .delete('/class/deleteClass')
      .query({
        classId: 'undefined',
        testMode: true
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
