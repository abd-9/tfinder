import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Profile} from '../scenes/social/profile.component';
import {useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

const Stack = createStackNavigator();

export const SocialNavigator = ({route}): React.ReactElement => {
  const _route = useRoute();

  return (
    <Stack.Navigator
      key={JSON.stringify(_route.params)}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Profile"
        initialParams={{
          tutorId: route.params?.tutorId,
        }}
        // tutorId={_route.params?.tutorId}
        component={Profile}
      />
    </Stack.Navigator>
  );
};
