import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import styles from './Login.style';
import HeaderComponent from '../../components/Header/Header.component';
import Input from '../../components/Input/Input.component';
import IconSignUp from '../../assets/images/IconSignUp.svg';
import IconGoogle from '../../assets/images/IconGoogle.svg';

const RegistrationScreen = ({ navigation }: any) => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#163859'} />
      <SafeAreaView style={styleLogin as any}>
        <HeaderComponent />
        <View style={{ alignItems: 'center' }}>
          <View style={{ marginTop: 12 }}>
            <Text style={styles.textTitleContainer}>LOGIN</Text>
          </View>
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
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Text
                style={{
                  fontSize: 14,
                  marginRight: 24,
                  marginTop: 4,
                  lineHeight: 20,
                }}>
                Forget password
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.txtBottomFormSignin}>
          <Text style={{ fontSize: 16, marginRight: 4 }}>
            Do you already have an account?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegistrationScreen')}>
            <Text
              style={{ fontSize: 16, color: '#163859', fontWeight: 'bold' }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity style={styles.signinBtn}>
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
    </>
  );
};

const styleLogin = StyleSheet.create<any>({
  backgroundColor: '#FFFFFF',
  height: '100%',
});

export default RegistrationScreen;
