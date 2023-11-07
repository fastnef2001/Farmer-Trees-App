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
import { HandleAdd } from './HandleAdd';
import { HandleDeleteAndEdit } from './HandleDeleteAndEdit';

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
    titleModalAdd,
    inputs,
    handleHideModalAdd,
    handleInputChange,
    isDisabled,
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
    titleBody,
    isModalLoading,
  } = HandleAdd();
  const {
    isModalDetail,
    handleModalDetail,
    handlePressDetail,
    item,
    handleDeleteExpense,
    titleBody1,
    titleHeader1,
    isModalSuccess1,
    setIsModalSuccess1,
    isModalLoading1,
  } = HandleDeleteAndEdit();

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderTitle title="Expense history" onPress={handleModalAddExpense} />
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
              handleModalPickFilter('Pick cost type');
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
          <HistoryElemment
            data={dataExpense}
            title="Expense"
            isIncome={false}
            handlePress={handleModalDetail}
            handlePressDetail={handlePressDetail}
          />
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

      {/* Modal detail */}
      <ModalDetail
        isModaDetail={isModalDetail}
        handleModalDetail={handleModalDetail}
        titleModalAdd={'Detail expense'}
        item={item}
        deleteItem={handleDeleteExpense}
      />

      {/* Pop up noti and loading */}
      <PopUpSuccess
        isModalSuccess={isModalSuccess}
        titleHeader={titleHeader}
        titleBody={titleBody}
        isFooter={false}
        handleDeleteTree={() => {}}
        handleModalSuccess={() => setIsModalSuccess(!isModalSuccess)}
      />
      <PopUpLoading isModalSuccess={isModalLoading} />
      {/* End up noti and loading */}

      {/* Pop up noti and loading */}
      <PopUpSuccess
        isModalSuccess={isModalSuccess1}
        titleHeader={titleHeader1}
        titleBody={titleBody1}
        isFooter={false}
        handleDeleteTree={() => {}}
        handleModalSuccess={() => setIsModalSuccess1(!isModalSuccess1)}
      />
      <PopUpLoading isModalSuccess={isModalLoading1} />
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

export default ExpenseHistory;
