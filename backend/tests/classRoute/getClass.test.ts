import app from '../../src/app';
import request from 'supertest';
import ClassModel from '../../src/models/class.model';
import AuthModel from '../../src/models/auth.model';

// Total tests: 81

describe(`using sessions (21 tests)`, () => {
  describe(`login successfully (11 tests)`, () => {
    let agent: request.SuperAgentTest;

    beforeAll(() => {
      agent = request.agent(app);
      jest.spyOn(AuthModel.prototype, 'login').mockImplementation(() => 'return mock data');
      jest.spyOn(ClassModel.prototype, 'getClass').mockImplementation(() => 'return mock data');
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

    describe(`using 'query' (6 tests)`, () => {
      describe(`get class list (5 tests)`, () => {
        it('missing classId', (done) => {
          agent
            .get('/class/getClass')
            .query({
              testMode: true
            })
            .expect({ message: 'Test passed!' })
            .expect(200, done);
        });

        it('classId=null', (done) => {
          agent
            .get('/class/getClass')
            .query({
              classId: null,
              testMode: true
            })
            .expect({ message: 'Test passed!' })
            .expect(200, done);
        });

        it('classId=undefined', (done) => {
          agent
            .get('/class/getClass')
            .query({
              classId: undefined,
              testMode: true
            })
            .expect({ message: 'Test passed!' })
            .expect(200, done);
        });

        it('classId=null', (done) => {
          agent
            .get('/class/getClass')
            .query({
              classId: 'null',
              testMode: true
            })
            .expect({ message: 'Test passed!' })
            .expect(200, done);
        });

        it('classId=undefined', (done) => {
          agent
            .get('/class/getClass')
            .query({
              classId: 'undefined',
              testMode: true
            })
            .expect({ message: 'Test passed!' })
            .expect(200, done);
        });
      });

      describe(`get a specific class (1 test)`, () => {
        it('classId provided', (done) => {
          agent
            .get('/class/getClass')
            .query({
              classId: 'CLASS1',
              testMode: true
            })
            .expect({ message: 'Test passed!' })
            .expect(200, done);
        });
      });
    });

    describe(`query params directly in url (4 tests)`, () => {
      describe(`get class list (3 tests)`, () => {
        it('missing classId', (done) => {
          agent
            .get('/class/getClass')
            .query({
              testMode: true
            })
            .expect({ message: 'Test passed!' })
            .expect(200, done);
        });

        it('classId=null', (done) => {
          agent
            .get('/class/getClass?classId=null')
            .query({
              testMode: true
            })
            .expect({ message: 'Test passed!' })
            .expect(200, done);
        });

        it('classId=undefined', (done) => {
          agent
            .get('/class/getClass?classId=undefined')
            .query({
              testMode: true
            })
            .expect({ message: 'Test passed!' })
            .expect(200, done);
        });
      });

      describe(`get a specific class (1 test)`, () => {
        it('classId provided', (done) => {
          agent
            .get('/class/getClass?classId=CLASS1')
            .query({
              testMode: true
            })
            .expect({ message: 'Test passed!' })
            .expect(200, done);
        });
      });
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });

  describe(`didn't login (10 tests)`, () => {
    beforeAll(() => {
      jest.spyOn(ClassModel.prototype, 'getClass').mockImplementation(() => 'return mock data');
    });

    describe(`using 'query' (6 tests)`, () => {
      describe(`trying to get class list (5 tests)`, () => {
        it('missing classId', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=null', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              classId: null,
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=undefined', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              classId: undefined,
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=null', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              classId: 'null',
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=undefined', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              classId: 'undefined',
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });
      });

      describe(`trying to get a specific class (1 test)`, () => {
        it('classId provided', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              classId: 'CLASS1',
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });
      });
    });

    describe(`query params directly in url (4 tests)`, () => {
      describe(`trying to get class list (3 tests)`, () => {
        it('missing classId', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=null', (done) => {
          request(app)
            .get('/class/getClass?classId=null')
            .query({
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=undefined', (done) => {
          request(app)
            .get('/class/getClass?classId=undefined')
            .query({
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });
      });

      describe(`trying to get a specific class (1 test)`, () => {
        it('classId provided', (done) => {
          request(app)
            .get('/class/getClass?classId=CLASS1')
            .query({
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });
      });
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });
});

describe(`not using sessions (60 tests)`, () => {
  describe(`teacherId provided (10 tests)`, () => {
    beforeAll(() => {
      jest.spyOn(ClassModel.prototype, 'getClass').mockImplementation(() => 'return mock data');
    });

    describe(`using 'query' (6 tests)`, () => {
      describe(`get class list (5 tests)`, () => {
        it('missing classId', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              teacherId: 'TEACHER1',
              testMode: true
            })
            .expect({ message: 'Test passed!' })
            .expect(200, done);
        });

        it('classId=null', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              teacherId: 'TEACHER1',
              classId: null,
              testMode: true
            })
            .expect({ message: 'Test passed!' })
            .expect(200, done);
        });

        it('classId=undefined', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              teacherId: 'TEACHER1',
              classId: undefined,
              testMode: true
            })
            .expect({ message: 'Test passed!' })
            .expect(200, done);
        });

        it('classId=null', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              teacherId: 'TEACHER1',
              classId: 'null',
              testMode: true
            })
            .expect({ message: 'Test passed!' })
            .expect(200, done);
        });

        it('classId=undefined', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              teacherId: 'TEACHER1',
              classId: 'undefined',
              testMode: true
            })
            .expect({ message: 'Test passed!' })
            .expect(200, done);
        });
      });

      describe(`get a specific class (1 test)`, () => {
        it('classId provided', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              teacherId: 'TEACHER1',
              classId: 'CLASS1',
              testMode: true
            })
            .expect({ message: 'Test passed!' })
            .expect(200, done);
        });
      });
    });

    describe(`query params directly in url (4 tests)`, () => {
      describe(`get class list (3 tests)`, () => {
        it('missing classId', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              teacherId: 'TEACHER1',
              testMode: true
            })
            .expect({ message: 'Test passed!' })
            .expect(200, done);
        });

        it('classId=null', (done) => {
          request(app)
            .get('/class/getClass?classId=null')
            .query({
              teacherId: 'TEACHER1',
              testMode: true
            })
            .expect({ message: 'Test passed!' })
            .expect(200, done);
        });

        it('classId=undefined', (done) => {
          request(app)
            .get('/class/getClass?classId=undefined')
            .query({
              teacherId: 'TEACHER1',
              testMode: true
            })
            .expect({ message: 'Test passed!' })
            .expect(200, done);
        });
      });

      describe(`get a specific class (1 test)`, () => {
        it('classId provided', (done) => {
          request(app)
            .get('/class/getClass?classId=CLASS1')
            .query({
              teacherId: 'TEACHER1',
              testMode: true
            })
            .expect({ message: 'Test passed!' })
            .expect(200, done);
        });
      });
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });

  describe(`teacherId not provided (10 tests)`, () => {
    beforeAll(() => {
      jest.spyOn(ClassModel.prototype, 'getClass').mockImplementation(() => 'return mock data');
    });

    describe(`using 'query' (6 tests)`, () => {
      describe(`trying to get class list (5 tests)`, () => {
        it('missing classId', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=null', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              classId: null,
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=undefined', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              classId: undefined,
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=null', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              classId: 'null',
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=undefined', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              classId: 'undefined',
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });
      });

      describe(`trying to get a specific class (1 test)`, () => {
        it('classId provided', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              classId: 'CLASS1',
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });
      });
    });

    describe(`query params directly in url (4 tests)`, () => {
      describe(`trying to get class list (3 tests)`, () => {
        it('missing classId', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=null', (done) => {
          request(app)
            .get('/class/getClass?classId=null')
            .query({
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=undefined', (done) => {
          request(app)
            .get('/class/getClass?classId=undefined')
            .query({
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });
      });

      describe(`trying to get a specific class (1 test)`, () => {
        it('classId provided', (done) => {
          request(app)
            .get('/class/getClass?classId=CLASS1')
            .query({
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });
      });
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });

  describe(`teacherId=null (10 tests)`, () => {
    beforeAll(() => {
      jest.spyOn(ClassModel.prototype, 'getClass').mockImplementation(() => 'return mock data');
    });

    describe(`using 'query' (6 tests)`, () => {
      describe(`trying to get class list (5 tests)`, () => {
        it('missing classId', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              teacherId: null,
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=null', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              teacherId: null,
              classId: null,
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=undefined', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              teacherId: null,
              classId: undefined,
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=null', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              teacherId: null,
              classId: 'null',
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=undefined', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              teacherId: null,
              classId: 'undefined',
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });
      });

      describe(`trying to get a specific class (1 test)`, () => {
        it('classId provided', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              teacherId: null,
              classId: 'CLASS1',
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });
      });
    });

    describe(`query params directly in url (4 tests)`, () => {
      describe(`trying to get class list (3 tests)`, () => {
        it('missing classId', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              teacherId: null,
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=null', (done) => {
          request(app)
            .get('/class/getClass?classId=null')
            .query({
              teacherId: null,
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=undefined', (done) => {
          request(app)
            .get('/class/getClass?classId=undefined')
            .query({
              teacherId: null,
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });
      });

      describe(`trying to get a specific class (1 test)`, () => {
        it('classId provided', (done) => {
          request(app)
            .get('/class/getClass?classId=CLASS1')
            .query({
              teacherId: null,
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });
      });
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });

  describe(`teacherId=undefined (10 tests)`, () => {
    beforeAll(() => {
      jest.spyOn(ClassModel.prototype, 'getClass').mockImplementation(() => 'return mock data');
    });

    describe(`using 'query' (6 tests)`, () => {
      describe(`trying to get class list (5 tests)`, () => {
        it('missing classId', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              teacherId: undefined,
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=null', (done) => {
          request(app)
            .get('/class/getClass')
            .query({ teacherId: undefined, classId: null, testMode: true })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=undefined', (done) => {
          request(app)
            .get('/class/getClass')
            .query({ teacherId: undefined, classId: undefined, testMode: true })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=null', (done) => {
          request(app)
            .get('/class/getClass')
            .query({ teacherId: undefined, classId: 'null', testMode: true })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=undefined', (done) => {
          request(app)
            .get('/class/getClass')
            .query({ teacherId: undefined, classId: 'undefined', testMode: true })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });
      });

      describe(`trying to get a specific class (1 test)`, () => {
        it('classId provided', (done) => {
          request(app)
            .get('/class/getClass')
            .query({ teacherId: undefined, classId: 'CLASS1', testMode: true })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });
      });
    });

    describe(`query params directly in url (4 tests)`, () => {
      describe(`trying to get class list (3 tests)`, () => {
        it('missing classId', (done) => {
          request(app)
            .get('/class/getClass')
            .query({ teacherId: undefined, testMode: true })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=null', (done) => {
          request(app)
            .get('/class/getClass?classId=null')
            .query({ teacherId: undefined, testMode: true })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=undefined', (done) => {
          request(app)
            .get('/class/getClass?classId=undefined')
            .query({ teacherId: undefined, testMode: true })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });
      });

      describe(`trying to get a specific class (1 test)`, () => {
        it('classId provided', (done) => {
          request(app)
            .get('/class/getClass?classId=CLASS1')
            .query({ teacherId: undefined, testMode: true })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });
      });
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });

  describe(`teacherId=null (10 tests)`, () => {
    beforeAll(() => {
      jest.spyOn(ClassModel.prototype, 'getClass').mockImplementation(() => 'return mock data');
    });

    describe(`using 'query' (6 tests)`, () => {
      describe(`trying to get class list (5 tests)`, () => {
        it('missing classId', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              teacherId: 'null',
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=null', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              teacherId: 'null',
              classId: null,
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=undefined', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              teacherId: 'null',
              classId: undefined,
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=null', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              teacherId: 'null',
              classId: 'null',
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=undefined', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              teacherId: 'null',
              classId: 'undefined',
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });
      });

      describe(`trying to get a specific class (1 test)`, () => {
        it('classId provided', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              teacherId: 'null',
              classId: 'CLASS1',
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });
      });
    });

    describe(`query params directly in url (4 tests)`, () => {
      describe(`trying to get class list (3 tests)`, () => {
        it('missing classId', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              teacherId: 'null',
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=null', (done) => {
          request(app)
            .get('/class/getClass?classId=null')
            .query({
              teacherId: 'null',
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=undefined', (done) => {
          request(app)
            .get('/class/getClass?classId=undefined')
            .query({
              teacherId: 'null',
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });
      });

      describe(`trying to get a specific class (1 test)`, () => {
        it('classId provided', (done) => {
          request(app)
            .get('/class/getClass?classId=CLASS1')
            .query({
              teacherId: 'null',
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });
      });
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });

  describe(`teacherId=undefined (10 tests)`, () => {
    beforeAll(() => {
      jest.spyOn(ClassModel.prototype, 'getClass').mockImplementation(() => 'return mock data');
    });

    describe(`using 'query' (6 tests)`, () => {
      describe(`trying to get class list (5 tests)`, () => {
        it('missing classId', (done) => {
          request(app)
            .get('/class/getClass')
            .query({
              teacherId: 'undefined',
              testMode: true
            })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=null', (done) => {
          request(app)
            .get('/class/getClass')
            .query({ teacherId: 'undefined', classId: null, testMode: true })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=undefined', (done) => {
          request(app)
            .get('/class/getClass')
            .query({ teacherId: 'undefined', classId: undefined, testMode: true })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=null', (done) => {
          request(app)
            .get('/class/getClass')
            .query({ teacherId: 'undefined', classId: 'null', testMode: true })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=undefined', (done) => {
          request(app)
            .get('/class/getClass')
            .query({ teacherId: 'undefined', classId: 'undefined', testMode: true })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });
      });

      describe(`trying to get a specific class (1 test)`, () => {
        it('classId provided', (done) => {
          request(app)
            .get('/class/getClass')
            .query({ teacherId: 'undefined', classId: 'CLASS1', testMode: true })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });
      });
    });

    describe(`query params directly in url (4 tests)`, () => {
      describe(`trying to get class list (3 tests)`, () => {
        it('missing classId', (done) => {
          request(app)
            .get('/class/getClass')
            .query({ teacherId: 'undefined', testMode: true })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=null', (done) => {
          request(app)
            .get('/class/getClass?classId=null')
            .query({ teacherId: 'undefined', testMode: true })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });

        it('classId=undefined', (done) => {
          request(app)
            .get('/class/getClass?classId=undefined')
            .query({ teacherId: 'undefined', testMode: true })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });
      });

      describe(`trying to get a specific class (1 test)`, () => {
        it('classId provided', (done) => {
          request(app)
            .get('/class/getClass?classId=CLASS1')
            .query({ teacherId: 'undefined', testMode: true })
            .expect({ message: 'Missing `teacherId` parameter!' })
            .expect(400, done);
        });
      });
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });
  });
});
