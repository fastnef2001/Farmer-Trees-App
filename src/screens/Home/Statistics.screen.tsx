import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import GeneralStatistics from '../../components/Statistics/GeneralStatistics.component';
import HeaderComponent from '../../components/Header/Header.component';
import FilterComponent from '../../components/Statistics/Filter.component';
import { SafeAreaView } from 'react-native-safe-area-context';

const Statistics = ({ navigation }: any) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderComponent onPress={() => navigation.navigate('Profile')} />
      <ScrollView style={{ flex: 1 }}>
        <FilterComponent />
        <GeneralStatistics />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Statistics;
