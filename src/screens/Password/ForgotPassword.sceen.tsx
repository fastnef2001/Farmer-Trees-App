/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import HeaderComponent from '../../components/Header/Header.component';
import IconBack from '../../assets/images/IconBack.svg';
import IconSend from '../../assets/images/IconSend.svg';
import Input from '../../components/Input/Input.component';

const ForgotPassword = ({ navigation }: any) => {
  return (
    <>
      <ScrollView>
        <HeaderComponent />
        <View style={styles.container}>
          {/* Title */}
          <View style={styles.headSession}>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}>
              <IconBack />
            </TouchableOpacity>
            <View style={{ width: 8 }} />
            <View>
              <Text style={styles.txtForgotPassword}>Forgot your password</Text>
            </View>
          </View>
          {/* Form */}
          <View style={styles.inputSession}>
            <Text
              style={{
                fontFamily: 'Nunito',
                fontSize: 14,
                fontWeight: '400',
                lineHeight: 20,
                letterSpacing: 0,
                textAlign: 'left',
                color: '#636366',
                width: '100%',
              }}>
              Enter your registered phone number below to receive password reset
              instructions.
            </Text>
            <View style={{ height: 32 }} />
            <Input
              label="Phone number"
              placeholder="+ 84"
              span="*"
              keyboardType="numeric"
              // onChangeText={nameInput => setName(nameInput)}
              // error={errorName}
            />
          </View>
          <View style={{ height: 32 }} />
          <TouchableOpacity
            style={styles.btnSendSession}
            onPress={() => navigation.navigate('OTPScreen')}>
            <View style={styles.txtBtnSignup}>
              <IconSend />
              <View style={{ width: 16 }} />
              <Text
                style={{
                  fontSize: 16,
                  textAlign: 'center',
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  marginLeft: 0,
                }}>
                SEND
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    alignItems: 'center',
    height: '100%',
  },
  headSession: {
    flexDirection: 'row',
    width: '90%',
    height: 40,
    alignContent: 'center',
    alignItems: 'center',
  },

  txtForgotPassword: {
    fontSize: 20,
    fontWeight: '700',
    color: '#163859',
    lineHeight: 28,
    textAlign: 'center',
  },
  inputSession: {
    width: '90%',
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
    padding: 16,
  },
  btnSendSession: {
    width: '90%',
    height: 48,
    backgroundColor: '#163859',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBtnSignup: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
