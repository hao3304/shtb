import axios from "./axios";
export default {
  project: params => axios.get(`/user/project`, { params }),
  score: params => axios.post(`/user/project/score`, params)
};
