/* eslint-disable react-native/no-inline-styles */
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { HeaderComponent } from '../../components/Header/Header.component';
import IconBack from '../../assets/images/IconBack.svg';
import Input from '../../components/Input/Input.component';
import IconSend from '../../assets/images/IconSend.svg';
// import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import { ScrollView } from 'react-native-gesture-handler';
import { ButtonLogin } from '../../components/Button/Button';

const ChangePassword = ({ navigation }: any) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  return (
    <>
      <ScrollView>
        <HeaderComponent />
        <View style={styles.container}>
          {/* Title */}
          <View style={styles.headSession}>
            <TouchableOpacity onPress={() => navigation.navigate('OTPScreen')}>
              <IconBack />
            </TouchableOpacity>
            <View style={{ width: 8 }} />
            <View>
              <Text style={styles.txtForgotPassword}>Create new password</Text>
            </View>
          </View>
          {/* Form */}
          <View style={styles.inputSession}>
            <Input
              label="New Password"
              span="*"
              password
              placeholder="Enter new password"
              // onChangeText={nameInput => setName(nameInput)}
              // error={errorName}
            />
            <View style={{ height: 8 }} />
            <Input
              label="Confirm Password"
              password
              span="*"
              placeholder="Enter confirm password"
              // onChangeText={nameInput => setName(nameInput)}
              // error={errorName}
            />
          </View>

          {/* Button send */}
          <TouchableOpacity style={styles.btnSendSession} onPress={handleModal}>
            <View style={styles.txtBtnSignup}>
              <IconSend />
              <View style={{ width: 16 }} />
              <Text
                style={{
                  fontSize: 16,
                  textAlign: 'center',
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                }}>
                SEND
              </Text>
            </View>
          </TouchableOpacity>

          <Modal isVisible={isModalVisible}>
            <Modal.Container>
              <Modal.Header title="Successfully" />
              <Modal.Body title="You have successfully changed your password." />
              <Modal.Footer>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingHorizontal: 8,
                  }}>
                  {/* <ButtonLogin
                    isRight={true}
                    isLogin={true}
                    title="LOGIN"
                    onPress={() => navigation.navigate('LoginScreen')}
                  /> */}
                </View>
              </Modal.Footer>
            </Modal.Container>
          </Modal>
        </View>
      </ScrollView>
    </>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    paddingTop: 16,
  },
  headSession: {
    flexDirection: 'row',
    width: '90%',
    height: 40,
    alignItems: 'center',
  },
  txtForgotPassword: {
    fontSize: 20,
    fontWeight: '700',
    color: '#163859',
    lineHeight: 28,
  },
  inputSession: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 24,
    borderRadius: 15,
    shadowColor: '#000',
    elevation: 4,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: -2, height: 4 },
  },
  btnSendSession: {
    marginTop: 32,
    width: '90%',
    height: 48,
    backgroundColor: '#163859',
    borderRadius: 10,
    borderWidth: 1,
  },
  txtBtnSignup: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});
