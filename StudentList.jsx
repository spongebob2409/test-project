import React, { useState, useEffect } from 'react';
import { getStudents, deleteStudent } from '../services/studentService';
import { Link } from 'react-router-dom';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents().then((response) => setStudents(response.data));
  }, []);

  const handleDelete = (id) => {
    deleteStudent(id).then(() => setStudents(students.filter((student) => student._id !== id)));
  };

  return (
    <div>
      <Link to="/add">Add Student</Link>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.name} - {student.email}
            <Link to={/edit/${student._id}}>Edit</Link>
            <button onClick={() => handleDelete(student._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList; 