import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import HeaderComponent from '../../components/Header/Header.component';
import IconBack from '../../assets/images/IconBack.svg';
import IconVerify from '../../assets/images/IconVerify.svg';
import Input from '../../components/Input/Input.component';
import OTPTextView from 'react-native-otp-textinput';

const OTPScreen = ({ navigation }: any) => {
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
          <Text style={styles.txtForgotPassword}>Verify with OTP</Text>
        </View>
      </View>
      <View style={styles.inputSession}>
        <Text
          style={{
            marginTop: 18,
            marginLeft: 18,
            width: '100%',
            lineHeight: 20,
            fontSize: 14,
            fontWeight: '400',
            color: '#636366',
          }}>
          OTP code has been sent to 0869889453
        </Text>
        <View
          style={{
            marginTop: 16,
            width: 300,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <OTPTextView
            inputCount={5}
            containerStyle={styles.textInputContainer}
            textInputStyle={styles.roundedTextInput}
            tintColor="#636366"
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity
          style={styles.btnSendSession}
          onPress={() => navigation.navigate('ChangePassword')}>
          <View style={styles.txtBtnSignup}>
            <IconVerify />
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                color: '#FFFFFF',
                fontWeight: 'bold',
                marginLeft: 18,
              }}>
              VERIFY
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 15,
          width: 400,
          marginLeft: 28,
          marginHorizontal: 8,
        }}>
        <Text style={{ fontWeight: '400', fontSize: 14, lineHeight: 20 }}>
          Did not you receive the OTP code?
        </Text>
        <TouchableOpacity style={{ marginLeft: 8 }}>
          <Text
            style={{
              color: '#163859',
              fontWeight: '400',
              fontSize: 14,
              lineHeight: 20,
            }}>
            Resend code
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OTPScreen;

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
    height: 170,
    backgroundColor: '#FFFFFF',
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
    marginTop: 86,
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
  textInputContainer: {
    marginLeft: 55,
    marginBottom: 18,
    marginTop: 18,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4,
  },
});
