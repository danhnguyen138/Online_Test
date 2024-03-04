import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser';

function DetailQuestionResult(props: any) {
    const [anss, setAnss] = useState(props.answers) 
    const [submits, setSubmit] = useState(props.detailList)
    console.log(submits)
    const handSubmitBtn = (anss: any, ans: any) => {
        for (var e = 0; e < submits.length; e++) {
            var heh = submits[e].answers
            if (submits[e].questionId == anss.questionId) {
                for (var f = 0; f < heh.length; f++ )
                    if (heh[f].answerId == ans.answerId) {
                        if (heh[f].isCorrect) {
                            return 'btn-true-submit'
                        }
                        else {
                            return 'btn-false-submit'
                        }
                    }
            }
        }
        if (ans.isCorrect) {
            return 'btn-not-submit'
        }
        else return 'btn-false'
        
    }
    // console.log(anss)
  return (
    <div className='questionDetail'>
        <span>
            {props.indx}. {parse(anss.description)}
        </span>
        <ul>
            {anss.answers.map((ans : any) => {
                var cl = handSubmitBtn(anss, ans)
                console.log(cl)
                return <div className='ans-css' key={ans.answerId}>
                        <div className={cl}></div>
                        <li className='m-2'>{ans.description}</li>
                    </div>
            })}
        </ul>
    </div>
  )
}

export default DetailQuestionResult