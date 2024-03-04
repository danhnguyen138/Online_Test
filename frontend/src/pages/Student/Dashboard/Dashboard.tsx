import React, { useState, useEffect } from 'react';
import SideBar from '../../../component/Student/Sidebar/Sidebar';
import { Icons } from '../../../assets/icons';
import ListClass from '../../../component/Student/Dashboard/ListClass';
import HeaderDashboard from '../../../component/Student/Dashboard/HeaderDashboard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const getLoginStateFrontEnd = async () => {
      try {
        const response = await axios.get('http://localhost:4001/auth/loginState', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          withCredentials:true
        });
        if( response.data.state === 2){
          navigate('/student/dashboard', { state: 2}); 
        }
        else{
          navigate('/Login', { state: 0}); 
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getLoginStateFrontEnd();
  }, []);
  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div style={{ flex: 1, maxHeight: '100vh', overflow: 'auto' }} className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <HeaderDashboard />

        {/* <div className="row mb-2">
          <div className="col-md-6">
            <div className="card mb-4 shadow-sm">
              <div className="row justify-content-center align-items-center">
                <div className="col-md-5">
                  <img src={Icons.time_icons} alt="Time icon" className="img-fluid w-32 mx-auto my-auto" />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <div
                      className="h6 mb-4"
                      style={{
                        color: '#153462',
                        fontWeight: 700,
                        letterSpacing: '0.02em',
                      }}
                    >
                      You have a test arriving soon!!
                    </div>
                    <div className="d-flex mb-2">
                      <span className="w-20">Test:</span>
                      <span>Test1</span>
                    </div>
                    <div className="d-flex mb-2">
                      <span className="w-20">Date:</span>
                      <span>May 15, 2023</span>
                    </div>
                    <div className="d-flex mb-2">
                      <span className="w-20">Time:</span>
                      <span>11:00 am - 1:00 pm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card mb-4 shadow-sm">
              <div className="row justify-content-center align-items-center">
                <div className="col-md-5">
                  <img src={Icons.time_icons} alt="Time icon" className="img-fluid w-32 mx-auto my-auto" />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <div
                      className="h6 mb-4"
                      style={{
                        color: '#153462',
                        fontWeight: 700,
                        letterSpacing: '0.02em',
                      }}
                    >
                      You have a test arriving soon!!
                    </div>
                    <div className="d-flex mb-2">
                      <span className="w-20">Test:</span>
                      <span>Test1</span>
                    </div>
                    <div className="d-flex mb-2">
                      <span className="w-20">Date:</span>
                      <span>May 15, 2023</span>
                    </div>
                    <div className="d-flex mb-2">
                      <span className="w-20">Time:</span>
                      <span>11:00 am - 1:00 pm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <ListClass />
      </div>
    </div>
  );
};

export default Dashboard;
