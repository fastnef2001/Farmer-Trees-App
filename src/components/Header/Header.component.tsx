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
import { styles, stylesHeaderTitle } from './Header.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../assets/images/Logo.svg';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { COLORS } from '../../theme/color';
import Logo35 from '../../assets/images/Logo72.svg';
import IconBackWhite40 from '../../assets/images/IconBackWhite40.svg';
import IconPlusWhite40 from '../../assets/images/IconPlusWhite40.svg';
import { useNavigation } from '@react-navigation/native';
import Profile from '../../screens/Profile/Profile.screen';

export type ButtonProps = {
  onPress?: () => void;
};

export const HeaderComponent = ({ onPress }: ButtonProps) => {
  const user = auth().currentUser;
  const [fullName, setFullName] = useState('');
  const [avatar, setAvatar] = useState('');
  if (user) {
    useEffect(() => {
      const subscriber = firestore()
        .collection('users')
        .doc(user?.uid)
        .onSnapshot(documentSnapshot => {
          setFullName(documentSnapshot.data()?.fullName);
          setAvatar(documentSnapshot.data()?.imageUrl);
        });
      return () => subscriber();
    }, [user]);
  }
  const fullNameClipped =
    fullName.length > 20 ? `${fullName.slice(0, 10)}...` : fullName;

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={'#163859'}
        animated={true}
      />
      <SafeAreaView style={styleLogin as any}>
        <View style={styles.cover}>
          <Logo35 />
          {user ? (
            <TouchableOpacity style={styles.root} onPress={onPress}>
              <Text style={styles.username}>{fullNameClipped}</Text>
              <View style={{ width: 8 }} />
              {avatar ? (
                <Image
                  source={{ uri: avatar }}
                  style={styles.ellipse59}
                  resizeMode="cover"
                />
              ) : (
                <Image
                  source={require('../../assets/images/avatarUser.png')}
                  style={styles.ellipse59}
                />
              )}
            </TouchableOpacity>
          ) : null}
        </View>
      </SafeAreaView>
    </>
  );
};

export type HeaderTitleProps = {
  onPress?: () => void;
  title: string;
};

export const HeaderTitle = ({ title, onPress }: HeaderTitleProps) => {
  const navigation = useNavigation();
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={'#163859'}
        animated={true}
      />
      <SafeAreaView style={styleLogin as any}>
        <View style={styles.cover}>
          <View style={styles.root}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconBackWhite40 />
            </TouchableOpacity>
            <Text style={stylesHeaderTitle.incomeHistory}>{title}</Text>
            {title === 'Profile' || title === 'Upgarde premium' ? (
              <View style={{ width: 24 }} />
            ) : (
              <TouchableOpacity onPress={onPress}>
                <IconPlusWhite40 />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};
const styleLogin = StyleSheet.create<any>({
  backgroundColor: '#163859',
  justifyContent: 'center',
});
