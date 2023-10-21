import axios from "./axios";
const fetchAllUser = (page) => {
  return axios.get(`/api/users?page=${page}`);
};
const postUser = (name, job) => {
  return axios.post("/api/users", { name, job });
};
const putUpdateUser = (name, job) => {
  return axios.put("/api/users/1", { name, job });
};
const deleteUser = (id) => {
  return axios.delete(`/api/users/${id}`);
};
const loginAPI = (email, password) => {
  return axios.post(`/api/login`, { email, password });
};
export { fetchAllUser, postUser, putUpdateUser, deleteUser, loginAPI };
