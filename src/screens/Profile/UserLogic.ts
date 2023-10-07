/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { set } from 'date-fns';

export function UseLogic() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [farmName, setFarmName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
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
            } else {
              console.log('Document does not exist');
              setFarmName('');
              setFullName('');
              setPhoneNumber('');
            }
          });

        return () => subscriber();
      }
    }, [user]);
  };
  getInformationUser();
  // lấy
  return { handleLogOut, fullName, email, avatar, farmName, phoneNumber };
}
