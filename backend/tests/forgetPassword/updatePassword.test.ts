import app from '../../src/app';
import request from 'supertest';
import ForgetPassword from '../../src/models/forgetPassword.model';

// Total tests: 7

describe(`missing crucial properties (6 tests)`, () => {
  it('missing userId', (done) => {
    request(app)
      .post('/forgetPassword/update-password')
      .send({
        params: {
          password: '123'
        }
      })
      .expect({ message: `Missing 'userId' property!` })
      .expect(400, done);
  });

  it('userId=null', (done) => {
    request(app)
      .post('/forgetPassword/update-password')
      .send({
        params: {
          userId: null,
          password: '123'
        }
      })
      .expect({ message: `Missing 'userId' property!` })
      .expect(400, done);
  });

  it('userId=undefined', (done) => {
    request(app)
      .post('/forgetPassword/update-password')
      .send({
        params: {
          userId: undefined,
          password: '123'
        }
      })
      .expect({ message: `Missing 'userId' property!` })
      .expect(400, done);
  });

  it('missing password', (done) => {
    request(app)
      .post('/forgetPassword/update-password')
      .send({
        params: {
          userId: 'USER1'
        }
      })
      .expect({ message: `Missing 'password' property!` })
      .expect(400, done);
  });

  it('password=null', (done) => {
    request(app)
      .post('/forgetPassword/update-password')
      .send({
        params: {
          userId: 'USER1',
          password: null
        }
      })
      .expect({ message: `Missing 'password' property!` })
      .expect(400, done);
  });

  it('password=undefined', (done) => {
    request(app)
      .post('/forgetPassword/update-password')
      .send({
        params: {
          userId: 'USER1',
          password: undefined
        }
      })
      .expect({ message: `Missing 'password' property!` })
      .expect(400, done);
  });
});

describe(`crucial properties present (1 test)`, () => {
  beforeAll(() => {
    jest.spyOn(ForgetPassword.prototype, 'updatePassword').mockImplementation(() => 'return mock data');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('success!', (done) => {
    request(app)
      .post('/forgetPassword/update-password')
      .send({
        params: {
          userId: 'USER1',
          password: '123',
          testMode: true
        }
      })
      .expect({ message: `Test passed!` })
      .expect(200, done);
  });
});
