import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import React from 'react';
import styles from './Header.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../assets/images/Logo.svg';
import auth from '@react-native-firebase/auth';

// import avatarUser from '../../assets/images/avatarUser.png';

// xác thực xem có hành động đăng nhập thành công hay không
const user = auth().currentUser;
console.log(user);

const HeaderComponent = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#163859'} />
      <SafeAreaView style={styleLogin as any}>
        <View style={styles.cover}>
          <Logo />
          {user ? (
            <View style={styles.root}>
              <Text style={styles.username}>username</Text>
              <View style={{ width: 8 }} />
              <Image
                source={require('../../assets/images/avatarUser.png')}
                style={styles.ellipse59}
              />
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    </>
  );
};

export default HeaderComponent;

const styleLogin = StyleSheet.create<any>({
  backgroundColor: '#163859',
  height: 60,
  justifyContent: 'center',
});
