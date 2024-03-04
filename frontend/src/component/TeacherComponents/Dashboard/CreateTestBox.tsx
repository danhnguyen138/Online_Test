import React, { Component, useState } from 'react';
import createTest from '../../../data/createTest.svg'
import { redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

function CreateTestBox(props: any) {
    const css = `
        .create-box{
            width: 310px;
            height: 220px;
            box-shadow: 0 0 6px #d1d1d1;
            border-radius: 10px;
            padding-top: 5px;
        }
        .create-box-flex {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .create-box h5 {
            color: black;
            font-family: 'Poppins', sans-serif;
            font-weight: bold;
            margin-left: 16px;
        }
        `
        const [id, setId] = useState()
        const [name, setName] = useState()
    
        // const handleCreateClass = () => {
        //     return redirect('/createTest')
        // }

  return (
    <div className='create-box'>
        <style>
            {css}
        </style>
        <h5>Create test</h5>
        <div className='create-box-flex'>
            <div>
                <img src={createTest} alt='createclass' width='126px'/>
            </div>
            <div className='btn-class'>
                {/* <button className='btn-class' onClick={handleCreateClass}>Create new</button> */}
                <Link className='b' to={`/teacher/${props.classId}/createTest`}>Create new</Link>
            </div>
            
        </div>
    </div>
    
  )
}

export default CreateTestBox





