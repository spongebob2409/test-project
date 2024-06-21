import React, { useState, useEffect } from 'react';
import { createStudent, getStudentById, updateStudent } from '../services/studentService';
import { useHistory, useParams } from 'react-router-dom';

const StudentForm = () => {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    contactNumber: '',
    preferences: '',
    requirements: ''
  });
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getStudentById(id).then((response) => setStudent(response.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateStudent(id, student).then(() => history.push('/'));
    } else {
      createStudent(student).then(() => history.push('/'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={student.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={student.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="contactNumber"
        value={student.contactNumber}
        onChange={handleChange}
        placeholder="Contact Number"
      />
      <input
        type="text"
        name="preferences"
        value={student.preferences}
        onChange={handleChange}
        placeholder="Preferences"
      />
      <input
        type="text"
        name="requirements"
        value={student.requirements}
        onChange={handleChange}
        placeholder="Requirements"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default StudentForm;