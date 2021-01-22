import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const createStudent = (payload) => api.post(`/student`, payload);
export const getAllStudents = () => api.get(`/student`);
export const getStudentById = (id) => api.get(`/student/${id}`);
export const updateStudentById = (id, payload) =>
  api.put(`/student/${id}`, payload);
export const deleteStudentById = (id) => api.delete(`/student/${id}`);

const apis = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
};

export default apis;
