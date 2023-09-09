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

export async function updateTutorIdApi(
  tutorId: string,
  tutor: ITutor,
  dispatch: any,
) {
  try {
    const response = await ApiClient.put<ITutor>(`/tutors/${tutorId}`, tutor);
    console.log('dddd', response);
    dispatch(reduxUserActions.setProfileData(response.data));
    return {...response.data};
  } catch (error) {
    // console.error('Login - Error: ', error?.data?.message);
    throw Error(error);
  }
}
