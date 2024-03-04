/* eslint-disable */
// @ts-nocheck

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { addQuestionAPI, deleteQuestionAPI, getTestQuestionsAPI, updateQuestionAPI } from '../../../services/teacher'
import DetailQuestion from '../../../component/TeacherComponents/Dashboard/DetailQuestion'
import './styleTest.css'
import { validateConfigure } from '../../../data/data';
import AddQuestion from '../../../component/TeacherComponents/Dashboard/AddQuestion'
import UpdateQuestion from '../../../component/TeacherComponents/Dashboard/UpdateQuestion'
import { toast } from 'react-toastify'

function ListQuestion() {
    const { classId, testId } = useParams()
    const initialAddQuestion = {
        classId: classId,
        testId: testId,
        questions: []
    }
    const [listQ, setListQ] = useState([])
    const [showAddMore, setShowAddMore] = useState(false)
    const [addQuestions, setAddQuestions] = useState(initialAddQuestion);

    const [showUpdate, setShowUpdate] = useState(false)
    const [updateQuestionn, setUpdateQuestionn] = useState()
    const [updateQuestionnapi, setUpdateQuestionnapi] = useState({
        classId: classId,
        testId: testId
    })

    // const callAddQuestionAPI =async () => await addQuestionAPI(addQuestions)

    // const callUpdateQuestionAPI = async () => await updateQuestionAPI(updateQuestionnapi)

    const callGetTestQuestion = async () => {
        const resp = await getTestQuestionsAPI({ classId, testId })
        if (resp?.status === 200) {
            setListQ(resp.data.data)
        }


    }

    const handleSaveAddMore = async () => {
        const res = await addQuestionAPI(addQuestions)
        if (res?.status == 200) {
            toast.success('Add more question successfully')
            setAddQuestions(initialAddQuestion)
            setShowAddMore(false);
            setTimeout(callGetTestQuestion, 2000);
        }
    }
    const handleUpdateQuestion = async () => {

        await updateQuestionAPI(updateQuestionnapi)
        await callGetTestQuestion()
        setShowUpdate(false)
    }

    const handleAddMore = () => {
        return setShowAddMore(true)
    }

    const deleteQuestion = {
        classId: classId,
        testId: testId
    }

    // const callDeleteQuestionapi = (questionId: any) => deleteQuestionAPI({...deleteQuestion, questionId})

    const handleDeleteQuestion = async (questionId: any) => {
        if (window.confirm('Are you sure delete this question?')) {
            await deleteQuestionAPI({ ...deleteQuestion, questionId })
            await callGetTestQuestion();
            return true;
        }
        return false
    }
    useEffect(() => {
        callGetTestQuestion();
    }, [])

    return (
        <div className='listQuestion'>
            <div className='titleTest'>
                <div>
                    <h4>List Question</h4>
                </div>
                <div className='btn-test'>
                    <div>
                        <button className='btn-save mr-4' onClick={handleAddMore}>Add more</button>
                    </div>
                    <div>
                        <button className='btn-save' onClick={() =>
                            showAddMore ? handleSaveAddMore() : handleUpdateQuestion()
                        }>Save</button>
                    </div>
                </div>

            </div>
            {
                !(showAddMore || showUpdate) && (<div className='scroll-questions'>
                    {listQ.map((ques, index) =>
                        <div className='bodyQuestion' key={ques.questionId}>
                            <div className='m-2'>
                                <DetailQuestion answers={ques} indx={index + 1} />
                            </div>
                            <div className='m-2 btnQuestion'>
                                <div>
                                    <button className='btn-upd mr-2' onClick={() => {
                                        setShowUpdate(true)
                                        setUpdateQuestionn(ques)
                                        return
                                    }}>Update</button>
                                </div>
                                <div>
                                    <button className='btn-del' onClick={() =>
                                        handleDeleteQuestion(ques.questionId)
                                    }>Delete</button>
                                </div>
                            </div>

                        </div>

                    )}
                </div>)
            }

            {showUpdate && <UpdateQuestion ques={updateQuestionn} updateQuestionnapi={updateQuestionnapi} setUpdateQuestionnapi={setUpdateQuestionnapi} />}
            {showAddMore && <AddQuestion addQuestions={addQuestions} setAddQuestions={setAddQuestions} />}


        </div>
    )
}

export default ListQuestion