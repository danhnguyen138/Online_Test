import { useState } from 'react';
import { Button, Form, Modal, Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { TbArrowsRandom } from 'react-icons/tb';
import { generateRandomPasscode } from '../../util/string';
import axios from 'axios';
import { updateTest } from '../../services/teacher';

export const CreateModal = ({ show, setShow, fetchData }: any) => {
  const [title, setTitle] = useState('');
  const [period, setPeriod] = useState(0);
  const [passCode, setPasscode] = useState('');

  //errors validate
  const [errors, setErrors] = useState('');

  const handleClose = () => {
    setShow(false);
  };

  //Random passcode
  const handleGeneratePasscode = () => {
    const randomPasscode = generateRandomPasscode();
    setPasscode(randomPasscode);
  };

  //submit create
  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    if (title.trim() === '') {
      setErrors('vui lòng nhập tiêu đề');
      return;
    }
    if (period <= 0) {
      setErrors('vui lòng chọn số lớn hơn 0');
      return;
    }
    if (passCode.trim() === '') {
      setErrors('vui lòng nhập mật khẩu');
      return;
    }
    try {
      const params = {
        classId: 'CLASS1',
        title: title,
        period: period,
        passCode: passCode,
      };
      console.log(params);

      const response = await axios.post('http://localhost:4001/test/createTest', { params: params });
      console.log('Phản hồi từ máy chủ:', response.data);
      fetchData();
      setPeriod(0);
      setPasscode('');
      setTitle('');
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    show && (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Test</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleFormSubmit}>
          <Modal.Body>
            {/* Form fields */}
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formperiod">
              <Form.Label>Period</Form.Label>
              <Form.Control type="number" value={period} onChange={(e) => setPeriod(parseInt(e.target.value))} />
            </Form.Group>

            <Row>
              <Col xs={8}>
                <Form.Group controlId="formPasscode">
                  <Form.Label>Passcode</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập passcode"
                    value={passCode}
                    onChange={(e) => setPasscode(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={4}>
                <Button
                  variant="success"
                  onClick={handleGeneratePasscode}
                  style={{
                    marginTop: '32px',
                    padding: '8px',
                    fontSize: '18px',
                    display: 'flex',
                    alignContent: 'center',
                  }}
                >
                  <TbArrowsRandom />
                </Button>
              </Col>
            </Row>
          </Modal.Body>
          <div className="ml-3 text-danger">{errors}</div>
          <Modal.Footer>
            {/* Buttons */}
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleFormSubmit}>
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    )
  );
};

export const EditModal = ({ showEdit, setShowEdit, fetchData, currentEditItem }: any) => {
  const item: any = currentEditItem;

  const [errors, setErrors] = useState('');

  const [id, setId] = useState(item.id);
  const [title, setTitle] = useState(item.title);
  const [period, setPeriod] = useState(item.period);
  const [passCode, setPasscode] = useState(item.passCode);

  const handleCloseEdit = () => {
    setShowEdit(false);
  };

  //Random passcode
  const handleGeneratePasscode = () => {
    const randomPasscode = generateRandomPasscode();
    setPasscode(randomPasscode);
  };

  const handleSubmitEdit = async (e: any) => {
    e.preventDefault();
    if (title.trim() === '') {
      setErrors('vui lòng nhập tiêu đề');
      return;
    }
    if (period <= 0) {
      setErrors('vui lòng chọn số lớn hơn 0');
      return;
    }
    if (passCode.trim() === '') {
      setErrors('vui lòng nhập mật khẩu');
      return;
    }
    await updateTest(id, title, period, passCode);
    await fetchData();
    () => handleCloseEdit();
  };
  return (
    showEdit && (
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Test</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmitEdit}>
          <Modal.Body>
            {/* Form fields */}
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formperiod">
              <Form.Label>Period</Form.Label>
              <Form.Control type="number" value={period} onChange={(e) => setPeriod(parseInt(e.target.value))} />
            </Form.Group>
            <Row>
              <Col xs={8}>
                <Form.Group controlId="formPasscode">
                  <Form.Label>Passcode</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter passcode"
                    value={passCode}
                    onChange={(e) => setPasscode(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col xs={4}>
                <Button
                  variant="success"
                  onClick={handleGeneratePasscode}
                  style={{
                    marginTop: '32px',
                    padding: '8px',
                    fontSize: '18px',
                    display: 'flex',
                    alignContent: 'center',
                  }}
                >
                  <TbArrowsRandom />
                </Button>
              </Col>
            </Row>
          </Modal.Body>
          <div className="ml-3 text-danger">{errors}</div>
          <Modal.Footer>
            {/* Buttons */}
            <Button variant="secondary" onClick={handleCloseEdit}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmitEdit}>
              Edit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    )
  );
};
