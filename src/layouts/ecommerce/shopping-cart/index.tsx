import React from 'react';
import {ListRenderItemInfo} from 'react-native';
import {
  Button,
  Layout,
  List,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import {CartItem} from './extra/cart-item.component';
import {Product} from './extra/data';
import {useDispatch, useSelector} from 'react-redux';
import {reduxTutorActions, selectTutorsListData} from '../../../store/tutors';
import {ITutor, USER_TYPE} from '../../../interfaces/users.interface';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

export default ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}): React.ReactElement => {
  const styles = useStyleSheet(themedStyle);
  const TutorsListData = useSelector(selectTutorsListData);
  const dispatch = useDispatch();

  const onItemChange = (tutor: ITutor): void => {
    // navigation.setParams({})
    dispatch(reduxTutorActions.setSelectedTutor(tutor));
    navigation.navigate('Profile', {
      type: USER_TYPE.TUTOR,
      tutorId: tutor._id,
    });
  };

  const renderFooter = (): React.ReactElement => (
    <Layout style={styles.footer}>
      <Text category="h5">Total result:</Text>
      <Text category="h5">{`${TutorsListData.list.length}`}</Text>
    </Layout>
  );

  const renderProductItem = (
    info: ListRenderItemInfo<ITutor>,
  ): React.ReactElement => (
    <CartItem
      style={styles.item}
      index={info.index}
      tutor={info.item}
      onItemButtonPress={onItemChange}
    />
  );

  return (
    <Layout style={styles.container} level="2">
      <List
        data={TutorsListData.list || []}
        renderItem={renderProductItem}
        ListFooterComponent={renderFooter}
      />
      {/* <Button style={styles.checkoutButton} size="giant">
        CHECKOUT
      </Button> */}
    </Layout>
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: 'background-basic-color-3',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 0.5,
    paddingVertical: 28,
    paddingHorizontal: 16,
  },
  checkoutButton: {
    marginHorizontal: 16,
    marginVertical: 24,
  },
});
