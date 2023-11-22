import { useState, useEffect } from 'react';
import axios from 'axios';
type MessageType = {
  type: 'user' | 'bot';
  text: string;
};
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export function UseLogic() {
  const user = auth().currentUser;
  const [isPayment, setIsPayment] = useState(false);

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(user?.uid)
      .onSnapshot(documentSnapshot => {
        setIsPayment(documentSnapshot.data()?.isPayment);
      });
    return () => subscriber();
  }, [user]);

  const [textInput, setTextInput] = useState('');
  const [data, setData] = useState<MessageType[]>([]);
  const apiKey = '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';
  const apiUrl = 'https://api.openai.com/v1/completions';
  useEffect(() => {
    setData([
      {
        type: 'bot',
        text: 'Hello, I am your personal assistant. How can I help you?',
      },
    ]);
  }, []);
  const sendUserMessage = async () => {
    if (textInput.trim() === '') {
      return;
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
        model: 'gpt-3.5-turbo-1106',
        prompt: prompt,
        max_tokens: 150,
        temperature: 0.3,
        top_p: 1,
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
  return {
    textInput,
    setTextInput,
    data,
    setData,
    sendUserMessage,
    isPayment,
  };
}
