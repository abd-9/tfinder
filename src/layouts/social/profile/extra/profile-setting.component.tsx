import React from 'react';
import {StyleSheet} from 'react-native';
import {Divider, Layout, Text, LayoutProps, Input} from '@ui-kitten/components';

export interface ProfileSettingProps extends LayoutProps {
  hint: string;
  value?: any;
}

export const ProfileSetting = (
  props: ProfileSettingProps,
): React.ReactElement => {
  const {style, hint, value, ...layoutProps} = props;

  return (
    <React.Fragment>
      <Layout level="1" {...layoutProps} style={[styles.container, style]}>
        <Text appearance="hint" category="s1">
          {hint}
        </Text>
        {props.children || <Text category="s1">{value}</Text>}
      </Layout>
      <Divider />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
