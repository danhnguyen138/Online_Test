// DataTable.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import './TableListClass.module.css';
import { JoinClassModal } from './StudentModal';

interface TableListClassProps {
  handleJoinSuccess?: () => void;
  data: any;
  onJoinClass: boolean;
}
const TableListClass = ({ data, onJoinClass, handleJoinSuccess }: TableListClassProps) => {

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentJoinClass, setCurrentJoinClass] = useState<{ id: number; className: string } | null>(null);

  const openModal = (classItem: { id: number; className: string }) => {
    setCurrentJoinClass(classItem);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRowClick = (id: string) => {
    navigate(`class/${id}`, {
      state: {
        classId: id,
      },
    });
  };

  return (
    <>
      {data.length > 0 ? (
        <div
          style={{
            height: '300px',
            maxHeight: '300px',
            overflowY: 'auto',
            border: '1px solid #ccc',
          }}
        >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>STT</th>
                <th>Class name</th>
                <th>Teacher name</th>
                {onJoinClass && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {data.map((item: any, index: number) => (
                <tr
                  key={item?.classId || index}
                  onClick={() => (!onJoinClass ? handleRowClick(item.classId) : null)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{index + 1}</td>
                  <td>{item.className}</td>
                  <td>{item.teacherName}</td>
                  {onJoinClass && (
                    <td>
                      <Button
                        variant="success"
                        style={{ fontSize: '14px', padding: '4px 8px' }}
                        onClick={() => {
                          openModal(item);
                        }}
                      >
                        Join Class
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>

          {currentJoinClass && (
            <JoinClassModal
              show={isModalOpen}
              handleClose={closeModal}
              currentJoinClass={currentJoinClass}
              handleJoinSuccess={handleJoinSuccess}
            />
          )}
        </div>
      ) : (
        <div
          style={{
            height: '300px',
            maxHeight: '300px',
          }}
        >
          {}
          <p style={{ fontStyle: 'italic', color: '#888' }}>{onJoinClass ? 'Không có lớp học có sẵn để tham gia' : 'Sinh viên chưa tham gia lớp nào.'}</p>
        </div>
      )}
    </>
  );
};

export default TableListClass;
