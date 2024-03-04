import React from 'react';
import { Button } from '../Button/Button';
import './HeaderTest.css';
export const HeaderCreateTest = (props: any) => {
   
   
    return (
        <div className='headerTest'>
            <div className='d-flex justify-content-between'>
                <h5>CREATE NEW</h5>
                <div className='mr-5 d-flex gap-5'>
                    <Button type={'2'} name={'Reset'}
                        onClick={() => props.handleResetForm()}
                    />
                    <Button type={'2'} name={'Save'}
                        onClick={() => props.handleCreateTest()}
                    />
                </div>
            </div>
            <div className='d-flex justify-content-center mt-4 gap-3'>
                <Button type={'1'}
                    isActive={true}
                    name={'Create'}
                    style={{ cursor: 'default' }}
                />
                <div className='h-4'>
                    <p className='mb-0 mt-3' >...............................................</p>
                </div>
                {props.page == 2 ? 
                (<Button type={'1'} isActive={true} name={'Configure'} style={{ cursor: 'default' }} />) : 
                (<Button type={'1'} isActive={false} name={'Configure'} style={{ cursor: 'default' }} />)}
            </div>
           
        </div>
    )
}
