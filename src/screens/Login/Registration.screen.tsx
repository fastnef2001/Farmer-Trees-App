/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './Login.style';
//Component
import { ModalLoading } from '../../components/Modal/ModalLoading';
import Input from '../../components/Input/Input.component';
import { ButtonBack, ButtonLogin } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
//Icon
import IconSignUp from '../../assets/images/IconSignUp.svg';
import IconGoogle from '../../assets/images/IconGoogle.svg';
import Logo55 from '../../assets/images/Logo55.svg';
//UseLogic
import { UseLogic } from './Registration.useLogic';

const RegistrationScreen = ({ navigation }: any) => {
  const {
    inputs,
    handleInputChange,
    handleRegister,
    handleRegisterByGoogle,
    isModalVisible,
    handleModal,
    isModalVisibleLoading,
    errorText,
  } = UseLogic();

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
