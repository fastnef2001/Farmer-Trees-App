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
import { firebase } from '@react-native-firebase/auth';

const ForgotPassword = ({ navigation }: any) => {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const handleVerifyPhoneNumber = () => {
    firebase
      .auth()
      .verifyPhoneNumber(phoneNumber)
      .on('state_changed', phoneAuthSnapshot => {
        switch (phoneAuthSnapshot.state) {
          case firebase.auth.PhoneAuthState.CODE_SENT:
            console.log('code sent');
            break;
          case firebase.auth.PhoneAuthState.ERROR:
            console.log('verification error');
            console.log(phoneAuthSnapshot.error);
            break;
          case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT:
            console.log('auto verify on android timed out');
            break;
          case firebase.auth.PhoneAuthState.AUTO_VERIFIED:
            console.log('auto verified on android');
            console.log(phoneAuthSnapshot);
            break;
        }
      });
  };

  return (
    <>
      <ScrollView>
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
                fontFamily: 'Nunito-Regular',
                fontSize: 14,
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
              onChangeText={(nameInput: any) => setPhoneNumber(nameInput)}
              // error={errorName}
            />
          </View>
          <View style={{ height: 32 }} />
          <TouchableOpacity
            style={styles.btnSendSession}
            onPress={handleVerifyPhoneNumber}>
            <View style={styles.txtBtnSignup}>
              <IconSend />
              <View style={{ width: 16 }} />
              <Text
                style={{
                  fontSize: 16,
                  textAlign: 'center',
                  color: '#FFFFFF',
                  marginLeft: 0,
                  fontFamily: 'Nunito-Bold',
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
    color: '#163859',
    lineHeight: 28,
    textAlign: 'center',
    fontFamily: 'Nunito-Bold',
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
