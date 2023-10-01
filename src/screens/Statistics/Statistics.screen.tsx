/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from 'react-native';
import GeneralStatistics from '../../components/Statistics/GeneralStatistics.component';
import HistoryComponent from '../../components/Statistics/History.component';
import { HeaderComponent } from '../../components/Header/Header.component';
import { FilterComponent } from '../../components/Statistics/Filter.component';
import ButtonAddComponent from '../../components/Statistics/ButtonAdd.component';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../theme/color';
import DatePicker from 'react-native-modern-datepicker';
import { PickDate } from '../../components/Modal/PickDate';
import { ModalInsert } from '../../components/Modal/ModalInsert';
import IconBack from '../../assets/images/IconBack.svg';
import styles from '../Setupfarm/Addtree.style';
import IconSwitch from '../../assets/images/IconSwitch.svg';
import Input from '../../components/Input/Input.component';
import IconSave from '../../assets/images/IconSave.svg';
import { RadioButton } from 'react-native-paper';
import IconCalendar from '../../assets/images/IconCalendar.svg';
import {
  PopUpSuccess,
  PopUpLoading,
} from '../../components/Statistics/GeneralPopUps.component';
import { UseLogic } from './UserLogic';

const Statistics = ({ navigation }: any) => {
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
    selectedDateStart,
    setSelectedDateStart,
    selectedDateEnd,
    setSelectedDateEnd,
    selectedDateIncome,
    setSelectedDateIncome,
    selectedDateExpense,
    setSelectedDateExpense,
    handlePickDate,
    handleReload,
    totalIncome,
    totalExpense,
    totalProfit,
    handleAdd,
    isModalSuccess,
    setIsModalSuccess,
    titleHeader,
    setTitleHeader,
    titleBody,
    setTitleBody,
    isModalLoading,
    setIsModalLoading,
    dataIncome,
    setDataIncome,
    dataExpense,
    setDataExpense,
    status,
    setStatus,
    isModalPickDate,
    setIsModalPickDate,
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
              isRight={true}
            />
            <View style={{ width: 8 }} />
            <FilterComponent
              onPress={handlePickDate('endDate')}
              titleDate={selectedDateEnd}
              isRight={false}
            />
            <View style={{ width: 8 }} />
            <TouchableOpacity
              style={stylesButtonReload.root}
              onPress={handleReload}>
              <IconSwitch />
            </TouchableOpacity>
          </View>
          {/* End filter */}
          {/* GeneralStatistics */}
          <GeneralStatistics
            totalIncome={totalIncome}
            totalExpense={totalExpense}
            totalProfit={totalProfit}
          />
          {/* End GeneralStatistics */}
          {/* Button Add */}
          <View style={stylesFilter.root}>
            <ButtonAddComponent
              onPress={handleModalAddIncome}
              title="Icome"
              isRight={false}
            />
            <View style={{ width: 8 }} />
            <ButtonAddComponent
              onPress={handleModalAddExpense}
              title="Expense"
              isRight={true}
            />
          </View>
          {/* End button add */}
          {/* History */}
          <HistoryComponent
            handlePress={() => navigation.navigate('IncomeHistory')}
            data={dataIncome}
            title="Income history"
            isIncome={true}
          />
          <HistoryComponent
            handlePress={() => navigation.navigate('ExpenseHistory')}
            data={dataExpense}
            title="Expense history"
            isIncome={false}
          />
          {/* End history */}
        </ScrollView>

        {/* Modal pick date */}
        <PickDate
          isVisible={isModalPickDate}
          onBackdropPress={() => setIsModalPickDate(false)}>
          <StatusBar backgroundColor={'#07111B'} />
          <PickDate.Container>
            <PickDate.Body>
              <DatePicker
                onSelectedChange={date => {
                  if (status === 'startDate') {
                    setSelectedDateStart(date);
                  } else if (status === 'endDate') {
                    setSelectedDateEnd(date);
                  } else if (status === 'incomeDate') {
                    setSelectedDateIncome(date);
                  } else {
                    setSelectedDateExpense(date);
                  }
                  // setIsModalPickDate(false);
                }}
                mode="calendar"
                options={{
                  textHeaderColor: COLORS.blue,
                  textDefaultColor: COLORS.blue,
                  selectedTextColor: '#fff',
                  mainColor: COLORS.blue,
                  textSecondaryColor: COLORS.text2,
                  defaultFont: 'Nunito-SemiBold',
                }}
                selected={
                  status === 'startDate'
                    ? selectedDateStart
                    : status === 'endDate'
                    ? selectedDateEnd
                    : status === 'incomeDate'
                    ? selectedDateIncome
                    : selectedDateExpense
                }
                selectorStartingYear={2020}
              />
            </PickDate.Body>
          </PickDate.Container>
        </PickDate>
        {/* End modal pick date */}

        {/* Modal add */}
        <ModalInsert isVisible={isModaAdd} isPick={false}>
          <StatusBar backgroundColor={'#07111B'} />
          <View style={{ flex: 1 }}>
            <ModalInsert.Container>
              <ModalInsert.Header>
                <View style={styles.headSessionModal}>
                  <TouchableOpacity onPress={handleHideModalAdd}>
                    <IconBack> </IconBack>
                  </TouchableOpacity>
                  <View style={styles.txtContainer}>
                    {titleModalAdd === 'Add income' ? (
                      <Text style={styles.txtTitleModal1}>Add income</Text>
                    ) : (
                      <Text style={styles.txtTitleModal2}>Add expense</Text>
                    )}
                  </View>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                    }}
                  />
                </View>
              </ModalInsert.Header>
              <ScrollView>
                <ModalInsert.Body>
                  <View style={styles.inputSession}>
                    {titleModalAdd === 'Add income' ? (
                      <TouchableOpacity
                        style={stylesPickDate.root}
                        onPress={handlePickDate('incomeDate')}>
                        <Text style={stylesPickDate.textDay}>
                          {selectedDateIncome}
                        </Text>
                        <View style={{ width: 8 }} />
                        <IconCalendar />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={stylesPickDate.root}
                        onPress={handlePickDate('expenseDate')}>
                        <Text style={stylesPickDate.textDay}>
                          {selectedDateExpense}
                        </Text>
                        <View style={{ width: 8 }} />
                        <IconCalendar />
                      </TouchableOpacity>
                    )}

                    <View style={{ height: 8 }} />
                    {inputs.map((input, index) => (
                      <View key={index}>
                        {titleModalAdd === 'Add income' ? (
                          <Input
                            onPress={
                              input.label === 'Tree'
                                ? handleModalPickTree
                                : input.label === 'Unit'
                                ? handleModalPickUnitIncome
                                : () => {}
                            }
                            label={input.label}
                            textPlaceholder={
                              input.label === 'Tree' || input.label === 'Unit'
                                ? `Choose ${input.label.toLowerCase()}`
                                : `Enter your ${input.label.toLowerCase()}`
                            }
                            value={input.value}
                            onChangeText={(text: string) =>
                              handleInputChange(index, text)
                            }
                            dropDown={
                              input.label === 'Tree' || input.label === 'Unit'
                            }
                            iconDolar={input.label === 'Total price'}
                            textError={input.error}
                            keyboardType={
                              input.label === 'Quantity' ||
                              input.label === 'Total price'
                                ? 'numeric'
                                : 'default'
                            }
                            span="*"
                            editable={
                              input.label === 'Tree' || input.label === 'Unit'
                                ? false
                                : true
                            }
                          />
                        ) : (
                          <Input
                            onPress={
                              input.label === 'Cost type'
                                ? handleModalPickCostType
                                : input.label === 'Unit'
                                ? handleModalPickUnitExpense
                                : () => {}
                            }
                            label={input.label}
                            textPlaceholder={
                              input.label === 'Cost type' ||
                              input.label === 'Unit'
                                ? `Choose ${input.label.toLowerCase()}`
                                : `Enter your ${input.label.toLowerCase()}`
                            }
                            value={input.value}
                            onChangeText={(text: string) =>
                              handleInputChange(index, text)
                            }
                            dropDown={
                              input.label === 'Cost type' ||
                              input.label === 'Unit'
                            }
                            iconDolar={input.label === 'Total price'}
                            textError={input.error}
                            keyboardType={
                              input.label === 'Quantity' ||
                              input.label === 'Total price'
                                ? 'numeric'
                                : 'default'
                            }
                            span="*"
                            editable={
                              input.label === 'Cost type' ||
                              input.label === 'Unit'
                                ? false
                                : true
                            }
                          />
                        )}
                      </View>
                    ))}
                  </View>
                  {titleModalAdd === 'Add income' && isDisabled === false ? (
                    <TouchableOpacity
                      style={styles.btnSendSession1}
                      onPress={() => handleAdd('income')}>
                      <View style={styles.txtBtnSignup}>
                        <IconSave />
                        <View style={{ width: 16 }} />
                        <Text
                          style={{
                            fontSize: 16,
                            textAlign: 'center',
                            color: '#FFFFFF',
                            fontFamily: 'Nunito-Bold',
                          }}>
                          SAVE
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : titleModalAdd === 'Add expense' &&
                    isDisabled === false ? (
                    <TouchableOpacity
                      style={styles.btnSendSession2}
                      onPress={() => handleAdd('expense')}>
                      <View style={styles.txtBtnSignup}>
                        <IconSave />
                        <View style={{ width: 16 }} />
                        <Text
                          style={{
                            fontSize: 16,
                            textAlign: 'center',
                            color: '#FFFFFF',
                            fontFamily: 'Nunito-Bold',
                          }}>
                          SAVE
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.btnSendSession3}>
                      <View style={styles.txtBtnSignup}>
                        <IconSave />
                        <View style={{ width: 16 }} />
                        <Text
                          style={{
                            fontSize: 16,
                            textAlign: 'center',
                            color: '#FFFFFF',
                            fontFamily: 'Nunito-Bold',
                          }}>
                          SAVE
                        </Text>
                      </View>
                    </View>
                  )}
                </ModalInsert.Body>
              </ScrollView>
            </ModalInsert.Container>
          </View>
        </ModalInsert>
        {/* End modal add */}

        {/* Modal pick */}
        <ModalInsert isVisible={isModalPick}>
          <StatusBar backgroundColor={'#010508'} />
          <ModalInsert.Container isPick={true}>
            <ModalInsert.Header>
              <View style={styles.headSessionModal}>
                <TouchableOpacity onPress={handleModalPickHide}>
                  <IconBack> </IconBack>
                </TouchableOpacity>
                <View style={styles.txtContainer}>
                  <Text style={styles.txtTitleModal}>{titlePick}</Text>
                </View>
                <View
                  style={{
                    width: 40,
                    height: 40,
                  }}
                />
              </View>
            </ModalInsert.Header>

            <ScrollView>
              <ModalInsert.Body isPick={true}>
                <RadioButton.Group
                  onValueChange={value => hanleHideModalPick(value, titlePick)}
                  value={valuePick}>
                  {titlePick === 'Pick tree' ? (
                    trees.map((tree, index) => (
                      <RadioButton.Item
                        color={COLORS.blue}
                        label={tree.name}
                        value={tree.name}
                      />
                    ))
                  ) : titlePick === 'Pick unit income' ? (
                    unitsIncome.map((unit, index) => (
                      <RadioButton.Item
                        color={COLORS.blue}
                        label={unit.name}
                        value={unit.name}
                      />
                    ))
                  ) : titlePick === 'Pick cost type' ? (
                    costTypes.map((costType, index) => (
                      <RadioButton.Item
                        color={COLORS.blue}
                        label={costType.name}
                        value={costType.name}
                      />
                    ))
                  ) : titlePick === 'Pick unit expense' ? (
                    unitsExpense.map((unit, index) => (
                      <RadioButton.Item
                        color={COLORS.blue}
                        label={unit.name}
                        value={unit.name}
                      />
                    ))
                  ) : (
                    <></>
                  )}
                </RadioButton.Group>
              </ModalInsert.Body>
            </ScrollView>
          </ModalInsert.Container>
        </ModalInsert>
        {/* End modal pick */}

        {/* Pop up noti and loading */}
        <PopUpSuccess
          isModalSuccess={isModalSuccess}
          titleHeader={titleHeader}
          titleBody={titleBody}
        />
        <PopUpLoading isModalSuccess={isModalLoading} />
        {/* End up noti and loading */}
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

const stylesPickDate = StyleSheet.create({
  root: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  textDay: {
    color: COLORS.text1,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
  },
});

export default Statistics;
