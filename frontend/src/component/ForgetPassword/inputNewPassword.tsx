

import axios from 'axios';
import { redirect } from 'react-router-dom';
import Header from "../Header/header";
import '../../scss/Login.scss'; // Adjust the path accordingly
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect, memo } from 'react';
import { useLocation } from 'react-router-dom';


async function resetPassword(e: any, password: string, confirmPassword:string, userId:string, navigate: any) {
    e.preventDefault();
    if(password !== confirmPassword){
        alert("The two passwords do not match");
        return;
    }

    const res = await axios.post<any>(
      'http://localhost:4001/forgetPassword/update-password', 
    {params: {
      userId: userId,
      password: password,
    }}, 
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

    if (res.data && res.data.state && res.data.state === 1) {
      alert("Please login to continue");
      navigate('/Login'); 
    }
    else{
        alert("Something went wrong");
    }
    
}



function Input_NewPassword() {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  let userId: string
  useEffect(() => {
    if (!location || !location.state || !location.state.userId) {
      navigate('/forget-password');
    }
  }, [location, navigate]); 
  userId = location.state.userId;

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
                    <h3 className="mb-4">Enter your new password</h3>
                  </div>
                </div>
                <form className="signin-form" onSubmit={(e) => resetPassword(e, password, confirmPassword, userId, navigate)}>
                  <div className="form-group mt-3">
                    <label className="form-control-placeholder" htmlFor="password">New password</label>
                    <input id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" required />
                  </div>

                  <div className="form-group mt-3">
                    <label className="form-control-placeholder" htmlFor="confirmPassword">Confirm password</label>
                    <input id="confirmPassword"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="form-control" required />
                  </div>

                  <div className="form-group">
                    <button type="submit" className="form-control btn btn-primary rounded submit px-3">Confirm</button>
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

export default Input_NewPassword;

