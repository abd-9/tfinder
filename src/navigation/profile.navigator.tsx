import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ProfileSettings2Screen} from '../scenes/social/profile-settings-2.component';
import {ProfileSettings1Screen} from '../scenes/social/profile-settings-1.component';

const Stack = createStackNavigator();

export const ProfileNavigator = (): React.ReactElement => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    {/* <Stack.Screen name="Profile5" component={Profile5Screen} /> */}
    {/* <Stack.Screen name="Profile6" component={Profile6Screen} /> */}
    {/* <Stack.Screen name="Profile7" component={Profile7Screen} /> */}
    <Stack.Screen name="ProfileSettings1" component={ProfileSettings1Screen} />
    {/* <Stack.Screen name="ProfileSettings2" component={ProfileSettings2Screen} /> */}
    {/* <Stack.Screen name="ProfileSettings3" component={ProfileSettings3Screen} /> */}

    {/* <Stack.Screen name="Chat1" component={Chat1Screen} /> */}
  </Stack.Navigator>
);
