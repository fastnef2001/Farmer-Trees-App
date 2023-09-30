import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderTitle } from '../../components/Header/Header.component';

const ExpenseHistory = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderTitle title="Expense history" />
    </SafeAreaView>
  );
};

export default ExpenseHistory;
