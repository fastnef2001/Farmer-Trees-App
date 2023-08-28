import React, { useEffect, useState } from 'react';
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
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const RegistrationScreen = ({ navigation }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [inputs, setInputs] = useState([
    { label: 'Full name', value: '', error: '', password: false },
    { label: 'Email', value: '', error: '', password: false },
    { label: 'Phone number', value: '', error: '', password: false },
    { label: 'Password', value: '', error: '', password: true },
    { label: 'Confirm Password', value: '', error: '', password: true },
  ]);

  const handleInputChange = (index: any, value: any) => {
    const newInputs = [...inputs];
    newInputs[index].value = value;
    newInputs[index].error = '';
    setInputs(newInputs);
  };

  const handleRegister = async () => {
    let hasError = false;

    inputs.forEach((input, index) => {
      const passwordInput = inputs.find(input => input.label === 'Password');
      const confirmPasswordInput = inputs.find(input => input.label === 'Confirm Password');
      console.log('passwordInput', passwordInput);
      console.log('confirmPasswordInput', confirmPasswordInput);
      if (!input.value) {
        inputs[index].error = `Please enter ${input.label}`;
        hasError = true;
      } else if (passwordInput?.value !== confirmPasswordInput?.value) {
        inputs[4].error = 'Password does not match.';
        hasError = true;
      } else {
        inputs[index].error = '';
      }
    });

    if (!hasError) {
      const emailInput = inputs.find(input => input.label === 'Email');
      const passwordInput = inputs.find(input => input.label === 'Password');
      const fullNameInput = inputs.find(input => input.label === 'Full name');
      const phoneNumberInput = inputs.find(
        input => input.label === 'Phone number',
      );
      if (emailInput && passwordInput && fullNameInput && phoneNumberInput) {
        const email = emailInput.value;
        const password = passwordInput.value;
        const fullName = fullNameInput.value;
        const phoneNumber = phoneNumberInput.value;
        try {
          const response = await auth().createUserWithEmailAndPassword(
            email,
            password,
          );
          setIsLoading(false);
          handleModal();
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
              emailInput.error = 'Email already in use.';
              break;
            case 'auth/invalid-email':
              emailInput.error = 'Invalid email format.';
              break;
            case 'auth/weak-password':
              passwordInput.error = 'Password is too weak.';
              break;
            default:
              setErrorText('Sign up failed. Please check again.');
              break;
          }
          setIsLoading(false);
        }
      }
    }
    setInputs([...inputs]);
  };

  const handleRegisterByGoogle = async () => {
    await GoogleSignin.signOut();

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo', userInfo);
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );
      const isUserExist = await auth().fetchSignInMethodsForEmail(
        userInfo.user.email,
      );
      if (isUserExist.length === 0) {
        await auth().signInWithCredential(googleCredential);
        const fullNameGoogle = userInfo.user.name;
        //save fullNameGoogle to firestore
        const user = await firestore()
          .collection('users')
          .doc(auth().currentUser?.uid)
          .get();
        if (!user.exists) {
          await firestore()
            .collection('users')
            .doc(auth().currentUser?.uid)
            .set({
              fullName: fullNameGoogle,
            });
        }
        handleModal();
        return;
      }
      // If exist, then set error
      else {
        setErrorText('Gmail is already registered.');
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        return;
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('user cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('operation (e.g. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('play services not available or outdated');
      } else {
        console.log('some other error happened');
      }
    }
  };

  const handleModal = () => setIsModalVisible(prev => !prev);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#163859'} />
      <HeaderComponent />
      <ScrollView>
        <SafeAreaView>
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
                    password={input.password}
                    span="*"
                  />
                </View>
              ))}
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
              onPress={handleRegisterByGoogle}>
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
                  Sign up with Google
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

export default RegistrationScreen;
