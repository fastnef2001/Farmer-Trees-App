import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import styles from './Login.style';
import HeaderComponent from '../../components/Header/Header.component';
import Input from '../../components/Input/Input.component';
import IconSignUp from '../../assets/images/IconSignUp.svg';
import IconGoogle from '../../assets/images/IconGoogle.svg';
import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';

const RegistrationScreen = ({ navigation }: any) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#163859'} />
      <SafeAreaView style={styleLogin as any}>
        <HeaderComponent />
        <View style={{ alignItems: 'center' }}>
          <View>
            <Text style={styles.textTitleContainer}>SIGN UP</Text>
          </View>
          <View style={styles.formSection}>
            <Input
              label="Full name"
              placeholder="Enter your full name"
              span="*"
              // onChangeText={nameInput => setName(nameInput)}
              // error={errorName}
            />
            <Input
              label="Email"
              placeholder="Enter your email "
              span="*"
              // onChangeText={nameInput => setName(nameInput)}
              // error={errorName}
            />
            <Input
              label="Phone number"
              placeholder="Enter your phone number "
              span="*"
              // onChangeText={nameInput => setName(nameInput)}
              // error={errorName}
            />
            <Input
              label="Password"
              placeholder="Enter password"
              span="*"
              password
              // onChangeText={nameInput => setName(nameInput)}
              // error={errorName}
            />
            <Input
              label="Confirm Password"
              placeholder="Enter password"
              span="*"
              password
              // onChangeText={nameInput => setName(nameInput)}
              // error={errorName}
            />
          </View>
        </View>
        <View style={styles.txtBottomFormSignin}>
          <Text style={{ fontSize: 16, marginRight: 4 }}>
            Do you already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text
              style={{ fontSize: 16, color: '#163859', fontWeight: 'bold' }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity style={styles.signinBtn} onPress={handleModal}>
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
                SIGN UP
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupGoogleBtn}>
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
            <Modal.Body>
              <Text
                style={{
                  fontSize: 14,
                  textAlign: 'center',
                  fontWeight: '600',
                }}>
                You have successfully registered, please login.
              </Text>
            </Modal.Body>
            <Modal.Footer>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Button
                  isRight={false}
                  isLogin={false}
                  title="CANCEL"
                  onPress={handleModal}
                />
                <Button
                  isRight={true}
                  isLogin={true}
                  title="LOGIN"
                  onPress={() => navigation.navigate('LoginScreen')}
                />
              </View>
            </Modal.Footer>
          </Modal.Container>
        </Modal>
      </SafeAreaView>
    </>
  );
};

const styleLogin = StyleSheet.create<any>({
  backgroundColor: '#FFFFFF',
  height: '100%',
});

export default RegistrationScreen;
