import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button, ListItem, ListItemProps, Text} from '@ui-kitten/components';
import {ITutor} from '../../../../interfaces/users.interface';
import {RateBar} from '../../../social/profile/extra/rate-bar.component';
import {calculateAverageRating} from './helper';

export type TutorItemProps = ListItemProps & {
  index: number;
  tutor: ITutor;
  onItemButtonPress: (tutor: ITutor) => void;
};

export const CartItem = (props: TutorItemProps): React.ReactElement => {
  const {style, tutor, index, onItemButtonPress, ...listItemProps} = props;

  const tutorRating = calculateAverageRating(tutor.reviews);
  const formateRateLabel = (): string => {
    const finalLabel = 'Rate ';
    if (tutor.reviews && tutor.reviews?.length > 0)
      finalLabel + `(${tutor.reviews?.length + 1})`;
    return finalLabel;
  };
  return (
    <ListItem
      {...listItemProps}
      onPress={() => onItemButtonPress(tutor)}
      style={[styles.container, style]}>
      <Image style={styles.image} source={require('../assets/teacher.png')} />
      <View style={styles.detailsContainer}>
        <Text category="s1">{tutor.user?.name}</Text>
        <Text appearance="hint" category="p2">
          {tutor.location}
        </Text>
        <Text category="s2">
          {tutor?.rate || 0 > 0 ? `Per hour: ${tutor.rate}` : ''}
        </Text>

        <Text style={styles.amount} category="s2">
          {`Subjects:`}
        </Text>
        <View style={styles.amountContainer}>
          {tutor.subjectsTaught?.map((_t, _index) => {
            return (
              <Button
                key={_index}
                style={[styles.iconButton, styles.amountButton]}
                size="tiny">
                {_t}
              </Button>
            );
          })}
        </View>

        <View style={styles.amountContainer}>
          <RateBar
            hint={formateRateLabel()}
            value={tutorRating}
            onValueChange={() => {}}
          />
        </View>
      </View>
      {/* <Button
        style={[styles.iconButton, styles.removeButton]}
        appearance="ghost"
        status="basic"
        accessoryLeft={CloseIcon}
        onPress={onRemoveButtonPress}
      /> */}
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
    width: 120,
    height: 144,
  },
  detailsContainer: {
    flex: 1,
    height: '100%',
    padding: 16,
  },
  amountContainer: {
    // position: 'absolute',
    flexDirection: 'row',
    // left: 16,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // bottom: 6,
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
