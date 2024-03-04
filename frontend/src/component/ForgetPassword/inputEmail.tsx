

import axios from 'axios';
import { redirect } from 'react-router-dom';
import Header from "../Header/header";
import '../../scss/Login.scss'; // Adjust the path accordingly
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect, memo } from 'react';

type UserModel = {
  name: string;
  username: string;
  password: string;
};


async function sendEmail(e: any, email: string, username:string, navigate: any) {
    e.preventDefault();
    const res = await axios.post<any>(
      'http://localhost:4001/forgetPassword/send-email', 
    {params: {
      username: username,
      email: email,
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


    if(res && res.data && res.data.state === -1){
      alert("Wrong Username, please check again")
    }
    if(res && res.data && res.data.state === -2){
      alert("Can not use that email, please try again")
    }
    navigate('/input-otp-code',{state: { optCode: res.data.otpCode, userId: res.data.userId}});
}



function input_Email() {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();


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
                    <h3 className="mb-4">Confirm Email</h3>
                  </div>
                </div>
                <form className="signin-form" onSubmit={(e) => sendEmail(e, email, username, navigate)}>
                  <div className="form-group mt-3">
                    <label className="form-control-placeholder" htmlFor="email">Email</label>
                    <input id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" required />
                  </div>

                  <div className="form-group mt-3">
                    <label className="form-control-placeholder" htmlFor="username">Username</label>
                    <input id="username"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" required />
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

export default input_Email;

