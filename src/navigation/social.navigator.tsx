import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Profile} from '../scenes/social/profile.component';

const Stack = createStackNavigator();

export const SocialNavigator = ({route}): React.ReactElement => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Profile"
        initialParams={{
          tutorId: route.params.tutorId,
          ...(route?.params || {}),
        }}
        component={Profile}
      />
      {/* <Stack.Screen name="Profile5" component={Profile5Screen} /> */}
      {/* <Stack.Screen name="Profile6" component={Profile6Screen} /> */}
      {/* <Stack.Screen name="Profile7" component={Profile7Screen} /> */}
      {/* <Stack.Screen name="ProfileSettings1" component={ProfileSettings1Screen} /> */}
      {/* <Stack.Screen name="ProfileSettings2" component={ProfileSettings2Screen} /> */}
      {/* <Stack.Screen name="ProfileSettings3" component={ProfileSettings3Screen} /> */}

      {/* <Stack.Screen name="Chat1" component={Chat1Screen} /> */}
    </Stack.Navigator>
  );
};
