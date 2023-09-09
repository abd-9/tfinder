import ApiClient from '.';
import {IUser} from '../interfaces/users.interface';

export async function createTutorApi(tutorData: IUser) {
  try {
    const response = await ApiClient.post<IUser>(`/tutors`, tutorData);
    // const response = await fetch(`http://localhost:3002/api/tutor`);
    // return (await response.json()).data as IUser[];
    return response.data;
  } catch (error) {
    console.error('create turor issue - Error: ', error.message);
    // Toast.show({
    //   type: 'success',
    //   text1: 'Hello',
    //   text2: 'This is some something 👋',
    // });
    throw Error(error);
  }
}
