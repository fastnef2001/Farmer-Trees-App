/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-dupe-keys */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import IconSignUp from '../../assets/images/IconSignUp.svg';
import IconBackSmall from '../../assets/images/IconBackSmall.svg';
import IconDelete36 from '../../assets/images/IconDelete36.svg';
import IconDelete24 from '../../assets/images/IconDelete24.svg';

export type ButtonProps = {
  title: string;
  isRight: boolean;
  isDelete: boolean;
  onPress: () => void;
};

export const ButtonBack = ({ isRight, title, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={isRight ? styles.button : styles.buttonLeft}
      onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          // tôi muốn hai cái icon và text nằm trên cùng một hàng và cách nhau 4px
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <IconBackSmall />
        <View style={{ width: 4 }} />
        <Text style={isRight ? styles.text : styles.textLeft}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
export const ButtonLogin = ({ isRight, title, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={isRight ? styles.button : styles.buttonLeft}
      onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          // tôi muốn hai cái icon và text nằm trên cùng một hàng và cách nhau 4px
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <IconSignUp />
        <View style={{ width: 4 }} />
        <Text style={isRight ? styles.text : styles.textLeft}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
export const ButtonDelete = ({ isDelete, title, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={isDelete ? styles.buttonRed : styles.buttonLeft}
      onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <IconDelete24 />
        <View style={{ width: 4 }} />
        <Text style={isDelete ? styles.text : styles.textLeft}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#163859',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    height: 48,
    flex: 1,
  },
  buttonRed: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FF0000',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    height: 48,
    flex: 1,
  },
  buttonLeft: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#163859',
    borderStyle: 'solid',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    height: 48,
    flex: 1,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    height: '100%',
    fontFamily: 'Nunito-Bold',
  },
  textLeft: {
    color: '#163859',
    fontSize: 16,
    height: '100%',
    fontFamily: 'Nunito-Bold',
  },
});
