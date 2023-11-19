import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { COLORS } from '../../theme/color';
import IconButtonSend48 from '../../assets/images/IconButtonSend48.svg';
import { HeaderComponent } from '../../components/Header/Header.component';
import {
  stylesInputMessage,
  styles,
  stylesChatAI,
  stylesPayment,
} from './ChatAI.style';
import { UseLogic } from './UseLogic';
import { is } from 'date-fns/locale';
import stylesButton from '../Login/Login.style';
import IconDola from '../../assets/images/IconDola.svg';
import IconUpgrade from '../../assets/images/IconUpgrade.svg';
import LottieView from 'lottie-react-native';

const ChatAIScreen = ({ navigation }: any) => {
  const { textInput, setTextInput, data, sendUserMessage, isPayment } =
    UseLogic();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
      <HeaderComponent onPress={() => navigation.navigate('Profile')} />
      {isPayment === false ? (
        <>
          <View style={stylesPayment.root}>
            <View style={stylesPayment.content}>
              <LottieView
                style={{ width: '100%', height: 250 }}
                source={require('../../assets/animations/RobotHello.json')}
                autoPlay
                loop
              />
              <Text style={stylesPayment.title}>Upgrade Account</Text>
              <Text style={stylesPayment.body}>
                Please upgrade your account to use the chat with AI feature.
              </Text>

              <View style={{ height: 48 }} />
              <TouchableOpacity
                style={stylesButton.signupGoogleBtn1}
                onPress={() => navigation.navigate('InforPayment')}>
                <View style={stylesButton.txtBtnSignup}>
                  <IconUpgrade />
                  <View style={{ width: 0 }} />
                  <Text style={stylesButton.btnTextBlue}>Upgrade now</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <View style={styles.container}>
          <Text style={styles.header}>Smafa AI</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={
                  item.type === 'user'
                    ? styles.userMessage
                    : styles.assistantMessage
                }>
                <Text
                  style={
                    item.type === 'user'
                      ? styles.textUserMessage
                      : styles.textAssistantMessage
                  }>
                  {item.text}
                </Text>
              </View>
            )}
          />
          <View style={stylesChatAI.root}>
            <TextInput
              style={stylesInputMessage.root}
              value={textInput}
              onChangeText={text => setTextInput(text)}
              placeholder="Type your message..."
              placeholderTextColor={COLORS.text2}
              cursorColor={COLORS.blue}
            />
            <View style={{ width: 8 }} />
            <TouchableOpacity onPress={sendUserMessage}>
              <IconButtonSend48 />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ChatAIScreen;
