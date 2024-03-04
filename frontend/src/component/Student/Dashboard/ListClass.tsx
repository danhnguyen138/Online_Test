import SearchBox from './SearchBox';
import TableListClass from './TableListClass';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ListClass() {
  const [studentNotJoinClass, setStudentNotJoinClass] = useState<any[]>([]);
  const [studentJoinClass, setStudentJoinClass] = useState<any[]>([]);
  const [searchJoinClass, setSearchJoinClass] = useState('');
  const [searchNotJoinClass, setSearchNotJoinClass] = useState('');
  const [isJoinClassSuccess, setIsJoinClassSuccess] = useState(false);

  const handleJoinSuccess = () => {
    setIsJoinClassSuccess(true);
  };

  const filteredDataJoinClass = studentJoinClass.filter(
    (item) =>
      item.className.toLowerCase().includes(searchJoinClass.toLowerCase()) ||
      item.teacherName.toLowerCase().includes(searchJoinClass.toLowerCase()),
  );

  const filteredDataNotJoinClass = studentNotJoinClass.filter(
    (item) =>
      item.className.toLowerCase().includes(searchNotJoinClass.toLowerCase()) ||
      item.teacherName.toLowerCase().includes(searchNotJoinClass.toLowerCase()),
  );

  const getStudentClass = async () => {
    try {
      const response = await axios.get('http://localhost:4001/class/joinedAndNotClass', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        withCredentials: true,
      });

      if (response.data) {
        setStudentJoinClass(response.data.data[0]);
        setStudentNotJoinClass(response.data.data[1]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getStudentClass();
  }, []);

  useEffect(() => {
    if (isJoinClassSuccess === true) {
      getStudentClass();
      setIsJoinClassSuccess(false);
    }
  }, [isJoinClassSuccess]);

  const handleSearchJoinClass = (event: any) => {
    setSearchJoinClass(event.target.value);
  };

  const handleSearchNotJoinClass = (event: any) => {
    setSearchNotJoinClass(event.target.value);
  };

  return (
    <div className="container mt-1" style={{ padding: 0 }}>
      <hr style={{ background: '#153462', height: '1px', opacity: '1' }} />
      <div className="mb-4">
        <h5>Your Class</h5>
        <div>
          <SearchBox onSearch={handleSearchJoinClass} />
          <TableListClass data={filteredDataJoinClass} onJoinClass={false} />
        </div>
      </div>
      <hr style={{ background: '#153462', height: '1px', opacity: '1' }} />
      <div className="mb-4">
        <h5>Available Class</h5>
        <div>
          <SearchBox onSearch={handleSearchNotJoinClass} />
          <TableListClass handleJoinSuccess={handleJoinSuccess} data={filteredDataNotJoinClass} onJoinClass={true} />
        </div>
      </div>
    </div>
  );
}
