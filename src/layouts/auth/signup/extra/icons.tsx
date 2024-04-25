import React from 'react';
import {ImageStyle} from 'react-native';
import {Avatar, Icon, IconElement} from '@ui-kitten/components';
import SVGImg from '../assets/student-s.svg';
import TeacherIcon from '../assets/teache.svg';

export const EmailIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="email" />
);

export const PersonIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="person" />
);

export const PlusIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="plus" />
);

export const StudentIcon = (style: ImageStyle): IconElement => (
  <SVGImg width={50} height={50} />
);
export const TutorIcon = (style: ImageStyle): IconElement => (
  <TeacherIcon width={50} height={50} />
);
