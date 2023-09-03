import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  List,
  ListProps,
  Text,
} from '@ui-kitten/components';
import {HeartIcon, MessageCircleIcon, MoreHorizontalIcon} from './icons';
import {Comment} from './data';
import {RateBar} from './rate-bar.component';

export type CommentItemProps = {item: Comment};

export const CommentItem = (props: CommentItemProps): React.ReactElement => {
  console.log('props', props);

  const renderCommentHeader = (comment: Comment): React.ReactElement => (
    <View style={styles.commentHeader}>
      <Avatar source={comment.author.photo} />
      <View style={styles.commentAuthorContainer}>
        <Text category="s2">{comment.author.fullName}</Text>
        <Text appearance="hint" category="c1">
          {comment.date}
        </Text>
      </View>
      <Button
        style={styles.iconButton}
        appearance="ghost"
        status="basic"
        accessoryLeft={MoreHorizontalIcon}
      />
    </View>
  );

  return (
    <Card
      style={styles.commentItem}
      header={() => renderCommentHeader(props.item)}>
      <RateBar
        style={styles.rateBar2}
        hint="Rated"
        value={4}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onValueChange={() => {}}
      />
      <Text>{props.item.text}</Text>
      <View style={styles.commentReactionsContainer}>
        <Button
          style={styles.iconButton}
          appearance="ghost"
          status="basic"
          accessoryLeft={MessageCircleIcon}>
          {`${props.item.comments.length}`}
        </Button>
        <Button
          style={styles.iconButton}
          appearance="ghost"
          status="danger"
          accessoryLeft={HeartIcon}>
          {`${props.item.likes.length}`}
        </Button>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  commentItem: {
    marginVertical: 4,
    marginHorizontal: 16,
  },
  commentHeader: {
    flexDirection: 'row',
    padding: 16,
  },
  commentAuthorContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  commentReactionsContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginHorizontal: -8,
    marginVertical: -8,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  rateBar2: {
    marginTop: -2,
    marginBottom: 6,
    marginLeft: -5,
  },
});
