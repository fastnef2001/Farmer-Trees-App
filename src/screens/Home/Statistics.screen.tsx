/* eslint-disable react-native/no-inline-styles */
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
import ButtonAddComponent from '../../components/Statistics/ButtonAdd.component';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../theme/color';
import Detail from '../../assets/images/Detail.svg';

const Statistics = ({ navigation }: any) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderComponent onPress={() => navigation.navigate('Profile')} />
      <ScrollView style={{ flex: 1 }}>
        <FilterComponent />
        <GeneralStatistics />
        <ButtonAddComponent />
        <View style={stylesHeader.root}>
          <Text style={stylesHeader.generalStatistics}>Income history</Text>
          <Text style={stylesHeader.exportExcel}>Export excel</Text>
        </View>
        <View style={styles.root}>
          <View style={stylesDate.root}>
            <Text style={stylesDate.tileMonth}>Apr.</Text>
            <Text style={stylesDate.tileDate}>12</Text>
          </View>
          <View style={stylesBody.root}>
            <Text style={stylesBody.titleNameTree}>Coffee</Text>
            <View style={{ height: 4 }} />
            <View style={stylesContent.root}>
              <Text style={stylesContent.titleQuantity}>200 kg</Text>
              <Text style={stylesContent.titlePrice}>2.000.000 $</Text>
            </View>
          </View>
          <Detail />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: COLORS.green,
    borderRadius: 12,
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

const stylesContent = StyleSheet.create({
  root: {
    backgroundColor: COLORS.grey,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  titleQuantity: {
    overflow: 'hidden',
    color: COLORS.text2,
    textOverflow: 'ellipsis',
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    letterSpacing: 0.42,
  },
  titlePrice: {
    overflow: 'hidden',
    color: COLORS.text2,
    textOverflow: 'ellipsis',
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    fontStyle: 'italic',
    letterSpacing: 0.42,
  },
});

const stylesBody = StyleSheet.create({
  root: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  titleNameTree: {
    alignSelf: 'stretch',
    color: COLORS.blue,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.48,
    backgroundColor: COLORS.white,
  },
});

const styles = StyleSheet.create({
  root: {
    alignSelf: 'center',
    width: '90%',
    alignItems: 'center',
    padding: 8,
    flexShrink: 0,
    flexBasis: 0,
    flexDirection: 'row',
    backgroundColor: COLORS.red,
    borderRadius: 12,
  },
});

export default Statistics;
