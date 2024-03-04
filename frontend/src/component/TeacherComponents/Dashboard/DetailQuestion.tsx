import React, {useState} from 'react'
import parse from 'html-react-parser';

function DetailQuestion(props: any) {
    const [anss, setAnss] = useState(props.answers) 
    // console.log(anss)
  return (
    <div className='questionDetail'>
        <span>
            {props.indx}. {parse(anss.description)}
        </span>
        <ul>
            {anss.answers.map((ans : any) => 
            <div className='ans-css' key={ans.answerId}>
                <div className={ans.isCorrect? `btn-true` : `btn-false`}></div>
                <li className='m-2'>{ans.description}</li>
            </div>
            
            )}
        </ul>
    </div>
  )
}

export default DetailQuestion