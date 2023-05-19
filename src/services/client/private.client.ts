import axios, { AxiosError } from "axios";
import queryString from "query-string";
import { toast } from "react-hot-toast";
import { logout } from "../../store/auth/authSlice";
import { redirect } from "react-router-dom";
import store from "../../store";

const baseURL = "https://103.168.51.86/";

export type ServerError = {
  path: string;
  message: string;
  timestamp: string;
  statusCode: number;
};

const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

privateClient.interceptors.request.use((config) => {
  const { accessToken } = store.getState().auth;
  config.headers.set("Content-Type", `application/json`);
  config.headers.set("Authorization", `Bearer ${accessToken}`);
  return config;
});

privateClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ServerError>) => {
    const { response } = error;

    if (response) {
      const errorObject = response.data;
      const code = errorObject.statusCode;
      const message = errorObject.message;

      toast.error(message);

      if (code === 401 || code === 404) {
        store.dispatch(logout());
        redirect("/");
      }

      throw errorObject;
    }

    throw error;
  }
);

export default privateClient;
