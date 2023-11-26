import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { HeaderTitle } from '../../components/Header/Header.component';
import IconUser40 from '../../assets/images/IconUser40.svg';
import IconPhone40 from '../../assets/images/IconPhone40.svg';
import IconDetailBold from '../../assets/images/IconDetailBold.svg';
import IconBell40 from '../../assets/images/IconBell40.svg';
import IconHeart40 from '../../assets/images/IconHeart40.svg';
import IconLogOut40 from '../../assets/images/IconLogOut40.svg';
import stylesButton from '../Login/Style';
import IconEditBlue40 from '../../assets/images/IconEditBlue40.svg';
import IconDola from '../../assets/images/IconDola.svg';
import IconVerify from '../../assets/images/IconVerify.svg';
import { styleElement1, styleElement2 } from '../Profile/Profile.style';
// import { UseLogic } from './UserLogic';
import { ModalInsert } from '../../components/Modal/ModalInsert';
import IconBack from '../../assets/images/IconBack.svg';
import IconUpload from '../../assets/images/IconUpload.svg';
import IconDeleteRed from '../../assets/images/IconDeleteRed.svg';
import IconSave from '../../assets/images/IconSave.svg';
import IconPremium40 from '../../assets/images/IconPremium40.svg';
import Input from '../../components/Input/Input.component';
import { COLORS } from '../../theme/color';
import {
  PopUpLoading,
  PopUpSuccessPayment,
} from '../../components/Modal/GeneralPopUps.component';
import LottieView from 'lottie-react-native';
import { UseLogic } from './UseLogic';
import styles from '../Setupfarm/Style';
import { WebView } from 'react-native-webview';
import { is } from 'date-fns/locale';

// interface UserData {
//   fullName: string;
//   farmName: string;
//   phoneNumber: string;
// }

const InforPayment = ({ navigation }: any) => {
  const {
    handleModalPayment,
    isModalPayment,
    setIsModalPayment,
    setInputsPayment,
    inputsPayment,
    handleInputChange,
    paypalUrl,
    onPressPaypal,
    onUrlChange,
    showPopUpSuccess,
    setShowPopUpSuccess,
    isLoading,
    isPayment,
  } = UseLogic();
  return (
    <>
      {paypalUrl ? (
        <WebView
          source={{
            uri: paypalUrl,
          }}
          style={{ flex: 1 }}
          domStorageEnabled={true}
          startInLoadingState={false}
          javaScriptEnabled={true}
          onNavigationStateChange={onUrlChange}
        />
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          <HeaderTitle title="Upgarde premium" />
          <View style={styless.root}>
            <Text style={styless.textBody}>
              Upgrade your account to Premium and take your user experience to
              the next level! With our Premium subscription, you gain exclusive
              access to the chat feature with AI, opening up a world of
              possibilities and enhancing your interaction with our platform.
            </Text>
            <LottieView
              style={{ width: 400, height: 250 }}
              source={require('../../assets/animations/RobotReview.json')}
              autoPlay
              loop
            />
            <Text style={styless.textBody}>
              For only $100, you can unlock all these premium features and
              elevate your account to a new level of sophistication. We believe
              in providing exceptional value for your investment, making your
              journey with us not just satisfying but truly extraordinary.
            </Text>
          </View>

          <View style={{ height: 40 }} />
          {isPayment === true ? (
            <View style={stylesButton.signupGoogleBtnDesable}>
              <View style={stylesButton.txtBtnSignup}>
                <View style={{ width: 0 }} />
                <Text style={stylesButton.btnText}>Upgraded</Text>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              style={stylesButton.signupGoogleBtn}
              onPress={onPressPaypal}>
              <View style={stylesButton.txtBtnSignup}>
                <IconDola />
                <View style={{ width: 0 }} />
                <Text style={stylesButton.btnTextBlue}>Pay immediately</Text>
              </View>
            </TouchableOpacity>
          )}
        </SafeAreaView>
      )}
      <PopUpSuccessPayment
        isModalSuccess={showPopUpSuccess}
        titleHeader={'Successfully'}
        titleBody={'Your account has been upgraded to Premium'}
        handleModalSuccess={() => setShowPopUpSuccess(false)}
        isFooter={true}
        handleDeleteTree={() => navigation.navigate('Chat AI')}
      />
      <PopUpLoading isModalVisible={isLoading} />
    </>
  );
};

export default InforPayment;

const styless = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    alignSelf: 'center',
    paddingTop: 16,
  },
  textBody: {
    color: COLORS.text1,
    textAlign: 'justify',
    fontFamily: 'Nunito-Medium',
    fontSize: 14,
  },
});
