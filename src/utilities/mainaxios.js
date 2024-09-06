import Axios from "axios";
import { refreshToken } from "./refreshtoken";



const main_axios = Axios.create({
  baseURL:  "https://tecknerdacademy.in/api/v1/",
});


main_axios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    config.headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
   async(error) => {
    return Promise.reject(error);
  }
);

main_axios.interceptors.response.use(

  (response) => {
    return response;
  },

   async(error) => {
    const originalRequest =  error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const resp = await reshToken();ref
      const access_token =resp.access.token
      const refresh_token =resp.refresh.token
      localStorage.setItem("token", access_token);
      localStorage.setItem("rToken", refresh_token);
      main_axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${access_token}`;
      return main_axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default main_axios;
