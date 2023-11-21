import React, { useState, useEffect, useCallback } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { MediaType, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { ca } from 'date-fns/locale';

interface InputValues {
  value: string;
}

export function Database() {
  interface Tree {
    key(key: any): void;
    name: string;
    quanlity: string;
    imageUrl: string;
  }
  const [trees, setTrees] = useState<Tree[]>([]);
  const createAccount = async (
    emailInput: InputValues,
    passwordInput: InputValues,
    fullNameInput: InputValues,
    phoneNumberInput: InputValues,
  ) => {
    const response = await auth().createUserWithEmailAndPassword(
      emailInput.value,
      passwordInput.value,
    );
    const idUser = response.user.uid;
    await firestore().collection('users').doc(idUser).set({
      fullName: fullNameInput.value,
      phoneNumber: phoneNumberInput.value,
      email: emailInput.value,
      isPayment: false,
    });
  };
  const createAccountByGoogle = async (
    googleCredential: any,
    userInfo: any,
  ) => {
    await auth().signInWithCredential(googleCredential);
    const fullNameGoogle = userInfo.user.name;
    const emailGoogle = userInfo.user.email;
    console.log('emailGoogle', emailGoogle);
    const user = await firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .get();
    if (!user.exists) {
      await firestore().collection('users').doc(auth().currentUser?.uid).set({
        fullName: fullNameGoogle,
        email: emailGoogle,
        isPayment: false,
      });
    }
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  };
  //   const getInformationUser = async () => {
  //     try {
  //       const user = auth().currentUser;
  //       useEffect(() => {
  //         if (user) {
  //           const subscriber = firestore()
  //             .collection('users')
  //             .doc(user?.uid)
  //             .onSnapshot(documentSnapshot => {
  //               if (documentSnapshot.exists) {
  //                 // setFarmName(documentSnapshot.data()?.farmName);
  //                 // setFullName(documentSnapshot.data()?.fullName);
  //                 // setPhoneNumber(documentSnapshot.data()?.phoneNumber);
  //                 // setEmail(documentSnapshot.data()?.email);
  //                 // setAvatar(documentSnapshot.data()?.imageUrl);
  //                 // setSelectImage(documentSnapshot.data()?.imageUrl);
  //               } else {
  //                 // console.log('Document does not exist');
  //                 // setFarmName('');
  //                 // setFullName('');
  //                 // setPhoneNumber('');
  //                 // setEmail('');
  //                 // setAvatar('');
  //               }
  //             });

  //           return () => subscriber();
  //         }
  //       }, [user]);

  //       return true;
  //     } catch (error) {
  //       return false;
  //     }
  //   };

  //   const editProfile = async () => {
  //     try {

  //       return true;
  //     } catch (error) {
  //       return false;
  //     }
  //   };
  const createFarmName = async (farmName: string) => {
    try {
      await firestore()
        .collection('users')
        .doc(auth().currentUser?.uid)
        .update({
          farmName: farmName,
        });
      return true;
    } catch (error) {
      return false;
    }
  };
  const createTree = async (
    treeNameInput: InputValues,
    quanlityInput: InputValues,
    selectImage: any,
  ) => {
    try {
      const name = treeNameInput?.value;
      const quanlity = quanlityInput?.value;
      const image = selectImage;
      console.log('image', image);
      const timeAdd = new Date().getTime();
      let imageUrl = '';
      const userId = auth().currentUser?.uid;
      if (image) {
        const filename = userId + name;
        const storageRef = storage().ref(`imageTree/${filename}`);
        await storageRef.putFile(image);
        imageUrl = await storageRef.getDownloadURL();
      }
      await firestore().collection('trees').doc(userId).collection('tree').add({
        name,
        quanlity,
        imageUrl,
        timeAdd,
      });
      return true;
    } catch (error) {
      return false;
    }
  };
  const editTree = async (
    treeNameInput: InputValues,
    quanlityInput: InputValues,
    selectImage: any,
    tree: any,
    key: any,
  ) => {
    try {
      const name = treeNameInput?.value;
      const quanlity = quanlityInput?.value;
      const image = selectImage;
      let imageUrl = '';
      const userId = auth().currentUser?.uid;
      if (image && image.includes('http')) {
        imageUrl = image;
      } else if (image) {
        if (tree) {
          const filename = auth().currentUser?.uid + tree.name;
          const storageRef = storage().ref(`imageTree/${filename}`);
          storageRef.delete();
        }

        const filename = userId + name;
        const storageRef = storage().ref(`imageTree/${filename}`);
        await storageRef.putFile(image);
        imageUrl = await storageRef.getDownloadURL();
      }
      await firestore()
        .collection('trees')
        .doc(userId)
        .collection('tree')
        .doc(key)
        .update({
          name,
          quanlity,
          imageUrl,
        });
      return true;
    } catch (error) {
      return false;
    }
  };
  const getTrees = useCallback(async () => {
    try {
      const subscriber = firestore()
        .collection('trees')
        .doc(auth().currentUser?.uid)
        .collection('tree')
        .orderBy('timeAdd', 'desc')
        .onSnapshot(querySnapshot => {
          const treesIn: any = [];
          querySnapshot.forEach(documentSnapshot => {
            treesIn.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          setTrees(treesIn);
        });
      return () => subscriber();
    } catch (error) {
      return false;
    }
  }, [setTrees]);

  const deleteTree = async (tree: any, key: any) => {
    try {
      if (tree) {
        const filename = auth().currentUser?.uid + tree.name;
        const storageRef = storage().ref(`imageTree/${filename}`);
        storageRef.delete();
      }
      await firestore()
        .collection('trees')
        .doc(auth().currentUser?.uid)
        .collection('tree')
        .doc(key)
        .delete();
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    createAccount,
    createAccountByGoogle,
    createFarmName,
    createTree,
    editTree,
    deleteTree,
    trees,
    getTrees,
  };
}
