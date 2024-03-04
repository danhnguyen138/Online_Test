import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { InputConfigure } from '../InputConfigure';
import { changeISO, setConfigure } from '../../../data/data';
export const ModalUpdateTest = (props: any) => {
    
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Test</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputConfigure title={'Test name'} type={'text'} classTitle={'col-4'}
                    value={props.data.title}
                    onChange={(e: any) => setConfigure('title', props.data, e.target.value, props.setData)}
                />
                <InputConfigure title={'Test duration'} type={'number'} classTitle={'col-4'} style={{ width: '75px' }}
                    value={props.data.period}
                    onChange={(e: any) => setConfigure('period', props.data, e.target.value, props.setData)}
                />
                <InputConfigure title={'Time start'} type={'datetime-local'} classTitle={'col-4'} style={{ width: '210px' }}
                    value={changeISO(props.data.startTime)}
                    onChange={(e: any) => setConfigure('startTime', props.data, e.target.value, props.setData)}
                />
                <InputConfigure title={'Time end'} type={'datetime-local'} classTitle={'col-4'} style={{ width: '210px' }}
                    value={changeISO(props.data.endTime)}
                    onChange={(e: any) => setConfigure('endTime', props.data, e.target.value, props.setData)}
                />
                <InputConfigure title={'Passcode'} type={'text'} classTitle={'col-4'}
                    value={props.data.passCode}
                    onChange={(e: any) => setConfigure('passCode', props.data, e.target.value, props.setData)}
                />
                <div style={{ height: '30px' }} className='d-flex justify-content-center text-danger font-weight-bold'>
                    {props.error.length !== 0 ? props.error : ''}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" style={{border:'none'}} onClick={props.handleClose}>
                    Close
                </Button>
                <Button style={{ background:'#54bab9',border:'none'}} onClick={()=>props.handleUpdateTest()}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
