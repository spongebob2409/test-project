import axios from 'axios';

const API_URL = '/students';

export const getStudents = () => axios.get(API_URL);

export const getStudentById = (id) => axios.get(${API_URL}/${id});

export const createStudent = (studentData) => axios.post(API_URL, studentData);

export const updateStudent = (id, studentData) => axios.put(${API_URL}/${id}, studentData);

export const deleteStudent = (id) => axios.delete(${API_URL}/${id});