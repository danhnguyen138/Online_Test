import React, { useState } from 'react';
import './InputQuestion.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
export const InputQuestion = (props:any) => {
    return (
        <div className='row mb-4'>
            <div className='col-2'>
                Question :
            </div>
            <div className='col'>
                <ReactQuill theme="snow" value={props.title} onChange={props.setTitle} style={{height:'150px', marginBottom:'45px'}}/>
            </div>
        </div>
    )
}
