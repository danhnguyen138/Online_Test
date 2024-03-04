/* eslint-disable */
// @ts-nocheck

import React, { useEffect, useState } from 'react'
import { getTestQuestionsAPI, teacherGetSubmissionDetailAPI } from '../../../services/teacher'
import { useParams } from 'react-router-dom'
import DetailQuestionResult from '../../../component/TeacherComponents/TableResultDetail/DetailQuestionResult'

function ResultDetailList() {
  const {classId, testId, submissionId} = useParams()
  const [detailList, setDetailList] = useState([])
  const [quess, setQuess] = useState([])
  const [submit, setSubmit] = useState()
  async function fetchData() {
    const res = await teacherGetSubmissionDetailAPI(submissionId)
    const resp = await getTestQuestionsAPI({ classId, testId })
    if (resp?.status === 200) {
      setQuess(resp.data.data)
    }
    console.log(res.data.choices)
    setDetailList(res.data.choices)
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className='scroll-questions m-4'>
      {quess.map((ques, index) =>
        {
          return <div className='bodyQuestion' key={ques.questionId}>
              <div className='m-2'>
                  <DetailQuestionResult answers={ques} indx={index + 1} detailList = {detailList}/>
              </div>
          </div>
        }

      )}
  </div>
  )
}

export default ResultDetailList