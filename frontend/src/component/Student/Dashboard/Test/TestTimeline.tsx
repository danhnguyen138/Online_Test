import { Row, Col, Dropdown, Card, Button, Accordion } from 'react-bootstrap';
import { useState } from 'react';
import StudentModal from '../StudentModal';
interface TestData {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
}
const groupByDate = (selectedTimeline: any, testOfClass: TestData[]) => {
  const filteredTestData = testOfClass.filter((test) => {
    const testEndTime = new Date(test.endTime);
    const currentDate = new Date();

    if (selectedTimeline.key === '7days') {
      const sevenDaysLater = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
      return testEndTime >= currentDate && testEndTime < sevenDaysLater;
    } else if (selectedTimeline.key === '10days') {
      return testEndTime >= currentDate && testEndTime <= new Date(currentDate.getTime() + 10 * 24 * 60 * 60 * 1000);
    } else if (selectedTimeline.key === '1month') {
      return testEndTime >= currentDate && testEndTime <= new Date(currentDate.getTime() + 30 * 24 * 60 * 60 * 1000);
    } else {
      return testEndTime >= currentDate;
    }
  });
  const groupedTests: Record<string, TestData[]> = {};
  filteredTestData.forEach((test) => {
    const testEndTime = new Date(test.endTime);
    const dateString = testEndTime.toLocaleDateString();

    if (!groupedTests[dateString]) {
      groupedTests[dateString] = [];
    }

    groupedTests[dateString].push(test);
  });

  return groupedTests;
};

const TestTimeLine: React.FC<{ selectedClass: any; selectedTimeline: any; testOfClass: TestData[] }> = ({
  selectedClass,
  selectedTimeline,
  testOfClass,
}) => {
  const groupedTests = groupByDate(selectedTimeline, testOfClass);
  const lengthGroupTest = Object.keys(groupedTests).length;
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const [currentTest, setCurrentTest] = useState<{ id: number; title: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = (test: any) => {
    setCurrentTest(test);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {lengthGroupTest > 0 ? (
        <>
          {Object.entries(groupedTests).map(([date, tests]) => (
            <div key={date}>
              <h6 style={{ fontWeight: '600', paddingTop: '16px' }}>
                {new Date(date).toLocaleDateString('en-US', options)}
              </h6>
              {tests.map((test) => (
                <div key={test.id} className="test-item" style={{ borderBottom: '1px solid #ccc' }}>
                  <Row>
                    <Col md={2} className="d-flex align-items-center justify-content-center">
                      <span className="font-weight-bold">
                        {new Date(test.endTime).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          timeZone: 'UTC',
                        })}{' '}
                      </span>
                    </Col>
                    <Col md={4} style={{ display: 'flex', alignItems: 'center' }}>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          padding: '16px 0',
                        }}
                      >
                        <h6>{test.title} - Test close</h6>
                      </div>
                    </Col>
                    <Col md={4} style={{ display: 'flex', alignItems: 'center' }}>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          padding: '16px 0',
                        }}
                      >
                        <h6>{selectedClass.teacherName} </h6>
                      </div>
                    </Col>
                    <Col md={2} className="d-flex align-items-center justify-content-center">
                      <Button
                        variant="success"
                        onClick={() => openModal(test)}
                        disabled={new Date(test.startTime) > new Date()}
                      >
                        Start
                      </Button>
                    </Col>
                  </Row>
                </div>
              ))}
            </div>
          ))}
        </>
      ) : (
        <>There is no upcoming test.</>
      )}
      {currentTest && <StudentModal show={isModalOpen} handleClose={closeModal} currentTest={currentTest} />}
    </div>
  );
};

export default TestTimeLine;
