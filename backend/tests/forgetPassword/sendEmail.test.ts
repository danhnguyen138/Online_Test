import app from '../../src/app';
import request from 'supertest';
import ForgetPassword from '../../src/models/forgetPassword.model';

// Total tests: 7

describe(`missing crucial properties (6 tests)`, () => {
  it('missing username', (done) => {
    request(app)
      .post('/forgetPassword/send-email')
      .send({
        params: {
          email: 'test@gmail.com'
        }
      })
      .expect({ message: `Missing 'username' property!` })
      .expect(400, done);
  });

  it('username=null', (done) => {
    request(app)
      .post('/forgetPassword/send-email')
      .send({
        params: {
          username: null,
          email: 'test@gmail.com'
        }
      })
      .expect({ message: `Missing 'username' property!` })
      .expect(400, done);
  });

  it('username=undefined', (done) => {
    request(app)
      .post('/forgetPassword/send-email')
      .send({
        params: {
          username: undefined,
          email: 'test@gmail.com'
        }
      })
      .expect({ message: `Missing 'username' property!` })
      .expect(400, done);
  });

  it('missing email', (done) => {
    request(app)
      .post('/forgetPassword/send-email')
      .send({
        params: {
          username: 'abc'
        }
      })
      .expect({ message: `Missing 'email' property!` })
      .expect(400, done);
  });

  it('email=null', (done) => {
    request(app)
      .post('/forgetPassword/send-email')
      .send({
        params: {
          email: null,
          username: 'abc'
        }
      })
      .expect({ message: `Missing 'email' property!` })
      .expect(400, done);
  });

  it('email=undefined', (done) => {
    request(app)
      .post('/forgetPassword/send-email')
      .send({
        params: {
          email: undefined,
          username: 'abc'
        }
      })
      .expect({ message: `Missing 'email' property!` })
      .expect(400, done);
  });
});

describe(`crucial properties present (1 test)`, () => {
  beforeAll(() => {
    jest.spyOn(ForgetPassword.prototype, 'checkUser').mockImplementation(() => 'return mock data');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('success!', (done) => {
    request(app)
      .post('/forgetPassword/send-email')
      .send({
        params: {
          email: 'test@gmail.com',
          username: 'abc',
          testMode: true
        }
      })
      .expect({ message: `Test passed!` })
      .expect(200, done);
  });
});
