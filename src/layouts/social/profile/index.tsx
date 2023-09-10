import React from 'react';
import {
  ListRenderItemInfo,
  StyleSheet,
  TimePickerAndroid,
  View,
} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Datepicker,
  Input,
  Layout,
  List,
  Modal,
  RangeDatepicker,
  Select,
  SelectItem,
  Tab,
  TabBar,
  Text,
} from '@ui-kitten/components';
import {ProfileSocial} from './extra/profile-social.component';
import {Comment, Post, Profile} from './extra/data';
import {RateBar} from './extra/rate-bar.component';
import {CommentItem} from './extra/comment-list.component';
import {Article} from '../../articles/article-3/extra/data';
import {BookIcon, StarIcon} from '../../../components/icons';
import {IReview, ITutor} from '../../../interfaces/users.interface';
import {calculateAverageRating} from '../../ecommerce/shopping-cart/extra/helper';
import {
  IRequest,
  ISession,
  REQUEST_REPETITION,
  REQUEST_STATUS,
  SESSION_STATUS,
} from '../../../interfaces/request.interface';
import {addTutorReviewApi, getTutorsByFilterApi} from '../../../api/tutor';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserData} from '../../../store/users';
import {ProfileSetting} from './extra/profile-setting.component';
import {ScrollView} from 'react-native-gesture-handler';
import {Formik} from 'formik';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {ClockIcon} from '../feed-1/extra/icons';
import {sendRequestSessionApi} from '../../../api/student';
import {Toast} from 'react-native-toast-notifications';

const profile: Profile = Profile.jenniferGreen();

