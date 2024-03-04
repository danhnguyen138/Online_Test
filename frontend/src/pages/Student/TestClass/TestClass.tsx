import React from 'react';
import SideBar from '../../../component/Student/Sidebar/Sidebar';
import { Icons } from '../../../assets/icons';
import HeaderDashboard from '../../../component/Student/Dashboard/HeaderDashboard';
import StudentModal from '../../../component/Student/Dashboard/StudentModal';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import axios from 'axios';
const TestClass = () => {
  const location = useLocation();
  
  const [classId, setClassId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentTest, setCurrentTest] = useState<{ id: number; title: string } | null>(null);
  const [testOfClass, setTestOfClass] = useState<any[]>([]);

  const handleGetTestClass = async () => {
    try {
      const response = await axios.get(`http://localhost:4001/test/getAllTest?classId=${classId}`);

      if (response.data) {
        setTestOfClass(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (location.state) setClassId(location.state.classId);
  }, []);

  useEffect(() => {
    if (classId) {
      handleGetTestClass();
    }
  }, [classId]);

  const openModal = (test: { id: number; title: string }) => {
    setCurrentTest(test);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div style={{ flex: 1, maxHeight: '100vh', overflow: 'auto' }} className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <HeaderDashboard />
        <div>
          <h5>Test List</h5>
          {testOfClass.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Test Title</th>
                    <th scope="col">Start Time</th>
                    <th scope="col">End Time</th>
                    <th scope="col">Period</th>
                    {/* <th scope="col">Score</th> */}
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {testOfClass.map((test) => (
                    <tr key={test.id}>
                      <td>{test.title}</td>
                      <td>{format(new Date(test.startTime), 'dd/MM/yyyy HH:mm:ss')}</td>
                      <td>{format(new Date(test.endTime), 'dd/MM/yyyy HH:mm:ss')}</td>
                      <td>{test.period} m</td>
                      {/* <td>{test.score}</td> */}
                      <td>
                        <Button
                          variant="success"
                          onClick={() => openModal(test)}
                          disabled={new Date(test.startTime) > new Date()}
                        >
                          Start
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>Không có bài test nào</div>
          )}
        </div>
      </div>
      {currentTest && <StudentModal show={isModalOpen} handleClose={closeModal} currentTest={currentTest} />}
    </div>
  );
};

export default TestClass;
