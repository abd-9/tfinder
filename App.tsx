/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the UI Kitten TypeScript template
 * https://github.com/akveo/react-native-ui-kitten
 *
 * Documentation: https://akveo.github.io/react-native-ui-kitten/docs
 *
 * @format
 */

import React from 'react';
import {
  Alert,
  ImageProps,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import {
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
  Layout,
  Text,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {AuthNavigator} from './src/navigation/auth.navigator';
import {
  NavigationContainer,
  NavigationContainerRef,
  NavigationContainerRefWithCurrent,
  useNavigationContainerRef,
  useRoute,
  // useNavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaLayout} from './src/components/safe-area-layout.component';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {DashboardsNavigator} from './src/navigation/dashboards.navigator';
import {SocialNavigator} from './src/navigation/social.navigator';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeDrawer} from './src/scenes/home/home-drawer.component';
// import {createStackNavigator} from '@react-navigation/stack';

/**
 * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
 * https://akveo.github.io/eva-icons
 */

const Drawer = createDrawerNavigator();

const HeartIcon = (
  props?: Partial<ImageProps>,
): React.ReactElement<ImageProps> => <Icon {...props} name="heart" />;

export default (): React.ReactElement => {
  const navigationRef = useNavigationContainerRef();
  const Stack = createStackNavigator();

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer ref={navigationRef}>
          {/* 
          // TODO: check if user has token or not  */}
          {true ? (
            <Drawer.Navigator
              screenOptions={{gestureEnabled: false, headerShown: false}}
              drawerContent={props => <HomeDrawer {...props} />}>
              <Drawer.Screen name="Main" component={DashboardsNavigator} />
              <Drawer.Screen name="Profile" component={SocialNavigator} />
            </Drawer.Navigator>
          ) : (
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="Auth" component={AuthNavigator} />
            </Stack.Navigator>
          )}

          {/* <Stack.Screen name="SignIn2" component={TestScreen} />
            <Stack.Screen name="SignIn3" component={TestScreen2} /> */}
          {/* </Stack.Navigator> */}
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  likeButton: {
    marginVertical: 16,
  },
});