const comments: Comment[] = [
  Comment.byHubertFranck(),
  Comment.byHubertFranck(),
];
export default ({
  navigation,
  tutorData,
}: {
  tutorData: ITutor;
}): React.ReactElement => {
  const usreData = useSelector(selectUserData);
  const [selectedTabIndex, setSelectedTabIndex] = React.useState<number>(0);
  const [visible, setVisible] = React.useState<boolean>(false);
  const [showBookingModal, setShowBookingModal] =
    React.useState<boolean>(false);
  const toggleModal = (): void => {
    setVisible(!visible);
  };
  const toggleBookingModal = (): void => {
    setShowBookingModal(!showBookingModal);
  };

  const onFollowButtonPress = (): void => {
    toggleModal();
  };
  const renderItem = (
    info: ListRenderItemInfo<IReview>,
  ): React.ReactElement => {
    if (selectedTabIndex == 0) return <UserExperiance tutorData={tutorData} />;
    return <CommentItem item={info.item} />;
  };

  const getAcceptedRequests = (_requests: IRequest[]): number => {
    return _requests.filter(_s => _s.status == REQUEST_STATUS.ACCEPTED).length;
  };
  const renderHeader = (): React.ReactElement => {
    return (
      <Layout style={styles.header} level="1">
        <Avatar
          style={styles.profileAvatar}
          size="large"
          source={require('./assets/teacher.png')}
        />
        <View style={styles.profileDetailsContainer}>
          <Text category="h4">{tutorData.user?.name}</Text>
          <Text appearance="hint" category="s1">
            {tutorData.location}
          </Text>
          <RateBar
            style={styles.rateBar}
            hint="Rating"
            value={calculateAverageRating(tutorData.reviews)}
            onValueChange={() => {}}
          />
          <View style={styles.profileSocialsContainer}>
            <ProfileSocial
              style={styles.profileSocialContainer}
              hint="Reviews"
              value={`${tutorData.reviews?.length || 0}`}
            />
            <ProfileSocial
              style={styles.profileSocialContainer}
              hint="Active studnets"
              value={`${getAcceptedRequests(tutorData.requests || [])}`}
            />
            {/* <ProfileSocial
              style={styles.profileSocialContainer}
              hint="Posts"
              value={`${profile.posts}`}
            /> */}
          </View>
          <View>
            <Button
              style={styles.followButton}
              onPress={onFollowButtonPress}
              accessoryRight={StarIcon}>
              Rate it
            </Button>
            <Button
              style={styles.booknowButton}
              status="danger"
              onPress={toggleBookingModal}
              accessoryRight={BookIcon}>
              Book now!
            </Button>
          </View>

          <View style={styles.buttons}>
            <TabBar
              onSelect={_index => setSelectedTabIndex(_index)}
              selectedIndex={selectedTabIndex}>
              <Tab title="Info" />
              <Tab title="Review" />
            </TabBar>
          </View>
        </View>
      </Layout>
    );
  };
  const dispatch = useDispatch();
  const [rating, setRating] = React.useState<number>(3);
  const [review, setReview] = React.useState<string>('');
  const handelAddReview = async () => {
    if (!review) {
      return;
    }
    const dateReview = {
      comment: review,
      user: usreData._id || '',
      rate: rating,

      // TODO must remove change
      student: usreData.studentId || '64fc43bf3aa6d3f4c9722691',
    };
    await addTutorReviewApi(tutorData?._id, dateReview);
    setReview('');
    toggleModal();
    // TODO: should call only one tutor api
    await getTutorsByFilterApi(dispatch);
  };

  const handelSendSessionRequest = async (_values: IRequest & any) => {
    const selectedStartDate = moment(_values.startDate);
    const selectedStartTime = moment(_values.startTime);
    const startDateTime = selectedStartDate
      .set({
        hour: selectedStartTime.get('hour'),
        minute: selectedStartTime.get('minute'),
        second: selectedStartTime.get('second'),
      })
      .toDate();
    const selectedEndDate = moment(_values.endDate);
    const selectedEndTime = moment(_values.endTime);
    const endDateTime = selectedEndDate
      .set({
        hour: selectedEndTime.get('hour'),
        minute: selectedEndTime.get('minute'),
        second: selectedEndTime.get('second'),
      })
      .toDate();
    const formatedRequest = {
      rate: 31.0,
      startDateTime: startDateTime.toISOString(),
      endDateTime: endDateTime.toISOString(),
      note: _values.note,
      repetition: _values.repetition,
    };
    sendRequestSessionApi(
      tutorData._id,
      usreData.studentId,
      formatedRequest,
    ).then(() => {
      toggleBookingModal();
      Toast.show('Sent successfuly!', {type: 'success'});
    });
  };
  return (
    <View style={{flex: 1}}>
      <List
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={selectedTabIndex == 0 ? [{}] : tutorData.reviews}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
      />
      <Modal
        backdropStyle={styles.backdrop}
        visible={visible}
        onBackdropPress={toggleModal}>
        <Card disabled={true}>
          <Text category="h4">Write your review!</Text>
          <View style={styles.formContainer}>
            <RateBar
              style={styles.rateBar}
              hint="Experience"
              value={rating}
              onValueChange={setRating}
            />
            <Input
              style={{marginTop: 10}}
              // label="Your review"
              placeholder="Type a review"
              // status="control"
              value={review}
              onChangeText={setReview}
            />
          </View>
          <Button onPress={handelAddReview}>Rate</Button>
        </Card>
      </Modal>
      <Modal
        backdropStyle={styles.backdrop}
        visible={showBookingModal}
        style={{
          width: '90%',
          paddingVertical: 10,
        }}
        // onBackdropPress={toggleBookingModal}
      >
        <Formik
          initialValues={initialRequest}
          // validationSchema={SignupTutorSchema}
          onSubmit={handelSendSessionRequest}>
          {formik => {
            // const showMode = currentMode => {
            //   DateTimePicker.open({
            //     value: date,
            //     onChange,
            //     mode: currentMode,
            //     is24Hour: true,
            //   });
            // };
            return (
              <Card
                disabled={true}
                style={{
                  width: '100%',
                }}>
                <Text category="h4">Request session!</Text>

                <View style={styles.formContainer}>
                  <Select
                    placeholder={'Select repetition'}
                    label="Repetition"
                    value={
                      RepetitionOptions.find(
                        _ => _.value == formik.values?.repetition,
                      )?.name
                    }
                    style={{marginVertical: 5}}>
                    {RepetitionOptions.map((option, index) => (
                      <SelectItem
                        key={index}
                        title={option.name}
                        onPress={() => {
                          formik.setFieldValue('repetition', option.value);
                        }}
                        selected={formik.values?.repetition == option.value}
                      />
                    ))}
                  </Select>

                  <RangeDatepicker
                    // backdropStyle={styles.backdrop}
                    range={{
                      startDate: formik.values.startDateTime,
                      endDate: formik.values.endDateTime,
                    }}
                    onSelect={nextRange => {
                      formik.setFieldValue(
                        'startDateTime',
                        nextRange.startDate,
                      );
                      formik.setFieldValue('endDateTime', nextRange.endDate);
                    }}
                  />

                  {/* <TimePicker
                    label="End Time"
                    date={selectedEndTime}
                    onSelect={time => setSelectedEndTime(time)}
                  /> */}
                  {/* <DateTimePicker
                    mode="time"
                    value={formik.values.startTime}
                    // onChange={()=>{}}
                  /> */}

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Button
                      size="small"
                      accessoryLeft={ClockIcon}
                      style={{marginTop: 10, width: '48%'}}
                      // label="Your review"
                      onPress={() => {
                        DateTimePickerAndroid.open({
                          value: new Date(),
                          onChange: (_, _value) =>
                            formik.setFieldValue('startTime', _value),
                          mode: 'time',
                          is24Hour: true,
                        });
                      }}>
                      Start Time:{' '}
                      {moment(formik.values.startTime).format('HH:mm:ss')}
                    </Button>
                    <Button
                      size="small"
                      accessoryLeft={ClockIcon}
                      style={{marginTop: 10, width: '48%'}}
                      onPress={() => {
                        DateTimePickerAndroid.open({
                          value: new Date(),
                          onChange: (_, _value) =>
                            formik.setFieldValue('endTime', _value),
                          mode: 'time',
                          is24Hour: true,
                        });
                      }}>
                      End Time:
                      {moment(formik.values.endTime).format('HH:mm:ss')}
                    </Button>
                  </View>

                  <Input
                    multiline
                    style={{marginTop: 10}}
                    numberOfLines={4}
                    // label="Your review"
                    placeholder="Note in here"
                    // status="control"
                    value={formik.values.note}
                    onChangeText={_text => formik.setFieldValue('note', _text)}
                  />
                </View>
                <Button onPress={formik.handleSubmit}>Send Request now</Button>
              </Card>
            );
          }}
        </Formik>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: -16,
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 8,
  },
  profileAvatar: {
    marginHorizontal: 8,
  },
  profileDetailsContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  profileSocialsContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  profileSocialContainer: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    marginBottom: 16,
    marginTop: 0,
    culomnGap: 2,
    flexDirection: 'column',
    gap: 10,
  },
  booknowButton: {
    marginVertical: 8,
  },
  followButton: {
    marginTop: 10,
  },
  post: {
    margin: 8,
  },
  postHeader: {
    flexDirection: 'row',
    margin: 8,
  },
  postBody: {
    flexDirection: 'row',
    marginHorizontal: -8,
  },
  postAuthorContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  iconButton: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 0,
  },
  rateBar: {
    marginTop: 24,
  },
  rateBar2: {
    marginTop: 8,
    marginLeft: -10,
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
  buttons: {
    // flex: 1,
    // justifyContent: 'space-around',
    // flexDirection: 'row',
    marginTop: 16,
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
  modelContainer: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'background-basic-color-2',
  },
  contentContainer: {
    paddingVertical: 24,
  },
  profileSetting: {
    padding: 16,
  },
  section: {
    marginTop: 24,
  },
  tags: {
    // position: 'absolute',
    flexDirection: 'row',
    // left: 16,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // bottom: 6,
  },
  tag: {
    borderRadius: 16,
    margin: 2,
  },
});

