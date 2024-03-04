import { useState } from 'react';
import React from 'react';
import { InputQuestion } from '../InputQuestion';
import { Button } from '../Button/Button';
import { OptionQuestion } from '../OptionQuestion';
import { setQuestion, validateQuestion } from '../../../data/data';
import { toast } from 'react-toastify';

function AddQuestion( props: any) {
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');
    const initialOption = {
        description: '',
        isCorrect: false
    }
    const [option1, setOption1] = useState(initialOption);
    const [option2, setOption2] = useState(initialOption);
    const [option3, setOption3] = useState(initialOption);
    const [option4, setOption4] = useState(initialOption);

    const handleSaveAddAnother = () => {
        const checkValidate = validateQuestion(title, option1, option2, option3, option4, setError)
        if (checkValidate) return false;
        props.setAddQuestions({
            ...props.addQuestions,
            questions: [...props.addQuestions.questions,{
              description:title,
              answers:[option1, option2, option3, option4]
            }]
          })
        setQuestion(setTitle,setOption1, setOption2, setOption3, setOption4, setError, initialOption);
        return true;
    }

    const handleSave = () => {
        const checkValidate = validateQuestion(title, option1, option2, option3, option4, setError)
        if (checkValidate) return false;
        props.setAddQuestions({
            ...props.addQuestions,
            questions: [...props.addQuestions.questions,{
              description:title,
              answers:[option1, option2, option3, option4]
            }]
          })
          toast.success('New question list has been saved!!');
          setError('');
        return true;
    }
    return (
        <div className='scroll-addmore'>
            <div className='m-4'>
                <InputQuestion title={title} setTitle={setTitle} />
                <div className='row'>
                    <div className='col-2'>
                        Options :
                    </div>
                    <div className='col'>
                        <OptionQuestion option={option1} setOption={setOption1} placeholder={'Option 1'} />
                        <OptionQuestion option={option2} setOption={setOption2} placeholder={'Option 2'} />
                        <OptionQuestion option={option3} setOption={setOption3} placeholder={'Option 3'} />
                        <OptionQuestion option={option4} setOption={setOption4} placeholder={'Option 4'} />
                    </div>
                </div>
                <div style={{ height: '30px' }} className='d-flex justify-content-center text-danger font-weight-bold'>
                    {error.length !== 0 ? error : ''}
                </div>
                <div className='d-flex justify-content-end gap-5'>
                    <Button type={'1'} isActive={true} name={'Save/Add another'} style={{ width: '200px' }} onClick={() => handleSaveAddAnother()} />
                    <Button type={'1'} isActive={true} name={'Save'} style={{ width: '90px' }} onClick={() => handleSave()} />
                </div>
            </div>
        </div>
        
    )
}

export default AddQuestion