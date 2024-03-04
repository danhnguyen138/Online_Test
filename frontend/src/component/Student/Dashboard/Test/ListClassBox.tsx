import { useState, useEffect } from 'react';
import ClassBox from './ClassBox';
import axios from 'axios';
import SearchBox from '../SearchBox';
import { Row, Col, Dropdown, Card, Button, Accordion } from 'react-bootstrap';
import TestTimeLine from "./TestTimeline"
interface ListClassBoxProps {
  students: any[];
}

const ListClassBox: React.FC<ListClassBoxProps> = ({ students }) => {
  const timelines = [
    { key: 'All', label: 'All' },
    { key: '7days', label: 'Next 7 days' },
    { key: '10days', label: 'Next 10 days' },
    { key: '1month', label: 'Next 1 month' },
  ];
  const [selectedClass, setselectedClass] = useState<any | null>(null);
  const [testOfClass, setTestOfClass] = useState<any[]>([]);
  const [selectedTimeline, setSelectedTimeline] = useState<{ key: string; label: string }>({
    key: 'All',
    label: 'All',
  });
  const handleSearch = (event: any) => {};
  const handleTimelineSelect = (selectedKey: any, event: any) => {
    const selectedTimelineObject = timelines.find((timeline) => timeline.key === selectedKey);
    setSelectedTimeline(selectedTimelineObject || { key: 'All', label: 'All' });
  };

  const handleGetTestClass = async () => {

    try {
      const response = await axios.get(`http://localhost:4001/test/getAllTest?classId=${selectedClass.classId}`);

      if (response.data) {
        setTestOfClass(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (selectedClass) handleGetTestClass();
  }, [selectedClass]);

  useEffect(() => {
    setselectedClass(students[0]);
  }, [students]);

  const handleStudentClick = (student: any) => {
    setselectedClass(student);
  };

  return (
    <div>
      {selectedClass && (
        <>
          {students.map((student, index) => (
            <ClassBox
              key={index}
              student={student}
              onStudentClick={handleStudentClick}
              isSelected={selectedClass === student}
            />
          ))}
        </>
      )}
      {selectedClass && (
        <div style={{ margin: '8px 8px', padding: '4px 16px' }}>
          <h5 style={{ paddingTop: '8px' }}>Time line</h5>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
              paddingRight: '32px',
            }}
          >
            <Dropdown onSelect={handleTimelineSelect}>
              <Dropdown.Toggle style = {{border: "3px solid rgb(21, 52, 98)", minWidth: "100px", background: "#fff", color: "#000"}} id="dropdown-basic" >
                {selectedTimeline.label}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ width: '500px' }}>
                <div
                  style={{
                    pointerEvents: 'none',
                    cursor: 'default',
                    color: '#555',
                    padding: '8px 12px',
                    userSelect: 'none',
                  }}
                >
                  Due dates
                </div>
                {timelines.map((timeline) => (
                  <Dropdown.Item key={timeline.key} eventKey={timeline.key}>
                    {timeline.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <div style={{ width: '500px' }}>
              <SearchBox onSearch={handleSearch} />
            </div>
          </div>
          <TestTimeLine selectedClass = {selectedClass}  selectedTimeline= {selectedTimeline} testOfClass={testOfClass}/>
        </div>
      )}
    </div>
  );
};

export default ListClassBox;
