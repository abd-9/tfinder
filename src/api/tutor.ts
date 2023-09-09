import ApiClient from '.';
import {ITutor} from '../interfaces/users.interface';
import store from '../store';
import {reduxUserActions} from '../store/users';

export async function getTutorIdApi(tutorId: string) {
  try {
    const response = await ApiClient.get<ITutor>(`/tutors/${tutorId}`);

    store.dispatch(reduxUserActions.setProfileData(response.data));
    return {...response.data};
  } catch (error) {
    // console.error('Login - Error: ', error?.data?.message);
    throw Error(error);
  }
}