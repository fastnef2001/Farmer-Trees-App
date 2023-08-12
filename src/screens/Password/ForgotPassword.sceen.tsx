import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import HeaderComponent from '../../components/Header/Header.component';
import IconBack from '../../assets/images/IconBack.svg';
import IconSend from '../../assets/images/IconSend.svg';
import Input from '../../components/Input/Input.component';

const ForgotPassword = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <HeaderComponent />
      <View style={styles.headSession}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
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
          <Text style={styles.txtForgotPassword}>Forgot your password</Text>
        </View>
      </View>
      <View style={styles.inputSession}>
        <Text
          style={{
            marginTop: 18,
            lineHeight: 20,
            fontSize: 14,
            fontWeight: '400',
            color: '#636366',
          }}>
          Enter your registered phone number below to receive password reset
          instructions.
        </Text>
        <View style={{ marginTop: 16, width: '100%' }}>
          <Input
            label="Phone number"
            placeholder="+ 84"
            span="*"
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

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
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
    textAlign: 'center',
  },
  inputSession: {
    width: 360,
    height: 170,
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
    marginTop: 46,
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
