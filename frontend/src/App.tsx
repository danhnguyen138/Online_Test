import Login from './component/Login/login';
import Sign_Up from './component/Sign-up/signUp';
import Input_Email from './component/ForgetPassword/inputEmail';
import Input_OTP_Code from './component/ForgetPassword/inputOTPCode';
import Input_NewPassword from './component/ForgetPassword/inputNewPassword';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import './scss/styles.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ClassPages from './pages/ClassPages';
import TeacherPages from './pages/TeacherPages';
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/Student/Dashboard/Dashboard';
import Exam from './pages/Student/Exam/Exam';
import Result from './pages/Student/Exam/Result';

import Test from './pages/Student/Tests';
import TestClass from './pages/Student/TestClass/TestClass';
import { useSelector } from 'react-redux';
function App() {
  const isLogin = useSelector((state: any) => state.login);
  const isTeacher = useSelector((state: any) => state.isTeacher);
  const isStudent = useSelector((state: any) => state.isStudent)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={isLogin === false ? <Login /> : isTeacher ? <Navigate to='/teacher' /> : <Navigate to='/student/dashboard' />} />
        <Route path="/sign-up" element={<Sign_Up />}></Route>
        
        <Route path="/forget-password" element={<Input_Email />}></Route>
        <Route path="/input-otp-code" element={<Input_OTP_Code />}></Route>
        <Route path="/input-new-password" element={<Input_NewPassword />}></Route>
        <Route path='/teacher' element={isLogin && isTeacher ? <ClassPages /> : <Navigate to='/login' />} />
        <Route path="/" element={<Navigate to='/login' />} />
        <Route path='/teacher/:classId/*' element={isLogin && isTeacher ? <TeacherPages /> : <Navigate to='/login' />} />
      
        <Route path="student/exam" element={isLogin && isStudent ? <Exam /> : <Navigate to='/login' />} />
        <Route path="student/exam/result" element={isLogin && isStudent ? <Result /> : <Navigate to='/login' />} />
        <Route path="/student/dashboard" element={isLogin && isStudent ? <Dashboard /> : <Navigate to='/login' />} />
        <Route path="/student/dashboard/class/:id" element={isLogin && isStudent ? <TestClass /> : <Navigate to='/login' />} />
        <Route path="/student/test" element={isLogin && isStudent ? <Test /> : <Navigate to='/login' />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
