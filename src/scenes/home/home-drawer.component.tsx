import React, {ReactElement, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {
  Avatar,
  Divider,
  Drawer,
  DrawerItem,
  DrawerElement,
  Layout,
  Text,
  IndexPath,
} from '@ui-kitten/components';
import {
  BookIcon,
  GithubIcon,
  PowerIcon,
  SearchIcon,
} from '../../components/icons';
import {reduxUserActions, selectUserData} from '../../store/users';
import {logout} from '../../api/auth';
import {useDispatch, useSelector} from 'react-redux';
import {USER_TYPE} from '../../interfaces/users.interface';
// import {SafeAreaLayout} from '../../components/safe-area-layout.component';
// import {WebBrowserService} from '../../services/web-browser.service';

export const HomeDrawer = ({navigation}): DrawerElement => {
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(null);
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);

  const DATA = [
    {
      title: 'My Sessions',
      icon: GithubIcon,
      onPress: () => {
        navigation.toggleDrawer();
        navigation.navigate('Main');
      },
    },
    {
      title: 'Find Tutro',
      icon: SearchIcon,
      onPress: () => {
        navigation.toggleDrawer();
        navigation.navigate('FindTutor');
      },
      hide: Boolean(userData.tutorId),
    },
    {
      title: 'My Requests',
      icon: SearchIcon,
      onPress: () => {
        navigation.toggleDrawer();
        navigation.navigate('Request');
      },
    },
    {
      title: 'Logout',
      icon: PowerIcon,
      onPress: () => {
        navigation.toggleDrawer();
        logout(dispatch);
        navigation.navigate('Auth');
      },
    },
    // {
    //   title: 'Documentation',
    //   icon: BookIcon,
    //   onPress: () => {
    //     WebBrowserService.openBrowserAsync(
    //       'https://akveo.github.io/react-native-ui-kitten',
    //     );
    //     navigation.toggleDrawer();
    //   },
    // },
  ];

  const renderHeader = (): ReactElement => (
    // <SafeAreaLayout insets="top" level="2">
    <Layout style={styles.header} level="2">
      <Pressable
        onPress={() => {
          navigation.toggleDrawer();
          navigation.navigate('ProfileSettings');
        }}>
        <View style={styles.profileContainer}>
          <Avatar
            size="giant"
            source={
              userData.type == USER_TYPE.TUTOR
                ? require('../../assets/img/teacher.png')
                : require('../../assets/img/student.png')
            }
          />
          <Text style={styles.profileName} category="h6">
            {userData.name}
          </Text>
        </View>
      </Pressable>
    </Layout>
    // </SafeAreaLayout>
  );

  const renderFooter = () => (
    // <SafeAreaLayout insets="bottom">
    <React.Fragment>
      <Divider />
      <View style={styles.footer}>
        <Text>{`Version 1`}</Text>
      </View>
    </React.Fragment>
    // </SafeAreaLayout>
  );

  return (
    <Drawer
      header={renderHeader}
      footer={renderFooter}
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      {DATA.filter(_i => !_i.hide).map((el, index) => (
        <DrawerItem
          key={index}
          title={el.title}
          onPress={el.onPress}
          accessoryLeft={el.icon}
        />
      ))}
    </Drawer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    height: 128,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileName: {
    marginHorizontal: 16,
  },
});
