/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import HeaderComponent from '../../components/Header/Header.component';
import Input from '../../components/Input/Input.component';
import IconSignUp from '../../assets/images/IconSignUp.svg';
import IconGoogle from '../../assets/images/IconGoogle.svg';
import styles from './Login.style';
import firestore from '@react-native-firebase/firestore';
import RNRestart from 'react-native-restart';
import Logo55 from '../../assets/images/Logo55.svg';

const RegistrationScreen = ({ navigation }: any) => {
  const [errorText, setErrorText] = useState('');
  const [isFarmName, setFarmName] = useState('');
  const [inputs, setInputs] = useState([
    { label: 'Email', value: '', error: '' },
    { label: 'Password', value: '', error: '' },
  ]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setErrorText('');
      setInputs(
        inputs.map(input => ({
          ...input,
          error: '',
        })),
      );
    });
    return unsubscribe;
  }, [inputs, navigation]);

  const handleInputChange = (index: any, value: any) => {
    const newInputs = [...inputs];
    newInputs[index].value = value;
    newInputs[index].error = '';
    setInputs(newInputs);
  };

  GoogleSignin.configure({
    webClientId:
      '159898876320-kqda9k08g543vj86cqqq9ck78ismjiog.apps.googleusercontent.com',
  });

  const signIn = async () => {
    setErrorText('');
    const emailInput = inputs.find(input => input.label === 'Email');
    const passwordInput = inputs.find(input => input.label === 'Password');
    // Check if any input is empty
    if (!emailInput?.value || !passwordInput?.value) {
      setInputs(
        inputs.map(input => ({
          ...input,
          error: !input.value ? `Please enter ${input.label}` : '',
        })),
      );
      return;
    }
    // Check if email is valid. validate email format strongly. badly formatted email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(emailInput?.value) || emailInput.value.endsWith('.')) {
      setInputs(
        inputs.map(input => ({
          ...input,
          error: input.label === 'Email' ? 'Email is invalid.' : '',
        })),
      );
      return;
    }
    // check mail not exist
    const isUserExist = await auth().fetchSignInMethodsForEmail(
      emailInput?.value,
    );
    if (isUserExist.length === 0) {
      setInputs(
        inputs.map(input => ({
          ...input,
          error: input.label === 'Email' ? 'Email does not exist.' : '',
        })),
      );
      return;
    }

    try {
      await auth().signInWithEmailAndPassword(
        emailInput?.value,
        passwordInput?.value,
      );
      checkFarmName();
    } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        setInputs(
          inputs.map(input => ({
            ...input,
            error: input.label === 'Password' ? 'Wrong password.' : '',
          })),
        );
      } else {
        setErrorText('Sign in failed. Please check again.');
      }
    }
  };

  const signByGoogle = async () => {
    try {
      await GoogleSignin.revokeAccess();
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
      checkFarmName();
    } catch {
      setErrorText('Sign in failed. Please check again.');
    }
  };

  const checkUser = async () => {
    const user = auth().currentUser;
    console.log('user11111111111111111', user);
  };

  const checkFarmName = async () => {
    const user = auth().currentUser;
    await firestore()
      .collection('users')
      .doc(user?.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setFarmName(documentSnapshot.data()?.farmName);
        }
      });

    if (isFarmName) {
      navigation.navigate('Tabs');
    } else {
      navigation.navigate('Farmname');
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#f9f9f9'} />
      <ScrollView style={{ paddingTop: '20%' }}>
        <SafeAreaView style={styles.container}>
          <Logo55 />
          <Text style={styles.textTitleContainer}>LOGIN</Text>

          {errorText ? (
            <Text style={{ marginTop: 16, color: 'red' }}>{errorText}</Text>
          ) : null}

          <View style={styles.formSectionLogin}>
            {inputs.map((input, index) => (
              <View key={index}>
                <Input
                  label={input.label}
                  placeholder={`Enter your ${input.label.toLowerCase()}`}
                  value={input.value}
                  onChangeText={(text: string) =>
                    handleInputChange(index, text)
                  }
                  error={input.error}
                  password={input.label === 'Password' ? true : false}
                  span="*"
                />
              </View>
            ))}
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPasswordScreen')}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
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
