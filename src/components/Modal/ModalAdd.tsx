import React from 'react';
import { ModalInsert } from './ModalInsert';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../../screens/Setupfarm/Addtree.style';
import { Text } from 'react-native';
import IconBack from '../../assets/images/IconBack.svg';
import IconCalendar from '../../assets/images/IconCalendar.svg';
import Input from '../../components/Input/Input.component';
import IconSave from '../../assets/images/IconSave.svg';
import { COLORS } from '../../theme/color';

export type ModalAddProps = {
  isModaAdd: boolean;
  handleModalAddItem: (title?: string) => void;
  titleModalAdd: string;
  handlePickDate: (type: string) => () => void;
  selectedDateIncome: string;
  selectedDateExpense: string;
  handleModalPickTree: () => void;
  handleModalPickUnitIncome: () => void;
  handleModalPickUnitExpense: () => void;
  handleModalPickCostType: () => void;
  handleInputChange: (index: number, text: string) => void;
  handleAdd: (type: string) => void;
  inputs: {
    label: string;
    value: string;
    error: string;
  }[];
  isDisabled: boolean;
};

export const ModalAdd = ({
  isModaAdd,
  handleModalAddItem,
  titleModalAdd,
  handlePickDate,
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
}: ModalAddProps) => {
  return (
    <>
      <ModalInsert isVisible={isModaAdd} isPick={false}>
        <StatusBar backgroundColor={'#07111B'} />
        <View style={{ flex: 1 }}>
          <ModalInsert.Container>
            <ModalInsert.Header>
              <View style={styles.headSessionModal}>
                <TouchableOpacity
                  onPress={() => {
                    handleModalAddItem();
                  }}>
                  <IconBack> </IconBack>
                </TouchableOpacity>
                <View style={styles.txtContainer}>
                  {titleModalAdd === 'Add income' ? (
                    <Text style={styles.txtTitleModal1}>Add income</Text>
                  ) : titleModalAdd === 'Add expense' ? (
                    <Text style={styles.txtTitleModal2}>Add expense</Text>
                  ) : titleModalAdd === 'Edit income' ? (
                    <Text style={styles.txtTitleModal1}>Edit income</Text>
                  ) : (
                    <Text style={styles.txtTitleModal2}>Edit expense</Text>
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
                  {titleModalAdd === 'Add income' ||
                  titleModalAdd === 'Edit income' ? (
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
                      {titleModalAdd === 'Add income' ||
                      titleModalAdd === 'Edit income' ? (
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
                {(titleModalAdd === 'Add income' && isDisabled === false) ||
                (titleModalAdd === 'Edit income' && isDisabled === false) ? (
                  <TouchableOpacity
                    style={styles.btnSendSession1}
                    // if titleModalAdd === 'Add income' ? handleAdd('income') : handleAdd('Add expense')
                    onPress={
                      titleModalAdd === 'Add income'
                        ? () => handleAdd('income')
                        : () => handleAdd('incomeEdit')
                    }>
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
                ) : (titleModalAdd === 'Add expense' && isDisabled === false) ||
                  (titleModalAdd === 'Edit expense' && isDisabled === false) ? (
                  <TouchableOpacity
                    style={styles.btnSendSession2}
                    onPress={
                      titleModalAdd === 'Add expense'
                        ? () => handleAdd('expense')
                        : () => handleAdd('expenseEdit')
                    }>
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
    </>
  );
};

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
