import React from 'react';
import {
  Alert,
  ImageBackground,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Layout,
  List,
  Tab,
  TabBar,
  TabView,
  Text,
} from '@ui-kitten/components';
import {ProfileSocial} from './extra/profile-social.component';
import {HeartIcon} from './extra/icons';
import {Post, Profile} from './extra/data';
import {RateBar} from './extra/rate-bar.component';

const profile: Profile = Profile.jenniferGreen();

const posts: Post[] = [Post.byJenniferGreen(), Post.byAlexaTenorio()];
export default ({navigation}): React.ReactElement => {
  const onFollowButtonPress = (): void => {
    navigation && navigation.goBack();
  };
  const [selectedTabIndex, setSelectedTabIndex] = React.useState<number>(0);

  const renderItemHeader = (
    info: ListRenderItemInfo<Post>,
  ): React.ReactElement => {
    return (
      <View style={styles.postHeader}>
        <Avatar source={info.item.author.photo} />
        <View style={styles.postAuthorContainer}>
          <Text category="s2">{info.item.author.fullName}</Text>
          <Text appearance="hint" category="c1">
            {info.item.date}
          </Text>
          <RateBar
            style={styles.rateBar2}
            hint=""
            value={4}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onValueChange={() => {}}
          />
        </View>
      </View>
    );
  };

  const renderItem = (info: ListRenderItemInfo<Post>): React.ReactElement => {
    if (selectedTabIndex == 0) return <UserExperiance />;
    return (
      <Card style={styles.post} header={() => renderItemHeader(info)}>
        <View style={styles.postBody}>
          <Text category="s2">The session was wonderful</Text>
        </View>
      </Card>
    );
  };

  const renderHeader = (): React.ReactElement => {
    const [rating, setRating] = React.useState<number>(4);

    return (
      <Layout style={styles.header} level="1">
        <Avatar
          style={styles.profileAvatar}
          size="large"
          source={profile.photo}
        />
        <View style={styles.profileDetailsContainer}>
          <Text category="h4">{profile.fullName}</Text>
          <Text appearance="hint" category="s1">
            {profile.location}
          </Text>
          <RateBar
            style={styles.rateBar}
            hint="Experience"
            value={rating}
            onValueChange={setRating}
          />
          <View style={styles.profileSocialsContainer}>
            <ProfileSocial
              style={styles.profileSocialContainer}
              hint="Followers"
              value={`${profile.followers}`}
            />
            <ProfileSocial
              style={styles.profileSocialContainer}
              hint="Following"
              value={`${profile.following}`}
            />
            <ProfileSocial
              style={styles.profileSocialContainer}
              hint="Posts"
              value={`${profile.posts}`}
            />
          </View>
          <View style={styles.buttons}>
            <TabBar
              onSelect={_index => setSelectedTabIndex(_index)}
              selectedIndex={selectedTabIndex}>
              <Tab title="Info" />
              <Tab title="Review" />
            </TabBar>
          </View>
        </View>
      </Layout>
    );
  };

  return (
    <View style={{flex: 1}}>
      <List
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={selectedTabIndex == 0 ? [{}] : posts} // if the tab is user info then we have to add only one item to avoid repeating the element
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: -16,
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 8,
  },
  profileAvatar: {
    marginHorizontal: 8,
  },
  profileDetailsContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  profileSocialsContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  profileSocialContainer: {
    flex: 1,
  },
  followButton: {
    marginVertical: 16,
  },
  post: {
    margin: 8,
  },
  postHeader: {
    flexDirection: 'row',
    margin: 8,
  },
  postBody: {
    flexDirection: 'row',
    marginHorizontal: -8,
  },
  postAuthorContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  iconButton: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 0,
  },
  rateBar: {
    marginTop: 24,
  },
  rateBar2: {
    marginTop: 8,
    marginLeft: -10,
  },
  tabView: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: 'transparent',
  },
  tabViewIndicator: {
    backgroundColor: 'text-control-color',
  },
  buttons: {
    // flex: 1,
    // justifyContent: 'space-around',
    // flexDirection: 'row',
    marginTop: 16,
  },
  tabTitle: {
    color: 'text-control-color',
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    textAlign: 'center',
  },
  tabContentContainer: {
    padding: 16,
  },
});

const UserExperiance = (): React.ReactElement => {
  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
      }}>
      {/* // TODO: build exoeriances section design for the tutor like year of exp, his certificates   */}
      <Text category="h5">Tutro Experiances </Text>
    </Layout>
  );
};
