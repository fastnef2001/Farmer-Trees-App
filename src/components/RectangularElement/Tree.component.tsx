/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

import IconDelete20 from '../../assets/images/IconDelete20.svg';
import IconCalculate20 from '../../assets/images/IconCalculate20.svg';
import IconEdit20 from '../../assets/images/IconEdit20.svg';

export type ButtonProps = {
  nameTree: string;
  numberTree: string;
  urlImage: string;
  caculate: boolean;
  onPressDelete: () => void;
  onPressEdit: () => void;
  onPressCalculate: () => void;
};

const RectangularTree = ({
  onPressCalculate,
  onPressDelete,
  onPressEdit,
  nameTree,
  numberTree,
  urlImage,
  caculate,
  ...props
}: ButtonProps) => {
  return (
    <View style={styles.root}>
      {urlImage.length <= 0 ? (
        <Image
          source={require('../../assets/images/AvatarSquare.png')}
          style={{ width: 60, height: 60 }}
        />
      ) : (
        <Image
          // đọc url từ firebase
          source={{
            uri: urlImage,
          }}
          style={{ width: 60, height: 60, borderRadius: 8 }}
        />
      )}

      <View style={{ width: 8 }} />
      <View style={styles.group8182}>
        <Text style={styles.nameTree}>{nameTree}</Text>
        <View style={{ height: 8 }} />
        <Text style={styles.numberTree}>{numberTree} Trees</Text>
      </View>
      <View style={{ width: 8 }} />
      <View style={styles.frame48183}>
        <View style={styles.frame48295}>
          {caculate ? (
            <TouchableOpacity
              onPress={onPressCalculate}
              style={{
                height: 40,
                width: 40,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: 12,
                shadowColor: '#000000',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 2,
              }}>
              <IconCalculate20 />
            </TouchableOpacity>
          ) : null}
          <View style={{ width: 8 }} />
          <TouchableOpacity
            onPress={onPressEdit}
            style={{
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 2,
            }}>
            <IconEdit20 />
          </TouchableOpacity>
          <View style={{ width: 8 }} />
          <TouchableOpacity
            onPress={onPressDelete}
            style={{
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 2,
            }}>
            <IconDelete20 />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    padding: 8,
    marginBottom: 8,
    borderRadius: 12,
  },
  numberTree: {
    color: '#636366',
    fontSize: 14,
    fontStyle: 'normal',
    fontFamily: 'Nunito-Regular',
  },
  group8182: {
    width: '100%',
    height: 49,
    flex: 1,
  },
  nameTree: {
    width: '100%',
    color: '#163859',
    fontSize: 16,
    fontStyle: 'normal',
    height: 22,
    fontFamily: 'Nunito-SemiBold',
  },
  frame48183: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 12,
  },
  frame48295: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
});

export default RectangularTree;
