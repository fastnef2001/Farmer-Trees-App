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

  // Initialize some sample data when the component is first rendered
  useEffect(() => {
    setData([
      {
        type: 'bot',
        text: 'Hello, I am your personal assistant. How can I help you?',
      },
    ]);
  }, []);

  // Function sends message from user to bot and handles response
  const sendUserMessage = async () => {
    if (textInput.trim() === '') {
      return;
    }
    // Add user messages to display data
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
    // Send a request to OpenAI's API to receive a response from the bot
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
    // Add bot messages to display data
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
