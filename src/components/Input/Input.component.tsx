/* eslint-disable no-dupe-keys */
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../../theme/color';
import HidePass from '../../assets/images/iconHidePass.svg';
import UnHidePass from '../../assets/images/iconUnHidePass.svg';

const Input = ({
  label,
  span,
  error,
  value,
  password,
  onFocus = () => {},
  ...props
}: any) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(password);

  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={style.label}>{label}</Text>
        <Text style={style.span}>{span}</Text>
      </View>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.blue
              : COLORS.light,
            alignItems: 'center',
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: 48,
          }}>
          <TextInput
            placeholderTextColor="#C1C1C1"
            autoCorrect={false}
            onFocus={() => {
              onFocus();
              setIsFocused(true);
            }}
            onBlur={() => setIsFocused(false)}
            style={{
              color: COLORS.black,
              height: '100%',
              flex: 1,
            }}
            onChangeText={props.onChangeText}
            value={value}
            secureTextEntry={hidePassword}
            {...props}
          />
          {password && (
            <View>
              {hidePassword ? (
                <HidePass
                  style={{ flexDirection: 'row', justifyContent: 'flex-end' }}
                  onPress={() => setHidePassword(!hidePassword)}
                />
              ) : (
                <UnHidePass
                  style={{ flexDirection: 'row', justifyContent: 'flex-end' }}
                  onPress={() => setHidePassword(!hidePassword)}
                />
              )}
            </View>
          )}
        </View>
      </View>
      {error && (
        <Text style={{ marginTop: 7, color: COLORS.red, fontSize: 12 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 2,
    fontSize: 12,
    color: COLORS.blue,
  },
  span: {
    marginVertical: 2,
    fontSize: 14,
    color: COLORS.red,
    marginLeft: 4,
  },
  inputContainer: {
    height: 48,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 8,
    borderColor: COLORS.black,
    borderWidth: 1,
    outlineWidth: 3,
    paddingLeft: 16,
    paddingRight: 16,
    width: '100%',
  },
  placeholder: {
    color: '#C1C1C1',
  },
});

export default Input;
