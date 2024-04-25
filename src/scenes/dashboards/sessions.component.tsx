import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {SafeAreaLayout} from '../../components/safe-area-layout.component';
import {ArrowIosBackIcon, MenuIcon2} from '../../components/icons';
import ContentView from '../../layouts/dashboards/sessions';
import {useDispatch, useSelector} from 'react-redux';
import {IRequest, REQUEST_STATUS} from '../../interfaces/request.interface';
import {getMyRequetsApi} from '../../api/user';

export const MySeesionsScreen = ({navigation}): React.ReactElement => {
  const onShowMenuPress = () => {
    navigation.toggleDrawer();
  };
  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={MenuIcon2} onPress={onShowMenuPress} />
  );
  const [requestsList, setRequestsList] = useState<IRequest[]>([]);
  const dispatch = useDispatch();
  const fetchMyRequests = async (
    requestStatus: REQUEST_STATUS = REQUEST_STATUS.ACCEPTED,
  ) => {
    const res = await getMyRequetsApi(requestStatus, dispatch);

    setRequestsList(res);
  };
  useEffect(() => {
    fetchMyRequests();
  }, []);
  return (
    <SafeAreaLayout style={styles.container} insets="top">
      <TopNavigation title="Your Sessions" accessoryLeft={renderBackAction} />
      <ContentView requestsList={requestsList} />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
