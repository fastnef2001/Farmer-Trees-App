import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderTitle } from '../../components/Header/Header.component';
import { ModalAdd } from '../../components/Modal/ModalAdd';
import { UseLogic } from './UserLogic';
import { HandleAdd } from './HandleAdd';
import { ModalPickDate } from '../../components/Modal/ModalPickDate';

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
    </>
  );
};

export default IncomeHistory;