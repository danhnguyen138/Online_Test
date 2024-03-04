/* eslint-disable */
// @ts-nocheck

import React from 'react';
import './configureTest.css';
import { InputConfigure } from '../InputConfigure';
import { Button } from '../Button/Button';
import { setConfigure } from '../../../data/data';
export const ContentConfigureTest = (props: any) => {
    return (
        <>
            {
                props.page && (
                    <div className='contentConfifureTest'>
                        <InputConfigure title={'Test name'} type={'text'}
                            value={props.createTest.title}
                            onChange={(e) => setConfigure('title', props.createTest, e.target.value, props.setCreateTest)}
                        />
                        <InputConfigure title={'Test duration'} type={'number'} style={{ width: '75px' }}
                            value={props.createTest.period}
                            onChange={(e) => setConfigure('period', props.createTest, e.target.value, props.setCreateTest)}
                        />
                        <InputConfigure title={'Time start'} type={'datetime-local'} style={{ width: '210px' }}
                            value={props.createTest.start}
                            onChange={(e) => setConfigure('start', props.createTest, e.target.value, props.setCreateTest)}
                        />
                        <InputConfigure title={'Time end'} type={'datetime-local'} style={{ width: '210px' }}
                            value={props.createTest.end}
                            onChange={(e) => setConfigure('end', props.createTest, e.target.value, props.setCreateTest)}
                        />
                        <InputConfigure title={'Passcode'} type={'text'}
                            value={props.createTest.passCode}
                            onChange={(e) => setConfigure('passCode', props.createTest, e.target.value, props.setCreateTest)}
                        />
                        <div style={{ height: '30px' }} className='d-flex justify-content-center text-danger font-weight-bold'>
                            {props.errorConfigure.length !== 0 ? props.errorConfigure : ''}
                        </div>
                        <div className='d-flex justify-content-start mb-3'>
                            <Button type='1' isActive={true} name={'Back'} onClick={() => props.setPage(1)} />
                        </div>
                    </div>
                )
            }
        </>
    )
}
