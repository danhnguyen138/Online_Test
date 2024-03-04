import app from '../../src/app';
import request from 'supertest';
import AuthModel from '../../src/models/auth.model';

// Total tests: 11

describe(`login failed (6 tests)`, () => {
  it('should return 400 error telling that params.username not found', (done) => {
    request(app)
      .post('/auth/')
      .send({
        params: {
          password: 'password123',
          testMode: true
        }
      })
      .expect({ message: 'Username field is empty!' })
      .expect(400, done);
  });

  it('should return 400 error telling that params.password not found', (done) => {
    request(app)
      .post('/auth/')
      .send({
        params: {
          username: 'username123',
          testMode: true
        }
      })
      .expect({ message: 'Password field is empty!' })
      .expect(400, done);
  });

  it('should return 400 error telling that params.username not found', (done) => {
    request(app)
      .post('/auth/')
      .send({
        params: {
          username: null,
          password: 'password123',
          testMode: true
        }
      })
      .expect({ message: 'Username field is empty!' })
      .expect(400, done);
  });

  it('should return 400 error telling that params.password not found', (done) => {
    request(app)
      .post('/auth/')
      .send({
        params: {
          username: 'username123',
          password: null,
          testMode: true
        }
      })
      .expect({ message: 'Password field is empty!' })
      .expect(400, done);
  });

  it('should return 400 error telling that params.username not found', (done) => {
    request(app)
      .post('/auth/')
      .send({
        params: {
          username: undefined,
          password: 'password123',
          testMode: true
        }
      })
      .expect({ message: 'Username field is empty!' })
      .expect(400, done);
  });

  it('should return 400 error telling that params.password not found', (done) => {
    request(app)
      .post('/auth/')
      .send({
        params: {
          username: 'username123',
          password: undefined,
          testMode: true
        }
      })
      .expect({ message: 'Password field is empty!' })
      .expect(400, done);
  });
});

describe(`did not login and try to call APIs related to session-cookie (2 tests)`, () => {
  let agent: request.SuperAgentTest;

  beforeAll(() => {
    agent = request.agent(app);
    jest.spyOn(AuthModel.prototype, 'validateUser').mockImplementation(() => 'return mock data');
  });

  it('should return state:0, which means that session not found', (done) => {
    agent
      .get('/auth/loginState')
      .query({
        testMode: true
      })
      .expect({ state: 0 })
      .expect(200, done);
  });

  // it("should return 400 error, because the user hasn't logged in yet so there's no session to be delete and such", (done) => {
  //   agent.get('/auth/logout').expect({ message: 'Session cookie not present!' }).expect(400, done);
  // });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});

describe(`login success, test all APIs related to session-cookie (3 tests)`, () => {
  let agent: request.SuperAgentTest;

  beforeAll(() => {
    agent = request.agent(app);
    jest.spyOn(AuthModel.prototype, 'login').mockImplementation(() => 'return mock data');
    jest.spyOn(AuthModel.prototype, 'validateUser').mockImplementation(() => 'return mock data');
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

  it('get login state, which to define what kind of user is the client', (done) => {
    agent
      .get('/auth/loginState')
      .query({
        testMode: true
      })
      .expect({ message: 'Test passed!' })
      .expect(200, done);
  });

  // it('logout', (done) => {
  //   agent.get('/auth/logout').expect({ message: 'Logged out successfully!' }).expect(200, done);
  // });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
