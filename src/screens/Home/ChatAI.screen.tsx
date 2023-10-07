import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import OpenAI from 'openai';
import axios from 'axios';
import IconComplete from '../../assets/images/IconComplete.svg';
import styles1 from '../Setupfarm/Addtree.style';
import IconAdd from '../../assets/images/IconAdd.svg';
import Input from '../../components/Input/Input.component';
import { COLORS } from '../../theme/color';
import IconButtonSend48 from '../../assets/images/IconButtonSend48.svg';
import { HeaderComponent } from '../../components/Header/Header.component';

type MessageType = {
  type: 'user' | 'bot';
  text: string;
};

const ChatAIScreen = ({ navigation }: any) => {
  const [textInput, setTextInput] = useState('');
  const [data, setData] = useState<MessageType[]>([]);
  const apiKey = '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';
  const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';

  const sendUserMessage = async () => {
    if (textInput.trim() === '') {
      return; // Tránh gửi tin nhắn trống
    }
    setData([
      ...data,
      {
        type: 'user',
        text: textInput,
      },
      {
        type: 'bot',
        text: 'Loading...',
      },
    ]);
    const prompt = textInput;
    setTextInput('');
    const response = await axios.post(
      apiUrl,
      {
        prompt: prompt,
        max_tokens: 150,
        temperature: 1,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );
    const text = response.data.choices[0].text;
    setData([
      ...data,
      {
        type: 'user',
        text: textInput,
      },
      {
        type: 'bot',
        text: text,
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
      <HeaderComponent onPress={() => navigation.navigate('Profile')} />
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
        <View
          style={{
            paddingTop: 8,
            width: '100%',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
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
    </SafeAreaView>
  );
};

const stylesInputMessage = StyleSheet.create({
  root: {
    alignItems: 'center',
    flexDirection: 'row',
    color: COLORS.text1,
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Nunito-Bold',
    color: COLORS.blue,
  },
  userMessage: {
    backgroundColor: COLORS.blue,
    padding: 8,
    alignSelf: 'flex-end',
    marginVertical: 4,
    borderRadius: 8,
  },
  assistantMessage: {
    backgroundColor: '#EAE8E8',
    padding: 8,
    alignSelf: 'flex-start',
    marginVertical: 4,
    borderRadius: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    padding: 8,
  },
  textUserMessage: {
    color: COLORS.white,
    fontFamily: 'Nunito-Regular',
  },
  textAssistantMessage: {
    color: COLORS.text1,
    fontFamily: 'Nunito-Regular',
  },
});

export default ChatAIScreen;
