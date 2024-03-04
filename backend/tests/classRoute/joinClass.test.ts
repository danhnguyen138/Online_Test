import app from '../../src/app';
import ClassModel from '../../src/models/class.model';
import request from 'supertest';
import AuthModel from '../../src/models/auth.model';

// Total tests: 18

describe(`using sessions and provide cookie to server (8 tests)`, () => {
  let agent: request.SuperAgentTest;

  beforeAll(() => {
    agent = request.agent(app);
    jest.spyOn(AuthModel.prototype, 'login').mockImplementation(() => 'return mock data');
    jest.spyOn(ClassModel.prototype, 'verifyJoinCode').mockImplementation(() => 'return mock data');
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

  it('join successfully', (done) => {
    agent
      .post('/class/joinClass')
      .send({
        params: {
          classId: 'CLASS1',
          joinCode: '1234567890',
          testMode: true
        }
      })
      .expect({ message: 'Test passed!' })
      .expect(200, done);
  });

  it('missing classId', (done) => {
    agent
      .post('/class/joinClass')
      .send({
        params: {
          joinCode: '1234567890',
          testMode: true
        }
      })
      .expect({ message: 'Missing `classId` property!' })
      .expect(400, done);
  });

  it('classId=null', (done) => {
    agent
      .post('/class/joinClass')
      .send({
        params: {
          classId: null,
          joinCode: '1234567890',
          testMode: true
        }
      })
      .expect({ message: 'Missing `classId` property!' })
      .expect(400, done);
  });

  it('classId=undefined', (done) => {
    agent
      .post('/class/joinClass')
      .send({
        params: {
          classId: undefined,
          joinCode: '1234567890',
          testMode: true
        }
      })
      .expect({ message: 'Missing `classId` property!' })
      .expect(400, done);
  });

  it('missing joinCode', (done) => {
    agent
      .post('/class/joinClass')
      .send({
        params: {
          classId: 'CLASS1',
          testMode: true
        }
      })
      .expect({ message: 'Missing `joinCode` property!' })
      .expect(400, done);
  });

  it('joinCode=null', (done) => {
    agent
      .post('/class/joinClass')
      .send({
        params: {
          classId: 'CLASS1',
          joinCode: null,
          testMode: true
        }
      })
      .expect({ message: 'Missing `joinCode` property!' })
      .expect(400, done);
  });

  it('joinCode=undefined', (done) => {
    agent
      .post('/class/joinClass')
      .send({
        params: {
          classId: 'CLASS1',
          joinCode: undefined,
          testMode: true
        }
      })
      .expect({ message: 'Missing `joinCode` property!' })
      .expect(400, done);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});

describe(`not using session (10 tests)`, () => {
  beforeAll(() => {
    jest.spyOn(ClassModel.prototype, 'verifyJoinCode').mockImplementation(() => 'return mock data');
  });

  it('join successfully', (done) => {
    request(app)
      .post('/class/joinClass')
      .send({
        params: {
          studentId: 'STUDENT1',
          classId: 'CLASS1',
          joinCode: '1234567890',
          testMode: true
        }
      })
      .expect({ message: 'Test passed!' })
      .expect(200, done);
  });

  it('missing studentId', (done) => {
    request(app)
      .post('/class/joinClass')
      .send({
        params: {
          classId: 'CLASS1',
          joinCode: '1234567890',
          testMode: true
        }
      })
      .expect({ message: 'Missing `studentId` property!' })
      .expect(400, done);
  });

  it('studentId=null', (done) => {
    request(app)
      .post('/class/joinClass')
      .send({
        params: {
          studentId: null,
          classId: 'CLASS1',
          joinCode: '1234567890',
          testMode: true
        }
      })
      .expect({ message: 'Missing `studentId` property!' })
      .expect(400, done);
  });

  it('studentId=undefined', (done) => {
    request(app)
      .post('/class/joinClass')
      .send({
        params: {
          studentId: undefined,
          classId: 'CLASS1',
          joinCode: '1234567890',
          testMode: true
        }
      })
      .expect({ message: 'Missing `studentId` property!' })
      .expect(400, done);
  });

  it('missing classId', (done) => {
    request(app)
      .post('/class/joinClass')
      .send({
        params: {
          studentId: 'STUDENT1',
          joinCode: '1234567890',
          testMode: true
        }
      })
      .expect({ message: 'Missing `classId` property!' })
      .expect(400, done);
  });

  it('classId=null', (done) => {
    request(app)
      .post('/class/joinClass')
      .send({
        params: {
          classId: null,
          studentId: 'STUDENT1',
          joinCode: '1234567890',
          testMode: true
        }
      })
      .expect({ message: 'Missing `classId` property!' })
      .expect(400, done);
  });

  it('classId=undefined', (done) => {
    request(app)
      .post('/class/joinClass')
      .send({
        params: {
          classId: undefined,
          studentId: 'STUDENT1',
          joinCode: '1234567890',
          testMode: true
        }
      })
      .expect({ message: 'Missing `classId` property!' })
      .expect(400, done);
  });

  it('missing joinCode', (done) => {
    request(app)
      .post('/class/joinClass')
      .send({
        params: {
          classId: 'CLASS1',
          studentId: 'STUDENT1',
          testMode: true
        }
      })
      .expect({ message: 'Missing `joinCode` property!' })
      .expect(400, done);
  });

  it('joinCode=null', (done) => {
    request(app)
      .post('/class/joinClass')
      .send({
        params: {
          classId: 'CLASS1',
          studentId: 'STUDENT1',
          joinCode: null,
          testMode: true
        }
      })
      .expect({ message: 'Missing `joinCode` property!' })
      .expect(400, done);
  });

  it('joinCode=undefined', (done) => {
    request(app)
      .post('/class/joinClass')
      .send({
        params: {
          classId: 'CLASS1',
          studentId: 'STUDENT1',
          joinCode: undefined,
          testMode: true
        }
      })
      .expect({ message: 'Missing `joinCode` property!' })
      .expect(400, done);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
