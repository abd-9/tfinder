import React from 'react';

import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {Provider} from 'react-redux';

import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {AuthNavigator} from './src/navigation/auth.navigator';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {DashboardsNavigator} from './src/navigation/dashboards.navigator';
import {SocialNavigator} from './src/navigation/social.navigator';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeDrawer} from './src/scenes/home/home-drawer.component';
import {store} from './src/store';
import {ToastProvider} from 'react-native-toast-notifications';

// import Toast from 'react-native-toast-message';
// import {createStackNavigator} from '@react-navigation/stack';

const Drawer = createDrawerNavigator();

export default (): React.ReactElement => {
  const navigationRef = useNavigationContainerRef();
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <ToastProvider>
          <NavigationContainer ref={navigationRef}>
            <Drawer.Navigator
              screenOptions={{gestureEnabled: false, headerShown: false}}
              drawerContent={props => <HomeDrawer {...props} />}>
              <Stack.Screen name="Auth" component={AuthNavigator} />

              <Drawer.Screen name="Main" component={DashboardsNavigator} />
              <Drawer.Screen name="Profile" component={SocialNavigator} />
            </Drawer.Navigator>
          </NavigationContainer>
        </ToastProvider>
      </ApplicationProvider>
    </Provider>
  );
};
