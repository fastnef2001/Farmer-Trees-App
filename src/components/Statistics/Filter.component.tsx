import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import IconDrop from '../../assets/images/IconDrop.svg';
import IconCalendar from '../../assets/images/IconCalendar.svg';
import { COLORS } from '../../theme/color';

export type ButtonProps = {
  onPress: () => void;
  titleDate?: string;
  isRight?: boolean;
};

const FilterComponent = ({ onPress, titleDate, isRight }: ButtonProps) => {
  return (
    <TouchableOpacity style={stylesFilter.frame} onPress={onPress}>
      <View style={stylesFilter.body}>
        <View style={stylesFilter.date}>
          {titleDate ? (
            <Text style={stylesFilter.dateText}>{titleDate}</Text>
          ) : isRight ? (
            <Text style={stylesFilter.dateText1}>Start date</Text>
          ) : (
            <Text style={stylesFilter.dateText1}>End date</Text>
          )}
        </View>
        <IconCalendar />
      </View>
    </TouchableOpacity>
  );
};

const stylesFilter = StyleSheet.create({
  root: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dateText: {
    color: COLORS.text1,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
  },
  dateText1: {
    color: COLORS.text2,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
  },
  frame: {
    height: 48,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderColor: COLORS.blue,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignSelf: 'center',
    flex: 1,
  },
  body: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  date: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default FilterComponent;
