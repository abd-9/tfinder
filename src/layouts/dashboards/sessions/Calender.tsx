import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {ArrowIosBackIcon} from '../settings/extra/icons';
import {SearchIcon} from '../../../components/icons';
import {SafeAreaLayout} from '../../../components/safe-area-layout.component';
import ContentView from './session-cart/index';
import {useSelector} from 'react-redux';
import {selectUserRequests} from '../../../store/users';

export const CommingSessionsScreen = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}): React.ReactElement => {
  const requestList = useSelector(selectUserRequests);

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
        title="Tutors List "
        accessoryLeft={renderBackAction}
        accessoryRight={renderSearchAction}
      />
      <ContentView requestList={requestList} navigation={navigation} />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
