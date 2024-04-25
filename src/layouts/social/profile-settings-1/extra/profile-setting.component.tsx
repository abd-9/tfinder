import React from 'react';
import {StyleSheet} from 'react-native';
import {Divider, Layout, Text, LayoutProps, Input} from '@ui-kitten/components';
import {FormikProps} from 'formik';
import {IStudent, ITutor, IUser} from '../../../../interfaces/users.interface';

export interface ProfileSettingProps extends LayoutProps {
  hint: string;
  name: string;
  formik: any | FormikProps<IUser & IStudent & ITutor>;
}

export const ProfileSetting = (
  props: ProfileSettingProps,
): React.ReactElement => {
  const {style, hint, name, formik, ...layoutProps} = props;

  return (
    <React.Fragment>
      <Layout level="1" {...layoutProps} style={[styles.container, style]}>
        <Text appearance="hint" category="s1">
          {hint}
        </Text>
        {/* <Text category="s1">{value}</Text> */}

        <Input
          style={{width: '70%'}}
          placeholder={hint}
          onChangeText={formik.handleChange(name)}
          onBlur={formik.handleBlur(name)}
          value={formik.values[name]}
          status={
            formik.touched[name] && formik.errors[name] ? 'danger' : 'basic'
          }
        />
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
