/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/color';
import IconPlusGreen from '../../assets/images/IconPlusGreen.svg';
import IconPlusRed from '../../assets/images/IconPlusRed.svg';

export type ButtonProps = {
  onPress: () => void;
  title?: string;
  isRight?: boolean;
};

const ButtonAddComponent = ({ onPress, title, isRight }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={isRight ? stylesButtonAdd.buttonAdd2 : stylesButtonAdd.buttonAdd}
      onPress={onPress}>
      <View style={stylesButtonAdd.bodyButton}>
        {isRight ? (
          <>
            <IconPlusRed />
            <Text style={stylesButtonAdd.titleButton2}>{title}</Text>
          </>
        ) : (
          <>
            <IconPlusGreen />
            <Text style={stylesButtonAdd.titleButton}>{title}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
    // <TouchableOpacity style={stylesButtonAdd.buttonAdd2}>
    //   <View style={stylesButtonAdd.bodyButton}>
    //     <IconPlusRed />
    //     <Text style={stylesButtonAdd.titleButton2}>Expense</Text>
    //   </View>
    // </TouchableOpacity>
  );
};

const stylesButtonAdd = StyleSheet.create({
  root: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  titleButton: {
    color: COLORS.green,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
  },
  buttonAdd: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 0,
    borderWidth: 1,
    borderColor: COLORS.green,
    borderStyle: 'solid',
    flexDirection: 'row',
    padding: 8,
    borderRadius: 12,
  },
  bodyButton: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconlyRegularOutlinePlus2: {
    width: 24,
    height: 24,
  },
  titleButton2: {
    color: COLORS.red,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    width: 64,
  },
  buttonAdd2: {
    borderRadius: 12,
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.red,
    borderStyle: 'solid',
    flexDirection: 'row',
    padding: 8,
  },
  bodyButton2: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default ButtonAddComponent;
