import { environment } from "@/environments/environment.prod";
import axios from "axios";
const axiosAPI = axios.create({
  baseURL: environment.BASE_API,
});

axiosAPI.interceptors.request.use(
  function (config) {
    return config;
  },
);

axiosAPI.interceptors.response.use(
  function (response) {
    return response.data;
  },
);

export default axiosAPI;