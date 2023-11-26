//Libary
import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
//Icon
import IconSwitch from '../../assets/images/IconSwitch.svg';
//Component
import { ModalPickDate } from '../../components/Modal/ModalPickDate';
import { ModalPick } from '../../components/Modal/ModalPick';
import { ModalAdd } from '../../components/Modal/ModalAdd';
import {
  PopUpSuccess,
  PopUpLoading,
} from '../../components/Modal/GeneralPopUps.component';
import { FilterComponent } from '../../components/Statistics/Filter.component';
import { HistoryElemment } from '../../components/Statistics/History.component';
import { HeaderTitle } from '../../components/Header/Header.component';
import { ModalDetail } from '../../components/Modal/ModalDetai';

import { UseLogic } from './UseLogic';

const ExpenseHistory = () => {
  const {
    selectedDateStart,
    setSelectedDateStart,
    selectedDateEnd,
    setSelectedDateEnd,
    handlePickDate,
    handleReload,
    dataExpense,
    status,
    isModalPickDate,
    setIsModalPickDate,
    selectedTreeOrCostType,
    isModaAdd,
    titleModalAdd,
    inputs,
    handleInputChange,
    isDisabled,
    unitsIncome,
    trees,
    costTypes,
    unitsExpense,
    handleModalPickTree,
    handleModalPickUnitIncome,
    handleModalPickCostType,
    handleModalPickUnitExpense,
    isModalPick,
    titlePick,
    valuePick,
    selectedDateIncome,
    setSelectedDateIncome,
    selectedDateExpense,
    setSelectedDateExpense,
    handleAdd,
    isModalSuccess,
    setIsModalSuccess,
    titleHeader,
    titleBody,
    isModalLoading,
    //Delete
    isModalDetail,
    handlePressDetail,
    handleDeleteExpense,
    dataIncome,
    handleModalAddItem,
    handleEditItem,
    itemIncome,
    handleModalEditExpense,
    handlePickItem,
    itemExpense,
    setIsModalAdd,
  } = UseLogic();

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderTitle
          title="Expense history"
          onPress={() => {
            handleModalAddItem('Add expense');
          }}
        />
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
            onPress={handleModalPickCostType}
            titleDate={selectedTreeOrCostType}
            isCalendar={false}
            isIncome={false}
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
          <HistoryElemment
            dataExpense={dataExpense}
            dataIncome={dataIncome}
            title="Expense history"
            isIncome={false}
            handlePress={() => {}}
            handlePressDetail={handlePressDetail}
          />
          <View style={{ height: 16 }} />
        </ScrollView>
      </SafeAreaView>
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
      <ModalAdd
        isModalAdd={isModaAdd}
        handleBack={() => setIsModalAdd(false)}
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
        handleEditItem={handleEditItem}
      />
      <ModalPick
        isModalPick={isModalPick}
        titlePick={titlePick}
        valuePick={valuePick}
        trees={trees}
        unitsIncome={unitsIncome}
        costTypes={costTypes}
        unitsExpense={unitsExpense}
        handlePickItem={handlePickItem}
      />
      <ModalDetail
        isModaDetail={isModalDetail}
        handlePressDetail={handlePressDetail}
        titleDetail={'Expense Detail'}
        itemIncome={itemIncome}
        itemExpense={itemExpense}
        deleteItem={handleDeleteExpense}
        editItem={handleModalEditExpense}
      />

      <PopUpSuccess
        isModalSuccess={isModalSuccess}
        titleHeader={titleHeader}
        titleBody={titleBody}
        isFooter={false}
        handleFunction={() => {}}
        handleModalSuccess={() => setIsModalSuccess(!isModalSuccess)}
      />
      <PopUpLoading isModalVisible={isModalLoading} />
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

export default ExpenseHistory;
