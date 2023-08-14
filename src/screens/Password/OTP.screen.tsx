/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import HeaderComponent from '../../components/Header/Header.component';
import IconBack from '../../assets/images/IconBack.svg';
import IconVerify from '../../assets/images/IconVerify.svg';
import OTPTextView from 'react-native-otp-textinput';
import { ScrollView } from 'react-native-gesture-handler';

const OTPScreen = ({ navigation }: any) => {
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
              <Text style={styles.txtForgotPassword}>Verify with OTP</Text>
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
              OTP code has been sent to 0869889453
            </Text>
            <View style={{ height: 32 }} />
            <View style={styles.containerOTP}>
              <OTPTextView
                inputCount={5}
                textInputStyle={styles.roundedTextInput}
                tintColor="#163859"
                keyboardType="numeric"
              />
            </View>
          </View>
          {/* ResendOTP */}
          <View style={styles.txtBottomFormResend}>
            <Text
              style={{
                fontFamily: 'Nunito',
                fontSize: 14,
                fontWeight: '500',
                lineHeight: 20,
                letterSpacing: 0,
                textAlign: 'left',
                color: '#636366',
              }}>
              Did not you receive the OTP?{' '}
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Nunito',
                  fontSize: 14,
                  fontWeight: 'bold',
                  lineHeight: 20,
                  letterSpacing: 0,
                  textAlign: 'left',
                  color: '#163859',
                }}>
                Resend
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.btnSendSession}
            onPress={() => navigation.navigate('ChangePassword')}>
            <View style={styles.txtBtnSignup}>
              <IconVerify />
              <View style={{ width: 16 }} />
              <Text
                style={{
                  fontSize: 16,
                  textAlign: 'center',
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                }}>
                VERIFY
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  containerOTP: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    marginTop: 16,
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
  },
  inputSession: {
    width: '90%',
    padding: 16,
    height: 170,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    marginTop: 32,
    borderRadius: 15,
    shadowColor: '#000',
    elevation: 4,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: -2, height: 4 },
  },
  btnSendSession: {
    width: '90%',
    height: 48,
    backgroundColor: '#163859',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBtnSignup: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  roundedTextInput: {
    width: 45,
    height: 45,
    borderRadius: 8,
    borderColor: '#163859',
    borderWidth: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#163859',
    fontFamily: 'Nunito',
  },
  txtBottomFormResend: {
    width: '90%',
    paddingTop: 16,
    paddingBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
