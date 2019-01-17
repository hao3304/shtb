import axios from "./axios";

export const getLoads = params => axios.get(`/user/me`);
