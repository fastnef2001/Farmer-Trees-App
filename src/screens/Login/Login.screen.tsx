/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import HeaderComponent from '../../components/Header/Header.component';
import Input from '../../components/Input/Input.component';
import IconSignUp from '../../assets/images/IconSignUp.svg';
import IconGoogle from '../../assets/images/IconGoogle.svg';
import styles from './Login.style';

const RegistrationScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    setErrorText('');
    setErrorEmail('');
    setErrorPassword('');
  }, []);

  GoogleSignin.configure({
    webClientId:
      '159898876320-kqda9k08g543vj86cqqq9ck78ismjiog.apps.googleusercontent.com',
  });

  const signIn = async () => {
    if (!email && !password) {
      setErrorEmail('Please enter email.');
      setErrorPassword('Please enter password.');
      return;
    } else if (!email) {
      setErrorEmail('Please enter email.');
      return;
    } else if (!password) {
      setErrorPassword('Please enter password.');
      return;
    }

    setErrorText('');

    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('Farmname');
    } catch (error: any) {
      switch (error.code) {
        case 'auth/invalid-email':
          setErrorEmail('Invalid email format.');
          break;
        case 'auth/wrong-password':
          setErrorPassword('Incorrect password.');
          break;
        case 'auth/user-not-found':
          setErrorEmail('Email does not exist.');
          break;
        default:
          setErrorText('Sign in failed. Please check again.');
          break;
      }
    }
  };

  const signByGoogle = async () => {
    const user = auth().currentUser;
    if (user) {
      await GoogleSignin.signOut();
    }

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo', userInfo);
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );

      // Check if user already exists in Firebase
      const isUserExist = await auth().fetchSignInMethodsForEmail(
        userInfo.user.email,
      );
      if (isUserExist.length === 0) {
        // If not exist, then set error
        setErrorText('Gmail is not registered.');
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        return;
      }
      // If exist, then sign in
      await auth().signInWithCredential(googleCredential);
      navigation.navigate('Farmname');
    } catch {
      setErrorText('Sign in failed. Please check again.');
    }
  };

  return (
    <>
      <HeaderComponent />
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <Text style={styles.textTitleContainer}>LOGIN</Text>

          {errorText ? (
            <Text style={{ marginTop: 16 }}>{errorText}</Text>
          ) : null}

          <View style={styles.formSectionLogin}>
            <Input
              label="Email"
              placeholder="Enter your email "
              span="*"
              value={email}
              onChangeText={(text: string) => setEmail(text)}
              error={errorEmail}
            />
            <View style={{ height: 6 }} />
            <Input
              label="Password"
              placeholder="Enter password"
              span="*"
              value={password}
              onChangeText={(text: string) => setPassword(text)}
              password={true}
              error={errorPassword}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPasswordScreen')}
              style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>
                Did you forget your password?
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.txtBottomFormSignin}>
            <Text style={styles.createAccountText}>
              Do not have an account?
            </Text>
            <View style={{ width: 8 }} />
            <TouchableOpacity
              onPress={() => navigation.navigate('RegistrationScreen')}>
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.signinBtn} onPress={signIn}>
            <View style={styles.txtBtnSignup}>
              <IconSignUp />
              <Text style={styles.btnText}>LOGIN</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signupGoogleBtn}
            onPress={signByGoogle}>
            <View style={styles.txtBtnSignup}>
              <IconGoogle />
              <Text style={styles.btnTextBlue}>Login with Google</Text>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default RegistrationScreen;
