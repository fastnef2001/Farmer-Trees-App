import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Database } from '../../database/database';
import { set } from 'date-fns';

export function UseLogic({ navigation }: any) {
  const { checkEmailExist, checkFarmNameExist, signOut } = Database();
  const [isModalVisibleLoading, setIsModalVisibleLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [inputs, setInputs] = useState([
    { label: 'Email', value: '', error: '' },
    { label: 'Password', value: '', error: '' },
  ]);

  GoogleSignin.configure({
    webClientId:
      '159898876320-kqda9k08g543vj86cqqq9ck78ismjiog.apps.googleusercontent.com',
  });

  const handleInputChange = (index: any, value: any) => {
    const newInputs = [...inputs];
    newInputs[index].value = value;
    newInputs[index].error = '';
    setInputs(newInputs);
  };

  const checkFarmName = async () => {
    const isCheckFarmNameExist = await checkFarmNameExist();
    {
      isCheckFarmNameExist
        ? navigation.navigate('Tabs')
        : navigation.navigate('Farmname');
    }
  };

  const signIn = async () => {
    setErrorText('');
    const emailInput = inputs.find(input => input.label === 'Email');
    const passwordInput = inputs.find(input => input.label === 'Password');
    // Check if any input is empty
    if (!emailInput?.value || !passwordInput?.value) {
      setInputs(
        inputs.map(input => ({
          ...input,
          error: !input.value ? `Please enter ${input.label}` : '',
        })),
      );
      return;
    }
    // Check if email is valid. validate email format strongly. badly formatted email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(emailInput?.value) || emailInput.value.endsWith('.')) {
      setInputs(
        inputs.map(input => ({
          ...input,
          error: input.label === 'Email' ? 'Email is invalid.' : '',
        })),
      );
      return;
    }
    // check mail not exist
    if (!(await checkEmailExist(emailInput?.value))) {
      setInputs(
        inputs.map(input => ({
          ...input,
          error: input.label === 'Email' ? 'Email does not exist.' : '',
        })),
      );
      return;
    }
    setIsModalVisibleLoading(true);
    try {
      await auth().signInWithEmailAndPassword(
        emailInput?.value,
        passwordInput?.value,
      );
      setIsModalVisibleLoading(false);
      // checkFarmName();
    } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        setInputs(
          inputs.map(input => ({
            ...input,
            error: input.label === 'Password' ? 'Wrong password.' : '',
          })),
        );
      } else {
        setIsModalVisibleLoading(false);
        setErrorText('Sign in failed. Please check again.');
      }
    }
  };

  const signByGoogle = async () => {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    if (!userInfo) {
      console.log('User cancelled the login flow');
      return;
    }
    setIsModalVisibleLoading(true);
    const email = userInfo.user.email;
    const isCheckEmailExist = await checkEmailExist(email);
    setIsModalVisibleLoading(false);
    if (!isCheckEmailExist) {
      setErrorText('Gmail is not registered.');
      signOut();
      return;
    }
    checkFarmName();
  };

  return {
    errorText,
    inputs,
    handleInputChange,
    signIn,
    signByGoogle,
    isModalVisibleLoading,
    setIsModalVisibleLoading,
  };
}
