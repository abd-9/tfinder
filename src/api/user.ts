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
