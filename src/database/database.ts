import { useState, useCallback } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
const { format } = require('date-fns');

interface InputValues {
  value: string;
}

function convertTotimestamp(date: string, isStart?: boolean) {
  let timeNow = format(new Date(), 'hh:mm:ss a');
  if (isStart) {
    timeNow = '00:00:00 AM';
  } else {
    timeNow = '11:59:59 PM';
  }

  const [year, month1, day] = date.split('/').map(Number);
  const selectedDate = new Date(year, month1 - 1, day, 0, 0, 0);
  const selectedTimestamp = selectedDate.getTime();
  const formattedTimestamp = new Date(selectedTimestamp).toLocaleString(
    'en-US',
    {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    },
  );
  const timestamp = formattedTimestamp.replace(
    /(\d{1,2}:\d{1,2}:\d{1,2})[ ]([APap][Mm])/,
    `${timeNow} $2`,
  );
  return timestamp;
}

export function Database() {
  interface Tree {
    key(key: any): void;
    name: string;
    quanlity: string;
    imageUrl: string;
  }
  interface UserInfor {
    email: string;
    farmName: string;
    fullName: string;
    phoneNumber: string;
    imageUrl?: string;
    isPayment: boolean;
  }
  const [trees, setTrees] = useState<Tree[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [dataIncome, setDataIncome] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [dataExpense, setDataExpense] = useState([]);
  const [userInfors, setUserInfors] = useState<UserInfor[]>([]);
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
  const getInforUser = useCallback(async () => {
    const user = auth().currentUser;
    try {
      const subscriber = firestore()
        .collection('users')
        .doc(user?.uid)
        .onSnapshot(documentSnapshot => {
          const inforUser: any = [];
          if (documentSnapshot) {
            inforUser.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
            setUserInfors(inforUser);
          }
        });

      return () => subscriber();
    } catch (error) {
      return false;
    }
  }, [setUserInfors]);
  const editProfile = async (
    farmNameInput: InputValues,
    fullNameInput: InputValues,
    phoneNumberInput?: InputValues,
    selectImage?: any,
  ) => {
    try {
      const farmNameValue = farmNameInput?.value;
      const fullNameValue = fullNameInput?.value;
      const phoneNumberValue = phoneNumberInput?.value;
      const image = selectImage;
      let imageUrl = '';
      const userId = auth().currentUser?.uid;
      if (image && image.includes('http')) {
        imageUrl = image;
      } else if (image) {
        const filename = userId;
        const storageRef = storage().ref(`imageAvatar/${filename}`);
        await storageRef.putFile(image);
        imageUrl = await storageRef.getDownloadURL();
      }
      await firestore().collection('users').doc(userId).update({
        fullName: fullNameValue,
        farmName: farmNameValue,
        phoneNumber: phoneNumberValue,
        imageUrl: imageUrl,
      });
      return true;
    } catch (error: any) {
      return false;
    }
  };
  //CRUD TREE
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
          if (querySnapshot) {
            querySnapshot.forEach(documentSnapshot => {
              treesIn.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
            setTrees(treesIn);
          } else {
            return;
          }
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
  //CRUD/FILTER/CALCULATE TOTAL PRICE INCOME && EXPENSE
  const getItems = useCallback(
    async (
      collectionName1: string,
      collectionName2: string,
      selectedDateStart: string,
      selectedDateEnd: string,
      selectedTreeOrCostType: string,
      filter: string,
    ) => {
      const timestampStart = convertTotimestamp(selectedDateStart, true);
      const timestampEnd = convertTotimestamp(selectedDateEnd, false);
      try {
        let subscriberCollection = firestore()
          .collection(collectionName1)
          .doc(auth().currentUser?.uid)
          .collection(collectionName2)
          .orderBy('timestamp', 'desc');

        if (selectedDateStart) {
          subscriberCollection = subscriberCollection.where(
            'timestamp',
            '>=',
            timestampStart,
          );
        }
        if (selectedDateEnd) {
          subscriberCollection = subscriberCollection.where(
            'timestamp',
            '<=',
            timestampEnd,
          );
        }
        const query = subscriberCollection.onSnapshot(querySnapshot => {
          if (querySnapshot) {
            let data: any = [];
            querySnapshot.forEach(documentSnapshot => {
              data.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });

            if (selectedTreeOrCostType && filter === 'tree') {
              data = data.filter((item: { tree: string }) => {
                return item.tree === selectedTreeOrCostType;
              });
            } else if (selectedTreeOrCostType && filter === 'costType') {
              data = data.filter((item: { costType: string }) => {
                return item.costType === selectedTreeOrCostType;
              });
            }

            const validData = data.filter((item: { totalPrice: number }) => {
              return !isNaN(item.totalPrice) && item.totalPrice >= 0;
            });

            const totalSum = validData.reduce(
              (accumulator: any, item: { totalPrice: any }) => {
                return accumulator + item.totalPrice;
              },
              0,
            );
            if (collectionName1 === 'incomes') {
              setDataIncome(data);
              setTotalIncome(totalSum);
            } else {
              setDataExpense(data);
              setTotalExpense(totalSum);
            }
          } else {
            return;
          }
        });
        return () => query();
      } catch (error) {
        return false;
      }
    },
    [setDataIncome, setTotalIncome, setDataExpense, setTotalExpense],
  );

  return {
    createAccount,
    createAccountByGoogle,
    createFarmName,
    createTree,
    editTree,
    deleteTree,
    trees,
    getTrees,
    getItems,
    dataIncome,
    totalIncome,
    dataExpense,
    totalExpense,
    getInforUser,
    userInfors,
    editProfile,
  };
}
