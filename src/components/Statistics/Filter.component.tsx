import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import IconDrop from '../../assets/images/IconDrop.svg';
import { COLORS } from '../../theme/color';

const FilterComponent = () => {
  return (
    <TouchableOpacity style={stylesFilter.frame}>
      <View style={stylesFilter.body}>
        <View style={stylesFilter.date}>
          <Text style={stylesFilter.dateText}>21/07/2023</Text>
          <View style={{ width: 8 }} />
          <Text style={stylesFilter.dateText}>-</Text>
          <View style={{ width: 8 }} />
          <Text style={stylesFilter.dateText}>23/07/2023</Text>
        </View>
        <IconDrop />
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
  frame: {
    marginTop: 16,
    width: '90%',
    height: 48,
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 12,
    borderColor: COLORS.blue,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignSelf: 'center',
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
