/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
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
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(newUser => {
      setUser(newUser);
    });

    return unsubscribe; // Huỷ đăng ký theo dõi
  }, []);

  const signIn = async () => {
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      setUser(response.user);
      navigation.navigate('Farmname');
    } catch (error) {
      console.error('Sign In Error: ', error);
    }
  };

  const signOut = async () => {
    try {
      await auth().signOut();
      setUser(null);
    } catch (error) {
      console.error('Sign Out Error: ', error);
    }
  };
  return (
    <>
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
                value={email}
                onChangeText={text => setEmail(text)}
                // onChangeText={nameInput => setName(nameInput)}
                // error={errorName}
              />
              <Input
                label="Password"
                placeholder="Enter password"
                span="*"
                value={password}
                onChangeText={text => setPassword(text)}
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
            <TouchableOpacity style={styles.signinBtn} onPress={signIn}>
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
