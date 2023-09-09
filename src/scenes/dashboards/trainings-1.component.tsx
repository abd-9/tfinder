import React from 'react';
import {StyleSheet} from 'react-native';
import {TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {SafeAreaLayout} from '../../components/safe-area-layout.component';
import {ArrowIosBackIcon, MenuIcon2} from '../../components/icons';
import ContentView from '../../layouts/dashboards/trainings-1';
import {useSelector} from 'react-redux';
import {selectUserData} from '../../store/users';

export const Trainings1Screen = ({navigation}): React.ReactElement => {
  const userData = useSelector(selectUserData);

  const onShowMenuPress = () => {
    navigation.toggleDrawer();
  };
  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction icon={MenuIcon2} onPress={onShowMenuPress} />
  );

  return (
    <SafeAreaLayout style={styles.container} insets="top">
      <TopNavigation title="Your Sessions" accessoryLeft={renderBackAction} />
      <ContentView />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
