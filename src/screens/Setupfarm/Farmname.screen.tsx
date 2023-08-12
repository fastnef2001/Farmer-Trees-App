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
import Input from '../../components/Input/Input.component';
import IconContinue from '../../assets/images/IconContinue.svg';

const Farmname = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <HeaderComponent />
      <View style={styles.headSession}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
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
          <Text style={styles.txtTitle}>Enter your farm name</Text>
        </View>
      </View>
      <View style={styles.inputSession}>
        <View style={{ margin: 16, width: '100%' }}>
          <Input
            label="Farm name"
            placeholder="Enter your farm name"
            span="*"
            //onChangeText={nameInput => setName(nameInput)}
            // error={errorName}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.btnSession}
        onPress={() => navigation.navigate('AddTree')}>
        <View style={styles.txtBtn}>
          <IconContinue />
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
              color: '#FFFFFF',
              fontWeight: 'bold',
              marginLeft: 18,
            }}>
            CONTINUE
          </Text>
        </View>
      </TouchableOpacity>
    </View>
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
  inputSession: {
    display: 'flex',
    marginLeft: 16,
    marginRight: 16,
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 32,
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
    marginLeft: 16,
    marginRight: 16,
    height: 48,
    backgroundColor: '#163859',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  txtBtn: {
    marginTop: 12,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
