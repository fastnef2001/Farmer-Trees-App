import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
//ICON
import IconUser40 from '../../assets/images/IconUser40.svg';
import IconPhone40 from '../../assets/images/IconPhone40.svg';
import IconDetailBold from '../../assets/images/IconDetailBold.svg';
import IconBell40 from '../../assets/images/IconBell40.svg';
import IconHeart40 from '../../assets/images/IconHeart40.svg';
import IconLogOut40 from '../../assets/images/IconLogOut40.svg';
import stylesButton from '../Login/Style';
import IconEditBlue40 from '../../assets/images/IconEditBlue40.svg';
import IconBack from '../../assets/images/IconBack.svg';
import IconUpload from '../../assets/images/IconUpload.svg';
import IconDeleteRed from '../../assets/images/IconDeleteRed.svg';
import IconSave from '../../assets/images/IconSave.svg';
import IconPremium40 from '../../assets/images/IconPremium40.svg';
//COMPONENT
import { HeaderTitle } from '../../components/Header/Header.component';
import { ModalInsert } from '../../components/Modal/ModalInsert';
import Input from '../../components/Input/Input.component';
import {
  PopUpSuccess,
  PopUpLoading,
} from '../../components/Modal/GeneralPopUps.component';
//STYLE
import { styleElement1, styleElement2 } from '../Profile/Profile.style';
import { styleAddtree } from '../Setupfarm/Style';
//USE LOGIC
import { UseLogic } from './UserLogic';

const Profile = ({ navigation }: any) => {
  const {
    handleLogOut,
    fullName,
    email,
    avatar,
    farmName,
    phoneNumber,
    isModalEditProfile,
    handleModelEditProfile,
    handleModalImagePicker,
    selectImage,
    profile,
    handleInputChange,
    handleEditProfile,
    setIsModalSuccess,
    isModalLoading,
    isModalSuccess,
    titlePopupNoti,
    contentPopupNoti,
    titleModalSuccess,
    handleFunction,
    setSelectImage,
  } = UseLogic(navigation);
  console.log('profile', profile);
  console.log('avatar', avatar);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderTitle title="Profile" />
        <View style={{ height: 24 }} />
        <View style={styleElement1.root}>
          {avatar ? (
            <Image
              source={{
                uri: avatar,
              }}
              style={{ width: 80, height: 80, borderRadius: 100 }}
            />
          ) : (
            <Image
              source={require('../../assets/images/avatarUser.png')}
              style={{ width: 80, height: 80, borderRadius: 100 }}
            />
          )}
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
              {phoneNumber ? (
                <Text style={styleElement2.farmName}>{phoneNumber}</Text>
              ) : (
                <Text style={styleElement2.farmName1}>Not set</Text>
              )}
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
            // opress đến trang InforPayment
            onPress={() => navigation.navigate('InforPayment')}>
            <IconPremium40 />
            <View style={{ width: 16 }} />
            <View style={styleElement2.content}>
              <Text style={styleElement2.farmName}>Upgrade premium</Text>
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
          onPress={handleModelEditProfile}>
          <View style={stylesButton.txtBtnSignup}>
            <IconEditBlue40 />
            <View style={{ width: 0 }} />
            <Text style={stylesButton.btnTextBlue}>Edit profile</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>

      <ModalInsert isVisible={isModalEditProfile} isPick={false}>
        <StatusBar backgroundColor={'#07111B'} />
        <View style={{ flex: 1 }}>
          <ModalInsert.Container>
            <ModalInsert.Header>
              <View style={styleAddtree.headSessionModal}>
                <TouchableOpacity onPress={handleModelEditProfile}>
                  <IconBack> </IconBack>
                </TouchableOpacity>
                <View style={styleAddtree.txtContainer}>
                  <Text style={styleAddtree.txtTitleModal}>Edit profile</Text>
                </View>
                <View
                  style={{
                    width: 40,
                    height: 40,
                  }}
                />
              </View>
            </ModalInsert.Header>
            <ScrollView>
              <ModalInsert.Body>
                <View style={styleAddtree.root}>
                  {selectImage ? (
                    <Image
                      style={{ height: 80, width: 80, borderRadius: 100 }}
                      source={{
                        uri: selectImage,
                      }}
                    />
                  ) : (
                    <Image
                      style={{
                        height: 80,
                        width: 80,
                      }}
                      source={require('../../assets/images/Avatar.png')}
                    />
                  )}
                  <View style={{ width: 8 }} />
                  <TouchableOpacity
                    style={styleAddtree.hoverButtonFull}
                    onPress={handleModalImagePicker}>
                    <View style={styleAddtree.frame625074}>
                      <View style={styleAddtree.frame625079}>
                        <IconUpload />
                        <View style={{ width: 16 }} />
                        <Text style={styleAddtree.photo}>Photo</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View style={{ width: 8 }} />
                  <TouchableOpacity
                    onPress={() => {
                      setSelectImage('');
                    }}>
                    <IconDeleteRed />
                  </TouchableOpacity>
                </View>
                <View style={styleAddtree.inputSession}>
                  {profile.map((input, index) => (
                    <View key={index}>
                      <Input
                        label={input.label}
                        textPlaceholder={`Enter your ${input.label.toLowerCase()}`}
                        value={input.value}
                        onChangeText={(text: string) =>
                          handleInputChange(index, text)
                        }
                        textError={input.error}
                        keyboardType={
                          input.label === 'Quanlity' ? 'numeric' : 'default'
                        }
                        span="*"
                      />
                    </View>
                  ))}
                </View>
                <TouchableOpacity
                  style={styleAddtree.btnSendSession}
                  onPress={handleEditProfile}>
                  <View style={styleAddtree.txtBtnSignup}>
                    <IconSave />
                    <View style={{ width: 16 }} />
                    <Text
                      style={{
                        fontSize: 16,
                        textAlign: 'center',
                        color: '#FFFFFF',
                        fontWeight: 'bold',
                      }}>
                      SAVE
                    </Text>
                  </View>
                </TouchableOpacity>
              </ModalInsert.Body>
            </ScrollView>
          </ModalInsert.Container>
        </View>
      </ModalInsert>

      <PopUpSuccess
        isModalSuccess={isModalSuccess}
        titleHeader={titlePopupNoti}
        titleBody={contentPopupNoti}
        handleModalSuccess={() => setIsModalSuccess(!isModalSuccess)}
        handleFunction={handleFunction}
        title={titleModalSuccess}
      />

      <PopUpLoading isModalVisible={isModalLoading} />
    </>
  );
};

export default Profile;
