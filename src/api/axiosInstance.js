import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://disease.sh/v3",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
