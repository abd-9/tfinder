import React, {ReactElement} from 'react';
import {View} from 'react-native';
import {
  Button,
  Datepicker,
  Divider,
  Icon,
  Input,
  Layout,
  Select,
  SelectItem,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import {KeyboardAvoidingView} from './extra/3rd-party';
import {TouchableWithoutFeedback} from 'react-native';
import {useFormik} from 'formik';
import {
  Countries,
  Qualifications,
  SubjectsTaught,
  TeachingLevels,
  TeachingStyles,
  updateTutorSchema,
} from '../../social/profile-settings-1/extra/helper';
import {IStudent, ITutor, IUser} from '../../../interfaces/users.interface';
import {ProfileSetting} from '../../social/profile-settings-1/extra/profile-setting.component';

export default ({navigation}): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  const [number, setNumber] = React.useState<string>();
  const [name, setName] = React.useState<string>();
  const [date, setDate] = React.useState<Date>();
  const [cvv, setCVV] = React.useState<string>();
  const [cvvVisible, setCVVVisible] = React.useState<boolean>(false);

  const initialValues: IUser & IStudent & ITutor = {
    name: '',
    cities: [],
    // ...userData,
    // ...userPorfile,
  };
  const onSubmit = (values: IUser & ITutor) => {
    // if (userData.tutorId) {
    //   const formatedTutor: ITutor = {
    //     name: values.name,
    //     cities: values.cities,
    //     country: values.country,
    //     flexibility: values.flexibility,
    //     location: values.location,
    //     subjectsTaught: values.subjectsTaught,
    //     qualifications: values.qualifications,
    //     teachingStyle: values.teachingStyle,
    //     userId: userData._id,
    //     phone: values?.phone,
    //     teachLevel: values.teachLevel,
    //   };
    //   updateTutorIdApi(userData.tutorId, formatedTutor, dispatch).then(res => {
    //     Toast.show('Success!', {type: 'success'});
    //     dispatch(
    //       reduxUserActions.setUserData({...userData, name: res.user?.name}),
    //     );
    // getTutorIdApi(userData.tutorId);
    // navigation && navigation.navigate('Main');
    //   });
    // }
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: updateTutorSchema,
    onSubmit,
  });
  const onCVVIconPress = (): void => {
    setCVVVisible(!cvvVisible);
  };

  const onAddButtonPress = (): void => {
    navigation && navigation.goBack();
  };

  const renderCVVIcon = (props): ReactElement => (
    <TouchableWithoutFeedback onPress={onCVVIconPress}>
      <Icon {...props} name={cvvVisible ? 'eye' : 'eye-off'} />
    </TouchableWithoutFeedback>
  );

  const options =
    Countries.find(_ => _.name == formik.values.country)?.cities || [];

  const handleSelectCity = (_selected: string, keyName: string) => {
    const updatedSelectedIndex = formik.values[keyName]?.includes(_selected)
      ? formik.values[keyName]?.filter(i => i != _selected)
      : [...(formik.values[keyName] || []), _selected];

    formik.setFieldValue(keyName, updatedSelectedIndex);
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Layout style={styles.form} level="1">
        <ProfileSetting
          formik={formik}
          style={[styles.profileSetting, styles.section]}
          hint="Name"
          name="name"
        />
        <ProfileSetting
          style={[styles.profileSetting, styles.section]}
          formik={formik}
          hint="Email"
          name="email"
        />
        <ProfileSetting
          formik={formik}
          style={styles.profileSetting}
          hint="location"
          name="location"
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
                selected={Boolean(
                  formik.values?.cities?.find(_ => _ == option),
                )}
              />
            ))}
          </Select>
        </View>

        {/* <Button style={styles.doneButton} onPress={formik.handleSubmit}>
          Save
        </Button> */}
      </Layout>
      <Divider />
      <Button style={styles.addButton} size="giant" onPress={onAddButtonPress}>
        Filter
      </Button>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },
  form: {
    flex: 1,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  input: {
    marginHorizontal: 12,
    marginVertical: 8,
  },
  middleContainer: {
    flexDirection: 'row',
  },
  middleInput: {
    width: 128,
  },
  addButton: {
    marginHorizontal: 16,
    marginVertical: 24,
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
