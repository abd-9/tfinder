import axios from 'axios';
import {AppStorage} from '../services/app-storage.service';
import {Toast} from 'react-native-toast-notifications';

let token = 'ssss';

const ApiClient = axios.create({
  baseURL: 'http://192.168.0.185:3002/api',
});
// axios.defaults.headers.common = {
//   Authorization: `Bearer asdasdasdasdwqwdqwdqwd`,
// };
export const setAuthorizationHeader = async (_token?: string) => {
  const ttt = await AppStorage.getToken();

  token = ttt || _token;

  // ApiClient.headers.setAuthorization(`Bearer ${token}`);
  // ApiClient.defaults.headers.common.Authorization = `Bearer ${ttt}`;
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
ApiClient.interceptors.request.use(
  async config => {
    const ttt = await AppStorage.getToken();

    config.headers['Authorization'] = 'Bearer ' + ttt;
    config.headers.setAuthorization('Bearer ' + ttt);
    return config;
  },
  error => {
    Promise.reject(error);
  },
);
ApiClient.interceptors.response.use(
  response => {
    return response.data;
  },
  async error => {
    console.log('Response Error log', error);

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
  console.log('dasdaw22222', req);

  return req;
});
