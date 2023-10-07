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
import { HeaderTitle } from '../../components/Header/Header.component';
import IconUser40 from '../../assets/images/IconUser40.svg';
import IconPhone40 from '../../assets/images/IconPhone40.svg';
import IconDetailBold from '../../assets/images/IconDetailBold.svg';
import IconBell40 from '../../assets/images/IconBell40.svg';
import IconHeart40 from '../../assets/images/IconHeart40.svg';
import IconLogOut40 from '../../assets/images/IconLogOut40.svg';
import stylesButton from '../Login/Login.style';
import IconEditBlue40 from '../../assets/images/IconEditBlue40.svg';
import { styleElement1, styleElement2 } from '../Profile/Profile.style';
import { UseLogic } from './UserLogic';
import { set } from 'date-fns';

interface UserData {
  fullName: string;
  farmName: string;
  phoneNumber: string;
  // Add other properties as needed
}

const Profile = ({ navigation }: any) => {
  const { handleLogOut, fullName, email, avatar, farmName, phoneNumber } =
    UseLogic();
  console.log('data', fullName, email, avatar, farmName, phoneNumber);

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
            <Text style={styleElement1.$name}>{fullName}</Text>
            <View style={{ height: 4 }} />
            <Text style={styleElement1.gmail}>{email}</Text>
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
              <Text style={styleElement2.farmName}>{farmName}</Text>
            </View>
          </View>
          <View style={{ height: 16 }} />
          <View style={styleElement2.item}>
            <IconPhone40 />
            <View style={{ width: 16 }} />
            <View style={styleElement2.content}>
              <Text style={styleElement2.title}>Phone number</Text>
              <Text style={styleElement2.farmName}>{phoneNumber}</Text>
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
          <TouchableOpacity
            style={styleElement2.item}
            onPress={() => handleLogOut(navigation)}>
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

export default Profile;
