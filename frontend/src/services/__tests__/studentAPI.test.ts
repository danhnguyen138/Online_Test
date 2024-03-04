
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  getClassStudentAPI,
  getSubmissionTestAPI,
  passCodeCheckAPI,
  joinClassAPI,
  getTestClass,
  getTestQuestion,
  studentSubmitAnswer,
  getSubmissionDetail
} from '../student';

describe('getClassStudentAPI', () => {
  it('axios successfully data from an API', async () => {
    const mock = new MockAdapter(axios);
    const mockData = { data: 'mocked data' };
    mock.onGet(`http://localhost:4001/class/joinedAndNotClass`).reply(200, mockData);
    const data = await getClassStudentAPI();
    expect(data).toEqual(mockData);
  });
});

describe('getSubmissionTestAPI', () => {
  it('axios successfully data from an API', async () => {
    const mock = new MockAdapter(axios);
    const mockData = { data: 'mocked data' };
    mock
      .onGet(`http://localhost:4001/test/studentGetSubmissionList`, { params: { classId: 'CLASS1', testId: 'TEST1' } })
      .reply(200, mockData);
    const response = await getSubmissionTestAPI('CLASS1', 'TEST1');
    const data = response?.data;
    expect(data).toEqual(mockData);
  });
});

describe('passCodeCheckAPI', () => {
  it('axios successfully data from an API', async () => {
    const mock = new MockAdapter(axios);
    const mockData = { data: 'mocked data' };
    mock
      .onPost(`http://localhost:4001/test/passCodeCheck`, {
        params: { classId: 'CLASS1', testId: 'TEST1', passCode: '123456' },
      })
      .reply(200, mockData);
    const response = await passCodeCheckAPI('CLASS1', 'TEST1', '123456');
    const data = response?.data;
    expect(data).toEqual(mockData);
  });
});

describe('joinClassAPI', () => {
  it('axios successfully data from an API', async () => {
    const mock = new MockAdapter(axios);
    const mockData = { data: 'mocked data' };
    mock
      .onPost(`http://localhost:4001/class/joinClass`, { params: { classId: 'CLASS1', joinCode: '123456' } })
      .reply(200, mockData);
    const data = await joinClassAPI('CLASS1', '123456');
    expect(data).toEqual(mockData);
  });
});

describe('getTestClass', () => {
  it('axios successfully data from an API', async () => {
    const mock = new MockAdapter(axios);
    const mockData = { data: 'mocked data' };
    mock.onGet(`http://localhost:4001/test/getAllTest?classId=CLASS1`).reply(200, mockData);
    const data = await getTestClass('CLASS1');
    expect(data).toEqual(mockData);
  });
});

describe('getTestQuestion', () => {
  it('axios successfully data from an API', async () => {
    const mock = new MockAdapter(axios);
    const mockData = { data: 'mocked data' };
    mock.onGet(`http://localhost:4001/test/studentGetTestQuestion?classId=CLASS1&testId=TEST1`).reply(200, mockData);
    const response = await getTestQuestion('CLASS1', 'TEST1');
    const data = response?.data;
    expect(data).toEqual(mockData);
  });
});

describe('studentSubmitAnswer', () => {
  it('axios successfully data from an API', async () => {
    const mock = new MockAdapter(axios);
    const mockData = { data: 'mocked data' };
    mock
      .onPost(`http://localhost:4001/test/studentSubmitAnswer`, {
        params: {
          classId: 'CLASS1',
          testId: 'TEST1',
          timeSpent: '1:00:00',
          choices: [
            {
              questionId: 'QUESTION1',
              answerIds: ['ANSWER1'],
            },
          ],
        },
      })
      .reply(200, mockData);
    const response = await studentSubmitAnswer('CLASS1', 'TEST1', '1:00:00', [
      {
        questionId: 'QUESTION1',
        answerIds: ['ANSWER1'],
      },
    ]);
    const data = response?.data;
    expect(data).toEqual(mockData);
  });
});

describe('getSubmissionDetail', () => {
    it('axios successfully data from an API', async () => {
      const mock = new MockAdapter(axios);
      const mockData = { data: 'mocked data' };
      mock
        .onGet(`http://localhost:4001/test/studentGetSubmissionDetail`, { params: { submissionId: 'SUBMISSION1' } })
        .reply(200, mockData);
      const data = await getSubmissionDetail('SUBMISSION1');
      expect(data).toEqual(mockData);
    });
  });