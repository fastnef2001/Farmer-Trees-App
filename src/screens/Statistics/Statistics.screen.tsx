import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// ICON
import IconSwitch from '../../assets/images/IconSwitch.svg';
// COMPONENT
import GeneralStatistics from '../../components/Statistics/GeneralStatistics.component';
import { HistoryComponent } from '../../components/Statistics/History.component';
import { HeaderComponent } from '../../components/Header/Header.component';
import { FilterComponent } from '../../components/Statistics/Filter.component';
import ButtonAddComponent from '../../components/Statistics/ButtonAdd.component';
import {
  PopUpSuccess,
  PopUpLoading,
} from '../../components/Modal/GeneralPopUps.component';
import { ModalAdd } from '../../components/Modal/ModalAdd';
import { ModalPickDate } from '../../components/Modal/ModalPickDate';
import { ModalPick } from '../../components/Modal/ModalPick';
import { ModalDetail } from '../../components/Modal/ModalDetai';
// STYLE
import { stylesButtonReload, stylesFilter } from '../Statistics/Style';
// USE LOGIC
import { UseLogic } from './UseLogic';
import { HandleExcel } from './HandleExcel';

const Statistics = ({ navigation }: any) => {
  const { createAndShareExcel } = HandleExcel();
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
    handleModalPickUnitExpense,
    handleModalPickUnitIncome,
    handleModalEditIncome,
    handleModalEditExpense,
    handlePressDetail,
    handlePickDate,
    handlePickItem,
    handleReload,
    handleInputChange,
    handleAdd,
    handleEditItem,
    handleModalDeleteIncome,
    handleModalDeleteExpense,
    handleFunction,
    handleModalPickCostType,
    setIsModalPickDate,
    setIsModalSuccess,
    setIsModalAdd,
    titleBody,
    titleHeader,
    titleModalAdd,
    titleDetail,
    titlePick,
    titlePickDate,
    titleFooterModalSuccess,
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
    totalIncome,
    totalExpense,
    totalProfit,
    valuePick,
    inputs,
  } = UseLogic();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderComponent onPress={() => navigation.navigate('Profile')} />
      <ScrollView style={{ flex: 1, paddingTop: 16 }}>
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
        <GeneralStatistics
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          totalProfit={totalProfit}
        />
        <View style={stylesFilter.root}>
          <ButtonAddComponent
            onPress={() => {
              handleModalAddItem('Add income');
            }}
            title="Income"
            isRight={false}
          />
          <View style={{ width: 8 }} />
          <ButtonAddComponent
            onPress={() => {
              handleModalAddItem('Add expense');
            }}
            title="Expense"
            isRight={true}
          />
        </View>
        <HistoryComponent
          handlePress={() => navigation.navigate('IncomeHistory')}
          dataIncome={dataIncome}
          dataExpense={dataExpense}
          title="Income history"
          isIncome={true}
          handlePressDetail={handlePressDetail}
          handleExportExcel={() => {
            createAndShareExcel('income');
          }}
        />
        <HistoryComponent
          handlePress={() => navigation.navigate('ExpenseHistory')}
          dataIncome={dataIncome}
          dataExpense={dataExpense}
          title="Expense history"
          isIncome={false}
          handlePressDetail={handlePressDetail}
          handleExportExcel={() => {
            createAndShareExcel('expense');
          }}
        />
      </ScrollView>

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
        handleModalDele={
          titleDetail === 'Income Detail'
            ? handleModalDeleteIncome
            : handleModalDeleteExpense
        }
        isModaDetail={isModalDetail}
        handlePressDetail={handlePressDetail}
        titleDetail={titleDetail}
        itemIncome={itemIncome}
        itemExpense={itemExpense}
        editItem={
          titleDetail === 'Income Detail'
            ? handleModalEditIncome
            : handleModalEditExpense
        }
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
    </SafeAreaView>
  );
};
export default Statistics;
