import axios, { AxiosError } from "axios";
import queryString from "query-string";
import { toast } from "react-hot-toast";
import { redirect } from "react-router-dom";
import { logout } from "../../store/auth/authSlice";
import store from "../../store";

const baseURL = "https://remitano-service-production.up.railway.app/";

export type ServerError = {
  path: string;
  message: string;
  timestamp: string;
  statusCode: number;
};

const publicClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

publicClient.interceptors.request.use((config) => {
  config.headers.set("Access-Control-Allow-Origin", `*`);
  config.headers.set("Access-Control-Allow-Methods", `GET,PUT,POST,DELETE,PATCH,OPTIONS`);
  config.headers.set("Content-Type", `application/json`);
  return config;
});

publicClient.interceptors.response.use(
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

export default publicClient;
