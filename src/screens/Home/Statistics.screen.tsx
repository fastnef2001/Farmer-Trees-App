import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { COLORS } from '../../theme/color';
import GeneralStatistics from '../../components/Statistics/GeneralStatistics.component';
import HeaderComponent from '../../components/Header/Header.component';
import { SafeAreaView } from 'react-native-safe-area-context';

const Statistics = ({ navigation }: any) => {
  const widthAndHeight = 130;
  const series = [30, 70];
  const sliceColor = [COLORS.blue, COLORS.red];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderComponent onPress={() => navigation.navigate('Profile')} />
      <ScrollView style={{ flex: 1 }}>
        <GeneralStatistics />
      </ScrollView>
    </SafeAreaView>
  );
};

const stylesChart = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
});

const stylesHeader = StyleSheet.create({
  root: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  generalStatistics: {
    color: COLORS.blue,
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    lineHeight: 20,
  },
  exportExcel: {
    color: COLORS.blue,
    textAlign: 'right',
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
  },
});

const stylesBody = StyleSheet.create({
  root: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  redPoint: {
    width: 10,
    height: 10,
    backgroundColor: COLORS.red,
    borderRadius: 8,
  },
  textItem: {
    color: COLORS.text2,
    fontFamily: 'Nunito-Reguler',
    fontSize: 14,
    width: 66,
  },
  textPrice: {
    color: COLORS.blue,
    textAlign: 'right',
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    width: 80,
  },
  note: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginVertical: 8,
  },
  item: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginVertical: 8,
    width: 172,
  },
  expense: {
    width: 172,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS.grey,
    justifyContent: 'space-between',
  },
  bluePoint: {
    width: 10,
    height: 10,
    backgroundColor: COLORS.blue,
    borderRadius: 8,
  },
  textIncome: {
    color: COLORS.text1,
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    lineHeight: 16,
  },
  textPriceIncome: {
    color: COLORS.green,
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
  },
  income: {
    width: 172,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS.grey,
  },
});

const stylesFrame = StyleSheet.create({
  root: {
    borderRadius: 12,
    alignSelf: 'center',
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginVertical: 16,
    backgroundColor: 'white',
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    padding: 16,
  },
});

export default Statistics;
