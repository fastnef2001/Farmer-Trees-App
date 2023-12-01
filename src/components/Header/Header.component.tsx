/* eslint-disable react-hooks/rules-of-hooks */
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import { styles, stylesHeaderTitle } from './Header.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import Logo35 from '../../assets/images/Logo72.svg';
import IconBackWhite40 from '../../assets/images/IconBackWhite40.svg';
import IconPlusWhite40 from '../../assets/images/IconPlusWhite40.svg';
import { useNavigation } from '@react-navigation/native';
import { Database } from '../../database/database';

export type ButtonProps = {
  onPress?: () => void;
};
export const HeaderComponent = ({ onPress }: ButtonProps) => {
  const { getInforUser, userInfors } = Database();
  const user = auth().currentUser;
  let fullName = '';
  let avatar = '';

  useEffect(() => {
    getInforUser();
  }, [getInforUser]);
  console.log('userInfors', userInfors);

  userInfors.forEach((userInfor: any) => {
    fullName = userInfor.fullName;
    avatar = userInfor.imageUrl;
  });

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
