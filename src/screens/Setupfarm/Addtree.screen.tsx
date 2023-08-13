/* eslint-disable react-native/no-inline-styles */
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
import { ModalInsert } from '../../components/Modal/ModalInsert';
import { Button } from '../../components/Button/Button';

const Addtree = ({ navigation }: any) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  return (
    <SafeAreaView style={styleLogin as any}>
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
        </ModalInsert.Container>
      </ModalInsert>
    </SafeAreaView>
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
  headSessionModal: {
    flexDirection: 'row',
    width: '100%',
    maxHeight: '100%',
    paddingRight: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },

  txtTitle: {
    marginLeft: 20,
    fontSize: 20,
    fontWeight: '700',
    color: '#163859',
    lineHeight: 28,
    textAlign: 'center',
  },

  txtContainer: {
    height: 40,
    width: '100%',
    backgroundColor: '#163859',
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
    color: '#ffffff',
  },
  buttonAdd: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
