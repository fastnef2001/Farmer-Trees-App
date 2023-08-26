/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
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
import { ButtonBack, ButtonLogin } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const RegistrationScreen = ({ navigation }: any) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleRegister = async () => {
    if (!fullName || !email || !phoneNumber || !password || !confirmPassword) {
      setErrorText('Please complete all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorText('Passwords do not match.');
      return;
    }
    setErrorText('');
    setIsLoading(true);

    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      setIsLoading(false);
      handleModal();
      // nếu collection users chưa ton tai thi tao moi

      const user = await firestore()
        .collection('users')
        .doc(response.user.uid)
        .get();
      if (!user.exists) {
        await firestore().collection('users').doc(response.user.uid).set({
          fullName: fullName,
          phoneNumber: phoneNumber,
        });
      }
    } catch (error: any) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setErrorText('Email already in use.');
          break;
        case 'auth/invalid-email':
          setErrorText('Invalid email format.');
          break;
        case 'auth/weak-password':
          setErrorText('Password is too weak.');
          break;
        default:
          setErrorText('Sign up failed. Please check again.');
          break;
      }
      setIsLoading(false);
      console.error('Sign Up Error: ', error);
    }
  };

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
              <Text style={styles.textTitleContainer}>SIGN UP</Text>
            </View>
            {/* nếu errorText  */}

            {errorText ? (
              <View style={{ marginTop: 16 }}>
                <Text style={{ color: 'red' }}>{errorText}</Text>
              </View>
            ) : null}

            {/* Form */}
            <View style={styles.formSectionLogin}>
              <Input
                label="Full name"
                placeholder="Enter your full name"
                span="*"
                onChangeText={(text: string) => setFullName(text)}
                // onChangeText={nameInput => setName(nameInput)}
                // error={errorName}
              />
              <Input
                label="Email"
                placeholder="Enter your email "
                span="*"
                onChangeText={(text: string) => setEmail(text)}

                // onChangeText={nameInput => setName(nameInput)}
                // error={errorName}
              />
              <Input
                label="Phone number"
                placeholder="Enter your phone number "
                span="*"
                onChangeText={(text: string) => setPhoneNumber(text)}

                // onChangeText={nameInput => setName(nameInput)}
                // error={errorName}
              />
              <Input
                label="Password"
                placeholder="Enter password"
                span="*"
                password
                onChangeText={(text: string) => setPassword(text)}

                // onChangeText={nameInput => setName(nameInput)}
                // error={errorName}
              />
              <Input
                label="Confirm Password"
                placeholder="Enter password"
                span="*"
                password
                onChangeText={(text: string) => setConfirmPassword(text)}

                // onChangeText={nameInput => setName(nameInput)}
                // error={errorName}
              />
            </View>

            {/* Login */}
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
                Do you already have an account?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('LoginScreen')}>
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
                  Login
                </Text>
              </TouchableOpacity>
            </View>
            {/* Button */}
            <TouchableOpacity
              style={styles.signinBtn}
              onPress={handleRegister}
              disabled={isLoading}>
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
                  {isLoading ? 'LOADING...' : 'SIGN UP'}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signupGoogleBtn}
              // onPress={handleRegisterByGoogle}
            >
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

          <Modal isVisible={isModalVisible}>
            <Modal.Container>
              <Modal.Header title="Successfully" />
              <Modal.Body title="You have successfully registered, please login." />
              <Modal.Footer>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 8,
                  }}>
                  <ButtonBack
                    isRight={false}
                    isLogin={false}
                    title="CANCEL"
                    onPress={handleModal}
                  />
                  <View style={{ width: 16 }} />
                  <ButtonLogin
                    isRight={true}
                    isLogin={false}
                    title="LOGIN"
                    onPress={() => navigation.navigate('LoginScreen')}
                  />
                </View>
              </Modal.Footer>
            </Modal.Container>
          </Modal>
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
