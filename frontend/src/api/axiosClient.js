import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosClient.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.error("API Error:", err);
    return Promise.reject(err);
  }
);

export default axiosClient;
