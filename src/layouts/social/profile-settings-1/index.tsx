import React from 'react';
import {ScrollView, View} from 'react-native';
import {
  Button,
  CheckBox,
  IndexPath,
  Select,
  SelectItem,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {ProfileAvatar} from './extra/profile-avatar.component';
import {ProfileSetting} from './extra/profile-setting.component';
import {CameraIcon} from './extra/icons';
import {Profile} from './extra/data';
import {useDispatch, useSelector} from 'react-redux';
import {
  reduxUserActions,
  selectUserData,
  selectUserProfile,
} from '../../../store/users';
import {
  IStudent,
  ITutor,
  IUser,
  USER_TYPE,
} from '../../../interfaces/users.interface';
import {useFormik} from 'formik';
import {
  Countries,
  Qualifications,
  SubjectsTaught,
  TeachingLevels,
  TeachingStyles,
  updateTutorSchema,
} from './extra/helper';
import {getTutorIdApi, updateTutorIdApi} from '../../../api/tutor';
import {Toast} from 'react-native-toast-notifications';

export default ({navigation}): React.ReactElement => {
  const styles = useStyleSheet(themedStyle);
  const userData = useSelector(selectUserData);
  const userPorfile = useSelector(selectUserProfile);
  const dispatch = useDispatch();
  const initialValues: IUser & IStudent & ITutor = {
    name: '',
    cities: [],
    ...userData,
    ...userPorfile,
  };

  const onSubmit = (values: IUser & ITutor) => {
    if (userData.tutorId) {
      const formatedTutor: ITutor = {
        name: values.name,
        cities: values.cities,
        country: values.country,
        flexibility: values.flexibility,
        location: values.location,
        subjectsTaught: values.subjectsTaught,
        qualifications: values.qualifications,
        teachingStyle: values.teachingStyle,
        userId: userData._id,
        phone: values?.phone,
        teachLevel: values.teachLevel,
      };
      updateTutorIdApi(userData.tutorId, formatedTutor, dispatch).then(res => {
        Toast.show('Success!', {type: 'success'});
        dispatch(
          reduxUserActions.setUserData({...userData, name: res.user?.name}),
        );

        // getTutorIdApi(userData.tutorId);
        // navigation && navigation.navigate('Main');
      });
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: updateTutorSchema,
    onSubmit,
  });

  const options =
    Countries.find(_ => _.name == formik.values.country)?.cities || [];

  const handleSelectCity = (_selected: string, keyName: string) => {
    const updatedSelectedIndex = formik.values[keyName]?.includes(_selected)
      ? formik.values[keyName]?.filter(i => i != _selected)
      : [...(formik.values[keyName] || []), _selected];

    formik.setFieldValue(keyName, updatedSelectedIndex);
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <ProfileAvatar
        style={styles.profileAvatar}
        source={
          userData.type == USER_TYPE.TUTOR
            ? require('../../../assets/img/teacher.png')
            : require('../../../assets/img/student.png')
        }
        // editButton={renderPhotoButton}
      />
      <ProfileSetting
        formik={formik}
        style={[styles.profileSetting, styles.section]}
        hint="Name"
        name="name"
      />

      <ProfileSetting
        formik={formik}
        style={styles.profileSetting}
        hint="location"
        name="location"
      />

      <ProfileSetting
        style={[styles.profileSetting, styles.section]}
        formik={formik}
        hint="Email"
        name="email"
      />
      <ProfileSetting
        style={styles.profileSetting}
        formik={formik}
        hint="Phone Number"
        name="phone"
      />
      <View style={[styles.profileSetting, styles.section]}>
        <Select
          label="Qualifications"
          style={{marginVertical: 5}}
          multiSelect={true}
          placeholder={'Select qualifications'}
          value={formik.values?.qualifications?.join(', ')}>
          {Qualifications.map((option, index) => (
            <SelectItem
              key={index}
              title={option}
              onPress={() => {
                handleSelectCity(option, 'qualifications');
              }}
              selected={Boolean(
                formik.values?.qualifications?.find(_ => _ == option),
              )}
            />
          ))}
        </Select>
        <Select
          label="Teach Levels"
          style={{marginVertical: 5}}
          multiSelect={true}
          placeholder={'Select Teaching Levels'}
          value={formik.values?.teachLevel?.join(', ')}>
          {TeachingLevels.map((option, index) => (
            <SelectItem
              key={index}
              title={option}
              onPress={() => {
                handleSelectCity(option, 'teachLevel');
              }}
              selected={Boolean(
                formik.values?.teachLevel?.find(_ => _ == option),
              )}
            />
          ))}
        </Select>
        <Select
          multiSelect={true}
          label="Teaching Style"
          style={{marginVertical: 5}}
          placeholder={'Select teachingStyle'}
          value={formik.values?.teachingStyle?.join(', ')}>
          {TeachingStyles.map((option, index) => (
            <SelectItem
              key={index}
              title={option}
              onPress={() => {
                handleSelectCity(option, 'teachingStyle');
              }}
              selected={Boolean(
                formik.values?.teachingStyle?.find(_ => _ == option),
              )}
            />
          ))}
        </Select>
        <Select
          multiSelect={true}
          label="Subjects Taught"
          style={{marginVertical: 5}}
          placeholder={'Select Subjects Taught'}
          value={formik.values?.subjectsTaught?.join(', ')}>
          {SubjectsTaught.map((option, index) => (
            <SelectItem
              key={index}
              title={option}
              onPress={() => {
                handleSelectCity(option, 'subjectsTaught');
              }}
              selected={Boolean(
                formik.values?.subjectsTaught?.find(_ => _ == option),
              )}
            />
          ))}
        </Select>
      </View>
      <View style={[styles.profileSetting, styles.section]}>
        <Select
          placeholder={'Select country'}
          label="Country"
          value={formik.values?.country}
          style={{marginVertical: 5}}>
          {Countries.map((option, index) => (
            <SelectItem
              key={index}
              title={option.name}
              onPress={() => {
                formik.setFieldValue('country', option.name);
              }}
              selected={Boolean(formik.values?.country == option.name)}
            />
          ))}
        </Select>
        <Select
          multiSelect={true}
          label="Cities"
          placeholder={'Select cities'}
          value={formik.values?.cities?.join(', ')}>
          {options.map((option, index) => (
            <SelectItem
              key={index}
              title={option}
              onPress={() => {
                handleSelectCity(option, 'cities');
              }}
              selected={Boolean(formik.values?.cities?.find(_ => _ == option))}
            />
          ))}
        </Select>
        <CheckBox
          style={styles.profileSetting}
          onChange={() => {
            formik.setFieldValue('flexibility', !formik.values.flexibility);
          }}
          checked={formik.values.flexibility}>
          Flexibility
        </CheckBox>
      </View>

      <Button style={styles.doneButton} onPress={formik.handleSubmit}>
        Save
      </Button>
    </ScrollView>
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },
  contentContainer: {
    paddingVertical: 24,
  },
  profileAvatar: {
    aspectRatio: 1.0,
    height: 124,
    alignSelf: 'center',
  },
  editAvatarButton: {
    aspectRatio: 1.0,
    height: 48,
    borderRadius: 24,
  },
  profileSetting: {
    padding: 16,
  },
  section: {
    marginTop: 24,
  },
  doneButton: {
    marginHorizontal: 24,
    marginTop: 24,
  },
});
