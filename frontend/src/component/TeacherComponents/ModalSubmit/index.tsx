import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { InputConfigure } from '../InputConfigure';
import { changeDateTime, setConfigure } from '../../../data/data';
import './style.css'
import { useNavigate } from 'react-router-dom';

export const ModalSubmit = (props: any) => {
    const navigate = useNavigate();
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Submit Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='info-1'>
                    <div className='info-1-1'>
                        <div className='start-time'>
                            Name:
                        </div>
                        <div className='end-time'>
                            Score:
                        </div>
                        <div className='priot'>
                            Time Submit:
                        </div>
                        <div className='passcode'>
                            Time Spend:
                        </div>
                        <div className='passcode'>
                            Total Question:
                        </div>
                        <div className='passcode'>
                            Total Correct:
                        </div>
                        <div className='passcode'>
                            Total Wrong:
                        </div>
                    </div>
                    <div>
                        <div className='start-time'>
                            {props.dataDetail.name}
                        </div>
                        <div className='end-time'>
                            {props.dataDetail.score}
                        </div>
                        <div className='priot'>
                            {changeDateTime(props.dataDetail.submissionTime)}
                        </div>
                        <div className='passcode'>
                            {props.dataDetail.timeSpent}
                        </div>
                        <div className='passcode'>
                            {props.dataDetail.totalQuestionAttempt}
                        </div>
                        <div className='passcode'>
                            {props.dataDetail.totalCorrect}
                        </div>
                        <div className='passcode'>
                            {props.dataDetail.totalWrong}
                        </div>
                    </div>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className='btn-exit' onClick={props.handleClose}>
                    Close
                </button>
                <button className='btn-save' onClick={() => navigate(`./${props.dataDetail.submissionId}`)}>
                    Detail
                </button>

            </Modal.Footer>
        </Modal>
    )
}
