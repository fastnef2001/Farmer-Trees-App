import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderTitle } from '../../components/Header/Header.component';
import { ModalAdd } from '../../components/Modal/ModalAdd';
import { UseLogic } from './UseLogic';
import { ModalPickDate } from '../../components/Modal/ModalPickDate';
import { ModalPick } from '../../components/Modal/ModalPick';
import {
  PopUpSuccess,
  PopUpLoading,
} from '../../components/Modal/GeneralPopUps.component';
import { FilterComponent } from '../../components/Statistics/Filter.component';
import IconSwitch from '../../assets/images/IconSwitch.svg';
import { HistoryElemment } from '../../components/Statistics/History.component';
import { ModalDetail } from '../../components/Modal/ModalDetai';

const IncomeHistory = () => {
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
    dataIncome,
    handleModalAddItem,
    handleEditItem,
    itemIncome,
    handlePickItem,
    itemExpense,
    handleModalEditIncome,
    handleDeleteIncome,
    setIsModalAdd,
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
            onPress={handleModalPickTree}
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
            title="Income history"
            isIncome={true}
            handlePress={() => {}}
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
      {/* End modal add */}
      {/* Modal detail */}
      <ModalDetail
        isModaDetail={isModalDetail}
        handlePressDetail={handlePressDetail}
        titleDetail={'Income Detail'}
        itemIncome={itemIncome}
        itemExpense={itemExpense}
        deleteItem={handleDeleteIncome}
        editItem={handleModalEditIncome}
      />
      {/* End modal detail */}
      {/* Modal pick */}
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
      {/* End modal pick */}
      {/* Pop up noti and loading */}
      <PopUpSuccess
        isModalSuccess={isModalSuccess}
        titleHeader={titleHeader}
        titleBody={titleBody}
        isFooter={false}
        handleFunction={() => {}}
        handleModalSuccess={() => setIsModalSuccess(!isModalSuccess)}
      />
      <PopUpLoading isModalVisible={isModalLoading} />
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
