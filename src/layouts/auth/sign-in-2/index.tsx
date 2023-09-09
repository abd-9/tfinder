import React, {ReactElement} from 'react';
import {View, TouchableWithoutFeedback, ToastAndroid} from 'react-native';
import {
  Button,
  Input,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
  Icon,
} from '@ui-kitten/components';
import {PersonIcon} from './extra/icons';
import {KeyboardAvoidingView} from './extra/3rd-party';
import {Toast} from 'react-native-toast-notifications';
import {IUser, USER_TYPE} from '../../../interfaces/users.interface';
import {LoginSchema, SignupTutorSchema} from '../signup/extra/helper';
import {useFormik} from 'formik';
import {createTutorApi} from '../../../api/tutor';
import {loginApi} from '../../../api/auth';
import {useDispatch, useSelector} from 'react-redux';
import {reduxUserActions, selectUserData} from '../../../store/users';

export default ({navigation}): React.ReactElement => {
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const styles = useStyleSheet(themedStyles);
  const userData = useSelector(selectUserData);

  const onSubmit = (values: IUser) => {
    loginApi(values).then(res => {
      Toast.show('Success!', {type: 'success'});
      dispatch(reduxUserActions.setUserData(res));
      // navigation && navigation.navigate('Main');
    });
  };
  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit,
  });

  const onSignUpButtonPress = (): void => {
    navigation && navigation.navigate('SignUp');
  };

  const onForgotPasswordButtonPress = (): void => {
    navigation && navigation.navigate('ForgotPassword');
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
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text category="h1" status="control">
          Hello
        </Text>
        <Text style={styles.signInLabel} category="s1" status="control">
          Sign in to your account
        </Text>
      </View>
      <Layout style={styles.formContainer} level="1">
        <Input
          placeholder="Email"
          accessoryRight={PersonIcon}
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          name="email"
          value={formik.values.email}
          status={
            formik.touched.email && formik.errors.email ? 'danger' : 'basic'
          }
        />
        <Input
          style={styles.passwordInput}
          placeholder="Password"
          accessoryRight={renderPasswordIcon}
          secureTextEntry={!formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          status={
            formik.touched.password && formik.errors.password
              ? 'danger'
              : 'basic'
          }
          value={formik.values.password}
        />
        <View style={styles.forgotPasswordContainer}>
          <Button
            style={styles.forgotPasswordButton}
            appearance="ghost"
            status="basic"
            onPress={onForgotPasswordButtonPress}>
            Forgot your password?
          </Button>
        </View>
      </Layout>
      <Button
        onPress={() => formik.handleSubmit()}
        style={styles.signInButton}
        size="giant">
        SIGN IN
      </Button>
      <Button
        style={styles.signUpButton}
        appearance="ghost"
        status="basic"
        onPress={onSignUpButtonPress}>
        Don't have an account? Create
      </Button>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-1',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
    backgroundColor: 'color-primary-default',
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
});
const initialValues: IUser = {
  name: '',
  email: '',
  password: '',
  type: USER_TYPE.STUDENT,
};
