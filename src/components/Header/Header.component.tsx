import { StyleSheet, Text, View, StatusBar } from 'react-native';
import React from 'react';
import styles from './Header.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../assets/images/Logo.svg';

const HeaderComponent = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#163859'} />
      <SafeAreaView style={styleLogin as any}>
        <View style={styles.headerStyle}>
          <Logo />
        </View>
      </SafeAreaView>
    </>
  );
};

export default HeaderComponent;

const styleLogin = StyleSheet.create<any>({
  backgroundColor: '#163859',
  height: 60,
});
