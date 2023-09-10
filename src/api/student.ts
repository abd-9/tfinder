import ApiClient from '.';
import {IRequest} from '../interfaces/request.interface';
import {ITutor, IUser} from '../interfaces/users.interface';
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
export async function createStudnetApi(studentData: IUser) {
  try {
    const response = await ApiClient.post<IUser>(`/students`, studentData);

    return response.data;
  } catch (error) {
    console.error('create turor issue - Error: ', error);

    throw Error(error);
  }
}

export async function sendRequestSessionApi(
  tutorId?: string,
  studentId?: string,
  requestData?: any,
) {
  try {
    const response = await ApiClient.post<IUser>(
      `/students/${studentId}/request/${tutorId}`,
      requestData,
    );

    return response.data;
  } catch (error) {
    console.error('Send request session issue: ', error);

    throw Error(error);
  }
}
