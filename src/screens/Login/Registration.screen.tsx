/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { HeaderComponent } from '../../components/Header/Header.component';
import Input from '../../components/Input/Input.component';
import IconSignUp from '../../assets/images/IconSignUp.svg';
import IconGoogle from '../../assets/images/IconGoogle.svg';
import { ButtonBack, ButtonLogin } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import styles from './Login.style';
import Logo55 from '../../assets/images/Logo55.svg';
import { ModalLoading } from '../../components/Modal/ModalLoading';

const RegistrationScreen = ({ navigation }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleLoading, setIsModalVisibleLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [inputs, setInputs] = useState([
    { label: 'Full name', value: '', error: '' },
    { label: 'Email', value: '', error: '' },
    { label: 'Phone number', value: '', error: '' },
    { label: 'Password', value: '', error: '' },
    { label: 'Confirm Password', value: '', error: '' },
  ]);

  const handleInputChange = (index: any, value: any) => {
    const newInputs = [...inputs];
    newInputs[index].value = value;
    newInputs[index].error = '';
    setInputs(newInputs);
  };

  const handleRegister = async () => {
    setErrorText('');
    const passwordInput = inputs.find(input => input.label === 'Password');
    const confirmPasswordInput = inputs.find(
      input => input.label === 'Confirm Password',
    );
    const emailInput = inputs.find(input => input.label === 'Email');
    const fullNameInput = inputs.find(input => input.label === 'Full name');
    const phoneNumberInput = inputs.find(
      input => input.label === 'Phone number',
    );
    // Check if any input is empty
    if (
      !emailInput?.value ||
      !passwordInput?.value ||
      !fullNameInput?.value ||
      !phoneNumberInput?.value
    ) {
      setInputs(
        inputs.map(input => ({
          ...input,
          error: !input.value ? `Please enter ${input.label}` : '',
        })),
      );
      return;
    }
    // Check if email is valid
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(emailInput?.value)) {
      setInputs(
        inputs.map(input => ({
          ...input,
          error: input.label === 'Email' ? 'Invalid email format.' : '',
        })),
      );
      return;
    }
    // check email is already in use
    const isUserExist = await auth().fetchSignInMethodsForEmail(
      emailInput.value,
    );
    if (isUserExist.length > 0) {
      setInputs(
        inputs.map(input => ({
          ...input,
          error: input.label === 'Email' ? 'Email already in use.' : '',
        })),
      );
      return;
    }
    //check phone number valid vietnam phone number
    if (!/((09|03|07|08|05)+([0-9]{8})\b)/g.test(phoneNumberInput?.value)) {
      setInputs(
        inputs.map(input => ({
          ...input,
          error:
            input.label === 'Phone number'
              ? 'Invalid phone number format.'
              : '',
        })),
      );
      return;
    }
    //check phone number is already in use
    const isPhoneNumberExist = await firestore()
      .collection('users')
      .where('phoneNumber', '==', phoneNumberInput?.value)
      .get();
    if (isPhoneNumberExist.size > 0) {
      setInputs(
        inputs.map(input => ({
          ...input,
          error:
            input.label === 'Phone number'
              ? 'Phone number already in use.'
              : '',
        })),
      );
      return;
    }
    // Check if password is strong enough (at least 6 characters, 1 uppercase, 1 lowercase, 1 number)
    if (
      !/(?=.*[a-z])/.test(passwordInput?.value) ||
      !/(?=.*[A-Z])/.test(passwordInput?.value) ||
      !/(?=.*[0-9])/.test(passwordInput?.value) ||
      passwordInput?.value.length < 6
    ) {
      setInputs(
        inputs.map(input => ({
          ...input,
          error:
            input.label === 'Password'
              ? 'Password must be at least 6 characters, 1 uppercase, 1 lowercase, 1 number.'
              : '',
        })),
      );
      return;
    }
    // Check if password and confirm password match
    if (passwordInput?.value !== confirmPasswordInput?.value) {
      setInputs(
        inputs.map(input => ({
          ...input,
          error:
            input.label === 'Confirm Password'
              ? 'Password does not match.'
              : '',
        })),
      );
      return;
    }

    // register
    handleModalLoading();
    try {
      const response = await auth().createUserWithEmailAndPassword(
        emailInput.value,
        passwordInput.value,
      );
      console.log('responseText', response);
      // lấy id của user vừa tạo
      const user = await firestore()
        .collection('users')
        .doc(response.user.uid)
        .get();
      console.log('userText', user);
      const idUser = response.user.uid;
      console.log('idUser', idUser);

      if (idUser) {
        await firestore().collection('users').doc(idUser).set({
          fullName: fullNameInput.value,
          phoneNumber: phoneNumberInput.value,
          email: emailInput.value,
        });
      }
      handleModal();
      handleModalLoading();
    } catch (error: any) {
      setErrorText('Sign up failed. Please check again.');
    }
  };

  const handleRegisterByGoogle = async () => {
    await GoogleSignin.signOut();
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );

      const isUserExist = await auth().fetchSignInMethodsForEmail(
        userInfo.user.email,
      );

      if (isUserExist.length === 0) {
        handleModalLoading();
        await auth().signInWithCredential(googleCredential);
        const fullNameGoogle = userInfo.user.name;
        const emailGoogle = userInfo.user.email;
        console.log('emailGoogle', emailGoogle);
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
              email: emailGoogle,
            });
        }
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        handleModalLoading();
        handleModal();
        return;
      }
      // If exist, then set error
      else {
        setErrorText('Gmail is already registered.');
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
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

  const handleModalLoading = () => {
    setIsModalVisibleLoading(prev => !prev);
  };

  const handleModal = () => setIsModalVisible(prev => !prev);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#F2F2F2'} />
      <ScrollView style={{ paddingTop: 16 }}>
        <SafeAreaView>
          {/* Body */}
          <View style={styles.container}>
            <Logo55 />
            {/* Title */}
            <View>
              <Text style={styles.textTitleContainer}>SIGN UP</Text>
            </View>
            {/* errorText  */}

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
                    textPlaceholder={`Enter your ${input.label.toLowerCase()}`}
                    value={input.value}
                    onChangeText={(text: string) =>
                      handleInputChange(index, text)
                    }
                    textError={input.error}
                    // password and confirm
                    password={
                      input.label === 'Password' ||
                      input.label === 'Confirm Password'
                        ? true
                        : false
                    }
                    span="*"
                    keyboardType={
                      input.label === 'Phone number' ? 'numeric' : 'default'
                    }
                  />
                </View>
              ))}
            </View>
            <View style={styles.txtBottomFormSignin}>
              <Text style={styles.createAccountText}>
                Do you already have an account?
              </Text>
              <View style={{ width: 8 }} />
              <TouchableOpacity
                onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={styles.registerText}>Login</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.signinBtn} onPress={handleRegister}>
              <View style={styles.txtBtnSignup}>
                <IconSignUp />
                <Text style={styles.btnText}>SIGN UP</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signupGoogleBtn}
              onPress={handleRegisterByGoogle}>
              <View style={styles.txtBtnSignup}>
                <IconGoogle />
                <Text style={styles.btnTextBlue}>Sign up with Google</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Modal isVisible={isModalVisible}>
            <StatusBar backgroundColor={'#494949'} />
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
                    isDelete={false}
                    title="CANCEL"
                    onPress={handleModal}
                  />
                  <View style={{ width: 16 }} />
                  <ButtonLogin
                    isRight={true}
                    isDelete={false}
                    title="LOGIN"
                    onPress={() => navigation.navigate('LoginScreen')}
                  />
                </View>
              </Modal.Footer>
            </Modal.Container>
          </Modal>

          <ModalLoading isVisible={isModalVisibleLoading}>
            <StatusBar backgroundColor={'#494949'} />
            <ModalLoading.Container />
          </ModalLoading>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default RegistrationScreen;
