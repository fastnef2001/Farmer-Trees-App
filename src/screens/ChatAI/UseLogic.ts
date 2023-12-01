import { useState, useEffect } from 'react';
import axios from 'axios';
import { MessageType } from '../../Interface/Interface';
import { Database } from '../../database/database';

export function UseLogic() {
  const { chekIsPayment, isPayment } = Database();
  const [textInput, setTextInput] = useState('');
  const [data, setData] = useState<MessageType[]>([]);

  useEffect(() => {
    chekIsPayment();
  }, [chekIsPayment]);

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
        model: 'davinci',
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
