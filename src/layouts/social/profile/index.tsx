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
  Input,
  Layout,
  List,
  Modal,
  Tab,
  TabBar,
  Text,
} from '@ui-kitten/components';
import {ProfileSocial} from './extra/profile-social.component';
import {HeartIcon} from './extra/icons';
import {Comment, Post, Profile} from './extra/data';
import {RateBar} from './extra/rate-bar.component';
import {CommentItem} from './extra/comment-list.component';
import {Article} from '../../articles/article-3/extra/data';

const profile: Profile = Profile.jenniferGreen();

const comments: Comment[] = [
  Comment.byHubertFranck(),
  Comment.byHubertFranck(),
];
export default ({navigation}): React.ReactElement => {
  const [selectedTabIndex, setSelectedTabIndex] = React.useState<number>(0);
  const [visible, setVisible] = React.useState<boolean>(false);
  const toggleModal = (): void => {
    setVisible(!visible);
  };

  const onFollowButtonPress = (): void => {
    toggleModal();
  };
  const renderItem = (
    info: ListRenderItemInfo<Comment>,
  ): React.ReactElement => {
    if (selectedTabIndex == 0) return <UserExperiance />;
    return <CommentItem item={info.item} />;
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
          <Button style={styles.followButton} onPress={onFollowButtonPress}>
            FOLLOW
          </Button>
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
  const [rating, setRating] = React.useState<number>(3);

  return (
    <View style={{flex: 1}}>
      <List
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={selectedTabIndex == 0 ? [{}] : comments} // if the tab is user info then we have to add only one item to avoid repeating the element
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
      />
      <Modal
        backdropStyle={styles.backdrop}
        visible={visible}
        onBackdropPress={toggleModal}>
        <Card disabled={true}>
          <Text category="h4">Write your review!</Text>
          <View style={styles.formContainer}>
            <RateBar
              style={styles.rateBar}
              hint="Experience"
              value={rating}
              onValueChange={setRating}
            />
            <Input
              style={{marginTop: 10}}
              // label="Your review"
              placeholder="Type a review "
              // status="control"
              // value={email}
              // onChangeText={setEmail}
            />
          </View>
          <Button onPress={toggleModal}>Rate</Button>
        </Card>
      </Modal>
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
  formContainer: {
    flex: 1,
    marginBottom: 16,
    marginTop: 0,
    culomnGap: 2,
    flexDirection: 'column',
    gap: 10,
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
  modelContainer: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
