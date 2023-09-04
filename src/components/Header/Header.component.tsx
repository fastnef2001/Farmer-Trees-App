/* eslint-disable react-hooks/rules-of-hooks */
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './Header.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../assets/images/Logo.svg';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { COLORS } from '../../theme/color';

export type ButtonProps = {
  onPress?: () => void;
};

const HeaderComponent = ({ onPress }: ButtonProps) => {
  const user = auth().currentUser;
  const [fullName, setFullName] = useState('');
  if (user) {
    useEffect(() => {
      const subscriber = firestore()
        .collection('users')
        .doc(user?.uid)
        .onSnapshot(documentSnapshot => {
          setFullName(documentSnapshot.data()?.fullName);
        });
      return () => subscriber();
    }, [user]);
  }
  const fullNameClipped =
    fullName.length > 20 ? `${fullName.slice(0, 10)}...` : fullName;

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={'#163859'} />
      <SafeAreaView style={styleLogin as any}>
        <View style={styles.cover}>
          <Logo />
          {user ? (
            <TouchableOpacity style={styles.root} onPress={onPress}>
              <Text style={styles.username}>{fullNameClipped}</Text>
              <View style={{ width: 8 }} />
              <Image
                source={require('../../assets/images/avatarUser.png')}
                style={styles.ellipse59}
              />
            </TouchableOpacity>
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
