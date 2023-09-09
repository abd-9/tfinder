import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Trainings1Screen} from '../scenes/dashboards/trainings-1.component';
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
  }, []);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Trainings1" component={Trainings1Screen} />
    </Stack.Navigator>
  );
};
