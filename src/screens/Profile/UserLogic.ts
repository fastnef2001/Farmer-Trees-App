import { useState, useEffect } from 'react';
import { MediaType, launchImageLibrary } from 'react-native-image-picker';
import { Database } from '../../database/database';
import { set } from 'date-fns';

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
  const [titlePopupNoti, setTitlePopupNoti] = useState('');
  const [contentPopupNoti, setContentPopupNoti] = useState('');
  const [titleModalSuccess, setTitleModalSuccess] = useState('Successfully');
  let handleFunction = () => {};
  let fullName = '';
  let email = '';
  let avatar = '';
  let farmName = '';
  let phoneNumber = '';

  //ABOUT PROFILE
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
    setIsModalLoading(() => true);
    const isEditProfile = await editProfile(
      farmNameInput,
      fullNameInput,
      phoneNumberInput,
      selectImage,
    );
    setIsModalLoading(() => false);
    if (isEditProfile) {
      setIsModalEditProfile(() => false);
      handleModalSuccessEditProfile();
    }
  };

  // HANDLE LOGOUT
  const handleLogOut = async () => {
    signOut();
    navigation.navigate('LoginScreen');
  };

  // HANDLE MODAL
  const handleModalSuccessEditProfile = () => {
    setIsModalSuccess(() => true);
    setTitlePopupNoti('Successfully');
    setContentPopupNoti('Edit profile successfully');
    handleFunction = () => {};
    setTitleModalSuccess('');
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
  const handleInputChange = (index: any, value: any) => {
    const newInputs = [...profile];
    newInputs[index].value = value;
    newInputs[index].error = '';
    setProfile(newInputs);
  };

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
    setSelectImage,
    selectImage,
    profile,
    handleInputChange,
    handleEditProfile,
    isModalSuccess,
    setIsModalSuccess,
    isModalLoading,
    setIsModalLoading,
    titlePopupNoti,
    contentPopupNoti,
    titleModalSuccess,
    handleFunction,
  };
}
