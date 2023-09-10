import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AddNewCardScreen} from '../scenes/ecommerce/add-new-card.component';

import {TutorsListScreen} from '../scenes/ecommerce/tutorList.component';
import {getTutorsByFilterApi} from '../api/tutor';
import {useDispatch} from 'react-redux';

const Stack = createStackNavigator();

export const FindTutorNavigator = (): React.ReactElement => {
  const dispatch = useDispatch();

  const fetchTutors = () => {
    getTutorsByFilterApi(dispatch);
  };
  useEffect(() => {
    fetchTutors();
  }, []);

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="MyRequests" component={TutorsListScreen} />
    </Stack.Navigator>
  );
};
