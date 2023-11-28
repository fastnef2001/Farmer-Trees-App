import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/color';
import IconDetailBold from '../../assets/images/IconDetailBold.svg';
import Detail from '../../assets/images/Detail.svg';
import {
  DataExpenseInterface,
  DataIncomeInterface,
} from '../../Interface/Interface';
import LottieView from 'lottie-react-native';

export type HistoryProps = {
  dataIncome: DataIncomeInterface[];
  dataExpense: DataExpenseInterface[];
  title: string;
  isIncome: boolean;
  handlePress: () => void;
  handlePressDetail: (key?: string, title?: string) => void;
  handleExportExcel?: () => void;
};

export const HistoryComponent = ({
  dataExpense,
  dataIncome,
  title,
  isIncome,
  handlePress,
  handlePressDetail,
  handleExportExcel,
}: HistoryProps) => {
  let data = isIncome ? dataIncome : dataExpense;
  data = data.slice(0, 5);

  return (
    <View style={isIncome ? stylesHistory.root : stylesHistory.root1}>
      <View style={stylesHeader.root}>
        <Text style={stylesHeader.generalStatistics}>{title}</Text>
        <TouchableOpacity onPress={handleExportExcel}>
          <Text style={stylesHeader.exportExcel}>Export excel</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 16 }} />
      {data.length > 0 ? (
        <>
          {data.map((item: any) => (
            <TouchableOpacity
              style={stylesItem.root}
              onPress={() => handlePressDetail(item.key, title)}>
              <View style={isIncome ? stylesDate.root : stylesDate.root1}>
                <Text style={stylesDate.tileMonth}>{item.month}</Text>
                <Text style={stylesDate.tileDate}>{item.day}</Text>
              </View>
              <View style={{ width: 6 }} />
              <View style={stylesBody.root}>
                {isIncome ? (
                  <Text style={stylesBody.titleNameTree}>{item.tree}</Text>
                ) : (
                  <Text style={stylesBody.titleNameTree}>{item.costType}</Text>
                )}
                <View style={{ height: 0 }} />
                <View style={stylesContent.root}>
                  {isIncome ? (
                    <Text style={stylesContent.titleQuantity}>
                      {item.quantity} {item.unit}
                    </Text>
                  ) : (
                    <Text style={stylesContent.titleQuantity}>
                      {item.quantity} {item.unit}
                    </Text>
                  )}
                  <Text
                    style={
                      isIncome
                        ? stylesContent.titlePrice
                        : stylesContent.titlePrice1
                    }>
                    {item.totalPrice}$
                  </Text>
                </View>
              </View>
              <View style={{ width: 24 }} />
              <Detail />
            </TouchableOpacity>
          ))}
        </>
      ) : (
        <LottieView
          style={{ width: 100, height: 100, alignSelf: 'center' }}
          source={require('../../assets/animations/Empty.json')}
          autoPlay
          loop
        />
      )}

      <View style={{ height: 16 }} />
      <TouchableOpacity style={stylesFooter.root} onPress={handlePress}>
        <Text style={stylesFooter.title}>See more</Text>
        <IconDetailBold />
      </TouchableOpacity>
    </View>
  );
};

export const HistoryElemment = ({
  title,
  dataExpense,
  dataIncome,
  isIncome,
  handlePressDetail,
}: HistoryProps) => {
  // nếu là income thì lấy dataIncome, ngược lại lấy dataExpense
  const data = isIncome ? dataIncome : dataExpense;

  return (
    <>
      {data.map((item: any) => (
        <TouchableOpacity
          style={stylesItem.root}
          onPress={() => handlePressDetail(item.key, title)}>
          <View style={isIncome ? stylesDate.root : stylesDate.root1}>
            <Text style={stylesDate.tileMonth}>{item.month}</Text>
            <Text style={stylesDate.tileDate}>{item.day}</Text>
          </View>
          <View style={{ width: 6 }} />
          <View style={stylesBody.root}>
            {isIncome ? (
              <Text style={stylesBody.titleNameTree}>{item.tree}</Text>
            ) : (
              <Text style={stylesBody.titleNameTree}>{item.costType}</Text>
            )}
            <View style={{ height: 0 }} />
            <View style={stylesContent.root}>
              {isIncome ? (
                <Text style={stylesContent.titleQuantity}>
                  {item.quantityInKilograms} kg
                </Text>
              ) : (
                <Text style={stylesContent.titleQuantity}>
                  {item.quantity} {item.unit}
                </Text>
              )}
              <Text
                style={
                  isIncome
                    ? stylesContent.titlePrice
                    : stylesContent.titlePrice1
                }>
                {item.totalPrice}$
              </Text>
            </View>
          </View>
          <View style={{ width: 24 }} />
          <Detail />
        </TouchableOpacity>
      ))}
    </>
  );
};

const stylesHistory = StyleSheet.create({
  root: {
    borderRadius: 12,
    alignSelf: 'center',
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: COLORS.white,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  root1: {
    borderRadius: 12,
    alignSelf: 'center',
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: COLORS.white,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    padding: 16,
    marginTop: 16,
    marginBottom: 32,
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
const stylesDate = StyleSheet.create({
  root: {
    width: 42,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: COLORS.green,
    borderRadius: 12,
    justifyContent: 'center',
    padding: 4,
  },
  root1: {
    width: 42,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: COLORS.red,
    borderRadius: 12,
    justifyContent: 'center',
    padding: 4,
  },
  tileMonth: {
    color: COLORS.white,
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: 0.36,
  },
  tileDate: {
    textAlignVertical: 'center',
    color: COLORS.white,
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    letterSpacing: 0.48,
  },
});
const stylesItem = StyleSheet.create({
  root: {
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
    padding: 8,
    flexShrink: 0,
    flexBasis: 0,
    flexDirection: 'row',
    flex: 1,
    borderRadius: 12,
    borderWidth: 0.5,
    backgroundColor: COLORS.white,
    borderColor: COLORS.boder,
    marginBottom: 8,
  },
});

const stylesBody = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  titleNameTree: {
    alignSelf: 'stretch',
    color: COLORS.blue,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 18,
    letterSpacing: 0.48,
  },
});

const stylesContent = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  titleQuantity: {
    color: COLORS.text2,
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    letterSpacing: 0.42,
    justifyContent: 'flex-start',
  },
  titlePrice: {
    color: COLORS.green,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    fontStyle: 'italic',
    letterSpacing: 0.42,
    justifyContent: 'flex-end',
  },
  titlePrice1: {
    color: COLORS.red,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    fontStyle: 'italic',
    letterSpacing: 0.42,
    justifyContent: 'flex-end',
  },
});

const stylesFooter = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    height: 24,
    justifyContent: 'flex-end',
  },
  title: {
    color: COLORS.blue,
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    lineHeight: 17,
  },
});
