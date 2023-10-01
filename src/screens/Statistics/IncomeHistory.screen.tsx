import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderTitle } from '../../components/Header/Header.component';
import { ModalAdd } from '../../components/Modal/ModalAdd';
import { UseLogic } from './UserLogic';
import { HandleAdd } from './HandleAdd';

const IncomeHistory = () => {
  const {
    handleModalAddIncome,
    isModaAdd,
    handleHideModalAdd,
    titleModalAdd,
    selectedDateIncome,
    selectedDateExpense,
    handleModalPickTree,
    handleModalPickUnitIncome,
    handleModalPickUnitExpense,
    handleModalPickCostType,
    handleInputChange,
    handleAdd,
    inputs,
    isDisabled,
  } = HandleAdd();
  const { handlePickDate } = UseLogic();

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderTitle title="Income history" onPress={handleModalAddIncome} />
      </SafeAreaView>
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
    </>
  );
};

export default IncomeHistory;
