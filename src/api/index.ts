import axios from 'axios';
import {AppStorage} from '../services/app-storage.service';
import {Toast} from 'react-native-toast-notifications';

const ApiClient = axios.create({
  baseURL: 'http://192.168.0.185:3002/api',
  headers: {
    'Content-type': 'application/json',
  },
});

export const setAuthorizationHeader = async () => {
  const token = await AppStorage.getToken();
  ApiClient.defaults.headers.common['Authorization'] = token;
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
