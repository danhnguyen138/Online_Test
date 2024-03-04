/* eslint-disable */
// @ts-nocheck


import React, { useState, useEffect } from 'react'
import './styleTest.css';
import { HeaderCreateTest } from '../../../component/TeacherComponents/HeaderCreateTest/HeaderCreateTest';
import { ContentCreateTest } from '../../../component/TeacherComponents/ContentCreateTest/ContentCreateTest';
import { ContentConfigureTest } from '../../../component/TeacherComponents/ContentConfigureTest';
import { useParams } from 'react-router-dom';
import { initialCreatTest, validateConfigure } from '../../../data/data';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { createTestAPI } from '../../../services/teacher';
export const CreateTest = () => {
  const navigate = useNavigate();
  const { classId } = useParams();
  const parseState = sessionStorage.getItem('stateTest') === null ? JSON.stringify({
    ...initialCreatTest,
    classId: classId
  }) : sessionStorage.getItem('stateTest');
  const initialState = JSON.parse(parseState);

  const [errorConfigure, setErrorConfigure] = useState('');
  const [page, setPage] = useState(1);
  const [createTest, setCreateTest] = useState(initialState);
  // Lay gia tri tu localStorage
  useEffect(() => {
    sessionStorage.setItem('stateTest', JSON.stringify(createTest))
  }, [createTest]);
  //Xu ly nut reset
  const handleResetForm = () => {
    setCreateTest({
      ...initialCreatTest,
      classId: classId
    })
    setPage(1);
    setErrorConfigure('');
  }

  const handleCreateTest = async () => {
    const checkConfigure = validateConfigure(createTest, setErrorConfigure);
    if (!checkConfigure) {
      setPage(2);
      return false;
    }
    const res = await createTestAPI(createTest);
    if (res.data.message == 'Test created!') {
      toast.success('Test created!');
      await handleResetForm();
      sessionStorage.removeItem('stateTest')
      navigate('../dashboard');
      return true;
    }else{
      toast.error('Some thing wrong!!');
      return false;
    }
    return true;


  }

  return (
    <>
      <HeaderCreateTest page={page}
        setPage={setPage}
        createTest={createTest} setCreateTest={setCreateTest}
        errorConfigure={errorConfigure} setErrorConfigure={setErrorConfigure}
        handleResetForm={handleResetForm} handleCreateTest={handleCreateTest}
      />
      {page == 1 && <ContentCreateTest page={page} setPage={setPage}
        createTest={createTest} setCreateTest={setCreateTest}

      />}
      {page == 2 && <ContentConfigureTest page={page} setPage={setPage}
        createTest={createTest} setCreateTest={setCreateTest}
        errorConfigure={errorConfigure}
      />}
    </>
  )
}
