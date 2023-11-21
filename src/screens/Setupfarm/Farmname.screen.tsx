import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { HeaderComponent } from '../../components/Header/Header.component';
import IconBack from '../../assets/images/IconBack.svg';
import Input from '../../components/Input/Input.component';
import IconContinue from '../../assets/images/IconContinue.svg';
import auth from '@react-native-firebase/auth';
import { Database } from '../../database/database';

const Farmname = ({ navigation }: any) => {
  const { createFarmName } = Database();
  const [farmName, setFarmName] = useState('');
  const [errorName, setErrorName] = useState('');

  const saveFarmName = async () => {
    if (!farmName) {
      setErrorName('Please enter your farm name');
      return;
    }
    if ((await createFarmName(farmName)) === true) {
      navigation.navigate('AddTree');
    }
  };

  const handleLogOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.log(error);
    }
    navigation.navigate('LoginScreen');
  };

  const handleInputChange = (text: any) => {
    setErrorName('');
    setFarmName(text);
  };

  return (
    <>
      <HeaderComponent />
      <View style={styles.container}>
        {/* Title */}
        <View style={styles.headSession}>
          <TouchableOpacity onPress={handleLogOut}>
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
            onChangeText={(text: string) => handleInputChange(text)}
            error={errorName}
          />
        </View>

        <View style={{ height: 32 }} />
        {/* Button continue */}
        <TouchableOpacity style={styles.btnSession} onPress={saveFarmName}>
          <View style={styles.txtBtn}>
            <IconContinue />
            <View style={{ width: 16 }} />
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                color: '#FFFFFF',
                fontFamily: 'Nunito-Bold',
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
    color: '#163859',
    lineHeight: 28,
    textAlign: 'center',
    fontFamily: 'Nunito-Bold',
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
