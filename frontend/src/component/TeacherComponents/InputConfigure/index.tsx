import React from 'react';
import './inputConfigure.css';
export const InputConfigure = (props:any) => {
    return (
        <div className='row mb-4'>
            <div className={`col-2 ${props.classTitle}`} style={{
                ...props.styleTitle,
                color:'black'}} >
                {props.title} :
            </div>
            <div className='col'>
               <input type={props.type} className='inputConfigure' style={props.style} value={props.value} onChange={props.onChange}/>
            </div>
        </div>
    )
}
