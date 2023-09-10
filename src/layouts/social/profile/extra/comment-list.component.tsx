import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  List,
  ListProps,
  Text,
  Modal,
} from '@ui-kitten/components';
import {HeartIcon, MessageCircleIcon, MoreHorizontalIcon} from './icons';
import {Comment} from './data';
import {RateBar} from './rate-bar.component';
import {IReview} from '../../../../interfaces/users.interface';
import moment from 'moment';
import {TrashIcon} from '../../../../components/icons';
import {useSelector} from 'react-redux';
import {selectUserData} from '../../../../store/users';

export type CommentItemProps = {item: IReview};

export const CommentItem = (props: CommentItemProps): React.ReactElement => {
  const [visible, setVisible] = React.useState<boolean>(false);
  const userData = useSelector(selectUserData);
  const toggleModal = (): void => {
    setVisible(!visible);
  };

  const handelRemoveReview = () => {
    // TODO: call remove review API
    toggleModal();
  };
  const renderCommentHeader = (comment: IReview): React.ReactElement => (
    <View style={styles.commentHeader}>
      <Avatar source={require('../../../../assets/img/student.png')} />
      <View style={styles.commentAuthorContainer}>
        <Text category="s2">{comment?.user?.name}</Text>
        <Text appearance="hint" category="c1">
          {moment(comment.createdDate).format('YYYY-MM-DD HH:MM')}
        </Text>
      </View>
      {userData._id == props.item.user?._id && (
        <Button
          onPress={toggleModal}
          style={styles.iconButton}
          appearance="ghost"
          status="basic"
          accessoryLeft={TrashIcon}
        />
      )}
    </View>
  );

  return (
    <Card
      style={styles.commentItem}
      header={() => renderCommentHeader(props.item)}>
      <RateBar
        style={styles.rateBar2}
        hint="Rated"
        value={props.item.rate}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onValueChange={() => {}}
      />
      <Text>{props.item.comment}</Text>

      <Modal
        backdropStyle={styles.backdrop}
        visible={visible}
        onBackdropPress={toggleModal}>
        <Card disabled={true}>
          <Text category="h5">Remove Review</Text>
          <Text>Are you sure you want remove your review?</Text>

          <Button
            style={styles.removeButton}
            status="danger"
            onPress={handelRemoveReview}>
            Remove
          </Button>
        </Card>
      </Modal>
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
  modelContainer: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  removeButton: {
    marginVertical: 10,
  },
});
