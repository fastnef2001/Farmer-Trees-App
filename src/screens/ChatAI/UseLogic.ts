import { useState, useEffect } from 'react';
import axios from 'axios';
type MessageType = {
  type: 'user' | 'bot';
  text: string;
};

export function UseLogic() {
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
  return {
    textInput,
    setTextInput,
    data,
    setData,
    sendUserMessage,
  };
}
