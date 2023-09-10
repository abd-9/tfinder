import React, {ReactElement} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import {
  Button,
  CheckBox,
  Input,
  Layout,
  StyleService,
  useStyleSheet,
  Text,
  Icon,
} from '@ui-kitten/components';
import {ProfileAvatar} from './extra/profile-avatar.component';
import {
  EmailIcon,
  PersonIcon,
  PlusIcon,
  StudentIcon,
  TutorIcon,
} from './extra/icons';
import {KeyboardAvoidingView} from './extra/3rd-party';
import {IUser, USER_TYPE} from '../../../interfaces/users.interface';
import {useFormik} from 'formik';
import {SignupTutorSchema} from './extra/helper';
import {createTutorApi} from '../../../api/tutor';
import {Toast} from 'react-native-toast-notifications';
import {createStudnetApi} from '../../../api/student';

export default ({navigation}): React.ReactElement => {
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const styles = useStyleSheet(themedStyles);
  const onSubmit = (values: IUser) => {
    if (values.type == USER_TYPE.TUTOR) {
      createTutorApi(values)
        .then(() => {
          Toast.show('User created!', {type: 'success'});
          navigation && navigation.goBack();
        })
        .catch(ee => {
          Toast.show(ee.message, {type: 'danger'});
        });
    } else {
      createStudnetApi(values)
        .then(() => {
          Toast.show('User created!', {type: 'success'});
          navigation && navigation.goBack();
        })
        .catch(ee => {
          Toast.show(ee.message, {type: 'danger'});
        });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: SignupTutorSchema,
    onSubmit,
  });

  const onSignInButtonPress = (): void => {
    navigation && navigation.navigate('SignIn');
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
        {/* <ProfileAvatar
          style={styles.profileAvatar}
          resizeMode="center"
          source={require('./assets/image-person.png')}
          editButton={renderEditAvatarButton}
        /> */}
        <Button
          style={styles.editAvatarButton}
          onPress={() => formik.setFieldValue('type', USER_TYPE.STUDENT)}
          status={formik.values.type == USER_TYPE.STUDENT ? 'basic' : 'ghost'}
          accessoryLeft={StudentIcon}>
          Student
        </Button>
        <Button
          style={styles.editAvatarButton}
          onPress={() => formik.setFieldValue('type', USER_TYPE.TUTOR)}
          status={formik.values.type == USER_TYPE.TUTOR ? 'basic' : 'ghost'}
          accessoryLeft={TutorIcon}>
          Tutor
        </Button>
      </View>
      <Layout style={styles.formContainer} level="1">
        <Input
          autoCapitalize="none"
          placeholder="Name"
          accessoryRight={PersonIcon}
          // status={formik.touched.name && formik.errors.name ? 'danger' : ''}
          onChangeText={formik.handleChange('name')}
          onBlur={formik.handleBlur('name')}
          value={formik.values.name}
        />
        <Input
          style={styles.emailInput}
          // status={formik.touched.email && formik.errors.email ? 'danger' : ''}
          placeholder="Email"
          accessoryRight={EmailIcon}
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          value={formik.values.email}
        />
        <Input
          style={styles.passwordInput}
          autoCapitalize="none"
          // status={
          //   formik.touched.password && formik.errors.password ? 'danger' : ''
          // }
          secureTextEntry={!formik.values.password}
          placeholder="Password"
          accessoryRight={renderPasswordIcon}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          value={formik.values.password}
        />
      </Layout>
      <Button
        style={styles.signUpButton}
        size="giant"
        onPress={() => formik.handleSubmit()}>
        SIGN UP
      </Button>
      <Button
        style={styles.signInButton}
        appearance="ghost"
        status="basic"
        onPress={onSignInButtonPress}>
        Already have an account? Sign In
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
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    columnGap: 4,
    flexGap: 4,
    backgroundColor: 'color-primary-default',
  },
  profileAvatar: {
    width: 116,
    height: 116,
    borderRadius: 58,
    alignSelf: 'center',
    backgroundColor: 'background-basic-color-1',
    tintColor: 'color-primary-default',
  },
  editAvatarButton: {
    width: 150,
    height: 75,
    borderRadius: 20,
    marginHorizontal: 16,
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
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
  signUpButton: {
    marginHorizontal: 16,
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
});

const initialValues: IUser = {
  name: '',
  email: '',
  password: '',
  type: USER_TYPE.STUDENT,
};
