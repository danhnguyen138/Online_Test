import HeaderTeach from '../Header/HeaderTeacher';
import Header from '../Header/header';
import axios from 'axios';
import { useState, useEffect, memo } from 'react';
import { Logger } from 'sass';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Exam from '../../pages/Student/Exam/Exam';
import { Modal } from 'react-bootstrap';


function HomePage() {
  const location = useLocation();
  const user = location.state && location.state.user;

  const [isAllow, setAllow] = useState(false);

  const [currentTest, setCurrentTest] = useState<any>(null);

  // console.log(user);

  const [testClass, setTestClass] = useState([]);

  // useEffect(() => {
  //   const getTestClass = async () => {
  //     try {
  //       const response = await axios.post('http://localhost:4001/test/getTestClass', {
  //         params: {
  //           classId: 'CLASS1',
  //         },
  //       });
  //       setTestClass(response.data.testClass);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   getTestClass();
  // }, []);

  const navigate = useNavigate();

  // const [testClass, setTestClass] = useState([]);

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
        if( response.data.state === 0){
          navigate('/Login', { state: 0}); 
        }

        else if( response.data.state === 1 ){
          navigate('/teacher', { state: 1}); 
        }
        else if( response.data.state === 2){
          navigate('/student/dashboard', { state: 2}); 
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getLoginStateFrontEnd();
  }, []);
  console.log('test class ', testClass);

  return (
    <div className="">
      {/* <Header />
      {testClass.length > 0 && (
        <>
          <div className="container py-4 px-3 mx-auto">
            <div className="container text-left mt-2">
              <div className="row gap-3">
                {testClass.map((test, index) => (
                  <>
                    <div key={test?.id} className="col">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">{test?.title}</h5>
                          <div className="card-text mb-2">
                            <span className=""> Thời gian: {test?.period ? test.period : 'Không giới hạn'}</span>
                            <span className="mx-2">|</span>
                            <span className="">Số câu: {test?.questions?.length || 1}</span>
                          </div>

                          <button
                            type="button"
                            className="btn btn-primary"
                            data-toggle="modal"
                            data-target={`#exampleModal${index}`}
                            onClick={() => {
                              setAllow(true);
                              setCurrentTest(test);
                            }}
                          >
                            Làm bài
                          </button>
                        </div>
                      </div>
                    </div>

                    {index % 2 === 1 && <div class="w-100"></div>}
                    {index % 2 === 0 && index === testClass.length - 1 && <div key={test?.id} className="col"></div>}
                  </>
                ))}
                <CustomModal test={currentTest} isAllow={isAllow} setAllow={setAllow} />
              </div>
            </div>
          </div>
        </>
      )} */}
    </div>
  );
}

export default HomePage;
