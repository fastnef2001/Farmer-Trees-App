import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderTitle } from '../../components/Header/Header.component';

const IncomeHistory = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderTitle title="Income history" />
    </SafeAreaView>
  );
};

export default IncomeHistory;
