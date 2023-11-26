import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import GeneralStatistics from '../../components/Statistics/GeneralStatistics.component';
import { HistoryComponent } from '../../components/Statistics/History.component';
import { HeaderComponent } from '../../components/Header/Header.component';
import { FilterComponent } from '../../components/Statistics/Filter.component';
import ButtonAddComponent from '../../components/Statistics/ButtonAdd.component';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconSwitch from '../../assets/images/IconSwitch.svg';
import {
  PopUpSuccess,
  PopUpLoading,
} from '../../components/Modal/GeneralPopUps.component';
import { UseLogic } from './UseLogic';
import { ModalAdd } from '../../components/Modal/ModalAdd';
import { ModalPickDate } from '../../components/Modal/ModalPickDate';
import { ModalPick } from '../../components/Modal/ModalPick';
import { ModalDetail } from '../../components/Modal/ModalDetai';

const Statistics = ({ navigation }: any) => {
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
    handleModalAddItem,
    isModaAdd,
    titleModalAdd,
    inputs,
    selectedDateExpense,
    selectedDateIncome,
    setSelectedDateIncome,
    setSelectedDateExpense,
    handleModalPickTree,
    handleModalPickCostType,
    handleModalPickUnitExpense,
    handleModalPickUnitIncome,
    titlePick,
    isModalPick,
    valuePick,
    handlePickItem,
    handleInputChange,
    isDisabled,
    handleAdd,
    isModalSuccess,
    titleBody,
    titleHeader,
    isModalLoading,
    setIsModalSuccess,
    trees,
    unitsIncome,
    unitsExpense,
    costTypes,
    handlePressDetail,
    isModalDetail,
    titleDetail,
    itemIncome,
    itemExpense,
    handleDeleteExpense,
    handleDeleteIncome,
    handleModalEditExpense,
    handleModalEditIncome,
    handleEditItem,
    setIsModalAdd,
  } = UseLogic();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1, width: '100%', height: '100%' }}>
        <HeaderComponent onPress={() => navigation.navigate('Profile')} />
        <ScrollView style={{ flex: 1, paddingTop: 16 }}>
          {/* Filter */}
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
          {/* GeneralStatistics */}
          <GeneralStatistics
            totalIncome={totalIncome}
            totalExpense={totalExpense}
            totalProfit={totalProfit}
          />
          {/* Button add */}
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
          {/* History */}
          <HistoryComponent
            handlePress={() => navigation.navigate('IncomeHistory')}
            dataIncome={dataIncome}
            dataExpense={dataExpense}
            title="Income history"
            isIncome={true}
            handlePressDetail={handlePressDetail}
          />
          <HistoryComponent
            handlePress={() => navigation.navigate('ExpenseHistory')}
            dataIncome={dataIncome}
            dataExpense={dataExpense}
            title="Expense history"
            isIncome={false}
            handlePressDetail={handlePressDetail}
          />
        </ScrollView>

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
          titleDetail={titleDetail}
          itemIncome={itemIncome}
          itemExpense={itemExpense}
          deleteItem={
            titleDetail === 'Income Detail'
              ? handleDeleteIncome
              : handleDeleteExpense
          }
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
          handleModalSuccess={() => setIsModalSuccess(false)}
          isFooter={false}
          handleFunction={() => {}}
        />

        <PopUpLoading isModalVisible={isModalLoading} />
      </ImageBackground>
    </SafeAreaView>
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

export default Statistics;
