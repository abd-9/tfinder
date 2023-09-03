import React from 'react';
import {StyleSheet} from 'react-native';
import {TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {SafeAreaLayout} from '../../components/safe-area-layout.component';
import {ArrowIosBackIcon, MenuIcon2} from '../../components/icons';
import ContentView from '../../layouts/dashboards/trainings-1';

export const Trainings1Screen = ({navigation}): React.ReactElement => {
  const onShowMenuPress = () => {
    // TODO: show sidebar menu
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
