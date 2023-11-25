import React from 'react';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import styles from './Style';
//Component
import Input from '../../components/Input/Input.component';
import {
  PopUpLoading,
  PopUpSuccessLogin,
} from '../../components/Modal/GeneralPopUps.component';
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
    setIsModalVisible,
    isModalVisibleLoading,
    errorText,
  } = UseLogic();

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#F2F2F2'} />
      <View style={styles.container}>
        <Logo55 />
        <View>
          <Text style={styles.textTitleContainer}>SIGN UP</Text>
        </View>
        {errorText ? (
          <View style={{ marginTop: 16 }}>
            <Text style={{ color: 'red' }}>{errorText}</Text>
          </View>
        ) : null}
        <View style={styles.formSectionLogin}>
          {inputs.map((input, index) => (
            <View key={index}>
              <Input
                label={input.label}
                textPlaceholder={`Enter your ${input.label.toLowerCase()}`}
                value={input.value}
                onChangeText={(text: string) => handleInputChange(index, text)}
                textError={input.error}
                password={
                  input.label === 'Password' ||
                  input.label === 'Confirm Password'
                    ? true
                    : false
                }
                span="*"
              />
            </View>
          ))}
        </View>
        <View style={styles.txtBottomFormSignin}>
          <Text style={styles.createAccountText}>
            Do you already have an account?
          </Text>
          <View style={{ width: 8 }} />
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
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
      <PopUpLoading isModalVisible={isModalVisibleLoading} />
      <PopUpSuccessLogin
        isModalSuccess={isModalVisible}
        titleHeader={'Successfully'}
        titleBody={'You have successfully registered, please login.'}
        handleModalSuccess={() => setIsModalVisible(!isModalVisible)}
        handleFunction={() => {
          navigation.navigate('LoginScreen');
        }}
      />
    </>
  );
};

export default RegistrationScreen;
