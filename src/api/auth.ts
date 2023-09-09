import ApiClient, {setAuthorizationHeader} from '.';
import {IAuth, IUser} from '../interfaces/users.interface';
import {AppStorage} from '../services/app-storage.service';

export async function loginApi(tutorData: IUser) {
  try {
    const response = await ApiClient.post<IUser & IAuth>(`/login`, tutorData);

    console.log('responseresponse', response.data);
    await AppStorage.setToken(response.token);
    setAuthorizationHeader();
    return {...response.data, token: response?.token};
  } catch (error) {
    // console.error('Login - Error: ', error?.data?.message);
    throw Error(error);
  }
}
