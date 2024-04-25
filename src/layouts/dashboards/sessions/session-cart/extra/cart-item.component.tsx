import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button, ListItem, ListItemProps, Text} from '@ui-kitten/components';

import moment from 'moment';
import {CloseIcon, PlusIcon} from './icons';
import {useSelector} from 'react-redux';
import {selectUserData} from '../../../../../store/users';
import {
  IRequest,
  ISession,
  REQUEST_STATUS,
  SESSION_STATUS,
} from '../../../../../interfaces/request.interface';
import {RepetitionOptions} from '../../../../social/profile';

export type TutorItemProps = ListItemProps & {
  index: number;
  item: any;
  onRequestResponse: (status: SESSION_STATUS, session: ISession) => void;
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
      {/* <Image
        style={styles.image}
        // source={require('../../../../assets/img/student.png')}
      /> */}
      <View style={styles.detailsContainer}>
        <Text style={{marginVertical: 5}} category="s1">
          {item.requestDetails?.student?.user?.name}
        </Text>
        <View>
          <Text style={{marginVertical: 5}} appearance="hint" category="p2">
            {item.requestDetails?.note && `Note: ${item.requestDetails.note}`}
          </Text>
          <Text style={{marginVertical: 5}} appearance="hint" category="p2">
            {renderFormatDate}
          </Text>
        </View>
        <Text style={{marginVertical: 5}} category="s2">
          Teaching Level: {item.requestDetails?.teachLevel}
        </Text>
        {item.requestDetails?.subjectsTaught &&
          item.requestDetails?.subjectsTaught?.length > 0 && (
            <>
              <Text style={styles.amount} category="s2">
                {`Subjects:`}
              </Text>
              <View style={styles.amountContainer}>
                {item.requestDetails?.subjectsTaught?.map((_t, _index) => {
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

        {item.status == SESSION_STATUS.PENDING && (
          <View style={styles.actionsButtons}>
            <Button
              style={[styles.iconButton, styles.amountButton]}
              size="small"
              status="danger"
              accessoryLeft={CloseIcon}
              onPress={() => onRequestResponse(SESSION_STATUS.CANCELLED, item)}>
              Cancel
            </Button>
            {userData.tutorId && (
              <Button
                style={[styles.iconButton, styles.amountButton]}
                size="small"
                status="success"
                onPress={() =>
                  onRequestResponse(SESSION_STATUS.COMPLETED, item)
                }>
                Compelet
              </Button>
            )}
          </View>
        )}
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
