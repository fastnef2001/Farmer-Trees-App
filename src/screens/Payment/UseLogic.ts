/* eslint-disable no-alert */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { MediaType, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import paypalApi from './paypalAPI';
import queryString from 'query-string';

export function UseLogic() {
  const [isModalPayment, setIsModalPayment] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState(null);
  const [accessToken, setAccessToken] = useState<any>(null || '');
  const [showPopUpSuccess, setShowPopUpSuccess] = useState(false);

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

  const onPressPaypal = async () => {
    setLoading(true);
    try {
      const token = await paypalApi.generateToken();
      const res: any = await paypalApi.createOrder(token);
      setAccessToken(token);
      console.log('default order', res);
      setLoading(false);
      if (res?.links) {
        const findUrl = res.links.find(
          (data: { rel: string }) => data?.rel == 'approve',
        );
        setPaypalUrl(findUrl.href);
      }
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  const onUrlChange = (webviewState: any) => {
    console.log('webviewStatewebviewState', webviewState);
    if (webviewState.url.includes('https://example.com/cancel')) {
      clearPaypalState();
      return;
    }
    if (webviewState.url.includes('https://example.com/return')) {
      const urlValues = queryString.parseUrl(webviewState.url);
      console.log('my urls value', urlValues);
      setShowPopUpSuccess(true);
      const { token } = urlValues.query;
      if (!!token) {
        paymentSucess(token);
      }
    }
  };

  const paymentSucess = async (id: any) => {
    try {
      const res = paypalApi.capturePayment(id, accessToken);
      console.log('capturePayment res++++', res);
      clearPaypalState();
    } catch (error) {
      console.log('error raised in payment capture', error);
    }
  };

  const clearPaypalState = () => {
    //Update isPayment to true
    const user = auth().currentUser;
    if (user) {
      firestore().collection('users').doc(user?.uid).update({
        isPayment: true,
      });
    }
    setPaypalUrl(null);
    setAccessToken(null);
    setShowPopUpSuccess(true);
  };

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

  return {
    handleModalPayment,
    isModalPayment,
    setIsModalPayment,
    inputsPayment,
    setInputsPayment,
    handleInputChange,
    onPressPaypal,
    paypalUrl,
    isLoading,
    accessToken,
    onUrlChange,
    showPopUpSuccess,
    setShowPopUpSuccess,
    isPayment,
  };
}
