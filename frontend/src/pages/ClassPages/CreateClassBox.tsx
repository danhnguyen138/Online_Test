import React, { Component, useState } from 'react';
import Create from '../../data/createImg.svg';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './style.css'
import { createClassAPI, getClassAPI } from '../../services/teacher';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function CreateClassBox(props: any) {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [nameClass, setNameClass] = useState('')

    const handleCreateClass = async () => {
        const res = await createClassAPI({name: nameClass, teacherId:"TEACHER1"});
        console.log(res)
        if (res?.status == 200) {
            toast.success('Class created!');
            setNameClass('');
            const respo = await getClassAPI()
            props.setClasses(respo?.data)
            handleClose()
            return true;
        }else{
          toast.error('Some thing wrong!!');
          return false;
        }
    
    
      }

  return (
    <div className='create-box'>
        <h5>Create</h5>
        <div className='create-box-flex'>
            <div>
                <img src={Create} alt='createclass' width='126px'/>
            </div>
            <div>
                <button className='btn-class' onClick={handleShow}>Create class</button>
            </div>
        </div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Class</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                        <Form.Label>Class Name</Form.Label>
                        <Form.Control type="text" value={nameClass} onChange={(e) => setNameClass(e.target.value)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={handleClose} className='btn-exit'>
                    Close
                </button>
                <button onClick={handleCreateClass} className='btn-save'>
                    Create
                </button>
            </Modal.Footer>
        </Modal>
    </div>
    
  )
}

export default CreateClassBox





