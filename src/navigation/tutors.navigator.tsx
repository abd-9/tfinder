import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {EcommerceScreen} from '../scenes/ecommerce/ecommerce.component';
import {EcommerceGridScreen} from '../scenes/ecommerce/ecommerce-grid.component';
import {EcommerceListScreen} from '../scenes/ecommerce/ecommerce-list.component';
import {AddNewCardScreen} from '../scenes/ecommerce/add-new-card.component';
import {ProductDetails1Screen} from '../scenes/ecommerce/product-details-1.component';
import {ProductDetails2Screen} from '../scenes/ecommerce/product-details-2.component';
import {ProductDetails3Screen} from '../scenes/ecommerce/product-details-3.component';
import {ProductDetails4Screen} from '../scenes/ecommerce/product-details-4.component';
import {PaymentScreen} from '../scenes/ecommerce/payment.component';
import {ProductListScreen} from '../scenes/ecommerce/product-list.component';
import {TutorsListScreen} from '../scenes/ecommerce/tutorList.component';
import {getTutorsByFilterApi} from '../api/tutor';
import {useDispatch} from 'react-redux';

const Stack = createStackNavigator();

export const FindTutorNavigator = (): React.ReactElement => {
  const dispatch = useDispatch();

  const fetchTutors = () => {
    getTutorsByFilterApi(dispatch);
  };
  useEffect(() => {
    fetchTutors();
  }, []);

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="TutorList" component={TutorsListScreen} />
      <Stack.Screen name="TutorFilter" component={AddNewCardScreen} />
    </Stack.Navigator>
  );
};
