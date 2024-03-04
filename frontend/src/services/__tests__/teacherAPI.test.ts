import axios from "axios";
import MockAdapter from 'axios-mock-adapter';
import { getClassAPI, getAllTestAPI, createClassAPI, getTestQuestionsAPI, addQuestionAPI, deleteQuestionAPI, logoutAPI, updateQuestionAPI, changeISO, updateTestAPI, createTestAPI, deleteTestAPI, teacherGetSubmissionListAPI, teacherGetSubmissionDetailAPI } from '../teacher';
// describe('updateTestApi', () => {
//     it('axios successfully data from an API', async () => {
//         const mock = new MockAdapter(axios);
//         const mockData = { data: 'mocked data' };
//         mock.onPut(`http://localhost:4001/test/updateTest/?classId=CLASS1&testId=TEST1}`, {
//             params: {
//                 classId: "CLASS1",
//                 endTime: changeISO("2023-01-01T03:00:00.000Z"),
//                 id: "TEST1",
//                 passCode: "PCODE01",
//                 period: 60,
//                 startTime: changeISO("2023-01-01T02:00:00.000Z"),
//                 title: "Test Title 1",
//                 testId: "TEST1"
//             }
//         }).reply(200, mockData);
//         const data = await updateTestAPI({
//             classId:"CLASS1",
//             endTime:"2023-01-01T03:00:00.000Z",
//             id:"TEST1",
//             testId:"TEST1",
//             passCode:"PCODE01",
//             period:60,
//             startTime:"2023-01-01T02:00:00.000Z",
//             title:"Test Title 1"
//         });
//         console.log(data);
//         // const data= res?.data;
//         expect(data).toEqual(mockData);
//     })
// })
describe('getAllTest', () => {
    it('axios successfully data from an API', async () => {
        const mock = new MockAdapter(axios);
        const mockData = { data: 'mocked data' };
        mock.onGet(`http://localhost:4001/test/getAllTest?classId=CLASS1`).reply(200, mockData);
        const data = await getAllTestAPI('CLASS1');

        // console.log(data);
        expect(data).toEqual(mockData);
    })
})

describe('getClassAPI', () => {
    it('axios successfully data from an API', async () => {
        const mock = new MockAdapter(axios);
        const mockData = { data: 'mocked data' };
        mock.onGet(`http://localhost:4001/class/getClass`).reply(200, mockData);
        const data = await getClassAPI();
        // console.log(data);
        expect(data).toEqual(mockData);
    })
})

describe('createClassAPI', () => {
    it('axios successfully data from an API', async () => {
        const mock = new MockAdapter(axios);
        const mockData = { data: 'mocked data' };
        mock.onPost(`http://localhost:4001/class/createClass`, { params: { name: "name" } }).reply(200, mockData);
        const response = await createClassAPI({ name: "name" });
        const data = response?.data
        console.log(data);
        expect(data).toEqual(mockData);
    })
})

describe('teacherGetTestQuestionAPI', () => {
    it('axios successfully data from an API', async () => {
        const mock = new MockAdapter(axios);
        const mockData = { data: 'mocked data' };
        mock.onGet(`http://localhost:4001/test/teacherGetTestQuestion?classId=CLASS1&testId=TEST1`).reply(200, mockData);
        const response = await getTestQuestionsAPI({ classId: "CLASS1", testId: "TEST1" });
        const data = response?.data
        expect(data).toEqual(mockData);
    })
})

describe('addQuestionAPI', () => {
    it('axios successfully data from an API', async () => {
        const mock = new MockAdapter(axios);
        const mockData = { data: 'mocked data' };
        mock.onPost(`http://localhost:4001/test/addQuestion`, {
            params:
            {
                classId: "CLASS1",
                testId: "TEST1",
                questions: []
            }
        }).reply(200, mockData);
        const response = await addQuestionAPI({
            classId: "CLASS1",
            testId: "TEST1",
            questions: []
        });
        const data = response?.data
        console.log(data);
        expect(data).toEqual(mockData);
    })
})

