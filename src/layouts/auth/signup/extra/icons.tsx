import React from 'react';
import {ImageStyle} from 'react-native';
import {Avatar, Icon, IconElement} from '@ui-kitten/components';

import StudentPng from '../assets/student-icon.svg';
export const EmailIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="email" />
);

export const PhoneIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="phone" />
);

export const PersonIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="person" />
);

export const PlusIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="plus" />
);
export const StudentIcon = (style: ImageStyle): IconElement => (
  <Avatar source={require('../assets/student.png')} />
);
export const TutorIcon = (style: ImageStyle): IconElement => (
  <Avatar source={require('../assets/teacher.png')} />
);
