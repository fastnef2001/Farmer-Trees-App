import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { COLORS } from '../../theme/color';

export type GeneralStatisticsProps = {
  totalExpense: number;
  totalIncome: number;
  totalProfit: number;
};
function formatCurrency(amount: number) {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

const GeneralStatistics = ({
  totalExpense,
  totalIncome,
  totalProfit,
}: GeneralStatisticsProps) => {
  const formatTotalIncome = formatCurrency(totalIncome);
  const formatTotalExpense = formatCurrency(totalExpense);
  const formatTotalProfit = formatCurrency(totalProfit);
  let colorProfit = COLORS.blue;
  let colorExpense = COLORS.red;

  let chartExpense = totalExpense;
  let chartProfit = totalProfit >= 0 ? totalProfit : 0;

  if (chartExpense === 0 && chartProfit === 0) {
    chartProfit = 1;
    chartExpense = 1;
    colorExpense = COLORS.grey;
    colorProfit = COLORS.grey;
  }
  const sliceColor = [colorProfit, colorExpense];
  const series = [chartProfit, chartExpense];
  return (
    <View style={stylesFrame.root}>
      <View style={stylesHeader.root}>
        <Text style={stylesHeader.generalStatistics}>General Statistics</Text>
        <Text style={stylesHeader.exportExcel}>Export excel</Text>
      </View>
      <View style={{ height: 16 }} />
      <View style={stylesBody.root}>
        <View style={stylesChart.container}>
          <PieChart
            widthAndHeight={130}
            series={series}
            sliceColor={sliceColor}
            coverRadius={0.45}
          />
        </View>
        <View style={stylesBody.note}>
          <View style={stylesBody.item}>
            <View style={stylesBody.expense}>
              <View style={stylesBody.redPoint} />
              <View style={{ width: 8 }} />
              <Text style={stylesBody.textItem}>Expense:</Text>
              <View style={{ width: 8 }} />
              <Text style={stylesBody.textPrice}>{formatTotalExpense}</Text>
            </View>
            <View style={{ height: 8 }} />
            <View style={stylesBody.expense}>
              <View style={stylesBody.bluePoint} />
              <View style={{ width: 8 }} />
              <Text style={stylesBody.textItem}>Profit:</Text>
              <View style={{ width: 8 }} />
              <Text style={stylesBody.textPrice}>{formatTotalProfit}</Text>
            </View>
          </View>
          <View style={{ height: 8 }} />
          <View style={stylesBody.income}>
            <Text style={stylesBody.textIncome}>Income:</Text>
            <Text style={stylesBody.textPriceIncome}>{formatTotalIncome}</Text>
          </View>
        </View>
      </View>
    </View>
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

export default GeneralStatistics;
