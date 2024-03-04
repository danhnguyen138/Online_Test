/* eslint-disable */
// @ts-nocheck


import { useEffect, useState } from 'react';
import axios from 'axios';
import { TiTick } from 'react-icons/ti';
import { MdOutlineCancel } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F'];
  const [result, setResult] = useState({});
  const [exam, setExam] = useState({});
  const [choices, setChoices] = useState([]);
  const [general, setGeneral] = useState({});
  const [score, setScore] = useState(0);
  const [totalQuestionAttempt, setTotalQuestionAttempt] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalWrong, setTotalWrong] = useState(0);

  useEffect(() => {
    let submitId: string;
    const getResult = async () => {
      try {

        if (state.submitId) {
          submitId = state.submitId;
        } else {
          const response = await axios.get('http://localhost:4001/test/studentGetSubmissionList', {
            params: {
              classId: state.classId,
              testId: state.testId,
            },
            withCredentials: true,
          });

          submitId = response.data.data[0].submissionId;
        }

        try {
          const response = await axios.get('http://localhost:4001/test/studentGetSubmissionDetail', {
            params: {
              submissionId: submitId,
            },
          });
          setResult(response.data);
          setChoices(response.data.data.choices);
          setGeneral(response.data.data.general[0]);
          setTotalQuestionAttempt(response.data.data.general[0].totalQuestionAttempt);
          setTotalCorrect(response.data.data.general[0].totalCorrect);
          setTotalWrong(response.data.data.general[0].totalWrong);
          setScore(response.data.data.general[0].score);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const getExam = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4001/test/studentGetTestQuestion?classId=${state.classId}&testId=${state.testId}`,
        );
        setExam(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getExam();
    getResult();
  }, []);

  let listQuestion;
  let final;
  if (exam.data) {
    final = exam.data.map((question: object) => {
      let flag = false;
      let tmp;
      choices.map((choice: object) => {
        if (question.questionId === choice.questionId) {
          question.answers.map((answer1: object, index: number) => {
            choice.answers.map((answer2: object) => {
              if (answer1.answerId === answer2.answerId) {
                tmp = question;
                tmp.isCorrect = answer2.isCorrect;
                tmp.answers[index] = { ...tmp.answers[index], isSelected: true };
              }
            });
          });
          flag = true;
        }
      });
      if (flag) return tmp;
      else return question;
    });

    listQuestion = final.map((question: object, index: number) => {
      if (question.multipleAnswer) {
        return (
          <div id={`question${index + 1}`} key={index} className="mt-5">
            <div className="flex justify-between items-center">
              <div className="text-lg  font-normal text-lg text-[#000]">
                <div style = {{display: "flex"}}>
                  <span style={{ marginRight: '8px' }} className="font-semibold text-[#153462]">Câu {index + 1}: </span>
                  {parse(question.description)}
                </div>
              </div>
              {question.isCorrect ? (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                >
                  correct
                </span>
              ) : (
                <span
                  key={index}
                  className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
                >
                  wrong
                </span>
              )}
            </div>
            <div>
              <ul className="mt-3 text-base text-gray-900 rounded-lg dark:bg-gray-700 dark:text-white">
                {question.answers.map((answer: object, index: number) => {
                  return (
                    <li key={index} className="flex items-center mb-4">
                      {answer.isSelected ? (
                        <input
                          id={answer.answerId}
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          defaultChecked
                        />
                      ) : (
                        <input
                          id={answer.answerId}
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      )}
                      <label
                        htmlFor="list-radio-license"
                        className="mt-2 ml-2 text-base font-medium text-gray-900 dark:text-gray-300 mr-2"
                      >
                        {alphabet[index]}. <span>{answer.description}</span>
                      </label>
                      {answer.isSelected ? (
                        answer.isCorrect ? (
                          <TiTick className="ml-2 text-[#2FD790] text-xl" />
                        ) : (
                          <MdOutlineCancel className="ml-2 text-[#E44848] text-base" />
                        )
                      ) : (
                        ''
                      )}
                    </li>
                  );
                })}
              </ul>
              <div className="font-medium ml-4">
                Đáp án:
                {question.answers.map((answer: object, index: number) => {
                  if (answer.isCorrect) {
                    return (
                      <span key={index}>
                        <span> </span>
                        {alphabet[index]}
                      </span>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div id={`question${index + 1}`} key={index} className="mt-5">
            <div className="flex justify-between items-center">
              <div className="text-lg  font-normal text-lg text-[#000]">
                <span className="font-medium text-[#153462]">Câu {index + 1}: </span>
                {parse(question.description)}
              </div>
              {question.isCorrect ? (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                >
                  correct
                </span>
              ) : (
                <span
                  key={index}
                  className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
                >
                  wrong
                </span>
              )}
            </div>
            <div>
              <ul className="mt-2 text-base text-gray-900 rounded-lg dark:bg-gray-700 dark:text-white">
                {question.answers.map((answer: object, index: number) => {
                  return (
                    <li key={index} className="w-full rounded-t-lg flex flex-row items-center">
                      <div className="flex items-center">
                        {answer.isSelected ? (
                          <input
                            id={answer.answerId}
                            type="radio"
                            value=""
                            name={`list-radio${question.questionId}`}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            defaultChecked
                          />
                        ) : (
                          <input
                            id={answer.answerId}
                            type="radio"
                            value=""
                            name={`list-radio${question.questionId}`}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                        )}
                        <label
                          htmlFor="list-radio-license"
                          className="w-full mt-2 ml-2 text-base font-medium text-gray-900 dark:text-gray-300 "
                        >
                          {alphabet[index]}. <span>{answer.description}</span>
                        </label>
                        {answer.isSelected ? (
                          answer.isCorrect ? (
                            <TiTick className="text-[#2FD790] text-4xl" />
                          ) : (
                            <MdOutlineCancel className="text-[#E44848] text-3xl" />
                          )
                        ) : (
                          ''
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="font-medium ml-4">
                {question.answers.map((answer: object, index: number) => {
                  if (answer.isCorrect) {
                    return <div key={index}>Đáp án: {alphabet[index]}</div>;
                  }
                })}
              </div>
            </div>
          </div>
        );
      }
    });
  }

  return (
    <div className="bg-[#FBFAF9] min-h-screen">
      <div className="bg-[#153462] py-4"></div>

      <div
        className="bg-white rounded-lg mt-10 mx-10 w-1/2 p-4 flex items-center"
        style={{
          boxShadow: '0px 0px 4px 0px #00000040',
        }}
      >
        <div
          className="w-32 h-32 py-3 px-7 rounded-full text-4xl text-[#2FD790] font-normal flex justify-center items-center mr-5"
          style={{
            borderImageSource: 'radial-gradient(100% 2743.76% at 100% 84.52%, #2FD790 0%, rgba(47, 215, 144, 0) 100%)',
            boxShadow: '1px 2px 4px 0px #00000040 -1px -2px 4px 0px #00000040 inset',
          }}
        >
          {score.toFixed(1)}
        </div>
        <div className="flex">
          <div className="flex flex-col justify-between mr-4">
            <div className="py-1 text-[#757575]">Bài kiểm tra:</div>
            <div className="py-1 text-[#757575]">Thời gian làm bài:</div>
            <div className="py-1 text-[#757575]">Số câu đã làm</div>
            <div className="py-1 text-[#757575]">Số câu trả lời đúng:</div>
            <div className="py-1 text-[#757575]">Số câu trả lời sai:</div>
          </div>
          <div className="flex flex-col justify-between">
            <div className="py-1 text-[#000]">{state.name}</div>
            <div className="py-1 text-[#000]">{general.timeSpent}</div>
            <div className="py-1 text-[#000]">{totalQuestionAttempt}</div>
            <div className="py-1 text-[#000]">{totalCorrect}</div>
            <div className="py-1 text-[#000]">{totalWrong}</div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mx-10">
        <button
          onClick={() => navigate(`/student/dashboard/class/${state.classId}`, { state: { classId: state.classId } })}
          type="button"
          className="py-2.5 px-3 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          style={{
            boxShadow: '1px 2px 4px 0px #00000040 -1px -2px 4px 0px #00000040 inset',
          }}
        >
          Thoát
        </button>
      </div>

      <div
        className="bg-white mx-10 rounded-lg p-3 mt-2"
        style={{
          boxShadow: '0px 0px 4px 0px #00000040',
        }}
      >
        <div className="font-medium text-xl text-[#000]">Đáp án</div>
        <div className="mx-2 mt-2">{listQuestion}</div>
      </div>
    </div>
  );
}
