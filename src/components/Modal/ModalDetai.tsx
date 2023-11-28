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
import { ButtonEdit, ButtonDelete } from '../Button/Button';
import { COLORS } from '../../theme/color';
import {
  DataExpenseInterface,
  DataIncomeInterface,
} from '../../Interface/Interface';

export type ModalAddProps = {
  isModaDetail: boolean;
  handlePressDetail: () => void;
  titleDetail: string;
  itemIncome?: DataIncomeInterface;
  itemExpense?: DataExpenseInterface;
  editItem: () => void;
  handleModalDele: () => void;
};

export const ModalDetail = ({
  isModaDetail,
  handlePressDetail,
  titleDetail,
  itemIncome,
  itemExpense,
  editItem,
  handleModalDele,
}: ModalAddProps) => {
  return (
    <>
      <ModalInsert isVisible={isModaDetail} isPick={false}>
        <StatusBar backgroundColor={'#07111B'} />
        <View style={{ flex: 1 }}>
          <ModalInsert.Container>
            <ModalInsert.Header>
              <View style={styleAddtree.headSessionModal}>
                <TouchableOpacity onPress={handlePressDetail}>
                  <IconBack> </IconBack>
                </TouchableOpacity>
                <View style={styleAddtree.txtContainer}>
                  <Text style={styleAddtree.txtTitleModal1}>{titleDetail}</Text>
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
                        {titleDetail === 'Income Detail'
                          ? itemIncome?.date
                          : itemExpense?.date}
                      </Text>
                      <View style={{ width: 4 }} />
                      <IconCalendar />
                    </View>
                    <Text style={styles1.priceText}>
                      {titleDetail === 'Income Detail'
                        ? itemIncome?.totalPrice
                        : itemExpense?.totalPrice}
                      $
                    </Text>
                  </View>
                  <View style={{ height: 16 }} />
                  <View style={styles1.row2}>
                    <Text style={styles1.title}>
                      {titleDetail === 'Income Detail' ? 'Tree:' : 'Cost type:'}
                    </Text>
                    <View style={{ width: 8 }} />
                    <Text style={styles1.titleText}>
                      {titleDetail === 'Income Detail'
                        ? itemIncome?.tree
                        : itemExpense?.costType}
                    </Text>
                  </View>
                  <View style={{ height: 16 }} />
                  <View style={styles1.row2}>
                    <Text style={styles1.title}>{'Quantity:'}</Text>
                    <View style={{ width: 8 }} />
                    <Text style={styles1.titleText}>
                      {titleDetail === 'Income Detail'
                        ? `${itemIncome?.quantity} ${itemIncome?.unit}`
                        : `${itemExpense?.quantity} ${itemExpense?.unit}`}
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
                  <ButtonDelete title="DELETE" onPress={handleModalDele} />

                  <View style={{ width: 16 }} />
                  <ButtonEdit title="EDIT" onPress={editItem} />
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
