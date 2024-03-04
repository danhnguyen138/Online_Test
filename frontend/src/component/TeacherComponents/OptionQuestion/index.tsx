import React, { useState } from 'react'
import './optionQuestion.css'
export const OptionQuestion = (props: any) => {
    const valueChange = (e: any) => {
        props.setOption({ ...props.option, isCorrect: !props.option.isCorrect })
        if (e) {
            props.setOption({ ...props.option, description: e.target.value })
        }
    }

    return (
        <div className='d-flex flex-column mb-2'>
            <input className='inputOptionTeach' placeholder={props.placeholder} type='text' value={props.option.description} onChange={(e) => valueChange(e)} />
            <label style={{display:'flex', alignContent:'center'}}>  
                <input type="checkbox"  id='myCheckboxTeach' checked={props.option.isCorrect}  onChange={(e) => valueChange(null)}/>
                <span className="custom-checkboxTeach"></span> 
                <span style={{display:'block'}}>Correct</span>
            </label>
        </div>
    )
}
