import axios from "axios";

const BASE_URL = "http://localhost:8080";

const callWebService = options => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    // withCredentials: true,
    timeout: options.timeout || 1000 * 50
  });
  return axiosInstance(options);
};

const logout = () => {
  return callWebService({
    method: "GET",
    url: "/logout"
  });
};

export const WebServiceRequest = {
  callWebService,
  logout,
  BASE_URL
};
