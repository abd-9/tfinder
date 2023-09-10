import React from 'react';
import {ImageStyle} from 'react-native';
import {Icon, IconElement} from '@ui-kitten/components';
import AlertSvg from '../assets/alert-triangle.svg';
import GlobalSVG from '../assets/globe-outline.svg';

export const ClockIcon = (style: ImageStyle): IconElement => (
  <Icon {...style} name="clock" />
);

export const AlertIcon = (style: ImageStyle): IconElement => (
  <AlertSvg width={30} height={30} color="gray" fill="gray" />
);
export const GlobalIcon = (style: ImageStyle): IconElement => (
  <GlobalSVG width={30} height={30} color="" fill="gray" />
);
