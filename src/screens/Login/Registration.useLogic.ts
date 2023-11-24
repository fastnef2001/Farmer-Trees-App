import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { Database } from '../../database/database';

export function UseLogic() {
  const { createAccount, createAccountByGoogle, userInfors, getInforUser } =
    Database();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleLoading, setIsModalVisibleLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [inputs, setInputs] = useState([
    { label: 'Full name', value: '', error: '' },
    { label: 'Email', value: '', error: '' },
    { label: 'Phone number', value: '', error: '' },
    { label: 'Password', value: '', error: '' },
    { label: 'Confirm Password', value: '', error: '' },
  ]);

  getInforUser();

  const handleInputChange = (index: any, value: any) => {
    const newInputs = [...inputs];
    newInputs[index].value = value;
    newInputs[index].error = '';
    setInputs(newInputs);
  };

  const handleRegister = async () => {
    setErrorText('');
    const fullNameInput = inputs.find(input => input.label === 'Full name');
    const emailInput = inputs.find(input => input.label === 'Email');
    const phoneNumberInput = inputs.find(
      input => input.label === 'Phone number',
    );
    const passwordInput = inputs.find(input => input.label === 'Password');
    const confirmPasswordInput = inputs.find(
      input => input.label === 'Confirm Password',
    );

    // Check if any input is empty
    if (
      !emailInput?.value ||
      !passwordInput?.value ||
      !fullNameInput?.value ||
      !phoneNumberInput?.value
    ) {
      setInputs(
        inputs.map(input => ({
          ...input,
          error: !input.value ? `Please enter ${input.label}` : '',
        })),
      );
      return;
    }
    // Check if email is valid
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(emailInput?.value)) {
      setInputs(
        inputs.map(input => ({
          ...input,
          error: input.label === 'Email' ? 'Invalid email format.' : '',
        })),
      );
      return;
    }
    // check email is already in use
    const isUserExist = await auth().fetchSignInMethodsForEmail(
      emailInput.value,
    );
    if (isUserExist.length > 0) {
      setInputs(
        inputs.map(input => ({
          ...input,
          error: input.label === 'Email' ? 'Email already in use.' : '',
        })),
      );
      return;
    }
    //check phone number valid vietnam phone number
    if (!/((09|03|07|08|05)+([0-9]{8})\b)/g.test(phoneNumberInput?.value)) {
      setInputs(
        inputs.map(input => ({
          ...input,
          error:
            input.label === 'Phone number'
              ? 'Invalid phone number format.'
              : '',
        })),
      );
      return;
    }
    //check phone number is already in use
    const isPhoneNumberExist = userInfors.find(
      userInfor => userInfor.phoneNumber === phoneNumberInput?.value,
    );
    if (isPhoneNumberExist) {
      setInputs(
        inputs.map(input => ({
          ...input,
          error:
            input.label === 'Phone number'
              ? 'Phone number already in use.'
              : '',
        })),
      );
      return;
    }
    // Check if password is strong enough (at least 6 characters, 1 uppercase, 1 lowercase, 1 number)
    if (
      !/(?=.*[a-z])/.test(passwordInput?.value) ||
      !/(?=.*[A-Z])/.test(passwordInput?.value) ||
      !/(?=.*[0-9])/.test(passwordInput?.value) ||
      passwordInput?.value.length < 6
    ) {
      setInputs(
        inputs.map(input => ({
          ...input,
          error:
            input.label === 'Password'
              ? 'Password must be at least 6 characters, 1 uppercase, 1 lowercase, 1 number.'
              : '',
        })),
      );
      return;
    }
    // Check if password and confirm password match
    if (passwordInput?.value !== confirmPasswordInput?.value) {
      setInputs(
        inputs.map(input => ({
          ...input,
          error:
            input.label === 'Confirm Password'
              ? 'Password does not match.'
              : '',
        })),
      );
      return;
    }

    // register
    setIsModalVisibleLoading(true);
    if (
      await createAccount(
        emailInput,
        passwordInput,
        fullNameInput,
        phoneNumberInput,
      )
    ) {
      setInputs(
        inputs.map(input => ({
          ...input,
          value: '',
        })),
      );
      setIsModalVisible(true);
      setIsModalVisibleLoading(false);
    } else {
      setErrorText('Sign up failed. Please check again.');
    }
  };

  const handleRegisterByGoogle = async () => {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo.idToken,
    );
    const isUserExist = await auth().fetchSignInMethodsForEmail(
      userInfo.user.email,
    );
    if (isUserExist.length > 0) {
      setErrorText('Gmail is already registered.');
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      return;
    }
    setIsModalVisibleLoading(true);
    if (await createAccountByGoogle(googleCredential, userInfo)) {
      setIsModalVisibleLoading(false);
      setIsModalVisible(true);
      return;
    } else {
      setErrorText('Sign up failed. Please check again.');
    }
  };

  return {
    inputs,
    handleInputChange,
    handleRegister,
    handleRegisterByGoogle,
    isModalVisible,
    setIsModalVisible,
    isModalVisibleLoading,
    errorText,
  };
}
