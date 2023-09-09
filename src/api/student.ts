import ApiClient from '.';
import {ITutor} from '../interfaces/users.interface';
import store from '../store';
import {reduxUserActions} from '../store/users';

export async function getStudentByIdApi(studentId: string) {
  try {
    const response = await ApiClient.get<ITutor>(`/students/${studentId}`);

    store.dispatch(reduxUserActions.setProfileData(response.data));
    return {...response.data};
  } catch (error) {
    throw Error(error);
  }
}
