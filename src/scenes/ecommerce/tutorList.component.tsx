import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {SafeAreaLayout} from '../../components/safe-area-layout.component';
import {ArrowIosBackIcon, SearchIcon} from '../../components/icons';
import ContentView from '../../layouts/ecommerce/shopping-cart';

export const TutorsListScreen = ({navigation}): React.ReactElement => {
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
      <ContentView navigation={navigation} />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
