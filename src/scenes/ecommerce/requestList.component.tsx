import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {SafeAreaLayout} from '../../components/safe-area-layout.component';
import {ArrowIosBackIcon, SearchIcon} from '../../components/icons';
import ContentView from '../../layouts/ecommerce/request-cart';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {reduxTutorActions} from '../../store/tutors';
import {getTutorsByFilterApi} from '../../api/tutor';
import {getMyRequetsApi} from '../../api/user';
import {IRequest, REQUEST_STATUS} from '../../interfaces/request.interface';

export const ReqiestsListScreen = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}): React.ReactElement => {
  const dispatch = useDispatch();
  const [requestsList, setRequestsList] = useState<IRequest[]>([]);

  const fetchMyRequests = async (
    requestStatus: REQUEST_STATUS = REQUEST_STATUS.PENDING,
  ) => {
    const res = await getMyRequetsApi(requestStatus);

    setRequestsList(res);
  };
  useEffect(() => {
    fetchMyRequests();
  }, []);

  const onSearchActionPress = (): void => {
    navigation.navigate('TutorFilter');
  };
  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ArrowIosBackIcon}
      onPress={() => {
        navigation.navigate('Main');
      }}
    />
  );

  const renderSearchAction = (): React.ReactElement => (
    <TopNavigationAction icon={SearchIcon} onPress={onSearchActionPress} />
  );

  return (
    <SafeAreaLayout style={styles.container} insets="top">
      <TopNavigation
        title="My Requests"
        accessoryLeft={renderBackAction}
        // accessoryRight={renderSearchAction}
      />
      <ContentView
        fetchMyRequests={fetchMyRequests}
        requestList={requestsList}
        navigation={navigation}
      />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
