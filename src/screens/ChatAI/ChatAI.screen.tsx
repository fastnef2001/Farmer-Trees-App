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
import { stylesInputMessage, styles, stylesChatAI } from './ChatAI.style';
import { UseLogic } from './UseLogic';

const ChatAIScreen = ({ navigation }: any) => {
  const { textInput, setTextInput, data, setData, sendUserMessage } =
    UseLogic();

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
    </SafeAreaView>
  );
};

export default ChatAIScreen;
