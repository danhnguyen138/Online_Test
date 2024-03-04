

import axios from 'axios';
import { redirect } from 'react-router-dom';
import Header from "../Header/header";
import '../../scss/Login.scss'; // Adjust the path accordingly
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { setLoginWithStudent, setLoginWithTeacher } from '../../state/counterSlice';
import { useState, useEffect, memo } from 'react';

type UserModel = {
  name: string;
  username: string;
  password: string;
};


async function LoginHadelling(e: any, username: string, password: string, isTeacher: boolean, navigate: any) {

  e.preventDefault();
  const res = await axios.post<any>(
    'http://localhost:4001/auth/', 
  {params: {  username: username, password: password, isTeacher: isTeacher }}, 
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      withCredentials:true
    },
  )
    .then()
    .catch();
  if (res.data && res.data.userID ) {
    if(res.data.state === 1 ){
      navigate('/teacher', { state: { userInfo: res.data.userID} }); 
    }
    else if(res.data.state === 2){
      navigate('/student/dashboard', { state: { userInfo: res.data.userID} }); 
    }
  }
  else {
    alert("Sai username hoặc password")
  }
}

async function navigateSignUp(e: any, navigate: any) {

  e.preventDefault();
  navigate('/sign-up'); 
}

async function navigateForgetPassWord(e: any, navigate: any) {

  e.preventDefault();
  navigate('/forget-password'); 
}

function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checkStudentOrTeach, setStudentOrTeach] = useState(false); // New state for the checkbox
  const navigate = useNavigate();
  async function LoginHadelling(e: any, username: string, password: string, isTeacher: boolean, navigate: any) {

    e.preventDefault();
    const res = await axios.post<any>(
      'http://localhost:4001/auth/',
      { params: { username: username, password: password, isTeacher: isTeacher } },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        withCredentials: true
      },
    )
      .then()
      .catch();
    if (res.data && res.data.userID) {
      if (res.data.state === 1) {
        dispatch(setLoginWithTeacher())
        navigate('/teacher', { state: { userInfo: res.data.userID } });
      }
      else if (res.data.state === 2) {
        dispatch(setLoginWithStudent())
        navigate('/student/dashboard', { state: { userInfo: res.data.userID } });
      }
    }
    else {
      alert("Sai username hoặc password")
    }
  }

  async function navigateSignUp(e: any, navigate: any) {

    e.preventDefault();
    navigate('/sign-up');
  }

  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
        </div>
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-5">
            <div className="wrap">
              <div className="img"></div>
              <div className="login-wrap p-4 p-md-5">
                <div className="d-flex">
                  <div className="w-100">
                    <h3 className="mb-4">Sign In</h3>
                  </div>
                </div>
                <form action="#" className="signin-form" onSubmit={(e) => LoginHadelling(e, username, password, checkStudentOrTeach, navigate)}>
                  <div className="form-group mt-3">
                    <label className="form-control-placeholder" htmlFor="username">Username</label>
                    <input id="username"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" required />
                  </div>
                  <br></br>
                  <div className="form-group">
                    <label className="form-control-placeholder">Password</label>
                    <input type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} className="form-control" required />
                    {/* <span data-toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span> */}
                  </div>
                  <br></br>
                  <div className="form-group">
                    <button type="submit" className="form-control btn btn-primary rounded submit px-3">Sign In</button>
                  </div>
                  <div className="form-group">
                    <button type="button" onClick={(e) => navigateSignUp(e, navigate)} className="form-control btn btn-primary rounded submit px-3">New student ?, sign up</button>
                  </div>
                  <div className="form-group">
                    <button type="button" onClick={(e) =>navigateForgetPassWord(e, navigate)} className="form-control btn btn-primary rounded submit px-3">Forget password ? Click here</button>
                  </div>
                  <div className="form-group d-md-flex">
                    <div className="form-group">
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login;

