import React, { useContext, useState } from 'react';
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
import Input from '../../components/Input/Input.component';
import IconContinue from '../../assets/images/IconContinue.svg';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Farmname = ({ navigation }: any) => {
  const [farmName, setFarmName] = useState('');
  const saveFarmName = async () => {
    await firestore().collection('users').doc(auth().currentUser?.uid).update({
      farmName: farmName,
    });
  };

  return (
    <>
      <HeaderComponent />
      <View style={styles.container}>
        {/* Title */}
        <View style={styles.headSession}>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <IconBack />
          </TouchableOpacity>
          <View style={{ width: 8 }} />
          <View>
            <Text style={styles.txtTitle}>Enter your farm name</Text>
          </View>
        </View>

        <View style={{ height: 32 }} />
        {/* Form */}
        <View style={styles.inputSession}>
          <Input
            label="Farm name"
            placeholder="Enter your farm name"
            span="*"
            onChangeText={(text: string) => setFarmName(text)}
            //onChangeText={nameInput => setName(nameInput)}
            // error={errorName}
          />
        </View>

        <View style={{ height: 32 }} />
        {/* Button continue */}
        <TouchableOpacity
          style={styles.btnSession}
          onPress={() => {
            saveFarmName();
            navigation.navigate('AddTree');
          }}>
          <View style={styles.txtBtn}>
            <IconContinue />
            <View style={{ width: 16 }} />
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}>
              CONTINUE
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styleLogin = StyleSheet.create<any>({
  backgroundColor: '#FFFFFF',
  height: '100%',
});

export default Farmname;

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
  txtTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#163859',
    lineHeight: 28,
    textAlign: 'center',
  },
  inputSession: {
    width: '90%',
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  btnSession: {
    height: 48,
    backgroundColor: '#163859',
    borderRadius: 10,
    borderWidth: 1,
    width: '90%',
  },
  txtBtn: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});
