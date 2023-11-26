import React from 'react';
import { ModalInsert } from './ModalInsert';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { styleAddtree } from '../../screens/Setupfarm/Style';
import { Text } from 'react-native';
import IconBack from '../../assets/images/IconBack.svg';
import IconCalendar from '../../assets/images/IconCalendar.svg';
import Input from '../../components/Input/Input.component';
import IconSave from '../../assets/images/IconSave.svg';
import { COLORS } from '../../theme/color';

export type ModalAddProps = {
  isModalAdd: boolean;
  handleBack: () => void;
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
  handleEditItem: (title: string) => void;
};

const ModalTypes = {
  ADD_INCOME: 'Add income',
  ADD_EXPENSE: 'Add expense',
  EDIT_INCOME: 'Edit income',
  EDIT_EXPENSE: 'Edit expense',
};
export const ModalAdd = ({
  isModalAdd,
  handleBack,
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
  handleEditItem,
}: ModalAddProps) => {
  const renderTitle = () => {
    switch (titleModalAdd) {
      case ModalTypes.ADD_INCOME:
        return <Text style={styleAddtree.txtTitleModal1}>Add income</Text>;
      case ModalTypes.ADD_EXPENSE:
        return <Text style={styleAddtree.txtTitleModal2}>Add expense</Text>;
      case ModalTypes.EDIT_INCOME:
        return <Text style={styleAddtree.txtTitleModal1}>Edit income</Text>;
      case ModalTypes.EDIT_EXPENSE:
        return <Text style={styleAddtree.txtTitleModal2}>Edit expense</Text>;
      default:
        return null;
    }
  };

  const renderDatePicker = () => {
    const handlePickDateFunc =
      titleModalAdd === ModalTypes.ADD_INCOME ||
      titleModalAdd === ModalTypes.EDIT_INCOME
        ? () => handlePickDate('incomeDate')
        : () => handlePickDate('expenseDate');

    const selectedDate =
      titleModalAdd === ModalTypes.ADD_INCOME ||
      titleModalAdd === ModalTypes.EDIT_INCOME
        ? selectedDateIncome
        : selectedDateExpense;

    return (
      <TouchableOpacity
        style={stylesPickDate.root}
        onPress={handlePickDateFunc}>
        <Text style={stylesPickDate.textDay}>{selectedDate}</Text>
        <View style={{ width: 8 }} />
        <IconCalendar />
      </TouchableOpacity>
    );
  };

  const renderInput = (input: any, index: any) => {
    const incomeCondition =
      titleModalAdd === ModalTypes.ADD_INCOME ||
      titleModalAdd === ModalTypes.EDIT_INCOME;

    const handleModalPick =
      input.label === 'Tree'
        ? handleModalPickTree
        : input.label === 'Unit'
        ? incomeCondition
          ? handleModalPickUnitIncome
          : handleModalPickUnitExpense
        : input.label === 'Cost type'
        ? handleModalPickCostType
        : () => {};

    const isDropdown =
      input.label === 'Tree' ||
      input.label === 'Unit' ||
      input.label === 'Cost type';

    const textPlaceholder = isDropdown
      ? `Choose ${input.label.toLowerCase()}`
      : `Enter your ${input.label.toLowerCase()}`;

    const editableCondition =
      input.label === 'Tree' ||
      input.label === 'Cost type' ||
      input.label === 'Unit'
        ? false
        : true;

    return (
      <Input
        onPress={handleModalPick}
        label={input.label}
        textPlaceholder={textPlaceholder}
        value={input.value}
        onChangeText={(text: string) => handleInputChange(index, text)}
        dropDown={isDropdown}
        iconDolar={input.label === 'Total price'}
        textError={input.error}
        keyboardType={
          input.label === 'Quantity' || input.label === 'Total price'
            ? 'numeric'
            : 'default'
        }
        span="*"
        editable={editableCondition}
      />
    );
  };

  const renderSaveButton = () => {
    const handleAction =
      titleModalAdd === ModalTypes.ADD_INCOME
        ? () => handleAdd('income')
        : titleModalAdd === ModalTypes.EDIT_INCOME
        ? () => handleEditItem('income')
        : titleModalAdd === ModalTypes.ADD_EXPENSE
        ? () => handleAdd('expense')
        : () => handleEditItem('expense');

    const buttonStyle =
      titleModalAdd === ModalTypes.ADD_INCOME ||
      titleModalAdd === ModalTypes.EDIT_INCOME
        ? styleAddtree.btnSendSession1
        : styleAddtree.btnSendSession2;

    const disabledButtonStyle = {
      ...buttonStyle,
      backgroundColor: isDisabled ? '#A9A9A9' : buttonStyle.backgroundColor,
    };

    return (
      <TouchableOpacity
        style={isDisabled ? disabledButtonStyle : buttonStyle}
        onPress={handleAction}
        disabled={isDisabled}>
        <View style={styleAddtree.txtBtnSignup}>
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
    );
  };

  return (
    <>
      <ModalInsert isVisible={isModalAdd} isPick={false}>
        <StatusBar backgroundColor={'#07111B'} />
        <View style={{ flex: 1 }}>
          <ModalInsert.Container>
            <ModalInsert.Header>
              <View style={styleAddtree.headSessionModal}>
                <TouchableOpacity onPress={handleBack}>
                  <IconBack> </IconBack>
                </TouchableOpacity>
                <View style={styleAddtree.txtContainer}>{renderTitle()}</View>
                <View style={{ width: 40, height: 40 }} />
              </View>
            </ModalInsert.Header>
            <ScrollView>
              <ModalInsert.Body>
                <View style={styleAddtree.inputSession}>
                  {renderDatePicker()}
                  <View style={{ height: 8 }} />
                  {inputs.map((input, index) => (
                    <View key={index}>{renderInput(input, index)}</View>
                  ))}
                </View>
                {renderSaveButton()}
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
