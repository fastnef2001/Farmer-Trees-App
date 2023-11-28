import React from 'react';
import { ModalInsert } from './ModalInsert';
import { ScrollView, StatusBar, TouchableOpacity, View } from 'react-native';
import { styleAddtree } from '../../screens/Setupfarm/Style';
import { Text } from 'react-native';
import IconBack from '../../assets/images/IconBack.svg';
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
    unitsExpense,
    costTypes,
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
            <View style={styleAddtree.headSessionModal}>
              <TouchableOpacity onPress={() => handlePickItem()}>
                <IconBack> </IconBack>
              </TouchableOpacity>
              <View style={styleAddtree.txtContainer}>
                <Text style={styleAddtree.txtTitleModal}>{titlePick}</Text>
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
                ) : titlePick === 'Pick cost type filter' ? (
                  costTypes.map((costType, index) => (
                    <RadioButton.Item
                      color={COLORS.blue}
                      label={costType.name}
                      value={costType.name}
                    />
                  ))
                ) : titlePick === 'Pick tree filter' ? (
                  trees.map((tree, index) => (
                    <RadioButton.Item
                      color={COLORS.blue}
                      label={tree.name}
                      value={tree.name}
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
