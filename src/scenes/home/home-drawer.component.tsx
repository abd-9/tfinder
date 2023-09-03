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
import {BookIcon, GithubIcon, PowerIcon} from '../../components/icons';
// import {SafeAreaLayout} from '../../components/safe-area-layout.component';
// import {WebBrowserService} from '../../services/web-browser.service';

export const HomeDrawer = ({navigation}): DrawerElement => {
  const [selectedIndex, setSelectedIndex] = useState<IndexPath>(null);

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
      title: 'Logout',
      icon: PowerIcon,
      onPress: () => {
        navigation.toggleDrawer();
        // TODO: do logout and redirect it back to login page
        navigation.navigate('Main');
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
          navigation.navigate('Profile');
        }}>
        <View style={styles.profileContainer}>
          <Avatar
            size="giant"
            source={require('../../assets/images/image-app-icon.png')}
          />
          <Text style={styles.profileName} category="h6">
            Abdalkareem Ataya
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
      {DATA.map((el, index) => (
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
