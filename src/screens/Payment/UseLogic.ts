/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { MediaType, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

export function UseLogic() {
  const [isModalPayment, setIsModalPayment] = useState(false);
  const handleModalPayment = () => {
    setIsModalPayment(!isModalPayment);
  };
  const [inputsPayment, setInputsPayment] = useState([
    { label: 'Card name', value: '', error: '' },
    { label: 'End date', value: '', error: '' },
    { label: 'CVC', value: '', error: '' },
  ]);
  const handleInputChange = (index: any, value: any) => {
    const newInputs = [...inputsPayment];
    newInputs[index].value = value;
    newInputs[index].error = '';
    setInputsPayment(newInputs);
  };

  return {
    handleModalPayment,
    isModalPayment,
    setIsModalPayment,
    inputsPayment,
    setInputsPayment,
    handleInputChange,
  };
}
