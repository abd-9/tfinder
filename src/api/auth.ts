import ApiClient, {setAuthorizationHeader} from '.';
import {IAuth, IUser} from '../interfaces/users.interface';
import {AppStorage} from '../services/app-storage.service';
import {reduxUserActions} from '../store/users';

export async function loginApi(tutorData: IUser) {
  try {
    const response = await ApiClient.post<IUser & IAuth>(`/login`, tutorData);
    await AppStorage.setToken(response.token);
    setAuthorizationHeader(response.token);
    return {
      ...response.data,
      studentId: response.studentId,
      tutorId: response.tutorId,
      token: response?.token,
    };
  } catch (error) {
    // console.error('Login - Error: ', error?.data?.message);
    throw Error(error);
  }
}

export const logout = async (dispatch: any) => {
  await AppStorage.setToken('');
  dispatch(reduxUserActions.setUserData({}));
};
