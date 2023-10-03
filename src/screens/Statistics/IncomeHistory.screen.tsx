import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderTitle } from '../../components/Header/Header.component';
import { ModalAdd } from '../../components/Modal/ModalAdd';
import { UseLogic } from './UserLogic';
import { HandleAdd } from './HandleAdd';
import { ModalPickDate } from '../../components/Modal/ModalPickDate';
import { ModalPick } from '../../components/Modal/ModalPick';
import {
  PopUpSuccess,
  PopUpLoading,
} from '../../components/Modal/GeneralPopUps.component';
import { FilterComponent } from '../../components/Statistics/Filter.component';
import IconSwitch from '../../assets/images/IconSwitch.svg';
import { HistoryElemment } from '../../components/Statistics/History.component';

const IncomeHistory = () => {
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
    setSelectedTreeOrCostType,
    selectedTreeOrCostType,
    isModalPickFilter,
    hanlePickItem,
    titlePickFilter,
    handleModalPickFilter,
    handleModalPickHideFilter,
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
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderTitle title="Income history" onPress={handleModalAddIncome} />
        {/* Filter */}
        <View style={{ height: 16 }} />
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
        </View>
        <View style={{ height: 8 }} />
        <View style={stylesFilter.root}>
          <FilterComponent
            onPress={() => {
              handleModalPickFilter('Pick tree');
            }}
            titleDate={selectedTreeOrCostType}
            isCalendar={false}
          />
          <View style={{ width: 8 }} />
          <TouchableOpacity
            style={stylesButtonReload.root}
            onPress={handleReload}>
            <IconSwitch />
          </TouchableOpacity>
        </View>
        <View style={{ height: 16 }} />
        {/* End filter */}
        <ScrollView
          style={{
            flex: 1,
            width: '90%',
            alignSelf: 'center',
          }}>
          <HistoryElemment data={dataIncome} title="Income" isIncome={true} />
          <View style={{ height: 16 }} />
        </ScrollView>
      </SafeAreaView>
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
        isModalPick={isModalPickFilter}
        setIsModalPick={setIsModalPick}
        titlePick={titlePickFilter}
        setTitlePick={setTitlePick}
        valuePick={selectedTreeOrCostType}
        setValuePick={setSelectedTreeOrCostType}
        trees={trees}
        unitsIncome={unitsIncome}
        costTypes={costTypes}
        unitsExpense={unitsExpense}
        handleModalPickHide={handleModalPickHideFilter}
        hanlePickItem={hanlePickItem}
      />
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
    </>
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

export default IncomeHistory;
