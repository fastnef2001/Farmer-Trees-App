/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import styles from './Login.style';
import HeaderComponent from '../../components/Header/Header.component';
import Input from '../../components/Input/Input.component';
import IconSignUp from '../../assets/images/IconSignUp.svg';
import IconGoogle from '../../assets/images/IconGoogle.svg';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const RegistrationScreen = ({ navigation }: any) => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#163859'} />
      <HeaderComponent />
      <ScrollView>
        <SafeAreaView style={styleBG as any}>
          {/* Body */}
          <View style={styles.container}>
            {/* Title */}
            <View>
              <Text style={styles.textTitleContainer}>LOGIN</Text>
            </View>
            {/* Form */}
            <View style={styles.formSectionLogin}>
              <Input
                label="Email"
                placeholder="Enter your email "
                span="*"
                // onChangeText={nameInput => setName(nameInput)}
                // error={errorName}
              />
              <Input
                label="Password"
                placeholder="Enter password"
                span="*"
                password
                // onChangeText={nameInput => setName(nameInput)}
                // error={errorName}
              />
              <View
                style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                  <Text
                    style={{
                      paddingTop: 4,
                      fontFamily: 'Nunito',
                      fontSize: 12,
                      fontWeight: '400',
                      lineHeight: 16,
                      letterSpacing: 0,
                      textAlign: 'right',
                      color: '#163859',
                    }}>
                    Did you forget your password ?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Register */}
            <View style={styles.txtBottomFormSignin}>
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
                Do not have an account?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('RegistrationScreen')}>
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
                  Register
                </Text>
              </TouchableOpacity>
            </View>

            {/* Button */}
            <TouchableOpacity
              style={styles.signinBtn}
              onPress={() => navigation.navigate('Farmname')}>
              <View style={styles.txtBtnSignup}>
                <IconSignUp />
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: 'center',
                    color: '#FFF',
                    fontWeight: 'bold',
                    marginLeft: 18,
                  }}>
                  LOGIN
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signupGoogleBtn}>
              <View style={styles.txtBtnSignup}>
                <IconGoogle />
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: 'center',
                    color: '#163859',
                    fontWeight: 'bold',
                    marginLeft: 18,
                  }}>
                  Login with Google
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

const styleBG = StyleSheet.create<any>({
  backgroundColor: '#F6F6F6',
  height: '100%',
});

export default RegistrationScreen;
