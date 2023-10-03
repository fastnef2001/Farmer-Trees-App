/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from 'react-native';
import GeneralStatistics from '../../components/Statistics/GeneralStatistics.component';
import HistoryComponent from '../../components/Statistics/History.component';
import { HeaderComponent } from '../../components/Header/Header.component';
import { FilterComponent } from '../../components/Statistics/Filter.component';
import ButtonAddComponent from '../../components/Statistics/ButtonAdd.component';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../theme/color';
import DatePicker from 'react-native-modern-datepicker';
import { PickDate } from '../../components/Modal/PickDate';
import { ModalInsert } from '../../components/Modal/ModalInsert';
import IconBack from '../../assets/images/IconBack.svg';
import styles from '../Setupfarm/Addtree.style';
import IconSwitch from '../../assets/images/IconSwitch.svg';
import Input from '../../components/Input/Input.component';
import IconSave from '../../assets/images/IconSave.svg';
import { RadioButton } from 'react-native-paper';
import IconCalendar from '../../assets/images/IconCalendar.svg';
import {
  PopUpSuccess,
  PopUpLoading,
} from '../../components/Modal/GeneralPopUps.component';
import { UseLogic } from './UserLogic';
import { HandleAdd } from './HandleAdd';
import { ModalAdd } from '../../components/Modal/ModalAdd';
import { ModalPickDate } from '../../components/Modal/ModalPickDate';
import { ModalPick } from '../../components/Modal/ModalPick';

const Statistics = ({ navigation }: any) => {
  const {
    selectedDateStart,
    setSelectedDateStart,
    selectedDateEnd,
    setSelectedDateEnd,
    handlePickDate,
    handleReload,
    totalIncome,
    totalExpense,
    totalProfit,
    dataIncome,
    dataExpense,
    status,
    isModalPickDate,
    setIsModalPickDate,
  } = UseLogic();
  const {
    isModaAdd,
    setIsModalAdd,
    titleModalAdd,
    setTitleModalAdd,
    inputs,
    setInputs,
    handleHideModalAdd,
    handleInputChange,
    inputsIncome,
    setInputsIncome,
    isDisabled,
    setIsDisabled,
    handleModalAddIncome,
    inputsExpense,
    setInputsExpense,
    handleModalAddExpense,
    unitsIncome,
    trees,
    costTypes,
    unitsExpense,
    handleModalPickHide,
    handleModalPickTree,
    handleModalPickUnitIncome,
    handleModalPickCostType,
    handleModalPickUnitExpense,
    isModalPick,
    setIsModalPick,
    titlePick,
    setTitlePick,
    valuePick,
    setValuePick,
    hanleHideModalPick,
    selectedDateIncome,
    setSelectedDateIncome,
    selectedDateExpense,
    setSelectedDateExpense,
    handleAdd,
    isModalSuccess,
    setIsModalSuccess,
    titleHeader,
    setTitleHeader,
    titleBody,
    setTitleBody,
    isModalLoading,
    setIsModalLoading,
  } = HandleAdd();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1, width: '100%', height: '100%' }}>
        <HeaderComponent onPress={() => navigation.navigate('Profile')} />
        <ScrollView style={{ flex: 1, paddingTop: 16 }}>
          {/* Filter */}
          <View style={stylesFilter.root}>
            <FilterComponent
              onPress={handlePickDate('startDate')}
              titleDate={selectedDateStart}
              title="startDate"
              isCalendar={true}
            />
            <View style={{ width: 8 }} />
            <FilterComponent
              onPress={handlePickDate('endDate')}
              titleDate={selectedDateEnd}
              title="endDate"
              isCalendar={true}
            />
            <View style={{ width: 8 }} />
            <TouchableOpacity
              style={stylesButtonReload.root}
              onPress={handleReload}>
              <IconSwitch />
            </TouchableOpacity>
          </View>
          {/* End filter */}
          {/* GeneralStatistics */}
          <GeneralStatistics
            totalIncome={totalIncome}
            totalExpense={totalExpense}
            totalProfit={totalProfit}
          />
          {/* End GeneralStatistics */}
          {/* Button Add */}
          <View style={stylesFilter.root}>
            <ButtonAddComponent
              onPress={handleModalAddIncome}
              title="Icome"
              isRight={false}
            />
            <View style={{ width: 8 }} />
            <ButtonAddComponent
              onPress={handleModalAddExpense}
              title="Expense"
              isRight={true}
            />
          </View>
          {/* End button add */}
          {/* History */}
          <HistoryComponent
            handlePress={() => navigation.navigate('IncomeHistory')}
            data={dataIncome}
            title="Income history"
            isIncome={true}
          />
          <HistoryComponent
            handlePress={() => navigation.navigate('ExpenseHistory')}
            data={dataExpense}
            title="Expense history"
            isIncome={false}
          />
          {/* End history */}
        </ScrollView>

        {/* Modal pick date */}
        <ModalPickDate
          isModalPickDate={isModalPickDate}
          setIsModalPickDate={setIsModalPickDate}
          status={status}
          setSelectedDateStart={setSelectedDateStart}
          setSelectedDateEnd={setSelectedDateEnd}
          setSelectedDateIncome={setSelectedDateIncome}
          setSelectedDateExpense={setSelectedDateExpense}
          selectedDateStart={selectedDateStart}
          selectedDateEnd={selectedDateEnd}
          selectedDateIncome={selectedDateIncome}
          selectedDateExpense={selectedDateExpense}
        />
        {/* End modal pick date */}

        {/* Modal add */}
        <ModalAdd
          isModaAdd={isModaAdd}
          handleHideModalAdd={handleHideModalAdd}
          titleModalAdd={titleModalAdd}
          handlePickDate={handlePickDate}
          selectedDateIncome={selectedDateIncome}
          selectedDateExpense={selectedDateExpense}
          handleModalPickTree={handleModalPickTree}
          handleModalPickUnitIncome={handleModalPickUnitIncome}
          handleModalPickUnitExpense={handleModalPickUnitExpense}
          handleModalPickCostType={handleModalPickCostType}
          handleInputChange={handleInputChange}
          handleAdd={handleAdd}
          inputs={inputs}
          isDisabled={isDisabled}
        />
        {/* End modal add */}

        {/* Modal pick */}
        <ModalPick
          isModalPick={isModalPick}
          setIsModalPick={setIsModalPick}
          titlePick={titlePick}
          setTitlePick={setTitlePick}
          valuePick={valuePick}
          setValuePick={setValuePick}
          trees={trees}
          unitsIncome={unitsIncome}
          costTypes={costTypes}
          unitsExpense={unitsExpense}
          handleModalPickHide={handleModalPickHide}
          hanlePickItem={hanleHideModalPick}
        />
        {/* End modal pick */}

        {/* Pop up noti and loading */}
        <PopUpSuccess
          isModalSuccess={isModalSuccess}
          titleHeader={titleHeader}
          titleBody={titleBody}
        />
        <PopUpLoading isModalSuccess={isModalLoading} />
        {/* End up noti and loading */}
      </ImageBackground>
    </SafeAreaView>
  );
};

const stylesFilter = StyleSheet.create({
  root: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
  },
});

const stylesButtonReload = StyleSheet.create({
  root: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#163859',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const stylesPickDate = StyleSheet.create({
  root: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  textDay: {
    color: COLORS.text1,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
  },
});

export default Statistics;
