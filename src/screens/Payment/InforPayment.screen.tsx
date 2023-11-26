import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { HeaderTitle } from '../../components/Header/Header.component';
import stylesButton from '../Login/Style';
import IconDola from '../../assets/images/IconDola.svg';
import {
  PopUpLoading,
  PopUpSuccess,
} from '../../components/Modal/GeneralPopUps.component';
import LottieView from 'lottie-react-native';
import { UseLogic } from './UseLogic';
import { WebView } from 'react-native-webview';
import styles from './Style';

const InforPayment = ({ navigation }: any) => {
  const {
    paypalUrl,
    onPressPaypal,
    onUrlChange,
    isLoading,
    isPayment,
    isModalSuccess,
    setIsModalSuccess,
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
          <View style={styles.root}>
            <Text style={styles.textBody}>
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
            <Text style={styles.textBody}>
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
      <PopUpSuccess
        isModalSuccess={isModalSuccess}
        titleHeader={'Successfully'}
        titleBody={'Your account has been upgraded to Premium.'}
        handleModalSuccess={() => setIsModalSuccess(!isModalSuccess)}
        handleFunction={() => {
          navigation.navigate('Chat AI');
        }}
        title={'payment'}
      />
      <PopUpLoading isModalVisible={isLoading} />
    </>
  );
};

export default InforPayment;
