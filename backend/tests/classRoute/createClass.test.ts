import app from '../../src/app';
import request from 'supertest';
import AuthModel from '../../src/models/auth.model';
import ClassModel from '../../src/models/class.model';

// Total tests: 12

describe(`using sessions (5 tests)`, () => {
  let agent: request.SuperAgentTest;

  beforeAll(() => {
    agent = request.agent(app);
    jest.spyOn(AuthModel.prototype, 'login').mockImplementation(() => 'return mock data');
    jest.spyOn(ClassModel.prototype, 'createClass').mockImplementation(() => 'return mock data');
  });

  it('login first, should return 200 status with message of session.userID', (done) => {
    agent
      .post('/auth/')
      .send({
        params: {
          username: 'username123',
          password: 'password123',
          testMode: true
        }
      })
      .expect({ message: 'Test session' })
      .expect(200, done);
  });

  it('missing name', (done) => {
    agent
      .post('/class/createClass')
      .send({
        params: {
          testMode: true
        }
      })
      .expect({ message: 'Missing `name` property!' })
      .expect(400, done);
  });

  it('name=null', (done) => {
    agent
      .post('/class/createClass')
      .send({
        params: {
          name: null,
          testMode: true
        }
      })
      .expect({ message: 'Missing `name` property!' })
      .expect(400, done);
  });

  it('name=undefined', (done) => {
    agent
      .post('/class/createClass')
      .send({
        params: {
          name: undefined,
          testMode: true
        }
      })
      .expect({ message: 'Missing `name` property!' })
      .expect(400, done);
  });

  it('create new class successfully', (done) => {
    agent
      .post('/class/createClass')
      .send({
        params: {
          name: 'New Class Name',
          testMode: true
        }
      })
      .expect({ message: 'Test passed!' })
      .expect(200, done);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});

describe(`not using sessions (7 tests)`, () => {
  beforeAll(() => {
    jest.spyOn(ClassModel.prototype, 'createClass').mockImplementation(() => 'return mock data');
  });

  it('missing name', (done) => {
    request(app)
      .post('/class/createClass')
      .send({
        params: {
          teacherId: 'TEACHER1',
          testMode: true
        }
      })
      .expect({ message: 'Missing `name` property!' })
      .expect(400, done);
  });

  it('name=null', (done) => {
    request(app)
      .post('/class/createClass')
      .send({
        params: {
          name: null,
          teacherId: 'TEACHER1',
          testMode: true
        }
      })
      .expect({ message: 'Missing `name` property!' })
      .expect(400, done);
  });

  it('name=undefined', (done) => {
    request(app)
      .post('/class/createClass')
      .send({
        params: {
          name: undefined,
          teacherId: 'TEACHER1',
          testMode: true
        }
      })
      .expect({ message: 'Missing `name` property!' })
      .expect(400, done);
  });

  it('missing teacherId', (done) => {
    request(app)
      .post('/class/createClass')
      .send({
        params: {
          name: 'new name',
          testMode: true
        }
      })
      .expect({ message: 'Missing `teacherId` property!' })
      .expect(400, done);
  });

  it('teacherId=null', (done) => {
    request(app)
      .post('/class/createClass')
      .send({
        params: {
          teacherId: null,
          name: 'new name',
          testMode: true
        }
      })
      .expect({ message: 'Missing `teacherId` property!' })
      .expect(400, done);
  });

  it('teacherId=undefined', (done) => {
    request(app)
      .post('/class/createClass')
      .send({
        params: {
          teacherId: undefined,
          name: 'new name',
          testMode: true
        }
      })
      .expect({ message: 'Missing `teacherId` property!' })
      .expect(400, done);
  });

  it('create new class successfully', (done) => {
    request(app)
      .post('/class/createClass')
      .send({
        params: {
          teacherId: 'TEACHER1',
          name: 'New Class Name',
          testMode: true
        }
      })
      .expect({ message: 'Test passed!' })
      .expect(200, done);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
