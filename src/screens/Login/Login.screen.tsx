/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import {
  SafeAreaView,
  View,
  Text,
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
import { getAdditionalUserInfo } from 'firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
const RegistrationScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const signIn = async () => {
    if (!email || !password) {
      setErrorText('Please enter email and password.');
      return;
    }

    setErrorText('');

    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('Farmname');
    } catch (error: any) {
      switch (error.code) {
        case 'auth/invalid-email':
          setErrorText('Invalid email format.');
          break;
        case 'auth/wrong-password':
          setErrorText('Incorrect password.');
          break;
        case 'auth/user-not-found':
          setErrorText('Email does not exist.');
          break;
        default:
          setErrorText('Sign in failed. Please check again.');
          break;
      }
      console.error('Sign In Error: ', error);
    }
  };

  GoogleSignin.configure({
    webClientId:
      '159898876320-kqda9k08g543vj86cqqq9ck78ismjiog.apps.googleusercontent.com',
  });

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
      console.log('isUserExist', isUserExist);
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
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('user cancelled the login flow');

        // alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('operation (e.g. sign in) is in progress already');

        // alert('In Progress');

        // alert('In Progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('play services not available or outdated');

        // alert('Play services not available or outdated');
      } else {
        console.log('some other error happened');

        // alert('Some other error happened');
      }
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
            {errorText ? (
              <View style={{ marginTop: 16 }}>
                <Text style={{ color: 'red' }}>{errorText}</Text>
              </View>
            ) : null}
            {/* Form */}
            <View style={styles.formSectionLogin}>
              <Input
                label="Email"
                placeholder="Enter your email "
                span="*"
                value={email}
                onChangeText={(text: string) => setEmail(text)}
                // onChangeText={nameInput => setName(nameInput)}
                // error={errorName}
              />
              <Input
                label="Password"
                placeholder="Enter password"
                span="*"
                value={password}
                onChangeText={(text: string) => setPassword(text)}
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
            <TouchableOpacity
              style={styles.signupGoogleBtn}
              onPress={signByGoogle}>
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
