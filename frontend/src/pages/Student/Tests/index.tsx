import React, { useState, useEffect } from 'react';
import SideBar from '../../../component/Student/Sidebar/Sidebar';
import axios from 'axios';
import ListClassBox from '../../../component/Student/Dashboard/Test/ListClassBox';

const Test = () => {
  const [studentJoinClass, setStudentJoinClass] = useState<any[]>([]);

  const getStudentClass = async () => {
    try {
      const response = await axios.get('http://localhost:4001/class/joinedAndNotClass?studentId=STUDENT1', {
        withCredentials: true,
      });

      if (response.data) {
        setStudentJoinClass(response.data.data[0]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getStudentClass();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div style={{ flex: 1, maxHeight: '100vh', overflow: 'auto' }} className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div
          className="h2 pt-3 mb-3"
          style={{
            color: '#153462',
            fontSize: '28px',
            fontWeight: 700,
            letterSpacing: '0.02em',
          }}
        >
          Upcoming Tests
        </div>

        <ListClassBox students={studentJoinClass} />
      </div>
    </div>
  );
};

export default Test;
