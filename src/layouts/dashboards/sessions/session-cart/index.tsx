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
import {
  NavigationProp,
  ParamListBase,
  useRoute,
} from '@react-navigation/native';
import {Toast} from 'react-native-toast-notifications';
import {
  IRequest,
  ISession,
  REQUEST_STATUS,
  SESSION_STATUS,
} from '../../../../interfaces/request.interface';
import {updateSessionStatusApi} from '../../../../api/tutor';
import {selectUserRequests} from '../../../../store/users';
import {getMyRequetsApi} from '../../../../api/user';

export default ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
  requestList: IRequest[];
}): React.ReactElement => {
  const route = useRoute();

  const styles = useStyleSheet(themedStyle);
  const dispatch = useDispatch();

  const fetchMyRequests = async (
    requestStatus: REQUEST_STATUS = REQUEST_STATUS.ACCEPTED,
  ) => {
    await getMyRequetsApi(requestStatus, dispatch);
  };
  const requestsList = useSelector(selectUserRequests);

  const onCancelSession = async (status: SESSION_STATUS, session: ISession) => {
    await updateSessionStatusApi(session._id, status).then(() => {
      Toast.show('Success', {type: 'success'});
      fetchMyRequests();
    });
  };

  const renderProductItem = (
    info: ListRenderItemInfo<IRequest>,
  ): React.ReactElement => (
    <RequestItem
      style={styles.item}
      index={info.index}
      item={info.item}
      onRequestResponse={onCancelSession}
    />
  );
  const sessionsMap = () => {
    const combinedSessions: [any] = [];

    // Iterate through the requests
    requestsList.forEach(request => {
      // Extract the sessions for the current request
      const sessions = request.sessions || [];

      // Iterate through the sessions and add request details to each session
      sessions.forEach(session => {
        // Create an object to store the session with request details
        const sessionWithRequest: IRequest & ISession & any = {
          ...session,
          requestDetails: {
            _id: request._id,
            ...request,
          },
        };

        // Push the modified session to the combinedSessions array
        combinedSessions.push(sessionWithRequest);
      });
    });
    if (route.name == 'Canceled') {
      return combinedSessions.filter(_ => _.status == SESSION_STATUS.CANCELLED);
    }
    if (route.name == 'Comming') {
      return combinedSessions.filter(_ => _.status != SESSION_STATUS.CANCELLED);
    }

    return combinedSessions;
  };
  return (
    <Layout style={styles.container} level="2">
      <List
        data={sessionsMap() || []}
        renderItem={renderProductItem}
        // ListHeaderComponent={renderFooter}
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
