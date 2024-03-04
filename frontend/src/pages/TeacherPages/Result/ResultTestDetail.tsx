import React, { useEffect, useState } from 'react'
import { TableResultDetail } from '../../../component/TeacherComponents/TableResultDetail'
import { useParams } from 'react-router-dom';
import { teacherGetSubmissionListAPI } from '../../../services/teacher';
import { ModalSubmit } from '../../../component/TeacherComponents/ModalSubmit';
const initialValue = {
  name: "",
  score: 0,
  studentId: "",
  submissionId: "",
  submissionTime: "",
  timeSpent: "",
  totalCorrect: 0,
  totalQuestionAttempt: 0,
  totalWrong: 0
}
export const ResultTestDetail = (props: any) => {
  const { classId, testId } = useParams();
  const [dataDetail, setDataDetail] = useState(initialValue);
  const [data, setData] = useState(undefined);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const callAPIGetScore = async (classId: any, testId: any) => {
    const res = await teacherGetSubmissionListAPI(classId, testId);
    if (res?.statusText === "No Content") {
      setData(undefined)
    }
    setData(res?.data);
  }
  //http://localhost:4001/test/teacherGetSubmissionList
  useEffect(() => {
    callAPIGetScore(classId, testId);
  }, []);
  console.log(dataDetail)
  return (
    <>
      <div style={{ marginTop: "5px" }}>
        <h5 style={{
          marginLeft: "20px",
          fontWeight: "600",
          color: "black"
        }}>SUBMITTING</h5>
        {/* <h6 style={{
          marginLeft: "20px",
          fontWeight: "300",
          color: "black",
          fontSize:'13px',
        }}>Test name: abc</h6> */}
      </div >
      {data !== undefined && (<TableResultDetail
        data={data}
        title={['Student Name', 'Score', 'Time Submit']}
        handleShow={handleShow}
        setDataDetail={setDataDetail}
        dataDetail={dataDetail}
      />)}
      <ModalSubmit 
      show={show} 
      handleClose={handleClose} 
      handleShow={handleShow} 
      dataDetail={dataDetail}
      />
    </>
  )
}
