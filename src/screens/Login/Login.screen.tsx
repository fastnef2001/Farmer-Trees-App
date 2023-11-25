/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { PopUpLoading } from '../../components/Modal/GeneralPopUps.component';
import Input from '../../components/Input/Input.component';
import IconSignUp from '../../assets/images/IconSignUp.svg';
import IconGoogle from '../../assets/images/IconGoogle.svg';
import styles from './Style';
import Logo55 from '../../assets/images/Logo55.svg';
import { ModalLoading } from '../../components/Modal/ModalLoading';
import { UseLogic } from './Login.useLogic';

const RegistrationScreen = ({ navigation }: any) => {
  const {
    inputs,
    handleInputChange,
    signIn,
    signByGoogle,
    isModalVisibleLoading,
    errorText,
  } = UseLogic({ navigation });
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#F2F2F2'} />
      <View style={styles.container}>
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
                onChangeText={(text: string) => handleInputChange(index, text)}
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
          <Text style={styles.createAccountText}>Do not have an account?</Text>
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

        <TouchableOpacity style={styles.signupGoogleBtn} onPress={signByGoogle}>
          <View style={styles.txtBtnSignup}>
            <IconGoogle />
            <Text style={styles.btnTextBlue}>Login with Google</Text>
          </View>
        </TouchableOpacity>
      </View>
      <PopUpLoading isModalVisible={isModalVisibleLoading} />
    </>
  );
};

export default RegistrationScreen;
