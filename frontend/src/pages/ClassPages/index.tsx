import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet, Link } from "react-router-dom";
import CreateClassBox from './CreateClassBox';
import ClassBox from './ClassBox';
import { getClassAPI, logoutAPI } from '../../services/teacher';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLogout } from '../../state/counterSlice';

export default function ClassPages() {
  const dispatch= useDispatch();
  const handleLogout = async() => {
    dispatch(setLogout());
    const res= await logoutAPI();
    console.log(res);
    navigate('/login');
}
  const navigate = useNavigate();
  // useEffect(() => {
  //   const getLoginStateFrontEnd = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:4001/auth/loginState', {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Accept': 'application/json',
  //         },
  //         withCredentials:true
  //       });
  //       if( response.data.state === 1){
  //         navigate('/teacher', { state: 1}); 
  //       }
  //       else{
  //         navigate('/Login', { state: 0}); 
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   getLoginStateFrontEnd();
  // }, []);
  const [classes, setClasses] = useState([])
  const {classId} =useParams()

  const handleGetClass = async () => {
    const res = await getClassAPI()
    setClasses(res.data)
  }
  useEffect(()=>{
    sessionStorage.removeItem('statusTest')
    handleGetClass()
  }, []);
  return (
    <div className='class-pages'>
      <div className="class-item">
        {
          classes.map((e) => 
            <ClassBox cl = {e}/>
          )
        }
      </div>
      <div className='d-flex flex-column align-items-center gap-5'>
        <CreateClassBox setClasses = {setClasses}/>
        <button className='btn-exit px-4 py-2'
          onClick={()=>handleLogout()}
        >Log out</button>
      </div>
    </div>
  )
}
