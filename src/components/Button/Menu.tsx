import React from 'react';
import { ButtonMenu } from './ButtonMenu';
import { StyleSheet, View } from 'react-native';

export const Menu = () => {
  return (
    <View style={styles.menu}>
      <ButtonMenu isPick={true} text="Your Farm" />
      <ButtonMenu isPick={false} text="Statistic" />
      <ButtonMenu isPick={false} text="Chat AI" />
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
  },
});
