import app from '../../src/app';
import request from 'supertest';
import SignUpModel from '../../src/models/signUp.model';

// Total tests: 10

describe(`missing crucial properties (9 tests)`, () => {
  it('name not found', (done) => {
    request(app)
      .post('/signUp/')
      .send({
        params: {
          password: 'password123',
          username: 'abc'
        }
      })
      .expect({ message: `Missing 'name' property!` })
      .expect(400, done);
  });

  it('name=null', (done) => {
    request(app)
      .post('/signUp/')
      .send({
        params: {
          name: null,
          password: 'password123',
          username: 'abc'
        }
      })
      .expect({ message: `Missing 'name' property!` })
      .expect(400, done);
  });

  it('name=undefined', (done) => {
    request(app)
      .post('/signUp/')
      .send({
        params: {
          name: undefined,
          password: 'password123',
          username: 'abc'
        }
      })
      .expect({ message: `Missing 'name' property!` })
      .expect(400, done);
  });

  it('username not found', (done) => {
    request(app)
      .post('/signUp/')
      .send({
        params: {
          name: 'test',
          password: 'password123'
        }
      })
      .expect({ message: `Missing 'username' property!` })
      .expect(400, done);
  });

  it('username=null', (done) => {
    request(app)
      .post('/signUp/')
      .send({
        params: {
          name: 'test',
          password: 'password123',
          username: null
        }
      })
      .expect({ message: `Missing 'username' property!` })
      .expect(400, done);
  });

  it('username=undefined', (done) => {
    request(app)
      .post('/signUp/')
      .send({
        params: {
          name: 'test',
          password: 'password123',
          username: undefined
        }
      })
      .expect({ message: `Missing 'username' property!` })
      .expect(400, done);
  });

  it('password not found', (done) => {
    request(app)
      .post('/signUp/')
      .send({
        params: {
          name: 'test',
          username: 'abc'
        }
      })
      .expect({ message: `Missing 'password' property!` })
      .expect(400, done);
  });

  it('password=null', (done) => {
    request(app)
      .post('/signUp/')
      .send({
        params: {
          name: 'test',
          username: 'abc',
          password: null
        }
      })
      .expect({ message: `Missing 'password' property!` })
      .expect(400, done);
  });

  it('password=undefined', (done) => {
    request(app)
      .post('/signUp/')
      .send({
        params: {
          name: 'test',
          username: 'abc',
          password: undefined
        }
      })
      .expect({ message: `Missing 'password' property!` })
      .expect(400, done);
  });
});

describe(`all properties present (1 test)`, () => {
  beforeAll(() => {
    jest.spyOn(SignUpModel.prototype, 'SignUpHandlerDatabase').mockImplementation(() => 'return mock data');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('ok', (done) => {
    request(app)
      .post('/signUp/')
      .send({
        params: {
          password: 'password123',
          username: 'abc',
          name: 'test',
          testMode: true
        }
      })
      .expect({ message: 'Test passed!' })
      .expect(200, done);
  });
});