const UserExperiance = ({
  tutorData,
}: {
  tutorData: ITutor;
}): React.ReactElement => {
  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        width: '100%',
      }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <ProfileSetting style={styles.profileSetting} hint="Teaching Level">
          <View style={styles.tags}>
            {tutorData.teachLevel?.map((_t, _index) => {
              return (
                <Button
                  key={_index}
                  style={[styles.iconButton, styles.tag]}
                  size="tiny">
                  {_t}
                </Button>
              );
            })}
          </View>
        </ProfileSetting>
        <ProfileSetting
          style={styles.profileSetting}
          hint="Location"
          value={tutorData.location}
        />

        <ProfileSetting
          style={[styles.profileSetting, styles.section]}
          hint="Email"
          value={tutorData.user?.email}
        />
        <ProfileSetting
          style={styles.profileSetting}
          hint="Phone Number"
          value={tutorData.phone}
        />
        <ProfileSetting style={styles.profileSetting} hint="Subjects Taught">
          <View style={styles.tags}>
            {tutorData.subjectsTaught?.map((_t, _index) => {
              return (
                <Button
                  key={_index}
                  style={[styles.iconButton, styles.tag]}
                  size="tiny">
                  {_t}
                </Button>
              );
            })}
          </View>
        </ProfileSetting>
        <ProfileSetting style={styles.profileSetting} hint="Avilable cities">
          <View style={styles.tags}>
            {tutorData.cities?.map((_t, _index) => {
              return (
                <Button
                  key={_index}
                  style={[styles.iconButton, styles.tag]}
                  size="tiny">
                  {_t}
                </Button>
              );
            })}
          </View>
        </ProfileSetting>
        <ProfileSetting style={styles.profileSetting} hint="Qualifications">
          <View style={styles.tags}>
            {tutorData.qualifications?.map((_t, _index) => {
              return (
                <Button
                  key={_index}
                  style={[styles.iconButton, styles.tag]}
                  size="tiny">
                  {_t}
                </Button>
              );
            })}
          </View>
        </ProfileSetting>
        <ProfileSetting style={styles.profileSetting} hint="TeachingStyle">
          <View style={styles.tags}>
            {tutorData.teachingStyle?.map((_t, _index) => {
              return (
                <Button
                  key={_index}
                  style={[styles.iconButton, styles.tag]}
                  size="tiny">
                  {_t}
                </Button>
              );
            })}
          </View>
        </ProfileSetting>
      </ScrollView>
    </Layout>
  );
};

const initialRequest: IRequest & any = {
  rate: 31.0,
  startDateTime: new Date(),
  endDateTime: new Date(),
  note: '',
  repetition: REQUEST_REPETITION.ONCE,
  endTime: new Date(),
  startTime: new Date(),
};

const RepetitionOptions = [
  {name: 'Once', value: REQUEST_REPETITION.ONCE},
  {name: 'Daily', value: REQUEST_REPETITION.DAILY},
  {name: 'Weekly', value: REQUEST_REPETITION.WEEKLY},
];
