import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button, ListItem, ListItemProps, Text} from '@ui-kitten/components';
import {ITutor} from '../../../../interfaces/users.interface';
import {RateBar} from '../../../social/profile/extra/rate-bar.component';
import {calculateAverageRating} from './helper';
import {
  IRequest,
  REQUEST_STATUS,
} from '../../../../interfaces/request.interface';
import {RepetitionOptions} from '../../../social/profile';
import moment from 'moment';
import {CloseIcon, PlusIcon} from './icons';
import {useSelector} from 'react-redux';
import {selectUserData} from '../../../../store/users';

export type TutorItemProps = ListItemProps & {
  index: number;
  item: IRequest;
  onRequestResponse: (status: REQUEST_STATUS, reqeust: IRequest) => void;
};

export const RequestItem = (props: TutorItemProps): React.ReactElement => {
  const {style, item, index, onRequestResponse, ...listItemProps} = props;
  const userData = useSelector(selectUserData);

  // const tutorRating = calculateAverageRating(tutor.reviews);
  // const formateRateLabel = (): string => {
  //   const finalLabel = 'Rate ';
  //   if (tutor.reviews && tutor.reviews?.length > 0)
  //     finalLabel + `(${tutor.reviews?.length + 1})`;
  //   return finalLabel;
  // };
  const renderFormatDate = `Start: ${moment(item.startDateTime).format(
    'YYYY/DD/MM HH:MM',
  )} - End: ${moment(item.startDateTime).format('YYYY/DD/MM HH:MM')} `;
  return (
    <ListItem
      {...listItemProps}
      // onPress={() => onRequestResponse(tutor)}
      style={[styles.container, style]}>
      <Image
        style={styles.image}
        source={require('../../../../assets/img/student.png')}
      />
      <View style={styles.detailsContainer}>
        <Text category="s1">{item.student?.user?.name}</Text>
        <View>
          <Text appearance="hint" category="p2">
            {RepetitionOptions.find(_r => item.repetition == _r.value)?.name}
          </Text>
          <Text appearance="hint" category="p2">
            {renderFormatDate}
          </Text>
        </View>
        <Text category="s2">{item.teachLevel}</Text>
        {item.subjectsTaught && item.subjectsTaught?.length > 0 && (
          <>
            <Text style={styles.amount} category="s2">
              {`Subjects:`}
            </Text>
            <View style={styles.amountContainer}>
              {item.subjectsTaught?.map((_t, _index) => {
                return (
                  <Button
                    key={_index}
                    status="basic"
                    style={[styles.iconButton, styles.amountButton]}
                    size="tiny">
                    {_t}
                  </Button>
                );
              })}
            </View>
          </>
        )}

        <View style={styles.actionsButtons}>
          <Button
            style={[styles.iconButton, styles.amountButton]}
            size="small"
            status="danger"
            accessoryLeft={CloseIcon}
            onPress={() => onRequestResponse(REQUEST_STATUS.REJECTED, item)}>
            {userData.tutorId ? 'Reject' : 'Cancel'}
          </Button>
          {userData.tutorId && (
            <Button
              style={[styles.iconButton, styles.amountButton]}
              size="small"
              status="success"
              accessoryLeft={PlusIcon}
              onPress={() => onRequestResponse(REQUEST_STATUS.ACCEPTED, item)}>
              Accept
            </Button>
          )}
        </View>
      </View>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  image: {
    width: 100,
    height: 124,
  },
  detailsContainer: {
    flex: 1,
    height: '100%',
    padding: 16,
  },
  amountContainer: {
    flexDirection: 'row',

    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  actionsButtons: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  amountButton: {
    borderRadius: 16,
    margin: 2,
  },
  amount: {
    textAlign: 'left',
    width: 60,
  },
  removeButton: {
    position: 'absolute',
    right: 0,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});
