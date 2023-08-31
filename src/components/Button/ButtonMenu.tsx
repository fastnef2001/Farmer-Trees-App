/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-dupe-keys */
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export type ButtonProps = {
  text: string;
  isPick: boolean;
  onPress?: () => void;
};

export const ButtonMenu = ({ isPick, text, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={isPick ? styles.rootPick : styles.root}
      // nhấn vào để đổi style isPick
      onPress={onPress}>
      <Text style={isPick ? styles.textPick : styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rootPick: {
    width: 109,
    height: 40,
    flexShrink: 0,
    borderBottomWidth: 3,
    borderBottomColor: '#163859',
  },
  root: {
    width: 109,
    height: 40,
  },
  textPick: {
    color: '#163859',
    textAlign: 'center',
    fontFamily: 'Nunito',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    width: '100%',
    height: '100%',
    textAlignVertical: 'center',
  },
  text: {
    fontFamily: 'Nunito',
    fontSize: 16,
    fontWeight: '600', // Sử dụng giá trị chuỗi cho fontWeight
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: 'center',
    width: '100%',
    height: '100%',
    textAlignVertical: 'center',
    color: '#636366',
  },
});
