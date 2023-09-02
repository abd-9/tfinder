import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// import {AuthScreen} from '../scenes/auth/auth.component';
// import {AuthGridScreen} from '../scenes/auth/auth-grid.component';
// import {AuthListScreen} from '../scenes/auth/auth-list.component';
import {SignIn1Screen} from '../scenes/auth/sign-in-1.component';
import {SignIn2Screen} from '../scenes/auth/sign-in-2.component';
import {SignIn3Screen} from '../scenes/auth/sign-in-3.component';
// import {SignIn4Screen} from '../scenes/auth/sign-in-4.component';
import {SignUpScreen} from '../scenes/auth/sign-in-5.component';
// import {SignUp1Screen} from '../scenes/auth/sign-up-1.component';
import {SignUp2Screen} from '../scenes/auth/sign-up-2.component';
// import {SignUp3Screen} from '../scenes/auth/sign-up-3.component';
// import {SignUp4Screen} from '../scenes/auth/sign-up-4.component';
import {ForgotPasswordScreen} from '../scenes/auth/forgot-password.component';

// const TopTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

// const AuthMenuNavigator = (): React.ReactElement => (
//   <TopTab.Navigator tabBar={props => <AuthScreen {...props} />}>
//     <TopTab.Screen name="AuthGrid" component={AuthGridScreen} />
//     <TopTab.Screen name="AuthList" component={AuthListScreen} />
//   </TopTab.Navigator>
// );

export const AuthNavigator = (): React.ReactElement => (
  // <ForgotPasswordScreen navigation={{}} />
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="SignIn" component={SignIn2Screen} />
    {/*  // <Stack.Screen name="SignIn4" component={SignIn4Screen} />
    <Stack.Screen name="SignUp1" component={SignUp1Screen} />
    <Stack.Screen name="SignUp3" component={SignUp3Screen} />
    <Stack.Screen name="SignUp4" component={SignUp4Screen} />  */}
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </Stack.Navigator>
);
