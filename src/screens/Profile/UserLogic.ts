/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { MediaType, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

export function UseLogic() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [farmName, setFarmName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
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

  const handleLogOut = async (navigation: {
    navigate: (arg0: string) => void;
  }) => {
    navigation.navigate('LoginScreen');
    await GoogleSignin.revokeAccess();
    try {
      await auth().signOut();
    } catch (error) {
      console.log(error);
    }
  };
  const handleModelEditProfile = () => {
    setIsModalEditProfile(!isModalEditProfile);
    setProfile([
      { label: 'Farm name', value: farmName, error: '' },
      { label: 'Full name', value: fullName, error: '' },
      { label: 'Phone number', value: phoneNumber, error: '' },
    ]);
  };
  const getInformationUser = async () => {
    const user = auth().currentUser;
    useEffect(() => {
      if (user) {
        const subscriber = firestore()
          .collection('users')
          .doc(user?.uid)
          .onSnapshot(documentSnapshot => {
            if (documentSnapshot.exists) {
              setFarmName(documentSnapshot.data()?.farmName);
              setFullName(documentSnapshot.data()?.fullName);
              setPhoneNumber(documentSnapshot.data()?.phoneNumber);
              setEmail(documentSnapshot.data()?.email);
              setAvatar(documentSnapshot.data()?.imageUrl);
            } else {
              console.log('Document does not exist');
              setFarmName('');
              setFullName('');
              setPhoneNumber('');
              setEmail('');
              setAvatar('');
            }
          });

        return () => subscriber();
      }
    }, [user]);
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
    // nếu không nhập vào thì báo lỗi
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
    try {
      const farmNameValue = farmNameInput?.value;
      const fullNameValue = fullNameInput?.value;
      const phoneNumberValue = phoneNumberInput?.value;
      const image = selectImage;
      let imageUrl = '';
      const userId = auth().currentUser?.uid;
      // if image là url với http thì không cần thay đổi ảnh
      if (image && image.includes('http')) {
        imageUrl = image;
      } else if (image) {
        // xóa ảnh cũ trong storage
        // const tree = trees.find(tree => tree.key === (key as any));
        // if (tree) {
        //   const filename = auth().currentUser?.uid + tree.name;
        //   const storageRef = storage().ref(`imageTree/${filename}`);
        //   storageRef.delete();
        // }

        const filename = userId;
        const storageRef = storage().ref(`imageAvatar/${filename}`);
        await storageRef.putFile(image);
        imageUrl = await storageRef.getDownloadURL();
      }
      // await firestore()
      //       .collection('users')
      //       .doc(auth().currentUser?.uid)
      //       .set({
      //         fullName: fullNameGoogle,
      //         email: emailGoogle,
      //       });
      firestore()
        .collection('users')
        .doc(userId)
        .update({
          fullName: fullNameValue,
          farmName: farmNameValue,
          phoneNumber: phoneNumberValue,
          imageUrl: imageUrl,
        })
        .then(() => {
          setIsModalEditProfile(() => false);
          setIsModalLoading(() => false);
          setIsModalSuccess(() => true);
        });

      // setSelectImage('');
      // setInputs(
      //   inputs.map(input => ({
      //     ...input,
      //     value: '',
      //     error: '',
      //   })),
      // );
    } catch (error: any) {
      console.log('error', error);
    }
  };

  const handleModalLoading = () => setIsModalLoading(() => !isModalLoading);

  getInformationUser();
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
