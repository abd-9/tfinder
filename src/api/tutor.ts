import ApiClient from '.';
import {IReview, ITutor, IUser} from '../interfaces/users.interface';
import store from '../store';
import {reduxTutorActions} from '../store/tutors';
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

export async function getTutorsByFilterApi(dispatch: any) {
  try {
    const response = await ApiClient.get<ITutor>(`/tutors/`);

    dispatch(reduxTutorActions.setTutorList(response.data));
    return response.data;
  } catch (error) {
    // console.error('Login - Error: ', error?.data?.message);
    throw Error(error);
  }
}
export async function addTutorReviewApi(
  tutorId: string | undefined,
  reviewPayload: IReview | any,
) {
  try {
    const response = await ApiClient.post<ITutor>(
      `/tutors/${tutorId}/review`,
      reviewPayload,
    );

    return response.data;
  } catch (error) {
    // console.error('Login - Error: ', error?.data?.message);
    throw Error(error);
  }
}

export async function createTutorApi(tutorData: IUser) {
  try {
    const response = await ApiClient.post<IUser>(`/tutors`, tutorData);

    return response.data;
  } catch (error) {
    console.error('create turor issue - Error: ', error.message);

    throw Error(error);
  }
}
