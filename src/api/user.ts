import ApiClient from '.';
import {IRequest, REQUEST_STATUS} from '../interfaces/request.interface';

export async function getUserDetails({userId}) {
  try {
    const response = await ApiClient.get<UserDetailsSuccessPayload>(
      `${env.API_URL}/users/${userId}`,
    );

    return response.data;
  } catch (error) {
    console.error('getUserDetails - Error: ', error);
    throw error;
  }
}

export const getMyRequetsApi = async (
  requestStatus?: REQUEST_STATUS,
): Promise<IRequest[]> => {
  try {
    const response = await ApiClient.get<IRequest[]>(
      `/request/` + requestStatus,
    );

    return response.data;
  } catch (error) {
    // console.error('Login - Error: ', error?.data?.message);
    throw Error(error);
  }
};
