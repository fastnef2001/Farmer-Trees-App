import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';
import OpenAI from 'openai';
import axios from 'axios';

type MessageType = {
  type: 'user' | 'bot'; // Chỉ cho TypeScript biết kiểu của role là 'user' hoặc 'assistant'
  text: string;
};

const ChatAIScreen = () => {
  const [textInput, setTextInput] = useState('');
  const [data, setData] = useState<MessageType[]>([]);
  const apiKey = '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';
  const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';

  const sendUserMessage = async () => {
    const prompt = textInput;
    const response = await axios.post(
      apiUrl,
      {
        prompt: prompt,
        max_tokens: 150,
        temperature: 0.9,
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
    setTextInput('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chat AI</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={
              item.type === 'user'
                ? styles.userMessage
                : styles.assistantMessage
            }>
            <Text style={{ color: 'black' }}>{item.text}</Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        value={textInput}
        onChangeText={text => setTextInput(text)}
        placeholder="Type your message..."
      />
      <Button title="Send" onPress={sendUserMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  userMessage: {
    backgroundColor: '#E5E5E5',
    padding: 8,
    alignSelf: 'flex-end',
    marginVertical: 4,
    borderRadius: 8,
  },
  assistantMessage: {
    backgroundColor: '#F5F5F5',
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
});

export default ChatAIScreen;
