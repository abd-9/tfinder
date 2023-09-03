import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Profile} from '../scenes/social/profile.component';

const Stack = createStackNavigator();

// const SocialMenuNavigator = (): React.ReactElement => (
//   <TopTab.Navigator tabBar={props => <SocialScreen {...props} />}>
//     <TopTab.Screen name="SocialGrid" component={SocialGridScreen} />
//     <TopTab.Screen name="SocialList" component={SocialListScreen} />
//   </TopTab.Navigator>
// );

export const SocialNavigator = (): React.ReactElement => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    {/* <Stack.Screen name="Social" component={SocialMenuNavigator} /> */}
    {/* <Stack.Screen name="Feed1" component={Feed1Screen} /> */}
    {/* <Stack.Screen name="Feed2" component={Feed2Screen} /> */}
    {/* <Stack.Screen name="Profile1" component={Profile1Screen} />
    <Stack.Screen name="Profile2" component={Profile2Screen} />
    <Stack.Screen name="Profile3" component={Profile3Screen} /> */}
    <Stack.Screen
      name="Profile"
      initialParams={{id: '0'}}
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
