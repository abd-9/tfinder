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
  ButtonGroup,
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
import {Field, useFormik} from 'formik';
import {SignupTutorSchema, tutorSignUpShema} from './extra/helper';
import {USER_TYPE} from '../../../interfaces/users.interface';

export default ({navigation}): React.ReactElement => {
  const [selectedUserType, seSelectedUserType] = React.useState<USER_TYPE>(
    USER_TYPE.STUDENT,
  );
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  const styles = useStyleSheet(themedStyles);

  const onSignInButtonPress = (): void => {
    navigation && navigation.navigate('SignIn');
  };
  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: SignupTutorSchema,
    onSubmit,
  });

  const onSignUpButtonPress = (): void => {
    // TODO: login api call
    navigation && navigation.navigate('SignUp4');
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const renderPasswordIcon = (props): ReactElement => (
    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
      <Icon {...props} name={passwordVisible ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
    <KeyboardAvoidingView>
      <View style={{backgroundColor: 'red', height: '100%'}}>
        <ImageOverlay
          style={styles.headerContainer1}
          source={require('./assets/image-background.jpg')}>
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

          <View style={styles.headerButtons}>
            <Button
              appearance="outline"
              onPress={() => seSelectedUserType(USER_TYPE.STUDENT)}
              status={selectedUserType == USER_TYPE.STUDENT ? 'info' : 'basic'}
              style={styles.headerButtonStyle}>
              <TutorIcon /> Tutor
            </Button>
            <Button
              appearance="outline"
              onPress={() => seSelectedUserType(USER_TYPE.TUTOR)}
              status={selectedUserType == USER_TYPE.TUTOR ? 'info' : 'basic'}
              style={styles.headerButtonStyle}>
              {' '}
              <StudentIcon /> Student
            </Button>
          </View>
          {/* selectedIndex={selectedTabIndex}
          onSelect={setSelectedTabIndex}> */}

          <View style={styles.tabContentContainer}>
            <View style={styles.tabContentContainer}>
              <Input
                autoCapitalize="none"
                style={styles.formInput}
                placeholder="Name"
                accessoryRight={PersonIcon}
                status={
                  formik.touched.name && formik.errors.name
                    ? 'danger'
                    : 'control'
                }
                onChangeText={formik.handleChange('name')}
                onBlur={formik.handleBlur('name')}
                value={formik.values.name}
              />

              <Input
                style={styles.emailInput}
                autoCapitalize="none"
                status={
                  formik.touched.email && formik.errors.email
                    ? 'danger'
                    : 'control'
                }
                placeholder="Email"
                accessoryRight={EmailIcon}
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                value={formik.values.email}
              />
              <Input
                style={styles.passwordInput}
                autoCapitalize="none"
                status={
                  formik.touched.password && formik.errors.password
                    ? 'danger'
                    : 'control'
                }
                secureTextEntry={!passwordVisible}
                placeholder="Password"
                accessoryRight={renderPasswordIcon}
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
                value={formik.values.password}
              />
            </View>
          </View>

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
      </View>
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
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    textAlign: 'center',
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
  headerButtons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerButtonStyle: {
    marginHorizontal: 5,
    width: 150,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  editAvatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerContainer1: {
    height: '100%',
  },

  controlContainer: {
    borderRadius: 4,
    margin: 2,
    padding: 6,
    justifyContent: 'center',
  },
});
interface FormValues {
  name: string;
  email: string;
  password: string;
}

const initialValues: FormValues = {
  name: '',
  email: '',
  password: '',
};
