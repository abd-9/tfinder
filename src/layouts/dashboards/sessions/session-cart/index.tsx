import React from 'react';
import {ListRenderItemInfo} from 'react-native';
import {
  Layout,
  List,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import {RequestItem} from './extra/cart-item.component';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {Toast} from 'react-native-toast-notifications';
import {
  IRequest,
  REQUEST_STATUS,
} from '../../../../interfaces/request.interface';
import {acceptRequestApi, updateRequestStatusApi} from '../../../../api/tutor';
import {selectUserRequests} from '../../../../store/users';

export default ({}: {
  navigation: NavigationProp<ParamListBase>;
  requestList: IRequest[];
}): React.ReactElement => {
  const styles = useStyleSheet(themedStyle);
  const dispatch = useDispatch();
  const requestsList = useSelector(selectUserRequests);
  const onRequestRespnse = async (
    status: REQUEST_STATUS,
    reqeust: IRequest,
  ) => {
    if (status == REQUEST_STATUS.ACCEPTED)
      await acceptRequestApi(reqeust._id).then(() => {
        Toast.show('Success', {type: 'success'});
        // fetchMyRequests();
      });
    else {
      await updateRequestStatusApi(reqeust._id, status).then(() => {
        Toast.show('Success', {type: 'success'});
        // fetchMyRequests();
      });
    }
  };

  const renderFooter = (): React.ReactElement => (
    <Layout style={styles.footer}>
      <Text>Total Sessions:</Text>
      <Text category="h5">{`${requestsList?.length}`}</Text>
    </Layout>
  );

  const renderProductItem = (
    info: ListRenderItemInfo<IRequest>,
  ): React.ReactElement => (
    <RequestItem
      style={styles.item}
      index={info.index}
      item={info.item}
      onRequestResponse={onRequestRespnse}
    />
  );

  return (
    <Layout style={styles.container} level="2">
      <List
        data={requestsList || []}
        renderItem={renderProductItem}
        ListHeaderComponent={renderFooter}
      />
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
