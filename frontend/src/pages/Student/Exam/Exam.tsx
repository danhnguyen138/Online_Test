/* eslint-disable */
// @ts-nocheck

import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Fragment, useRef, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
export default function Exam() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [exam, setExam] = useState({});
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const intervalRef = useRef(null);
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F'];
  const location = useLocation();
  const state = location.state;
  const COUNTER_KEY = state.currentTest.id;
  function handlerInput(id_question: string, answer: string) {
    setFormData({ ...formData, [id_question]: [answer] });
  }
  function handlerInputMultiChoice(id_question: string, answer: string, isChecked: boolean) {
    let res = [];
    if (formData[id_question]) {
      res = formData[id_question];
      if (isChecked) {
        res.push(answer);
      } else {
        res = res.filter(function (anw: string) {
          return anw !== answer;
        });
      }
    } else {
      res = [answer];
    }

    setFormData({ ...formData, [id_question]: res });
  }

  function convertTime(i: number) {
    let hours = parseInt(i / 3600, 10);
    let minutes = parseInt((i - hours * 3600) / 60, 10);
    let seconds = parseInt(i % 60, 10);

    let hoursString = hours < 10 ? '0' + hours : hours;
    let minutesString = minutes < 10 ? '0' + minutes : minutes;
    let secondsString = seconds < 10 ? '0' + seconds : seconds;

    return hoursString + ':' + minutesString + ':' + secondsString;
  }

  function countDown(i: number, callback: any) {
    intervalRef.current = setInterval(function () {
      if (document.getElementById('displayDiv')) {
        document.getElementById('displayDiv').innerHTML = convertTime(i);
      }
      if (i-- > 0) {
        window.localStorage.setItem(COUNTER_KEY, i);
      } else {
        window.localStorage.removeItem(COUNTER_KEY);
        clearInterval(intervalRef.current);
        callback();
      }
    }, 1000);
  }

  useEffect(() => {
    var countDownTime = window.localStorage.getItem(COUNTER_KEY) || state.currentTest.period * 60;

    countDown(countDownTime, function () {
      alert('Hết giờ làm bài!!!');
      submitTest(convertTime(state.currentTest.period));
    });

    const getExam = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4001/test/studentGetTestQuestion?classId=${state.currentTest.classId}&testId=${state.currentTest.id}`,
        );
        setExam(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getExam();
  }, []);

  async function submitTest(time: string) {
    let res: Array = [];
    Object.entries(formData).map((answer) => {
      res.push({
        questionId: answer[0],
        answerIds: answer[1],
      });
    });

    const submitAnswer = async () => {
      try {
        const response = await axios.post(
          'http://localhost:4001/test/studentSubmitAnswer',
          {
            params: {
              classId: state.currentTest.classId,
              testId: state.currentTest.id,
              timeSpent: time,
              choices: res,
            },
          },
          {
            withCredentials: true,
          },
        );
        return response;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    try {
      const response = await submitAnswer();
      navigate('/student/exam/result', {
        state: {
          name: state.currentTest.title,
          classId: state.currentTest.classId,
          testId: state.currentTest.id,
          studentId: 'STUDENT1',
        },
      });

      clearInterval(intervalRef.current);
      intervalRef.current = null;
      window.localStorage.removeItem(COUNTER_KEY);
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  }

  let listQuestion;
  let listNumber;
  if (exam.data) {
    listQuestion = exam.data.map((question: object, index: number) => {
      if (question.multipleAnswer) {
        return (
          <div id={`question${index + 1}`} key={index} className="mb-4">
            <p className="text-lg  mb-[-10px] font-normal text-lg text-[#000]">
              <div style={{ display: 'flex' }}>
                <span style={{ marginRight: '8px' }} className="font-semibold text-[#153462]">
                  Câu {index + 1}:{' '}
                </span>
                {parse(question.description)}
              </div>
            </p>
            <div>
              <ul
                className="mt-3 text-base text-gray-900 rounded-lg dark:bg-gray-700 dark:text-white"
                onChange={(e) => {
                  handlerInputMultiChoice(question.questionId, e.target.id, e.target.checked);
                }}
              >
                {question.answers.map((answer: object, index: number) => {
                  return (
                    <li key={index} className="flex items-center mb-4">
                      <input
                        id={answer.answerId}
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <div className="flex items-center ms-2 text-base font-medium text-gray-900 dark:text-gray-300">
                        {answer.description}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      } else {
        return (
          <div id={`question${index + 1}`} key={index} className="mb-4">
            <p className="text-lg  mb-[-10px] font-normal text-lg text-[#000]">
              <span className="font-semibold text-[#153462]">Câu {index + 1}: </span>
              {parse(question.description)}
            </p>
            <div>
              <ul
                className="mt-2 text-base text-gray-900 rounded-lg dark:bg-gray-700 dark:text-white"
                onChange={(e) => {
                  handlerInput(question.questionId, e.target.id);
                }}
              >
                {question.answers.map((answer: object, index: number) => {
                  return (
                    <li key={index} className="w-full rounded-t-lg flex flex-row items-center">
                      <div className="flex items-center">
                        <input
                          id={answer.answerId}
                          type="radio"
                          value=""
                          name={`list-radio${question.questionId}`}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="list-radio-license"
                          className="w-full mt-2 ml-2 text-base font-medium text-gray-900 dark:text-gray-300 "
                        >
                          {alphabet[index]} <span>{answer.description}</span>
                        </label>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      }
    });
    listNumber = exam.data.map((question: object, index: number) => {
      if (!formData.hasOwnProperty(question.questionId)) {
        return (
          <Link
            to={`#question${index + 1}`}
            state={state}
            key={index}
            className="bg-[#f0efef] p-2 w-10 h-10 rounded-xl flex justify-center items-center font-normal"
            style={{
              boxShadow: '0px 1px 4px 0px #00000033 -1px -1px 4px 0px #00000026 inset 1px 1px 4px 0px #0000001A inset',
              textDecoration: 'none',
            }}
          >
            {index + 1}
          </Link>
        );
      } else {
        return (
          <a
            href={`#question${index + 1}`}
            key={index}
            className="p-2 w-10 h-10 rounded-xl flex justify-center items-center font-normal text-[#2FD790]"
            style={{
              background: 'rgba(47, 215, 144, 0.15)',
              boxShadow: '1px 1px 2px 0px #2FD79040 1px 1px 3px 0px #2FD7905C inset -1px -1px 2px 0px #2FD79052 inset',
              textDecoration: 'none',
            }}
          >
            {index + 1}
          </a>
        );
      }
    });
  }

  return (
    <div className="bg-[#FBFAF9] min-h-screen relative py-10">
      <div className="px-10 py-2 bg-[#153462] fixed w-full top-0 left-0">
        <div className="flex justify-between h-full items-center mt-3">
          <div className="text-[#fff] text-[22px] font-medium text-center ">{state.currentTest.title}</div>
          <div className="text-white text-[22px] font-medium" id="displayDiv"></div>
        </div>
      </div>

      <div className="flex flex-row mx-14 mt-14 ">
        <div
          className="px-10 w-[70%] bg-white mr-10 rounded-xl py-3"
          style={{
            boxShadow: '0px 0px 4px 0px #00000040',
          }}
        >
          {listQuestion}
        </div>

        <div
          className="flex-1 bg-white p-4 rounded-xl h-64 top-24 fixed right-14 w-1/4"
          style={{
            boxShadow: '0px 0px 4px 0px #00000040',
          }}
        >
          <div className="">
            <p className="rounded-md text-center font-medium text-xl text-[#153462]">Câu hỏi</p>
            <div className="grid grid-cols-5 justify-items-center gap-y-3">{listNumber}</div>
            <div className="text-center mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Nộp bài
              </button>
            </div>
          </div>
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-3 pt-2 sm:p-6 sm:pb-4">
                    <div className="flex justify-center items-center">
                      <div className="mt-2 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                          Xác nhận
                        </Dialog.Title>
                        <div className="mt-3 py-2">
                          <p className="text-base text-gray-500">Bạn có chắc muốn nộp bài?</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="ml-2 inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-blue-700 hover:bg-blue-700 sm:mt-0 sm:w-auto"
                      onClick={() => {
                        setOpen(false);
                        submitTest(
                          convertTime(state.currentTest.period * 60 - Number(window.localStorage[COUNTER_KEY])),
                        );
                      }}
                      ref={cancelButtonRef}
                    >
                      Nộp
                    </button>
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-100 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Hủy
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
