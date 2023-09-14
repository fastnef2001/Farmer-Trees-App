/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/color';
import IconPlusGreen from '../../assets/images/IconPlusGreen.svg';
import IconPlusRed from '../../assets/images/IconPlusRed.svg';

const ButtonAddComponent = () => {
  return (
    <View style={stylesButtonAdd.root}>
      <TouchableOpacity style={stylesButtonAdd.buttonAdd}>
        <View style={stylesButtonAdd.bodyButton}>
          <IconPlusGreen />
          <Text style={stylesButtonAdd.titleButton}>Icome</Text>
        </View>
      </TouchableOpacity>
      <View style={{ width: 16 }} />
      <TouchableOpacity style={stylesButtonAdd.buttonAdd2}>
        <View style={stylesButtonAdd.bodyButton}>
          <IconPlusRed />
          <Text style={stylesButtonAdd.titleButton2}>Expense</Text>
        </View>
      </TouchableOpacity>
    </View>
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
    width: 24, // theme.colors.24rem to 24px
    height: 24, // theme.colors.24rem to 24px
  },
  titleButton2: {
    color: COLORS.red,
    fontFamily: 'Nunito',
    fontSize: 14, // 14rem to 14px
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 20, // Adjust line height accordingly
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
