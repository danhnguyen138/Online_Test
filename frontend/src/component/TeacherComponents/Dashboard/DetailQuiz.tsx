/* eslint-disable */
// @ts-nocheck


import React, { useEffect, useState } from 'react'
import { changeDateTime } from '../../../data/data';

function DetailQuiz(props: any) {
    const [data, setData] = useState()
    useEffect(() => {
        setData(props.test)
    }, [props.test])
    return (
        <div className='detail-quiz'>
            <div className='title-quiz'>
                <h5>{data ? data.title : `Quiz's name`}</h5>
                <div>
                    <button className='btn-update' onClick={() => {
                        if (props.test !== undefined) props.setShow(true)
                    }}>
                        Update
                    </button>
                    <button className='btn-delete' onClick={() => {
                        if (props.test !== undefined) props.handleDelete()
                    }}>
                        Delete
                    </button>
                </div>
            </div>
            <div className='info-quiz'>
                <div className='info-1'>
                    <div className='info-1-1'>
                        <div className='start-time'>
                            Test Duration
                        </div>
                        <div className='end-time'>
                            Start Time
                        </div>
                        <div className='priot'>
                            End Time
                        </div>
                        <div className='passcode'>
                            Pass Code
                        </div>
                    </div>
                    <div>
                        <div className='start-time'>
                            {data ? data.period : "_  _  _  _  _  _"}
                        </div>
                        <div className='end-time'>
                            {data ? changeDateTime(data.startTime) : "_  _  _  _  _  _"}
                        </div>
                        <div className='priot'>
                            {data ? changeDateTime(data.endTime) : "_  _  _  _  _  _"}
                        </div>
                        <div className='passcode'>
                            {data ? data.passCode : "_  _  _  _  _  _"}
                        </div>
                    </div>

                </div>

                <div className='info-2'>
                    <button className='btn-question' onClick={props.handleListQuestion}>List questions</button>
                </div>
            </div>
        </div>
    )
}

export default DetailQuiz