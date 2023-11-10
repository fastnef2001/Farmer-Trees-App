import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderTitle } from '../../components/Header/Header.component';
import { ModalAdd } from '../../components/Modal/ModalAdd';
import { UseLogic } from './UseLogic';
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
import { HandleDeleteAndEdit } from './HandleDeleteAndEdit';
import { ModalDetail } from '../../components/Modal/ModalDetai';

const IncomeHistory = () => {
  const {
    selectedDateStart,
    setSelectedDateStart,
    selectedDateEnd,
    setSelectedDateEnd,
    handlePickDate,
    handleReload,
    dataIncome,
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
    handleModalAddIncome,
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
    //Delete
    isModalDetail,
    handleModalDetail,
    handlePressDetail,
    itemIncome,
    handleDeleteIncome,
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
          <HistoryElemment
            data={dataIncome}
            title="Income"
            isIncome={true}
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
      {/* Modal detail */}
      <ModalDetail
        isModaDetail={isModalDetail}
        handleModalDetail={handleModalDetail}
        titleModalAdd={'Detail income'}
        itemIncome={itemIncome}
        deleteItem={handleDeleteIncome}
        editItem={() => {}}
      />
      {/* End modal detail */}
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
        isFooter={false}
        handleDeleteTree={() => {}}
        handleModalSuccess={() => setIsModalSuccess(!isModalSuccess)}
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
