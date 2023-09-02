import React, {ReactElement} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import {
  Button,
  Input,
  StyleService,
  Tab,
  TabView,
  Text,
  useStyleSheet,
  Icon,
} from '@ui-kitten/components';
import {ImageOverlay} from './extra/image-overlay.component';
import {
  EmailIcon,
  PersonIcon,
  PhoneIcon,
  PlusIcon,
  StudentIcon,
  TutorIcon,
} from './extra/icons';
import {KeyboardAvoidingView} from './extra/3rd-party';
import SvgUri from 'react-native-svg-uri';

export default ({navigation}): React.ReactElement => {
  const [selectedTabIndex, setSelectedTabIndex] = React.useState<number>(0);
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = React.useState<string>();
  const [smsCode, setSMSCode] = React.useState<string>();
  const [smsCodeVisible, setSMSCodeVisible] = React.useState<boolean>(false);

  const styles = useStyleSheet(themedStyles);

  const onSignInButtonPress = (): void => {
    navigation && navigation.navigate('SignIn');
  };

  const onSignUpButtonPress = (): void => {
    // TODO: login api call
    navigation && navigation.navigate('SignUp4');
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const onSMSCodeIconPress = (): void => {
    setSMSCodeVisible(!smsCodeVisible);
  };

  const renderIconPassword = (props): ReactElement => (
    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
      <Icon {...props} name="lock" />
    </TouchableWithoutFeedback>
  );

  const renderIconSMS = (props): ReactElement => (
    <TouchableWithoutFeedback onPress={onSMSCodeIconPress}>
      <Icon {...props} name="lock" />
    </TouchableWithoutFeedback>
  );

  const renderTabEmailTitle = React.useCallback(
    evaProps => (
      <Text {...evaProps} style={styles.tabTitle}>
        <StudentIcon /> Student
      </Text>
    ),
    [],
  );

  const renderTabSMSTitle = React.useCallback(
    evaProps => (
      <Text {...evaProps} style={styles.tabTitle}>
        <TutorIcon /> Tutor
      </Text>
    ),
    [],
  );

  const renderEditAvatarButton = (): React.ReactElement => (
    <Button
      style={styles.editAvatarButton}
      status="basic"
      accessoryRight={PlusIcon}
    />
  );

  const renderPasswordIcon = (props): ReactElement => (
    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
      <Icon {...props} name={passwordVisible ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
    <KeyboardAvoidingView>
      <ImageOverlay
        style={styles.headerContainer1}
        // source={require('./assets/image-background.jpg')}>
      >
        <View style={styles.headerContainer}>
          <Text
            style={styles.helloLabel}
            accessoryRight={PersonIcon}
            status="control">
            Sign up
          </Text>

          <Text style={styles.signInLabel} category="s1" status="control">
            Sign up now using your email
          </Text>
        </View>
        <TabView
          style={styles.tabView}
          tabBarStyle={styles.tabBar}
          indicatorStyle={styles.tabViewIndicator}
          selectedIndex={selectedTabIndex}
          onSelect={setSelectedTabIndex}>
          <Tab title={renderTabEmailTitle}>
            <View style={styles.tabContentContainer}>
              <View style={styles.tabContentContainer}>
                <Input
                  autoCapitalize="none"
                  style={styles.formInput}
                  placeholder="User Name"
                  accessoryRight={PersonIcon}
                  status="control"
                  // value={userName}
                  // onChangeText={setUserName}
                />
                <Input
                  style={styles.emailInput}
                  autoCapitalize="none"
                  status="control"
                  placeholder="Email"
                  accessoryRight={EmailIcon}
                  value={email}
                  onChangeText={setEmail}
                />
                <Input
                  style={styles.passwordInput}
                  autoCapitalize="none"
                  status="control"
                  secureTextEntry={!passwordVisible}
                  placeholder="Password"
                  accessoryRight={renderPasswordIcon}
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
            </View>
          </Tab>
          <Tab title={renderTabSMSTitle}>
            <View>
              <View style={styles.tabContentContainer}>
                <Input
                  autoCapitalize="none"
                  style={styles.formInput}
                  placeholder="User Name"
                  accessoryRight={PersonIcon}
                  status="control"
                  // value={userName}
                  // onChangeText={setUserName}
                />
                <Input
                  style={styles.emailInput}
                  autoCapitalize="none"
                  status="control"
                  placeholder="Email"
                  accessoryRight={EmailIcon}
                  value={email}
                  onChangeText={setEmail}
                />
                <Input
                  style={styles.passwordInput}
                  autoCapitalize="none"
                  status="control"
                  secureTextEntry={!passwordVisible}
                  placeholder="Password"
                  accessoryRight={renderPasswordIcon}
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
              <Text style={styles.smsCaptionLabel} appearance="hint">
                Use the email and password to login to your account.
              </Text>
            </View>
          </Tab>
        </TabView>
        <Button
          style={styles.signInButton}
          size="giant"
          onPress={onSignUpButtonPress}>
          SIGN UP
        </Button>
        <Button
          style={styles.signUpButton}
          appearance="ghost"
          status="control"
          onPress={onSignInButtonPress}>
          Already have an account? Sign In
        </Button>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    minHeight: 216,
    paddingHorizontal: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helloLabel: {
    fontSize: 26,
    lineHeight: 32,
  },
  signInLabel: {
    marginTop: 8,
    textAlign: 'center',
  },
  emailInput: {
    marginTop: 16,
  },
  passwordInput: {
    marginTop: 16,
  },
  termsCheckBox: {
    marginTop: 24,
  },
  termsCheckBoxText: {
    color: 'text-hint-color',
    marginLeft: 10,
  },
  tabView: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: 'transparent',
  },
  tabViewIndicator: {
    backgroundColor: 'text-control-color',
  },
  tabTitle: {
    color: 'text-control-color',
  },
  tabContentContainer: {
    padding: 16,
  },
  formInput: {
    marginTop: 16,
  },
  smsCaptionLabel: {
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  editAvatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerContainer1: {
    backgroundColor: 'color-primary-default',
  },
});
