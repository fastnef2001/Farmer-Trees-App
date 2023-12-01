import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
//ICON
import IconSwitch from '../../assets/images/IconSwitch.svg';
//COMPONENT
import { FilterComponent } from '../../components/Statistics/Filter.component';
import { HistoryElemment } from '../../components/Statistics/History.component';
import { ModalDetail } from '../../components/Modal/ModalDetai';
import { ModalPick } from '../../components/Modal/ModalPick';
import { ModalPickDate } from '../../components/Modal/ModalPickDate';
import { HeaderTitle } from '../../components/Header/Header.component';
import { ModalAdd } from '../../components/Modal/ModalAdd';
import {
  PopUpSuccess,
  PopUpLoading,
} from '../../components/Modal/GeneralPopUps.component';
//STYLE
import { stylesButtonReload, stylesFilter } from '../Statistics/Style';
//USE LOGIC
import { UseLogic } from './UseLogic';

const IncomeHistory = () => {
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
    handlePressDetail,
    handlePickDate,
    handlePickItem,
    handleReload,
    handleInputChange,
    handleAdd,
    handleEditItem,
    handleModalDeleteIncome,
    handleModalEditIncome,
    handleFunction,
    handleModalPickFilter,
    titleFooterModalSuccess,
    setIsModalPickDate,
    setIsModalSuccess,
    setIsModalAdd,
    titleBody,
    titleHeader,
    titleModalAdd,
    titlePick,
    titlePickDate,
    titleDetail,
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
          title="Income history"
          onPress={() => {
            handleModalAddItem('Add income');
          }}
        />
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
              handleModalPickFilter('income');
            }}
            titleDate={selectedTreeOrCostType}
            isCalendar={false}
            isIncome={true}
          />
          <View style={{ width: 8 }} />
          <TouchableOpacity
            style={stylesButtonReload.root}
            onPress={handleReload}>
            <IconSwitch />
          </TouchableOpacity>
        </View>
        <View style={{ height: 16 }} />
        <ScrollView
          style={{
            flex: 1,
            width: '90%',
            alignSelf: 'center',
          }}>
          <HistoryElemment
            dataExpense={dataExpense}
            dataIncome={dataIncome}
            title="Income history"
            isIncome={true}
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
        handleModalDele={handleModalDeleteIncome}
        isModaDetail={isModalDetail}
        handlePressDetail={handlePressDetail}
        titleDetail={titleDetail}
        itemIncome={itemIncome}
        itemExpense={itemExpense}
        editItem={handleModalEditIncome}
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

export default IncomeHistory;
