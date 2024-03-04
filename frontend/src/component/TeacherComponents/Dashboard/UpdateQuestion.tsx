import { useState } from 'react';
import React from 'react';
import { InputQuestion } from '../InputQuestion';
import { Button } from '../Button/Button';
import { OptionQuestion } from '../OptionQuestion';
import { setQuestion, validateQuestion } from '../../../data/data';
import { toast } from 'react-toastify';

function UpdateQuestion( props: any) {
    const [error, setError] = useState('');
    const [title, setTitle] = useState(props.ques.description);
    const [answers, setAnswers] = useState(props.ques.answers)
    const [option1, setOption1] = useState({
        description: answers[0].description,
        isCorrect: answers[0].isCorrect
    });
    const [option2, setOption2] = useState({
        description: answers[1].description,
        isCorrect: answers[1].isCorrect
    });
    const [option3, setOption3] = useState({
        description: answers[2].description,
        isCorrect: answers[2].isCorrect
    });
    const [option4, setOption4] = useState({
        description: answers[3].description,
        isCorrect: answers[3].isCorrect
    });


    const handleSave = () => {
        const checkValidate = validateQuestion(title, option1, option2, option3, option4, setError)
        if (checkValidate) return false;
        props.setUpdateQuestionnapi({
            ...props.updateQuestionnapi,
            questionId: props.ques.questionId,
            answerId1: answers[0].answerId,
            answerId2: answers[1].answerId,
            answerId3: answers[2].answerId,
            answerId4: answers[3].answerId,
            description:title,
            option1: option1,
            option2: option2,
            option3: option3,
            option4: option4
        })
        toast.success('Values Question is saved!!');
        setError("");
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
                    <Button type={'1'} isActive={true} name={'Save'} style={{ width: '90px' }} onClick={() => handleSave()} />
                </div>
            </div>
        </div>
        
    )
}

export default UpdateQuestion