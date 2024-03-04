import app from '../../src/app';
import ClassModel from '../../src/models/class.model';
import request from 'supertest';

// Total tests: 16

describe(`query params directly in the url (7 tests)`, () => {
  beforeAll(() => {
    jest.spyOn(ClassModel.prototype, 'updateClass').mockImplementation(() => 'return mock data');
  });

  it('update successfully', (done) => {
    request(app)
      .put('/class/updateClassName?classId=CLASS1')
      .send({
        params: {
          newName: 'new name',
          testMode: true
        }
      })
      .expect({ message: 'Test passed!' })
      .expect(200, done);
  });

  it('missing newName', (done) => {
    request(app)
      .put('/class/updateClassName?classId=CLASS1')
      .send({
        params: {
          testMode: true
        }
      })
      .expect({ message: 'Missing `newName` property!' })
      .expect(400, done);
  });

  it('newName=null', (done) => {
    request(app)
      .put('/class/updateClassName?classId=CLASS1')
      .send({
        params: {
          newName: null,
          testMode: true
        }
      })
      .expect({ message: 'Missing `newName` property!' })
      .expect(400, done);
  });

  it('newName=undefined', (done) => {
    request(app)
      .put('/class/updateClassName?classId=CLASS1')
      .send({
        params: {
          newName: undefined,
          testMode: true
        }
      })
      .expect({ message: 'Missing `newName` property!' })
      .expect(400, done);
  });

  it('missing classId', (done) => {
    request(app)
      .put('/class/updateClassName')
      .send({
        params: {
          newName: 'new name',
          testMode: true
        }
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=null', (done) => {
    request(app)
      .put('/class/updateClassName?classId=null')
      .send({
        params: {
          newName: 'new name',
          testMode: true
        }
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=undefined', (done) => {
    request(app)
      .put('/class/updateClassName?classId=undefined')
      .send({
        params: {
          newName: 'new name',
          testMode: true
        }
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});

describe(`use 'query' (9 tests)`, () => {
  beforeAll(() => {
    jest.spyOn(ClassModel.prototype, 'updateClass').mockImplementation(() => 'return mock data');
  });

  it('update successfully', (done) => {
    request(app)
      .put('/class/updateClassName')
      .query({ classId: 'CLASS1' })
      .send({
        params: {
          newName: 'new name',
          testMode: true
        }
      })
      .expect({ message: 'Test passed!' })
      .expect(200, done);
  });

  it('missing newName', (done) => {
    request(app)
      .put('/class/updateClassName')
      .query({ classId: 'CLASS1' })
      .send({
        params: {
          testMode: true
        }
      })
      .expect({ message: 'Missing `newName` property!' })
      .expect(400, done);
  });

  it('newName=null', (done) => {
    request(app)
      .put('/class/updateClassName')
      .query({ classId: 'CLASS1' })
      .send({
        params: {
          newName: null,
          testMode: true
        }
      })
      .expect({ message: 'Missing `newName` property!' })
      .expect(400, done);
  });

  it('newName=undefined', (done) => {
    request(app)
      .put('/class/updateClassName')
      .query({ classId: 'CLASS1' })
      .send({
        params: {
          newName: undefined,
          testMode: true
        }
      })
      .expect({ message: 'Missing `newName` property!' })
      .expect(400, done);
  });

  it('missing classId', (done) => {
    request(app)
      .put('/class/updateClassName')
      .send({
        params: {
          newName: 'new name',
          testMode: true
        }
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=null', (done) => {
    request(app)
      .put('/class/updateClassName')
      .query({ classId: null })
      .send({
        params: {
          newName: 'new name',
          testMode: true
        }
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=undefined', (done) => {
    request(app)
      .put('/class/updateClassName')
      .query({ classId: undefined })
      .send({
        params: {
          newName: 'new name',
          testMode: true
        }
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=null', (done) => {
    request(app)
      .put('/class/updateClassName')
      .query({ classId: 'null' })
      .send({
        params: {
          newName: 'new name',
          testMode: true
        }
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  it('classId=undefined', (done) => {
    request(app)
      .put('/class/updateClassName')
      .query({ classId: 'undefined' })
      .send({
        params: {
          newName: 'new name',
          testMode: true
        }
      })
      .expect({ message: 'Missing `classId` parameter!' })
      .expect(400, done);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
