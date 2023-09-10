import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MySeesionsScreen} from '../scenes/dashboards/sessions.component';
import {getTutorIdApi} from '../api/tutor';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserData} from '../store/users';
import {getStudentByIdApi} from '../api/student';
import {setAuthorizationHeader} from '../api';

const Stack = createStackNavigator();

export const DashboardsNavigator = (): React.ReactElement => {
  const userData = useSelector(selectUserData);

  useEffect(() => {
    setAuthorizationHeader(userData.token);

    if (userData.tutorId) getTutorIdApi(userData.tutorId);
    if (userData.studentId) getStudentByIdApi(userData.studentId);
  }, [userData.token]);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MySessions" component={MySeesionsScreen} />
    </Stack.Navigator>
  );
};
