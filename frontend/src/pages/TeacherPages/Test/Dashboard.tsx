/* eslint-disable */
// @ts-nocheck


import React, { useEffect, useState } from 'react'
import AllTest from '../../../component/TeacherComponents/Dashboard/AllTest'
import DetailQuiz from '../../../component/TeacherComponents/Dashboard/DetailQuiz'
import CreateTestBox from '../../../component/TeacherComponents/Dashboard/CreateTestBox'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

import { titleAllTests,  validateTestUpdate } from '../../../data/data';
import { ModalUpdateTest } from '../../../component/TeacherComponents/ModalUpdateTest';
import { deleteTestAPI, updateTestAPI } from '../../../services/teacher';
export const Dashboard = () => {
  const { classId } = useParams();
  const [errorUpdate, setErrorUpdate]=useState('');
  const [test, setTest] = useState();
  const [dataUpdate, setDataUpdate] = useState({});
  const navigate = useNavigate()
  const handleListQuestion = () => {
    navigate(`/teacher/${classId}/dashboard/${test?.id}`)
  }
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleUpdate= async()=>{
   
    const checkConfigure= validateTestUpdate(dataUpdate, setErrorUpdate);
    if (!checkConfigure) return false;
  
    const res= await updateTestAPI(dataUpdate);
    if (res.message=='Test updated!'){
      toast.success('Test is updated successfully!');
      setTest(dataUpdate);
      setErrorUpdate('');
      setShow(false);
      return true;
    }else{
      toast.error('Some thing wrong !');
    }
    return false
  }
  const handleDelete=async()=>{
    if (window.confirm('Are you sure to delete this test?')){
      const res= await deleteTestAPI(test);
      console.log(res)
      if (res.message==="Test deleted!"){
        toast.success('Test is deleted successfully!');
        setTest(undefined);

      }
    }
  }
  return (
    <div className='d-flex justify-center'>
      <div className='w-100 p-2 overflow-x-hidden dashboard-container'>
        <div className='dashboard-title'>
          <h4>{classId}</h4>
        </div>
        <div className='dashboard-top'>
          <div className='dashboard-left'>
            <DetailQuiz test={test} 
            handleListQuestion={handleListQuestion} 
            setShow={setShow} 
            handleDelete={handleDelete}
            />
          </div>
          <div className='dashboard-right'>
            <CreateTestBox classId={classId} />
          </div>
        </div>
        <div className='dashboard-bottom'>
          <AllTest classId={classId} titleData={titleAllTests} test={test} setTest={setTest} setDataUpdate={setDataUpdate} />
        </div>
      </div>
      <ModalUpdateTest handleClose={handleClose} handleShow={handleShow}
        data={dataUpdate}
        setData={setDataUpdate}
        show={show} 
        handleUpdateTest={handleUpdate}
        error={errorUpdate}
      />
    </div>
  )
}