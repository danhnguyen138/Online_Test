import axios from 'axios';
// import { changeISO } from '../data/data';

export function changeISO(datetime: string) {

  if (typeof (datetime) == 'string'&& datetime.length!==0) {
      const originalDate = new Date(datetime);
      const convertedDate = new Date(originalDate.getTime() + 7 * 60 * 60 * 1000);

    
      const convertedTimeString = convertedDate.toISOString();
   
      let dem = countColon(convertedTimeString);
      if (dem == 2) return convertedTimeString.substring(0, convertedTimeString.lastIndexOf(':'));
      else return convertedTimeString;
  }
  return "";

}
function countColon(data: string) {
  let count: number = 0;

  for (let i = 0; i < data.length; i++) {
      if (data[i] === ':') {
          count++;
      }
  }
  return count;
}
//Anh Danh code api
export const updateTestAPI= async(data:any)=>{
  try {
    const params={
      ...data,
      testId: data.id,
      startTime: changeISO(data.startTime),
      endTime: changeISO(data.endTime),
    }
    const response= await axios.put(`http://localhost:4001/test/updateTest/?classId=${params.classId}&testId=${params.testId}`,{params:params});
    return response.data;
  } catch (error) {
    console.log(error)
  }
}
export const deleteTestAPI=async(data:any)=>{
  try {
    console.log(data);
    const response=await axios.delete(`http://localhost:4001/test/deleteTest`,{params:{
      classId: data.classId,
      testId: data.id
    }})
    return response.data;
  } catch (error) {
    console.log(error)
  }
}
export const createTestAPI= async(createTest: any)=>{
  try {
    const params= createTest;
    const response= await axios.post('http://localhost:4001/test/createTest',{params:params});
    return response;
  } catch (error) {
    console.log(error)
  }
}
export const teacherGetSubmissionListAPI= async(classId: any, testId:any)=>{
  try {
    const response= await axios.get(`http://localhost:4001/test/teacherGetSubmissionList?classId=${classId}&testId=${testId}`);
    return response?.data;
  } catch (error) {
    console.log(error)
  }
}
export const teacherGetSubmissionDetailAPI= async(submitId: any)=>{
  try {
    const response= await axios.get(`http://localhost:4001/test/teacherGetSubmissionDetail?submissionId=${submitId}`);
    return response?.data;
  } catch (error) {
    console.log(error)
  }
}
export const deleteTest = async (testId: any, classId: any) => {
  try {
    const params = {
      testId: testId,
      classId: classId,
    };
    const response = await axios.post('http://localhost:4001/test/deleteTest', { params: params });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const updateTest = async (id: any, title: any, period: any, passCode: string) => {
    try {
        const params = {
          id: id,
          title: title,
          period: period,
          passCode: passCode,
        };
        const response = await axios.post('http://localhost:4001/test/updateTest', { params: params });
        console.log('Phản hồi từ máy chủ:', response.data);
        
      } catch (error) {
        console.log(error);
      }
}

//Minh code api
export const createClassAPI= async(createClass: any)=>{
  try {
    const params= createClass;
    const response= await axios.post('http://localhost:4001/class/createClass',{params:params}, {withCredentials: true});
    return response
  } catch (error) {
    console.log(error)
  }
}

export const getClassAPI= async()=>{
  try {
    const response=await axios.get('http://localhost:4001/class/getClass',{withCredentials: true});
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const getAllTestAPI= async(id: any)=>{
  try {
    const response=await axios.get(`http://localhost:4001/test/getAllTest?classId=${id}`);
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const getTestQuestionsAPI= async(params: any)=>{
  try {
    const {classId, testId} = params
    const response=await axios.get(`http://localhost:4001/test/teacherGetTestQuestion?classId=${classId}&testId=${testId}`);
    return response
  } catch (error) {
    console.log(error)
  }
}

export const addQuestionAPI= async(addQuestions: any)=>{
  try {
    const params = addQuestions
 
    const response= await axios.post(`http://localhost:4001/test/addQuestion`, {params : params});
    return response;
  } catch (error) {
    console.log(error)
  }
}

export const updateQuestionAPI= async(updateQuestionnapi: any)=>{
  try {
    const {classId, testId, questionId, answerId1, answerId2, answerId3, answerId4, description, option1, option2, option3, option4} = updateQuestionnapi
    console.log(updateQuestionnapi)
    const response=await axios.put(`http://localhost:4001/test/updateQuestion?classId=${classId}&testId=${testId}&questionId=${questionId}`, {params: {description}});
    const responsean1 = await axios.put(`http://localhost:4001/test/updateAnswer?classId=${classId}&testId=${testId}&questionId=${questionId}&answerId=${answerId1}`, {params: option1})
    const responsean2 = await axios.put(`http://localhost:4001/test/updateAnswer?classId=${classId}&testId=${testId}&questionId=${questionId}&answerId=${answerId2}`, {params: option2})
    const responsean3 = await axios.put(`http://localhost:4001/test/updateAnswer?classId=${classId}&testId=${testId}&questionId=${questionId}&answerId=${answerId3}`, {params: option3})
    const responsean4 = await axios.put(`http://localhost:4001/test/updateAnswer?classId=${classId}&testId=${testId}&questionId=${questionId}&answerId=${answerId4}`, {params: option4})
    // console.log(response)
    // console.log(responsean1)
    // console.log(responsean2)
    // console.log(responsean3)
    // console.log(responsean4)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const logoutAPI= async()=>{
  try {
    const response= await axios.delete('http://localhost:4001/auth/logout', {withCredentials:true});
    return response;
  } catch (error) {
    console.log(error)
  }
}

export const deleteQuestionAPI= async(deleteQuestion: any)=>{
  try {
    const {classId, testId, questionId} = deleteQuestion
    const response=await axios.delete(`http://localhost:4001/test/deleteQuestion?classId=${classId}&testId=${testId}&questionId=${questionId}`);
    // console.log(response)
    return response
  } catch (error) {
    console.log(error)
  }
}