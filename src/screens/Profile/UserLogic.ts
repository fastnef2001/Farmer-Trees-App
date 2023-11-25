/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import { MediaType, launchImageLibrary } from 'react-native-image-picker';
import { Database } from '../../database/database';

export function UseLogic(navigation: any) {
  const { getInforUser, userInfors, editProfile, signOut } = Database();
  const [isModalEditProfile, setIsModalEditProfile] = useState(false);
  const [selectImage, setSelectImage] = useState('');
  const [profile, setProfile] = useState([
    { label: 'Farm name', value: '', error: '' },
    { label: 'Full name', value: '', error: '' },
    { label: 'Phone number', value: '', error: '' },
  ]);
  const [isModalSuccess, setIsModalSuccess] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [titleHeader, setTitleHeader] = useState('Successfully');
  const [titleBody, setTitleBody] = useState(
    'Your profile has been updated successfully',
  );
  let fullName = '';
  let email = '';
  let avatar = '';
  let farmName = '';
  let phoneNumber = '';

  useEffect(() => {
    getInforUser();
  }, [getInforUser]);

  userInfors.forEach((userInfor: any) => {
    fullName = userInfor.fullName;
    email = userInfor.email;
    avatar = userInfor.imageUrl;
    farmName = userInfor.farmName;
    phoneNumber = userInfor.phoneNumber;
  });

  const handleLogOut = async () => {
    signOut();
    navigation.navigate('LoginScreen');
  };

  const handleModelEditProfile = () => {
    setIsModalEditProfile(!isModalEditProfile);

    setProfile([
      { label: 'Farm name', value: farmName, error: '' },
      { label: 'Full name', value: fullName, error: '' },
      { label: 'Phone number', value: phoneNumber, error: '' },
    ]);
  };

  const handleModalImagePicker = () => {
    const option = {
      mediaType: 'photo' as MediaType,
      storageOptions: {
        path: 'image',
      },
    };
    launchImageLibrary(option, response => {
      if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0].uri;
        if (selectedImage) {
          setSelectImage(selectedImage);
        }
      }
    });
  };
  const handleDeleteImage = () => setSelectImage('');
  const handleInputChange = (index: any, value: any) => {
    const newInputs = [...profile];
    newInputs[index].value = value;
    newInputs[index].error = '';
    setProfile(newInputs);
  };

  const handleEditProfile = async () => {
    const farmNameInput = profile.find(input => input.label === 'Farm name');
    const fullNameInput = profile.find(input => input.label === 'Full name');
    const phoneNumberInput = profile.find(
      input => input.label === 'Phone number',
    );
    if (!farmNameInput?.value || !fullNameInput?.value) {
      setProfile(
        profile.map(input => ({
          ...input,
          error: !input.value ? `Please enter ${input.label}` : '',
        })),
      );
      return;
    }

    handleModalLoading();
    if (
      await editProfile(
        farmNameInput,
        fullNameInput,
        phoneNumberInput,
        selectImage,
      )
    ) {
      setIsModalEditProfile(() => false);
      setIsModalLoading(() => false);
      setIsModalSuccess(() => true);
    }
  };

  const handleModalLoading = () => setIsModalLoading(() => !isModalLoading);
  return {
    handleLogOut,
    fullName,
    email,
    avatar,
    farmName,
    phoneNumber,
    isModalEditProfile,
    setIsModalEditProfile,
    handleModelEditProfile,
    handleModalImagePicker,
    handleDeleteImage,
    selectImage,
    setSelectImage,
    profile,
    handleInputChange,
    handleEditProfile,
    isModalSuccess,
    setIsModalSuccess,
    isModalLoading,
    setIsModalLoading,
    titleHeader,
    titleBody,
  };
}
