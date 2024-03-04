import React, { useState, ChangeEvent, useEffect } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import axios from 'axios';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import './StudentModal.css';

interface TestModalProps {
  show: boolean;
  handleClose: () => void;
  currentTest: any;
}

interface ClassModalProps {
  show: boolean;
  handleClose: () => void;
  currentJoinClass: any;
  handleJoinSuccess?: () => void;
}

const StudentModal: React.FC<TestModalProps> = ({ show, handleClose, currentTest }) => {
  const [code, setCode] = useState<string>('');
  const [historyTest, setHistoryTest] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleGetHistoryTest = async () => {
    try {
      const response = await axios.get('http://localhost:4001/test/studentGetSubmissionList', {
        params: { classId: currentTest.classId, testId: currentTest.id },
        withCredentials: true,
      });

      if (response.status === 200) setHistoryTest(response.data.data);
      else setHistoryTest([]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleJoinTest = async () => {
    try {
      const response = await axios.post(`http://localhost:4001/test/passCodeCheck`, {
        params: {
          classId: currentTest.classId,
          testId: currentTest.id,
          passCode: code,
        },
      });

      if (response.status === 200) {

        if (response.data.correct === false) {
          alert('Pass code incorrect');
        } else {
          navigate(`/student/exam`, {
            state: {
              currentTest: currentTest,
            },
          });
        }
      }
    } catch (error: any) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    handleGetHistoryTest();
  }, [currentTest.id]);


  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };


  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="modal-45w"
      contentClassName="custom-modal-content"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px', fontWeight: '500', fontSize: '18px' }}>
              Welcome to the Online Test (PassCode Demo: {currentTest.passCode})
            </span>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formCode" style={{ marginBottom: '15px' }}>
          <Form.Label>
            <strong>Enter Passcode to Start Test:</strong>
          </Form.Label>
          <Form.Control type="text" value={code} onChange={handleCodeChange} placeholder="Enter Passcode" />
        </Form.Group>
        <Button variant="success" onClick={handleJoinTest}>
          Confirm
        </Button>
      </Modal.Body>
      {historyTest.length > 0 && (
        <Modal.Body>
          <h5 style={{ marginBottom: '20px' }}>Summary of Your Previous Work</h5>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No.</th>
                <th style={{ width: '40%' }}>Submission Time</th>
                <th style={{ width: '30%' }}>Time Spent</th>
                <th style={{ width: '15%' }}>Score</th>
                <th style={{ width: '15%' }}></th>
              </tr>
            </thead>
            <tbody>
              {historyTest.map((historyItem, index) => (
                <tr key={index}>
                  <td style={{ verticalAlign: 'middle' }}>{index + 1}</td>
                  <td style={{ width: '40%', verticalAlign: 'middle' }}>
                    {format(new Date(historyItem.submissionTime), 'dd/MM/yyyy HH:mm:ss')}
                  </td>
                  <td style={{ width: '30%', verticalAlign: 'middle' }}>{historyItem.timeSpent} </td>
                  <td style={{ width: '15%', verticalAlign: 'middle' }}>{historyItem.score.toFixed(1)}</td>
                  <td style={{ width: '15%', verticalAlign: 'middle' }}>
                    <Button
                      style={{ background: 'rgb(21, 52, 98)' }}
                      onClick={() =>
                        navigate('/student/exam/result', {
                          state: {
                            submitId: historyItem.submissionId,
                            classId: currentTest.classId,
                            testId: currentTest.id,
                            name: currentTest.title
                          },
                        })
                      }
                    >
                      Review
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      )}
    </Modal>
  );
};

export const JoinClassModal: React.FC<ClassModalProps> = ({
  show,
  handleClose,
  currentJoinClass,
  handleJoinSuccess,
}) => {
  const [code, setCode] = useState<string>('');
  const handleJoinClass = async () => {
    try {
      const response = await axios.post(
        'http://localhost:4001/class/joinClass',
        {
          params: {
            classId: currentJoinClass.classId,
            joinCode: code,
          },
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.verified === true) {
        handleJoinSuccess && handleJoinSuccess();
        setCode('');
        handleClose();
      } else {
        alert("Join Code incorrect")
      }

    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu:', error);
    }
  };
  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="modal-35w"
      contentClassName="custom-modal-content"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px', fontWeight: '500', fontSize: '18px' }}>
              Welcome to the {currentJoinClass.className}
            </span>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group controlId="formCode" style={{ marginBottom: '15px' }}>
          <Form.Label>
            <strong>Enter Code to join class</strong>
          </Form.Label>
          <Form.Control type="text" value={code} onChange={handleCodeChange} placeholder="Enter code" />
        </Form.Group>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
          <Button variant="success" onClick={handleJoinClass} style={{ marginRight: '10px' }}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </div>
        {/* <Form>
          <Form.Group controlId="formCode" style={{ marginBottom: '15px' }}>
            <Form.Control
              type="text"
              value={code}
              onChange={handleCodeChange}
              placeholder="Enter Passcode"
              style={{ width: '100%' }}
            />
          </Form.Group>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
            <Button variant="primary" onClick={handleJoinClass} style={{ marginRight: '10px' }}>
              Confirm
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Form> */}
      </Modal.Body>
    </Modal>
  );
};

export default StudentModal;
