import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://question-paper-automation.onrender.com/api",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("examCellToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
