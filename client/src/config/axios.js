import axios from "axios";

const axiosConfig = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export default axiosConfig;
