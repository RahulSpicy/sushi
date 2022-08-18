import axios from "axios";
import { backendUrl } from "./const";

export const authAxios = axios.create();

authAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

authAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const url = backendUrl + "/token/refresh/";
        const refreshToken = localStorage.getItem("refreshToken");
        const { data: resData } = await axios.post(url, {
          refresh: refreshToken,
        });
        localStorage.setItem("accessToken", resData.access);
        const accessToken = localStorage.getItem("accessToken");
        authAxios.defaults.headers.common["Authorization"] =
          "Bearer " + accessToken;
        return authAxios(originalRequest);
      } catch (error) {
        // Refresh token failed too
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
