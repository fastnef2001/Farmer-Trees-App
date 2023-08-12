import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import HeaderComponent from '../../components/Header/Header.component';
import IconBack from '../../assets/images/IconBack.svg';
import IconAdd from '../../assets/images/IconAdd.svg';
import { Modal } from '../../components/Modal/Modal';
import { Button } from '../../components/Button/Button';

const Addtree = ({ navigation }: any) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  return (
    <View style={styles.container}>
      <HeaderComponent />
      <View style={styles.headSession}>
        <TouchableOpacity onPress={() => navigation.navigate('Farmname')}>
          <IconBack
            style={{
              alignItems: 'center',
              marginLeft: 18,
              width: '100%',
              marginTop: 2,
            }}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.txtTitle}>Add trees for Fastnef Farm</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleModal} style={styles.buttonAdd}>
        <IconAdd />
      </TouchableOpacity>
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
    </View>
  );
};

const styleLogin = StyleSheet.create<any>({
  backgroundColor: '#FFFFFF',
  height: '100%',
});

export default Addtree;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
  headSession: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 14,
    height: 40,
  },
  txtTitle: {
    marginLeft: 20,
    fontSize: 20,
    fontWeight: '700',
    color: '#163859',
    lineHeight: 28,
    textAlign: 'center',
  },
  buttonAdd: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
