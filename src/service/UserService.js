import axios from "./axios";
const fetchAllUser = (page) => {
  return axios.get(`/api/users?page=${page}`);
};
const postUser = (name, job) => {
  return axios.post("api/users", { name, job });
};
export { fetchAllUser, postUser };
