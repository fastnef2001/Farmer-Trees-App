import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Database } from '../../database/database';

export function UseLogic() {
  const { createAccount, createAccountByGoogle, titleError } = Database();
  const [isModalVisibleLoading, setIsModalVisibleLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [inputs, setInputs] = useState([
    { label: 'Full name', value: '', error: '' },
    { label: 'Email', value: '', error: '' },
    { label: 'Password', value: '', error: '' },
    { label: 'Confirm Password', value: '', error: '' },
  ]);
  let textErrorEmail = '';
  let textErrorPassword = '';
  let textErrorConfirmPassword = '';
  // Modal loading

  const handleInputChange = (index: any, value: any) => {
    const newInputs = [...inputs];
    newInputs[index].value = value;
    newInputs[index].error = '';
    setInputs(newInputs);
  };

  const handleRegister = async () => {
    const fullNameInput = inputs.find(input => input.label === 'Full name');
    const emailInput = inputs.find(input => input.label === 'Email');
    const passwordInput = inputs.find(input => input.label === 'Password');
    const confirmPasswordInput = inputs.find(
      input => input.label === 'Confirm Password',
    );

    // // Check if any input is empty
    if (
      !emailInput?.value ||
      !passwordInput?.value ||
      !fullNameInput?.value ||
      !confirmPasswordInput?.value
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
      textErrorEmail = 'Invalid email format.';
      handleError();
      return;
    }

    if (
      !/(?=.*[a-z])/.test(passwordInput?.value) ||
      !/(?=.*[A-Z])/.test(passwordInput?.value) ||
      !/(?=.*[0-9])/.test(passwordInput?.value) ||
      passwordInput?.value.length < 6
    ) {
      textErrorPassword =
        'Password must be at least 6 characters, 1 uppercase, 1 lowercase, 1 number.';
      handleError();
      return;
    }
    // Check if password and confirm password match
    if (passwordInput?.value !== confirmPasswordInput?.value) {
      textErrorConfirmPassword = 'Password does not match.';
      handleError();
      return;
    }
    //register
    setIsModalVisibleLoading(true);
    const isCreateAccount = await createAccount(
      emailInput,
      passwordInput,
      fullNameInput,
    );
    setErrorText(titleError);
    setIsModalVisibleLoading(false);
    if (isCreateAccount) {
      setInputs(
        inputs.map(input => ({
          ...input,
          value: '',
        })),
      );
      setErrorText('');
      setTimeout(() => {
        setIsModalVisible(true);
      }, 1000);
    }
  };

  const handleError = () => {
    setInputs(
      inputs.map(input => ({
        ...input,
        error:
          input.label === 'Email'
            ? textErrorEmail
            : input.label === 'Password'
            ? textErrorPassword
            : input.label === 'Confirm Password'
            ? textErrorConfirmPassword
            : '',
      })),
    );
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
    const isCreateAccount = await createAccountByGoogle(
      googleCredential,
      userInfo,
    );
    setErrorText(titleError);
    setIsModalVisibleLoading(false);
    if (isCreateAccount) {
      setTimeout(() => {
        setIsModalVisible(true);
      }, 500);
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
    setIsModalVisibleLoading,
    errorText,
  };
}
