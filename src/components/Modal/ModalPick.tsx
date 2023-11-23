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
import { RadioButton } from 'react-native-paper';
import { TreeInterface, UnitInterface } from '../../Interface/Interface';

export type ModalPickProps = {
  isModalPick: boolean;
  titlePick: string;
  valuePick: string;
  trees: TreeInterface[];
  unitsIncome: UnitInterface[];
  costTypes: UnitInterface[];
  unitsExpense: UnitInterface[];
  handlePickItem: (value?: string, title?: string) => void;
};

export const ModalPick = (
  {
    isModalPick,
    titlePick,
    valuePick,
    trees,
    unitsIncome,
    costTypes,
    unitsExpense,
    handlePickItem,
  }: ModalPickProps,
  props: any,
) => {
  return (
    <>
      <ModalInsert isVisible={isModalPick}>
        <StatusBar backgroundColor={'#010508'} />
        <ModalInsert.Container isPick={true}>
          <ModalInsert.Header>
            <View style={styles.headSessionModal}>
              <TouchableOpacity onPress={() => handlePickItem()}>
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
                onValueChange={value => handlePickItem(value, titlePick)}
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
    </>
  );
};
