//Libary
import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
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
//STYLE
import { stylesButtonReload, stylesFilter } from '../Statistics/Style';
//USE LOGIC
import { UseLogic } from './UseLogic';

const ExpenseHistory = () => {
  const {
    trees,
    unitsIncome,
    unitsExpense,
    costTypes,
    isModalPickDate,
    isModaAdd,
    isModalPick,
    isModalLoading,
    isModalDetail,
    isModalSuccess,
    isDisabled,
    handleModalAddItem,
    handleModalPickTree,
    handleModalPickCostType,
    handleModalPickUnitExpense,
    handleModalPickUnitIncome,
    handleModalEditExpense,
    handlePressDetail,
    handlePickDate,
    handlePickItem,
    handleReload,
    handleInputChange,
    handleModalDeleteExpense,
    handleAdd,
    handleEditItem,
    handleModalPickFilter,
    handleFunction,
    setIsModalPickDate,
    setIsModalSuccess,
    setIsModalAdd,
    titleBody,
    titleHeader,
    titleModalAdd,
    titlePick,
    titlePickDate,
    titleDetail,
    titleFooterModalSuccess,
    selectedTreeOrCostType,
    selectedDateStart,
    selectedDateEnd,
    selectedDateIncome,
    selectedDateExpense,
    setSelectedDateStart,
    setSelectedDateEnd,
    setSelectedDateIncome,
    setSelectedDateExpense,
    itemIncome,
    itemExpense,
    dataIncome,
    dataExpense,
    valuePick,
    inputs,
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
            onPress={() => {
              handleModalPickFilter('expense');
            }}
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
        titlePickDate={titlePickDate}
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
        handleModalDele={handleModalDeleteExpense}
        isModaDetail={isModalDetail}
        handlePressDetail={handlePressDetail}
        titleDetail={titleDetail}
        itemIncome={itemIncome}
        itemExpense={itemExpense}
        editItem={handleModalEditExpense}
      />

      <PopUpSuccess
        isModalSuccess={isModalSuccess}
        titleHeader={titleHeader}
        titleBody={titleBody}
        handleModalSuccess={() => setIsModalSuccess(!isModalSuccess)}
        handleFunction={handleFunction}
        title={titleFooterModalSuccess}
      />

      <PopUpLoading isModalVisible={isModalLoading} />
    </>
  );
};

export default ExpenseHistory;
