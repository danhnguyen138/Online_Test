import { useState, useEffect } from 'react';
import axios from 'axios';
import './ClassBox.css';

interface ClassBoxProps {
  student: any;
  onStudentClick: (student: any) => void;
  isSelected: boolean;
}

const ClassBox: React.FC<ClassBoxProps> = ({ student, onStudentClick, isSelected }) => {
  return (
    <div className={`student-box ${isSelected ? 'selected' : ''}`} onClick={() => onStudentClick(student)}>
      <div className="student-content">
        <div className="class-name">{student && student.className}</div>
      </div>
    </div>
  );
};

export default ClassBox
