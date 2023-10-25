import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import styles from './Home.style';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchUser, selectAll } from '../../stores/user.reducer';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { HeaderTitle } from '../../components/Header/Header.component';
import { COLORS } from '../../theme/color';
import IconUser40 from '../../assets/images/IconUser40.svg';
import IconPhone40 from '../../assets/images/IconPhone40.svg';
import IconDetailBold from '../../assets/images/IconDetailBold.svg';
import IconBell40 from '../../assets/images/IconBell40.svg';
import IconHeart40 from '../../assets/images/IconHeart40.svg';
import IconLogOut40 from '../../assets/images/IconLogOut40.svg';
import stylesButton from '../Login/Login.style';
import IconComplete from '../../assets/images/IconComplete.svg';
import IconEditBlue40 from '../../assets/images/IconEditBlue40.svg';

const Profile = ({ navigation }: any) => {
  const handleLogOut = async () => {
    navigation.navigate('LoginScreen');
    await GoogleSignin.revokeAccess();
    try {
      await auth().signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderTitle title="Profile" />
        <View style={{ height: 24 }} />
        {/* element 1 */}
        <View style={styleElement1.root}>
          <Image
            source={require('../../assets/images/avatarUser.png')}
            style={{ width: 57, height: 57 }}
          />
          <View style={{ width: 16 }} />
          <View style={styleElement1.frame625291}>
            <Text style={styleElement1.$name}>Truong Quang nhanh</Text>
            <View style={{ height: 4 }} />
            <Text style={styleElement1.gmail}>tnhanh5@gmail.com</Text>
          </View>
        </View>
        <View style={{ height: 24 }} />
        {/* element 2 */}
        <View style={styleElement2.root}>
          <View style={styleElement2.item}>
            <IconUser40 />
            <View style={{ width: 16 }} />
            <View style={styleElement2.content}>
              <Text style={styleElement2.title}>Farm name</Text>
              <Text style={styleElement2.farmName}>Nhanh farm</Text>
            </View>
          </View>
          <View style={{ height: 16 }} />
          <View style={styleElement2.item}>
            <IconPhone40 />
            <View style={{ width: 16 }} />
            <View style={styleElement2.content}>
              <Text style={styleElement2.title}>Phone number</Text>
              <Text style={styleElement2.farmName}>+84 86988123</Text>
            </View>
          </View>
        </View>
        <View style={{ height: 24 }} />
        {/* element 3 */}
        <View style={styleElement2.root}>
          <TouchableOpacity style={styleElement2.item}>
            <IconBell40 />
            <View style={{ width: 16 }} />
            <View style={styleElement2.content}>
              <Text style={styleElement2.farmName}>Help & Support</Text>
            </View>
            <View style={{ width: 16 }} />
            <IconDetailBold />
          </TouchableOpacity>

          <View style={{ height: 16 }} />
          <TouchableOpacity style={styleElement2.item}>
            <IconHeart40 />
            <View style={{ width: 16 }} />
            <View style={styleElement2.content}>
              <Text style={styleElement2.farmName}>About App</Text>
            </View>
            <View style={{ width: 16 }} />
            <IconDetailBold />
          </TouchableOpacity>
          <View style={{ height: 16 }} />
          <TouchableOpacity style={styleElement2.item} onPress={handleLogOut}>
            <IconLogOut40 />
            <View style={{ width: 16 }} />
            <View style={styleElement2.content}>
              <Text style={styleElement2.farmName}>Log out</Text>
            </View>
            <View style={{ width: 16 }} />
            <IconDetailBold />
          </TouchableOpacity>
        </View>
        <View style={{ height: 40 }} />

        <TouchableOpacity
          style={stylesButton.signupGoogleBtn}
          onPress={() => navigation.navigate('Tabs')}>
          <View style={stylesButton.txtBtnSignup}>
            <IconEditBlue40 />
            <View style={{ width: 0 }} />
            <Text style={stylesButton.btnTextBlue}>Edit profile</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styleElement2 = StyleSheet.create<any>({
  root: {
    width: '90%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: COLORS.white,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 1,
    padding: 16,
    alignSelf: 'center',
    borderRadius: 12,
  },
  farmName: {
    alignSelf: 'stretch',
    color: COLORS.blue,
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
  },
  title: {
    alignSelf: 'stretch',
    color: COLORS.text2,
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 3, // Use pixels instead of '3rem'
    flex: 1,
  },
});

const styleElement1 = StyleSheet.create<any>({
  root: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: COLORS.blue,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 8,
    shadowOpacity: 1,
    flexDirection: 'row',
    padding: 16,
    alignSelf: 'center',
    borderRadius: 12,
  },
  $name: {
    alignSelf: 'stretch',
    color: COLORS.white,
    fontFeatureSettings: 'clig off, liga off',
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
  },
  gmail: {
    alignSelf: 'stretch',
    color: COLORS.grey,
    fontFeatureSettings: 'clig off, liga off',
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
  },
  frame625291: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    gap: 4, // Numeric value without 'rem'
  },
});
const styleUser = StyleSheet.create<any>({
  borderBottomWidth: 1,
  borderColor: '#eee',
  padding: 1,
  marginTop: 10,
});

export default Profile;
