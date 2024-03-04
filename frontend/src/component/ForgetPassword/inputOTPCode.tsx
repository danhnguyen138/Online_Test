

import axios from 'axios';
import { redirect } from 'react-router-dom';
import Header from "../Header/header";
import '../../scss/Login.scss'; // Adjust the path accordingly
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect, memo } from 'react';
import { useLocation } from 'react-router-dom';


async function submitOTPCode(e: any, otpCode: string, trueOtpcode: number, userId: string, navigate: any) {
  e.preventDefault();
  if(otpCode !== trueOtpcode.toString()){
    alert("Wrong otpCode, please check again");
  }
  navigate('/input-new-password', {state:{userId: userId}});


  return;
}

function input_OTPCode() {




  const navigate = useNavigate();
  const location = useLocation();

  let trueOtpcode: number;
  let userId: string;

  useEffect(() => {

    if (!location || !location.state || !location.state.optCode) {
      navigate('/forget-password');
    }
  }, [location, navigate]); 

  trueOtpcode = location.state.optCode;
  userId = location.state.userId;
  
  const [otpCode, setOTPCode] = useState('');


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
                <form className="signin-form" onSubmit={(e) => submitOTPCode(e, otpCode, trueOtpcode, userId, navigate)}>
                  <div className="form-group mt-3">
                    <label className="form-control-placeholder" htmlFor="otpCode">OTP Code</label>
                    <input id="otpCode"
                      name="otpCode"
                      value={otpCode}
                      onChange={(e) => setOTPCode(e.target.value)} type="text" className="form-control" required />
                  </div>
                  <br></br>
                  <div className="form-group">
                    <button type="submit" className="form-control btn btn-primary rounded submit px-3">Send OTP Code</button>
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

export default input_OTPCode;

