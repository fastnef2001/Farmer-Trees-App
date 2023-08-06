import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import HeaderComponent from '../../components/Header/Header.component';
import IconBack from '../../assets/images/IconBack.svg';
import Input from '../../components/Input/Input.component';
import IconSend from '../../assets/images/IconSend.svg';

const ChangePassword = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <HeaderComponent />
      <View style={styles.headSession}>
        <TouchableOpacity onPress={() => navigation.navigate('OTPScreen')}>
          <IconBack
            style={{
              alignItems: 'center',
              marginLeft: 18,
              width: '100%',
              marginTop: 2,
            }}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.txtForgotPassword}>Create new password</Text>
        </View>
      </View>
      <View style={styles.inputSession}>
        <View style={{ marginTop: 16, width: '100%' }}>
          <Input
            label="New Password"
            span="*"
            password
            placeholder="Enter new password"
            // onChangeText={nameInput => setName(nameInput)}
            // error={errorName}
          />
        </View>
        <View style={{ marginTop: 16, width: '100%' }}>
          <Input
            label="Confirm Password"
            password
            span="*"
            placeholder="Enter confirm password"
            // onChangeText={nameInput => setName(nameInput)}
            // error={errorName}
          />
        </View>
        <TouchableOpacity
          style={styles.btnSendSession}
          onPress={() => navigation.navigate('OTPScreen')}>
          <View style={styles.txtBtnSignup}>
            <IconSend />
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                color: '#FFFFFF',
                fontWeight: 'bold',
                marginLeft: 18,
              }}>
              SEND
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
  headSession: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 14,
    height: 40,
  },
  txtForgotPassword: {
    marginLeft: 20,
    fontSize: 20,
    fontWeight: '700',
    color: '#163859',
    lineHeight: 28,
  },
  inputSession: {
    width: 360,
    height: 240,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 24,
    borderRadius: 15,
    shadowColor: '#000',
    elevation: 4,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: -2, height: 4 },
  },
  btnSendSession: {
    marginTop: 76,
    width: '100%',
    height: 48,
    backgroundColor: '#163859',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  txtBtnSignup: {
    marginTop: 12,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
