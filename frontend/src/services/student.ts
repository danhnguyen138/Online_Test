import axios from 'axios';

export const getClassStudentAPI = async () => {
  try {
    const response = await axios.get('http://localhost:4001/class/joinedAndNotClass', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      withCredentials: true,
    });
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const getSubmissionTestAPI = async (classId: any, testId: any) => {
  const params = {
    classId: classId,
    testId: testId,
  };
  try {
    const response = await axios.get('http://localhost:4001/test/studentGetSubmissionList', {
      params: params,
      withCredentials: true,
    });

    return response
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const passCodeCheckAPI = async (classId: any, testId: any, passCode: any) => {
  const params = {
    classId: classId,
    testId: testId,
    passCode: passCode,
  };
  try {
    const response = await axios.post(`http://localhost:4001/test/passCodeCheck`, {
      params: params
    });
    return response
  } catch (error: any) {
    console.error('Error fetching data:', error);
  }
};

export const joinClassAPI = async (classId: any, joinCode: any) => {
  const params = {
    classId: classId,
    joinCode: joinCode,
  }
  try {
    const response = await axios.post(
      'http://localhost:4001/class/joinClass',
      {
        params: params
      },
      {
        withCredentials: true,
      }
    )
    return response.data
  } catch (error) {
    console.error('Lỗi khi gửi yêu cầu:', error);
  }    
};

export const getTestClass = async (classId: any) => {
  try {
    const response = await axios.get(`http://localhost:4001/test/getAllTest?classId=${classId}`);
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const getTestQuestion = async (classId: any, testId: any) => {
  try {
    const response = await axios.get(
      `http://localhost:4001/test/studentGetTestQuestion?classId=${classId}&testId=${testId}`,
    );
    return response
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const studentSubmitAnswer = async (classId: any, testId: any, timeSpent: any, choices: any) => {
  const params = {
    classId: classId,
    testId: testId,
    timeSpent: timeSpent,
    choices: choices,
  }
  try {
    const response = await axios.post(
      'http://localhost:4001/test/studentSubmitAnswer',
      {
        params: params
      },
      {
        withCredentials: true,
      },
    );
    return response; 
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const getSubmissionDetail = async (submitId: any) => {
  const param = {
    submissionId: submitId,
  }
  try {
    const response = await axios.get('http://localhost:4001/test/studentGetSubmissionDetail', {
      params: param
    });
    return response.data; 

  } catch (error) {
    console.error('Error fetching data:', error);
  }

}
