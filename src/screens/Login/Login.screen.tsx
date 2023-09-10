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
import { COLORS } from '../../theme/color';
import { TabBar } from 'react-native-tab-view';
import { Appbar } from 'react-native-paper';
import { ModalLoading } from '../../components/Modal/ModalLoading';

const RegistrationScreen = ({ navigation }: any) => {
  const [errorText, setErrorText] = useState('');
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
      handleModalLoading();
      await auth().signInWithEmailAndPassword(
        emailInput?.value,
        passwordInput?.value,
      );
      checkFarmName();
      handleModalLoading();
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
      handleModalLoading();
    }
  };

  const signByGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (!userInfo) {
        setErrorText('Gmail is not registered.');
        return;
      }
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );

      // Check if user already exists in Firebase
      const isUserExist = await auth().fetchSignInMethodsForEmail(
        userInfo.user.email,
      );
      if (isUserExist.length === 0) {
        setErrorText('Gmail is not registered.');
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        return;
      }
      handleModalLoading();
      await auth().signInWithCredential(googleCredential);
      checkFarmName();
      handleModalLoading();
    } catch {
      console.log('error');
    }
  };

  const checkFarmName = async () => {
    const user = auth().currentUser;
    const documentSnapshot = await firestore()
      .collection('users')
      .doc(user?.uid)
      .get();
    const dataFarmName = documentSnapshot.data()?.farmName;

    if (dataFarmName) {
      navigation.navigate('Tabs');
    } else {
      navigation.navigate('Farmname');
    }
    setTimeout(() => {
      setInputs(
        inputs.map(input => ({
          ...input,
          value: '',
        })),
      );
    }, 2000);
  };

  const [isModalVisibleLoading, setIsModalVisibleLoading] = useState(false);
  const handleModalLoading = () => {
    setIsModalVisibleLoading(prev => !prev);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#F2F2F2'} />
      <ScrollView style={{ paddingTop: '20%' }}>
        <SafeAreaView style={styles.container}>
          <Logo55 />
          <Text style={styles.textTitleContainer}>LOGIN</Text>

          {errorText ? (
            <Text
              style={{
                marginTop: 16,
                color: 'red',
                fontFamily: 'Nunito-Italic',
              }}>
              {errorText}
            </Text>
          ) : null}

          <View style={styles.formSectionLogin}>
            {inputs.map((input, index) => (
              <View key={index}>
                <Input
                  label={input.label}
                  textPlaceholder={`Enter your ${input.label.toLowerCase()}`}
                  value={input.value}
                  onChangeText={(text: string) =>
                    handleInputChange(index, text)
                  }
                  textError={input.error}
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
      <ModalLoading isVisible={isModalVisibleLoading}>
        <StatusBar backgroundColor={'#494949'} />
        <ModalLoading.Container />
      </ModalLoading>
    </>
  );
};

export default RegistrationScreen;
