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
import { ButtonEdit, ButtonDelete } from '../Button/Button';
import { COLORS } from '../../theme/color';
import {
  DataExpenseInterface,
  DataIncomeInterface,
} from '../../screens/Statistics/Statistics.interface';

export type ModalAddProps = {
  isModaDetail: boolean;
  handleModalDetail: () => void;
  titleModalAdd: string;
  item?: DataExpenseInterface | undefined;
  itemIncome?: DataIncomeInterface | undefined;
  deleteItem: (key: string) => void;
  editItem: () => void;
  //   handlePickDate: (type: string) => () => void;
  //   selectedDateIncome: string;
  //   selectedDateExpense: string;
  //   handleModalPickTree: () => void;
  //   handleModalPickUnitIncome: () => void;
  //   handleModalPickUnitExpense: () => void;
  //   handleModalPickCostType: () => void;
  //   handleInputChange: (index: number, text: string) => void;
  //   handleAdd: (type: string) => void;
  //   inputs: {
  //     label: string;
  //     value: string;
  //     error: string;
  //   }[];
  //   isDisabled: boolean;
};

export const ModalDetail = ({
  isModaDetail,
  handleModalDetail,
  titleModalAdd,
  item,
  itemIncome,
  deleteItem,
  editItem,
}: ModalAddProps) => {
  //   handleHideModalAdd,
  //   titleModalAdd,
  //   handlePickDate,
  //   selectedDateIncome,
  //   selectedDateExpense,
  //   handleModalPickTree,
  //   handleModalPickUnitIncome,
  //   handleModalPickUnitExpense,
  //   handleModalPickCostType,
  //   handleInputChange,
  //   handleAdd,
  //   inputs,
  //   isDisabled,
  const key = item?.key;

  return (
    <>
      <ModalInsert isVisible={isModaDetail} isPick={false}>
        <StatusBar backgroundColor={'#07111B'} />
        <View style={{ flex: 1 }}>
          <ModalInsert.Container>
            <ModalInsert.Header>
              <View style={styles.headSessionModal}>
                <TouchableOpacity onPress={handleModalDetail}>
                  <IconBack> </IconBack>
                </TouchableOpacity>
                <View style={styles.txtContainer}>
                  {titleModalAdd === 'Detail income' ? (
                    <Text style={styles.txtTitleModal1}>Detail income</Text>
                  ) : (
                    <Text style={styles.txtTitleModal2}>Detail expense</Text>
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
                <View style={styles1.root}>
                  <View style={styles1.row1}>
                    <View style={styles1.date}>
                      <Text style={styles1.dateText}>
                        {titleModalAdd === 'Detail income'
                          ? itemIncome?.date
                          : item?.date}
                      </Text>
                      <View style={{ width: 4 }} />
                      <IconCalendar />
                    </View>
                    <Text style={styles1.priceText}>
                      {titleModalAdd === 'Detail income'
                        ? itemIncome?.totalPrice
                        : item?.totalPrice}
                      $
                    </Text>
                  </View>
                  <View style={{ height: 16 }} />
                  <View style={styles1.row2}>
                    <Text style={styles1.title}>
                      {titleModalAdd === 'Detail income'
                        ? 'Tree:'
                        : 'Cost type:'}
                    </Text>
                    <View style={{ width: 8 }} />
                    <Text style={styles1.titleText}>
                      {titleModalAdd === 'Detail income'
                        ? itemIncome?.tree
                        : item?.costType}
                    </Text>
                  </View>
                  <View style={{ height: 16 }} />
                  <View style={styles1.row2}>
                    <Text style={styles1.title}>{'Quantity:'}</Text>
                    <View style={{ width: 8 }} />
                    <Text style={styles1.titleText}>
                      {titleModalAdd === 'Detail income'
                        ? itemIncome?.quantityInKilograms
                        : item?.quantity}
                    </Text>
                    <View style={{ width: 8 }} />
                    <Text style={styles1.titleText}>
                      {titleModalAdd === 'Detail income' ? '' : item?.unit}
                    </Text>
                  </View>
                  <View style={{ height: 8 }} />
                </View>
              </ModalInsert.Body>
              <ModalInsert.Footer>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 8,
                  }}>
                  <ButtonDelete
                    isRight={true}
                    isDelete={true}
                    title="DELETE"
                    // nếu là income thì truyền vào itemIncome?.key
                    // nếu là expense thì truyền vào item?.key
                    onPress={() => deleteItem(key || '')}
                  />
                  <View style={{ width: 16 }} />
                  <ButtonEdit
                    isRight={false}
                    isDelete={false}
                    title="EDIT"
                    onPress={editItem}
                  />
                </View>
              </ModalInsert.Footer>
            </ScrollView>
          </ModalInsert.Container>
        </View>
      </ModalInsert>
    </>
  );
};

const styles1 = StyleSheet.create({
  root: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    rowGap: 224,
    columnGap: 224,
    borderBottomColor: 'rgba(244, 244, 244, 1)',
    borderBottomWidth: 1,
    marginVertical: 16,
  },
  dateText: {
    color: COLORS.text1,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    rowGap: 112,
    columnGap: 112,
  },
  priceText: {
    overflow: 'hidden',
    color: COLORS.green,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 20,
  },
  title: {
    color: COLORS.text2,
    fontFamily: 'Nunito-Medium',
    fontSize: 16,
  },
  titleText: {
    color: COLORS.text1,
    fontFamily: 'Nunito-Medium',
    fontSize: 16,
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    rowGap: 112,
    columnGap: 112,
  },
});
