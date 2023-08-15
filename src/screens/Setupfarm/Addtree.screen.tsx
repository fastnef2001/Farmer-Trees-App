/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import HeaderComponent from '../../components/Header/Header.component';
import IconBack from '../../assets/images/IconBack.svg';
import IconAdd from '../../assets/images/IconAdd.svg';
import Input from '../../components/Input/Input.component';
import IconSend from '../../assets/images/IconSend.svg';
import IconDeleteRed from '../../assets/images/IconDeleteRed.svg';
import { ModalInsert } from '../../components/Modal/ModalInsert';
import { ScrollView } from 'react-native-gesture-handler';
// import { Button } from '../../components/Button/Button';

const Addtree = ({ navigation }: any) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  return (
    <>
      <HeaderComponent />
      <View style={styles.container}>
        {/* Title */}
        <View style={styles.headSession}>
          <TouchableOpacity onPress={() => navigation.navigate('Farmname')}>
            <IconBack />
          </TouchableOpacity>
          <View style={{ width: 8 }} />
          <View>
            <Text style={styles.txtTitle}>Add trees for Farm</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleModal} style={styles.buttonAdd}>
          <IconAdd />
        </TouchableOpacity>
      </View>

      <ModalInsert isVisible={isModalVisible}>
        <ModalInsert.Container>
          <ModalInsert.Header>
            <View style={styles.headSessionModal}>
              <TouchableOpacity onPress={handleModal}>
                <IconBack> </IconBack>
              </TouchableOpacity>
              <View style={styles.txtContainer}>
                <Text style={styles.txtTitleModal}>Add tree</Text>
              </View>
              <View
                style={{
                  width: 40,
                  height: 40,
                }}
              />
            </View>
          </ModalInsert.Header>
          <ScrollView>
            <ModalInsert.Body>
              <View style={styles.root}>
                <Image
                  source={require('../../assets/images/AvatarSquare.png')}
                />
                <View style={{ width: 8 }} />
                <View style={styles.hoverButtonFull}>
                  <View style={styles.frame625074}>
                    <View style={styles.frame625079}>
                      <IconSend />
                      <Text style={styles.photo}>Photo</Text>
                    </View>
                  </View>
                </View>
                <View style={{ width: 8 }} />
                <IconDeleteRed />
              </View>
              <View style={styles.inputSession}>
                <Input
                  label="Tree name"
                  span="*"
                  placeholder="Enter tree name"
                  // onChangeText={nameInput => setName(nameInput)}
                  // error={errorName}
                />
                <View style={{ height: 8 }} />
                <Input
                  label="Quantity"
                  span="*"
                  placeholder="Enter quantity"
                  keyboardType="numeric"
                  // onChangeText={nameInput => setName(nameInput)}
                  // error={errorName}
                />
              </View>
              <TouchableOpacity
                style={styles.btnSendSession}
                onPress={handleModal}>
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
            </ModalInsert.Body>
          </ScrollView>
        </ModalInsert.Container>
      </ModalInsert>
    </>
  );
};

export default Addtree;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    marginTop: 16,
  },
  headSession: {
    flexDirection: 'row',
    width: '90%',
    height: 40,
    alignItems: 'center',
  },
  headSessionModal: {
    flexDirection: 'row',
    width: '100%',
    maxHeight: '100%',
    paddingRight: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#E9E9E9',
  },

  txtTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#163859',
    lineHeight: 28,
    textAlign: 'center',
  },

  txtContainer: {
    height: 40,
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  txtTitleModal: {
    fontFamily: 'Nunito',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 27,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#163859',
  },
  buttonAdd: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputSession: {
    padding: 16,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 16,
    borderRadius: 15,
    shadowColor: '#000',
    elevation: 4,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: -2, height: 4 },
    backgroundColor: '#fff',
  },
  btnSendSession: {
    marginTop: 16,
    height: 48,
    backgroundColor: '#163859',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 32,
  },
  txtBtnSignup: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  root: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 16,
  },
  group8183: {
    width: 80,
    height: 80,
  },
  photo: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Nunito',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  hoverButtonFull: {
    width: 143,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  frame625074: {
    width: 143,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    backgroundColor: '#163859',
    flexDirection: 'row',
    borderRadius: 12,
  },
  frame625079: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