describe('updateQuestionAPI', () => {
    it('axios successfully data from an API', async () => {
        const mock = new MockAdapter(axios);
        const mockData = { data: 'mocked data' };
        const mockData2 = { data: 'mocked data' };
        const mockData3 = { data: 'mocked data' };
        const mockData4 = { data: 'mocked data' };
        const mockData5 = { data: 'mocked data' };
        mock.onPut(`http://localhost:4001/test/updateQuestion?classId=CLASS1&testId=TEST1&questionId=QUESTION1`, { params: { description: "description" } }).reply(200, mockData);
        mock.onPut(`http://localhost:4001/test/updateAnswer?classId=CLASS1&testId=TEST1&questionId=QUESTION1&answerId=ANSWER1`, {
            params: {
                description: "description1",
                isCorrect: true
            }
        }).reply(200, mockData2)
        mock.onPut(`http://localhost:4001/test/updateAnswer?classId=CLASS1&testId=TEST1&questionId=QUESTION1&answerId=ANSWER2`, {
            params: {
                description: "description2",
                isCorrect: false
            }
        }).reply(200, mockData3)
        mock.onPut(`http://localhost:4001/test/updateAnswer?classId=CLASS1&testId=TEST1&questionId=QUESTION1&answerId=ANSWER3`, {
            params: {
                description: "description3",
                isCorrect: false
            }
        }).reply(200, mockData4)
        mock.onPut(`http://localhost:4001/test/updateAnswer?classId=CLASS1&testId=TEST1&questionId=QUESTION1&answerId=ANSWER4`, {
            params: {
                description: "description4",
                isCorrect: false
            }
        }).reply(200, mockData5)
        const response = await updateQuestionAPI({
            classId: "CLASS1",
            testId: "TEST1",
            questionId: "QUESTION1",
            answerId1: "ANSWER1",
            answerId2: "ANSWER2",
            answerId3: "ANSWER3",
            answerId4: "ANSWER4",
            description: "description",
            option1: {
                description: "description1",
                isCorrect: true
            },
            option2: {
                description: "description2",
                isCorrect: false
            },
            option3: {
                description: "description3",
                isCorrect: false
            },
            option4: {
                description: "description4",
                isCorrect: false
            }
        });
        const data = response?.data
        console.log(data);
        expect(data).toEqual(mockData);
    })
})

describe('deleteQuestionAPI', () => {
    it('axios successfully data from an API', async () => {
        const mock = new MockAdapter(axios);
        const mockData = { data: 'mocked data' };
        mock.onDelete(`http://localhost:4001/test/deleteQuestion?classId=CLASS1&testId=TEST1&questionId=QUESTION1`).reply(200, mockData);
        const response = await deleteQuestionAPI({ classId: "CLASS1", testId: "TEST1", questionId: "QUESTION1" });
        const data = response?.data
        console.log(data);
        expect(data).toEqual(mockData);
    })
})









describe('logoutAPI', () => {
    it('axios successfully data from an API', async () => {
        const mock = new MockAdapter(axios);
        const mockData = { data: 'mocked data' };
        mock.onDelete(`http://localhost:4001/auth/logout`).reply(200, mockData);
        const response = await logoutAPI();
        const data = response?.data
        console.log(data);
        expect(data).toEqual(mockData);
    })
})

describe('createTestAPI', () => {
    it('axios successfully data from an API', async () => {
        const mock = new MockAdapter(axios);
        const mockData = { data: 'mocked data' };
        mock.onPost(`http://localhost:4001/test/createTest`, {
            params:
            {
                classId: "CLASS1",
                testId: "TEST1",
                questions: []
            }
        }).reply(200, mockData);
        const response = await createTestAPI({
            classId: "CLASS1",
            testId: "TEST1",
            questions: []
        });
        const data = response?.data
        console.log(data);
        expect(data).toEqual(mockData);
    })
})

describe('deleteTestAPI', () => {
    it('axios successfully data from an API', async () => {
        const mock = new MockAdapter(axios);
        const mockData = { data: 'mocked data' };
        mock.onDelete(`http://localhost:4001/test/deleteTest`, {
            params: {
                classId: "CLASS1",
                testId: "TEST1"
            }
        }).reply(200, mockData);
        const data = await deleteTestAPI({
            classId: "CLASS1",
            id: "TEST1"
        });
        expect(data).toEqual(mockData);
    })
})

describe('teacherGetSubmissionListAPI', () => {
    it('axios successfully data from an API', async () => {
        const mock = new MockAdapter(axios);
        const mockData = { data: 'mocked data' };
        mock.onGet(`http://localhost:4001/test/teacherGetSubmissionList?classId=CLASS1&testId=TEST1`).reply(200, mockData);
        const data = await teacherGetSubmissionListAPI("CLASS1", "TEST1");
        // console.log(data);
        expect(data).toEqual(mockData);
    })
})

describe('teacherGetSubmissionDetailAPI', () => {
    it('axios successfully data from an API', async () => {
        const mock = new MockAdapter(axios);
        const mockData = { data: 'mocked data' };
        mock.onGet(`http://localhost:4001/test/teacherGetSubmissionDetail?submissionId=SUBMIT1`).reply(200, mockData);
        const data = await teacherGetSubmissionDetailAPI("SUBMIT1");
        // console.log(data);
        expect(data).toEqual(mockData);
    })
})

