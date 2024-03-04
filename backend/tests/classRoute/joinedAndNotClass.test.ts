import app from '../../src/app';
import ClassModel from '../../src/models/class.model';
import AuthModel from '../../src/models/auth.model';
import request from 'supertest';

// Total tests: 13

describe(`using session (3 tests)`, () => {
  describe(`login successfully (2 tests)`, () => {
    let agent: request.SuperAgentTest;

    beforeAll(() => {
      agent = request.agent(app);
      jest.spyOn(AuthModel.prototype, 'login').mockImplementation(() => 'return mock data');
      jest.spyOn(ClassModel.prototype, 'getJoinedAndNotJoinedClasses').mockImplementation(() => 'return mock data');
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

    it('get list of classes successfully', (done) => {
      agent
        .get('/class/joinedAndNotClass')
        .query({
          testMode: true
        })
        .expect({ message: 'Test passed!' })
        .expect(200, done);
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });

  describe(`didn't login (1 test)`, () => {
    beforeAll(() => {
      jest.spyOn(ClassModel.prototype, 'getJoinedAndNotJoinedClasses').mockImplementation(() => 'return mock data');
    });

    it('trying to get list of classes', (done) => {
      request(app)
        .get('/class/joinedAndNotClass')
        .query({
          testMode: true
        })
        .expect({ message: 'Missing `studentId` parameter!' })
        .expect(400, done);
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });
});

describe(`not using session (10 tests)`, () => {
  beforeAll(() => {
    jest.spyOn(ClassModel.prototype, 'getJoinedAndNotJoinedClasses').mockImplementation(() => 'return mock data');
  });

  describe(`using 'query' (6 tests)`, () => {
    describe(`studentId provided (1 test)`, () => {
      it(`get list of classes successfully`, (done) => {
        request(app)
          .get('/class/joinedAndNotClass')
          .query({
            studentId: 'STUDENT1',
            testMode: true
          })
          .expect({ message: 'Test passed!' })
          .expect(200, done);
      });
    });

    describe(`missing studentId (1 test)`, () => {
      it(`get list of classes successfully`, (done) => {
        request(app)
          .get('/class/joinedAndNotClass')
          .query({
            testMode: true
          })
          .expect({ message: 'Missing `studentId` parameter!' })
          .expect(400, done);
      });
    });

    describe(`studentId=null (2 tests)`, () => {
      it('get list of classes successfully', (done) => {
        request(app)
          .get('/class/joinedAndNotClass')
          .query({
            studentId: null,
            testMode: true
          })
          .expect({ message: 'Missing `studentId` parameter!' })
          .expect(400, done);
      });

      it('get list of classes successfully', (done) => {
        request(app)
          .get('/class/joinedAndNotClass')
          .query({
            studentId: 'null',
            testMode: true
          })
          .expect({ message: 'Missing `studentId` parameter!' })
          .expect(400, done);
      });
    });

    describe(`studentId=undefined (2 tests)`, () => {
      it('get list of classes successfully', (done) => {
        request(app)
          .get('/class/joinedAndNotClass')
          .query({
            studentId: undefined,
            testMode: true
          })
          .expect({ message: 'Missing `studentId` parameter!' })
          .expect(400, done);
      });

      it('get list of classes successfully', (done) => {
        request(app)
          .get('/class/joinedAndNotClass')
          .query({
            studentId: 'undefined',
            testMode: true
          })
          .expect({ message: 'Missing `studentId` parameter!' })
          .expect(400, done);
      });
    });
  });

  describe(`query params directly in url (4 tests)`, () => {
    it(`studentId provided`, (done) => {
      request(app)
        .get('/class/joinedAndNotClass?studentId=STUDENT1')
        .query({
          testMode: true
        })
        .expect({ message: 'Test passed!' })
        .expect(200, done);
    });

    it(`missing studentId`, (done) => {
      request(app)
        .get('/class/joinedAndNotClass')
        .query({
          testMode: true
        })
        .expect({ message: 'Missing `studentId` parameter!' })
        .expect(400, done);
    });

    it(`studentId=null`, (done) => {
      request(app)
        .get('/class/joinedAndNotClass?studentId=null')
        .query({
          testMode: true
        })
        .expect({ message: 'Missing `studentId` parameter!' })
        .expect(400, done);
    });

    it(`studentId=undefined`, (done) => {
      request(app)
        .get('/class/joinedAndNotClass?studentId=undefined')
        .query({
          testMode: true
        })
        .expect({ message: 'Missing `studentId` parameter!' })
        .expect(400, done);
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
