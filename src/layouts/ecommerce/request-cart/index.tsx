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
import {reduxTutorActions, selectTutorsListData} from '../../../store/tutors';
import {ITutor, USER_TYPE} from '../../../interfaces/users.interface';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {IRequest, REQUEST_STATUS} from '../../../interfaces/request.interface';
import {acceptRequestApi, updateRequestStatusApi} from '../../../api/tutor';
import {Toast} from 'react-native-toast-notifications';

export default ({
  requestList,
  fetchMyRequests,
}: {
  navigation: NavigationProp<ParamListBase>;
  requestList: IRequest[];
  fetchMyRequests: any;
}): React.ReactElement => {
  const styles = useStyleSheet(themedStyle);
  const dispatch = useDispatch();

  const onRequestRespnse = async (
    status: REQUEST_STATUS,
    reqeust: IRequest,
  ) => {
    if (status == REQUEST_STATUS.ACCEPTED)
      await acceptRequestApi(reqeust._id).then(() => {
        Toast.show('Success', {type: 'success'});
        fetchMyRequests();
      });
    else {
      await updateRequestStatusApi(reqeust._id, status).then(() => {
        Toast.show('Success', {type: 'success'});
        fetchMyRequests();
      });
    }
  };

  const renderFooter = (): React.ReactElement => (
    <Layout style={styles.footer}>
      <Text>Total Request:</Text>
      <Text category="h5">{`${requestList.length}`}</Text>
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
        data={requestList || []}
        renderItem={renderProductItem}
        // ListFooterComponent={renderFooter}
        ListHeaderComponent={renderFooter}
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
