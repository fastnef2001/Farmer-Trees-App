import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import IconSignUp from '../../assets/images/IconSignUp.svg';
import IconBack from '../../assets/images/IconBack.svg';

export type ButtonProps = {
  title: string;
  isRight: boolean;
  isLogin?: boolean;
  onPress: () => void;
};
export const Button = ({ isLogin, isRight, title, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={isRight ? styles.button : styles.buttonLeft}
      onPress={onPress}>
      <View>
        {isLogin ? (
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <IconSignUp style={{ marginRight: 8 }} />
            <Text style={isRight ? styles.text : styles.textLeft}>{title}</Text>
          </View>
        ) : (
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <IconBack style={{ marginRight: 8 }} />
            <Text style={isRight ? styles.text : styles.textLeft}>{title}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#163859',
    marginTop: 15,
    paddingVertical: 15,
    borderRadius: 15,
    marginRight: 10,
    width: '42%',
    alignItems: 'center',
  },
  buttonLeft: {
    backgroundColor: '#FFFFFF',
    marginTop: 15,
    paddingVertical: 15,
    borderRadius: 15,
    marginLeft: 10,
    width: '42%',
    alignItems: 'center',
    borderColor: '#163859',
    borderWidth: 1,
  },
  text: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  textLeft: {
    color: '#163859',
    fontWeight: '700',
    fontSize: 18,
  },
});
