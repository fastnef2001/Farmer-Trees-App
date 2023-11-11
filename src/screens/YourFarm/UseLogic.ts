/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { MediaType, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

export function UseLogic() {
  const [isModalAddTree, setIsModalAddTree] = React.useState(false);
  const [selectImage, setSelectImage] = useState('');
  const [isModalSuccess, setIsModalSuccess] = React.useState(false);
  const [isModalDelete, setIsModalDelete] = React.useState(false);
  const [key, setKey] = React.useState('');
  const [isModalCalculate, setIsModalCalculate] = React.useState(false);
  const [isTrees, setIsTrees] = useState(false);
  const [inputs, setInputs] = useState([
    { label: 'Tree name', value: '', error: '' },
    { label: 'Quanlity', value: '', error: '' },
  ]);
  const [titleBody, setTitleBody] = useState('');
  const [titleHeader, setTitleHeader] = useState('');
  const [isFooter, setIsFooter] = useState(false);

  // 1. Modal add tree
  const handleModalAddTree = () => {
    setIsModalAddTree(() => !isModalAddTree);
    setInputs(
      inputs.map(input => ({
        ...input,
        value: '',
        error: '',
      })),
    );
  };
  // 2. Modal pick image and delete image
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
  // 3. Handle validate input
  const handleInputChange = (index: any, value: any) => {
    const newInputs = [...inputs];
    newInputs[index].value = value;
    newInputs[index].error = '';
    setInputs(newInputs);
  };
  // 4. Handle add tree
  const handleAddTree = async () => {
    const treeNameInput = inputs.find(input => input.label === 'Tree name');
    const quanlityInput = inputs.find(input => input.label === 'Quanlity');
    if (!treeNameInput?.value || !quanlityInput?.value) {
      setInputs(
        inputs.map(input => ({
          ...input,
          error: !input.value ? `Please enter ${input.label}` : '',
        })),
      );
      return;
    }
    handleModalLoading();
    try {
      const name = treeNameInput?.value;
      const quanlity = quanlityInput?.value;
      const image = selectImage;
      const timeAdd = new Date().getTime();
      let imageUrl = '';
      const userId = auth().currentUser?.uid;
      if (image) {
        const filename = userId + name;
        const storageRef = storage().ref(`imageTree/${filename}`);
        await storageRef.putFile(image);
        imageUrl = await storageRef.getDownloadURL();
      }
      firestore()
        .collection('trees')
        .doc(userId)
        .collection('tree')
        .add({
          name,
          quanlity,
          imageUrl,
          timeAdd,
        })
        .then(() => {
          setIsModalAddTree(() => false);
          handleModalLoading();
          setTitleBody('You have successfully added the tree.');
          setTitleHeader('Successfully');
          setIsFooter(false);
          handleModalSuccess();
        });
    } catch (error: any) {
      console.log('error', error);
    }
  };
  // 5. Modal success
  const handleModalSuccess = () => {
    setIsModalSuccess(() => !isModalSuccess);
    setSelectImage('');
    setInputs(
      inputs.map(input => ({
        ...input,
        value: '',
        error: '',
      })),
    );
  };

  // 6. Modal delete
  const handleModalDelete = (key: string) => {
    setKey(key);
    setTitleBody('Do you want to delete the coffee tree?');
    setTitleHeader('Delete');
    setIsFooter(true);
    handleModalSuccess();
  };

  // 7. Handle delete tree
  const handleDeleteTree = (key: string) => {
    firestore()
      .collection('trees')
      .doc(auth().currentUser?.uid)
      .collection('tree')
      .doc(key)
      .delete();
    setTitleBody('You have successfully deleted the tree.');
    setTitleHeader('Successfully');
    handleModalSuccess();
  };

  interface Tree {
    [x: string]: string;
    name: string;
    quanlity: string;
    imageUrl: string;
  }

  // 8. Get all tree
  const [trees, setTrees] = useState<Tree[]>([]);
  React.useEffect(() => {
    const subscriber = firestore()
      .collection('trees')
      .doc(auth().currentUser?.uid)
      .collection('tree')
      .orderBy('timeAdd', 'desc')
      .onSnapshot(querySnapshot => {
        const trees: any = [];
        querySnapshot.forEach(documentSnapshot => {
          trees.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setTrees(trees);
      });
    return () => subscriber();
  }, []);

  // 9. Get farm name
  const [farmName, setFarmName] = useState('');
  React.useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .onSnapshot(documentSnapshot => {
        const farmName = documentSnapshot.data()?.farmName;
        setFarmName(farmName);
      });
    return () => subscriber();
  }, []);

  // 10. Modal edit tree
  const [isModalEditTree, setIsModalEditTree] = React.useState(false);
  const handleModalEditTree = (key: any) => {
    setSelectImage('');
    setInputs(
      inputs.map(input => ({
        ...input,
        value: '',
        error: '',
      })),
    );

    const tree = trees.find(tree => tree.key === (key as any));
    if (tree) {
      setSelectImage(tree.imageUrl);
      setInputs([
        { label: 'Tree name', value: tree.name, error: '' },
        { label: 'Quanlity', value: tree.quanlity, error: '' },
      ]);
      setKey(key);
    }
    setIsModalEditTree(() => !isModalEditTree);
  };

  // 11. Handle edit tree
  const handleEditTree = async () => {
    const treeNameInput = inputs.find(input => input.label === 'Tree name');
    const quanlityInput = inputs.find(input => input.label === 'Quanlity');

    if (!treeNameInput?.value || !quanlityInput?.value) {
      setInputs(
        inputs.map(input => ({
          ...input,
          error: !input.value ? `Please enter ${input.label}` : '',
        })),
      );
      return;
    }
    handleModalLoading();
    try {
      const name = treeNameInput?.value;
      const quanlity = quanlityInput?.value;
      const image = selectImage;
      let imageUrl = '';
      const userId = auth().currentUser?.uid;
      // if image là url với http thì không cần thay đổi ảnh
      if (image && image.includes('http')) {
        imageUrl = image;
      } else if (image) {
        // xóa ảnh cũ trong storage
        const tree = trees.find(tree => tree.key === (key as any));
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
      firestore()
        .collection('trees')
        .doc(userId)
        .collection('tree')
        .doc(key)
        .update({
          name,
          quanlity,
          imageUrl,
        })
        .then(() => {
          setIsModalEditTree(() => false);
          handleModalLoading();
          setTitleBody('You have successfully edited the tree.');
          setTitleHeader('Successfully');
          setIsFooter(false);
          setIsModalSuccess(true);
        });

      setSelectImage('');
      setInputs(
        inputs.map(input => ({
          ...input,
          value: '',
          error: '',
        })),
      );
    } catch (error: any) {
      console.log('error', error);
    }
  };

  // 12. Modal loading
  const [isModalLoading, setIsModalLoading] = React.useState(false);
  const handleModalLoading = () => {
    setIsModalLoading(prev => !prev);
  };

  // 14. Calculate
  const handleModalCalculate = (key: any) => {
    setSelectImage('');
    setInputs(
      inputs.map(input => ({
        ...input,
        value: '',
        error: '',
      })),
    );

    const tree = trees.find(tree => tree.key === (key as any));
    if (tree) {
      setSelectImage(tree.imageUrl);
      setInputs([
        { label: 'Quantity tree', value: tree.quanlity, error: '' },
        { label: 'Quantity to buy for each tree', value: '', error: '' },
        { label: 'Unit', value: '', error: '' },
        { label: 'Purchase price per unit', value: '', error: '' },
      ]);
      setKey(key);
    }
    setIsModalCalculate(() => !isModalCalculate);
  };

  return {
    isModalAddTree,
    handleModalAddTree,
    handleModalImagePicker,
    handleDeleteImage,
    selectImage,
    inputs,
    handleInputChange,
    handleAddTree,
    isModalSuccess,
    handleModalSuccess,
    isModalDelete,
    handleModalDelete,
    handleDeleteTree,
    trees,
    farmName,
    isModalEditTree,
    handleModalEditTree,
    handleEditTree,
    isModalLoading,
    handleModalLoading,
    setIsModalSuccess,
    setIsModalDelete,
    key,
    titleHeader,
    titleBody,
    isFooter,
    handleModalCalculate,
    isModalCalculate,
  };
}
