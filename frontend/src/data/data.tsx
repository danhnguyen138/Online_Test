import menu_icons from './menu icons.svg';
import test_icons from './test_icon.svg';
import result_icons from './results_icon.svg';
import create_icons from './create_icon.svg';
import logout_icons from './logout_icons.svg';
export const TeacherLogout = {
    icon: <img src={logout_icons} alt='Menu Icon' />,
    name: 'Log out',
}
// Gia tri mac dinh cua creat test
export const initialCreatTest = {
    classId: '',
    index: 1,
    title: '',
    period: '',
    start: '',
    end: '',
    passCode: '',
    questions: []
}

export const changeDateTime = (dateString: string) => {
    const dateTime = new Date(dateString);
    return dateTime.toLocaleString()
}
export const titleAllTests = ['Test Name', 'Test Start', ' PassCode'];
export const titleResult = ['Test Name', 'Test Start', 'Passcode',];
export const dataResult1 = [
    {
        id: "TEST1",
        title: "Quiz 1",
        period: 40,
        startTime: "2023-11-24T10:29:00.000Z",
        endTime: "2023-11-24T10:29:00.000Z",
    },
    {
        id: "TEST2",
        title: "Quiz 2",
        period: 41,
        startTime: "2023-11-24T10:29:00.000Z",
        endTime: "2023-11-24T10:29:00.000Z",
    },
    {
        id: "TEST3",
        title: "Quiz 3",
        period: 42,
        startTime: "2023-11-24T10:29:00.000Z",
        endTime: "2023-11-24T10:29:00.000Z",
    },
    {
        id: "TEST3",
        title: "Quiz 3",
        period: 42,
        startTime: "2023-11-24T10:29:00.000Z",
        endTime: "2023-11-24T10:29:00.000Z",
    },
    {
        id: "TEST3",
        title: "Quiz 3",
        period: 42,
        startTime: "2023-11-24T10:29:00.000Z",
        endTime: "2023-11-24T10:29:00.000Z",
    },
    {
        id: "TEST3",
        title: "Quiz 3",
        period: 42,
        startTime: "2023-11-24T10:29:00.000Z",
        endTime: "2023-11-24T10:29:00.000Z",
    },
    {
        id: "TEST3",
        title: "Quiz 3",
        period: 42,
        startTime: "2023-11-24T10:29:00.000Z",
        endTime: "2023-11-24T10:29:00.000Z",
    },
    {
        id: "TEST3",
        title: "Quiz 3",
        period: 42,
        startTime: "2023-11-24T10:29:00.000Z",
        endTime: "2023-11-24T10:29:00.000Z",
    },
    {
        id: "TEST3",
        title: "Quiz 3",
        period: 42,
        startTime: "2023-11-24T10:29:00.000Z",
        endTime: "2023-11-24T10:29:00.000Z",
    },
    {
        id: "TEST3",
        title: "Quiz 3",
        period: 42,
        startTime: "2023-11-24T10:29:00.000Z",
        endTime: "2023-11-24T10:29:00.000Z",
    },
    {
        id: "TEST3",
        title: "Quiz 3",
        period: 42,
        startTime: "2023-11-24T10:29:00.000Z",
        endTime: "2023-11-24T10:29:00.000Z",
    },
    {
        id: "TEST3",
        title: "Quiz 3",
        period: 42,
        startTime: "2023-11-24T10:29:00.000Z",
        endTime: "2023-11-24T10:29:00.000Z",
    },
    {
        id: "TEST3",
        title: "Quiz 3",
        period: 42,
        startTime: "2023-11-24T10:29:00.000Z",
        endTime: "2023-11-24T10:29:00.000Z",
    },
    {
        id: "TEST3",
        title: "Quiz 3",
        period: 42,
        startTime: "2023-11-24T10:29:00.000Z",
        endTime: "2023-11-24T10:29:00.000Z",
    },
    {
        id: "TEST3",
        title: "Quiz 3",
        period: 42,
        startTime: "2023-11-24T10:29:00.000Z",
        endTime: "2023-11-24T10:29:00.000Z",
    },
    {
        id: "TEST3",
        title: "Quiz 3",
        period: 42,
        startTime: "2023-11-24T10:29:00.000Z",
        endTime: "2023-11-24T10:29:00.000Z",
    },
    {
        id: "TEST3",
        title: "Quiz 3",
        period: 42,
        startTime: "2023-11-24T10:29:00.000Z",
        endTime: "2023-11-24T10:29:00.000Z",
    },
    {
        id: "TEST3",
        title: "Quiz 3",
        period: 42,
        startTime: "2023-11-24T10:29:00.000Z",
        endTime: "2023-11-24T10:29:00.000Z",
    },
    {
        id: "TEST3",
        title: "Quiz 3",
        period: 42,
        startTime: "2023-11-24T10:29:00.000Z",
        endTime: "2023-11-24T10:29:00.000Z",
    },
    {
        id: "TEST3",
        title: "Quiz 3",
        period: 42,
        startTime: "2023-11-24T10:29:00.000Z",
        endTime: "2023-11-24T10:29:00.000Z",
    },
    {
        id: "TEST3",
        title: "Quiz 3",
        period: 42,
        startTime: "2023-11-24T10:29:00.000Z",
        endTime: "2023-11-24T10:29:00.000Z",
    },
    {
        id: "TEST3",
        title: "Quiz 3",
        period: 42,
        startTime: "2023-11-24T10:29:00.000Z",
        endTime: "2023-11-24T10:29:00.000Z",
    },
]
export const handleSort = (columnName: string,
    sortBy: any, setSortBy: (id: any) => void,
    sortOrder: any, setSortOrder: (id: any) => void,
    data: any, setData: (id: any) => void,
) => {
    const order = sortBy === columnName && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortBy(columnName);
    setSortOrder(order);

    const sortedData = [...data].sort((a, b) => {
        if (order === 'asc') {
            return a[columnName] > b[columnName] ? 1 : -1;
        } else {
            return a[columnName] < b[columnName] ? 1 : -1;
        }
    });
    setData(sortedData);
}
export const TeacherLink = [
    {
        key: 1,
        icon: <img src={menu_icons} alt='Menu Icon' />,
        name: 'Dashboard',
        to: './dashboard'
    },
    {
        key: 3,
        icon: <img src={result_icons} alt='Menu Icon' />,
        name: 'Results',
        to: './result'
    },
    {
        key: 4,
        icon: <img src={create_icons} alt='Menu Icon' />,
        name: 'Create New',
        to: './createTest'
    },

]
export const renderPagiation = (pageCount: number, currentPage: any, setCurrentPage: (id: any) => void) => {
    const pages = [];
    for (let i = 1; i < pageCount; i++) {
        pages.push(
            <span
                key={i}
                className={currentPage === i ? 'activePagi' : ''}
                onClick={() => setCurrentPage(i)}
            >
                {i}
            </span>
        )
    }
    return pages

}
export function checkNoTitleOption(option1: any, option2: any, option3: any, option4: any) {
    if (option1.description.length === 0 ||
        option2.description.length === 0 ||
        option3.description.length === 0 ||
        option4.description.length === 0
    ) return true;
    return false;
}
export function checkNoCorrectOption(option1: any, option2: any, option3: any, option4: any) {
    if (!option1.isCorrect && !option2.isCorrect && !option3.isCorrect && !option4.isCorrect) {
        return true;
    }
    return false;
}
export function validateTestUpdate(data: any, setError: any) {
    if (data.title.trim() === '') {
        setError('Test name not empty')
        return false;
    }
    if (data.period === '') {
        setError('Test duration not empty')
        return false;
    }
    if (Number(data.period) <= 0) {
        setError('Test duration greater than 0')
        return false;
    }

    if (data.startTime.trim() === '') {
        setError('Test start not empty')
        return false;
    }

    if (data.endTime.trim() === '') {
        setError('Test end not empty')
        return false;
    }
    if (new Date(data.startTime)>=new Date(data.endTime)){
        setError('Time start must be before the end time')
        return false;
    }
    if (data.passCode.trim() === '') {
        setError('Passcode not empty')
        return false;
    }

    return true;
}
export function validateConfigure(creatTest: any, setErrorConfigure: (e: any) => void) {
    // console.log(new Date(creatTest.start)>=new Date(creatTest.end));
    

    if (creatTest.title.trim() === '') {
        setErrorConfigure('Test name not empty')
        return false;
    }
    if (creatTest.period.trim() === '') {
        setErrorConfigure('Test duration not empty')
        return false;
    }
    if (Number(creatTest.period) <= 0) {
        setErrorConfigure('Test duration greater than 0')
        return false;
    }
    if (creatTest.start.trim() === '') {
        setErrorConfigure('Test start not empty')
        return false;
    }

    if (creatTest.end.trim() === '') {
        setErrorConfigure('Test end not empty')
        return false;
    }
    if (new Date(creatTest.start)>=new Date(creatTest.end)){
        setErrorConfigure('Time start must be before the end time')
        return false;
    }
    if (creatTest.passCode.trim() === '') {
        setErrorConfigure('Passcode not empty')
        return false;
    }
    if (creatTest.questions.length === 0) {
        setErrorConfigure('No question')
        return false;
    }
    return true;
}
export function validateQuestion(title: string, option1: any, option2: any, option3: any, option4: any, setError: (error: string) => void) {
    if (title.length === 0) {
        setError('Question without content')
        return true;
    }
    if (checkNoTitleOption(option1, option2, option3, option4)) {
        setError('Option without content')
        return true;
    }
    if (checkNoCorrectOption(option1, option2, option3, option4)) {
        setError('Options have at least 1 correct');
        return true;
    }
}
export function setQuestion(
    setTitle: (error: string) => void,
    setOption1: (error: any) => void,
    setOption2: (error: any) => void,
    setOption3: (error: any) => void,
    setOption4: (error: any) => void,
    setError: (error: string) => void,
    initialOption: any) {
    setOption1(initialOption);
    setOption2(initialOption);
    setOption3(initialOption);
    setOption4(initialOption);
    setTitle('');
    setError('');
}
function countColon(data: string) {
    let count: number = 0;

    for (let i = 0; i < data.length; i++) {
        if (data[i] === ':') {
            count++;
        }
    }
    return count;
}
export function changeISO(datetime: string) {

    if (typeof (datetime) == 'string'&& datetime.length!==0) {
        const originalDate = new Date(datetime);
        const convertedDate = new Date(originalDate.getTime() + 7 * 60 * 60 * 1000);

      
        const convertedTimeString = convertedDate.toISOString();
     
        let dem = countColon(convertedTimeString);
        if (dem == 2) return convertedTimeString.substring(0, convertedTimeString.lastIndexOf(':'));
        else return convertedTimeString;
    }
    return "";

}
export function setConfigure(type: string, oldValue: any, value: string, setValue: (e: any) => void) {
    if (type === 'title')
        setValue({
            ...oldValue,
            title: value,
        })
    if (type === 'period')
        setValue({
            ...oldValue,
            period: value,
        })
    if (type === 'start')
        setValue({
            ...oldValue,
            start: value,
        })
    if (type === 'end')
        setValue({
            ...oldValue,
            end: value,
        })
    if (type === 'startTime') {
        setValue({
            ...oldValue,
            startTime: value
        })
    }
    if (type === 'endTime') {
        setValue({
            ...oldValue,
            endTime: value
        })
    }
    if (type === 'passCode')
        setValue({
            ...oldValue,
            passCode: value,
        })
}