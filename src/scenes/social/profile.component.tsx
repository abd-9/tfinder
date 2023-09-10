import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Divider,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {SafeAreaLayout} from '../../components/safe-area-layout.component';
import {ArrowIosBackIcon} from '../../components/icons';
import ContentView from '../../layouts/social/profile';
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
  useRoute,
} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {reduxTutorActions, selectTutorsListData} from '../../store/tutors';

type ParamList = {
  Profile: {
    tutorId: string;
  };
};

export const Profile = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamList, 'Profile'>;
}): React.ReactElement => {
  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ArrowIosBackIcon}
      onPress={() => navigation.navigate('FindTutor')}
    />
  );
  const tutorsListData = useSelector(selectTutorsListData);
  // const routee = useRoute();
  // console.log('sasdasdawdawdawdawdawdawd  ', route.params.tutorId);
  const tutorId = route.params.tutorId;
  // TODO: should call api in here to get tutor data instead of bring it form redux
  const findTutorFromRedux = tutorsListData.list.find(
    _tt => _tt._id == tutorId,
  );
  return (
    <SafeAreaLayout style={styles.container} insets="top">
      <TopNavigation title="Profile" accessoryLeft={renderBackAction} />
      <Divider />
      <ContentView tutorData={findTutorFromRedux} navigation={navigation} />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
