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
// import {createStackNavigator} from '@react-navigation/stack';

/**
 * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
 * https://akveo.github.io/eva-icons
 */
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
          {/* <SafeAreaProvider>
            <SafeAreaLayout insets="top"> */}
          {/* <Layout>
            <Button
              style={styles.likeButton}
              accessoryLeft={HeartIcon}
              onPress={() => {
                navigationRef.navigate('SignIn3', {});
              }}>
              LIKE
            </Button>
          </Layout> */}
          <Stack.Navigator headerMode="none">
            {/* <Stack.Screen name="Auth" component={AuthMenuNavigator} /> */}
            <Stack.Screen name="Auth" component={AuthNavigator} />
            {/* <Stack.Screen name="SignIn2" component={TestScreen} />
            <Stack.Screen name="SignIn3" component={TestScreen2} /> */}
          </Stack.Navigator>
          {/* </SafeAreaLayout> */}
          {/* </SafeAreaProvider> */}
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

type TestScreenProps = {
  navigation: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>;
};

const TestScreen = ({navigation}: TestScreenProps): React.ReactElement => {
  return (
    <View>
      <Button
        style={styles.likeButton}
        accessoryLeft={HeartIcon}
        onPress={(): void => {
          Alert.alert('test');
          console.log(navigation.getCurrentRoute()?.name);
          navigation.navigate('SignIn3', {});
        }}>
        Home4
      </Button>
    </View>
  );
};

const TestScreen2 = ({navigation}): React.ReactElement => {
  return (
    <Button
      style={styles.likeButton}
      accessoryLeft={HeartIcon}
      onPress={() => {
        navigation.navigate('SignIn2', {});
      }}>
      Home2 333
    </Button>
  );
};
