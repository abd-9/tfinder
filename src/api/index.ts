import axios from 'axios';
import {AppStorage} from '../services/app-storage.service';
import {Toast} from 'react-native-toast-notifications';

const ApiClient = axios.create({
  baseURL: 'http://192.168.0.185:3002/api',
  headers: {
    'Content-type': 'application/json',
  },
});

export const setAuthorizationHeader = async (_token?: string) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGZjM2ZhYzU2NjVlYTRmMjRjNTRiYzciLCJ0dXRvcklkIjoiNjRmYzNmYWM1NjY1ZWE0ZjI0YzU0YmM5Iiwic3R1ZGVudElkIjoiIiwiaWF0IjoxNjk0Mjg4MzM4LCJleHAiOjUyOTQyODgzMzh9.FwnR1QLdr_PGHERqw05PBkhhH2YIWsD3OzNDtE1vDnU';

  //await AppStorage.getToken();

  if (_token || token) {
    // ApiClient.headers.setAuthorization(`Bearer ${token}`);
    ApiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    ApiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
  }
};

setAuthorizationHeader();

export default ApiClient;
export interface AxiosError {
  message: string;
  response?: {
    data: any;
    status: number;
    statusText: string;
    headers: object;
  };
  request?: any;
  config?: any;
}

ApiClient.interceptors.response.use(
  response => {
    return response.data;
  },
  async error => {
    // console.log('%c ---Error Response', 'color: red', error?.response);

    // const originalConfig = error?.config;
    Toast.show(error?.response?.data?.message, {type: 'danger'});
    if (error?.status === 401) {
      // Access Token was expired
    }

    if (error.status === 500) {
      // toast.error("An unknown error occurred!");
    }

    return Promise.reject({
      ...error.response,
      msg: error?.response?.data?.message,
    });
  },
);
ApiClient.interceptors.request.use(req => {
  console.log('request', req.url);
  console.log('request', req);
  return req;
});
