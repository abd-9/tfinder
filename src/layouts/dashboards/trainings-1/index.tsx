import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Button, Icon, Tab, TabBar, Text} from '@ui-kitten/components';
import {TrainingsListScreen} from './traininig-list.component';
import ExpandableCalendarScreen from './Calender';
import {StyleSheet, View} from 'react-native';
import {AlertIcon, GlobalIcon} from './extra/icons';

const TrainingsTabBar = ({navigation, state}): React.ReactElement => {
  const onTabSelect = (index: number): void => {
    navigation.navigate(state.routeNames[index]);
  };

  const renderTab = (route: string): React.ReactElement => (
    <Tab key={route} title={route.toUpperCase()} />
  );

  return (
    <TabBar selectedIndex={state.index} onSelect={onTabSelect}>
      {state.routeNames.map(renderTab)}
    </TabBar>
  );
};

const TopTab = createMaterialTopTabNavigator();

export default (): React.ReactElement => (
  <TopTab.Navigator tabBar={props => <TrainingsTabBar {...props} />}>
    <TopTab.Screen name="Active session" component={EmptyPage} />
    <TopTab.Screen name="Comming" component={ExpandableCalendarScreen} />
    <TopTab.Screen name="Canceled" component={TrainingsListScreen} />
  </TopTab.Navigator>
);

const EmptyPage = (): React.ReactElement => {
  return (
    <View style={styles.container}>
      <AlertIcon />
      <Text appearance="hint" category="h4">
        Comming soon!{' '}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
