import React, { useState, useEffect } from 'react';
import { launchImageLibrary, MediaType } from 'react-native-image-picker';
import { Database } from '../../database/database';

export const UseLogicAddtree = () => {
  const { createTree, editTree, deleteTree, trees, getTrees } = Database();
  const [isModalAddTree, setIsModalAddTree] = React.useState(false);
  const [isModalEditTree, setIsModalEditTree] = React.useState(false);
  const [isModalSuccess, setIsModalSuccess] = React.useState(false);
  const [isModalDelete, setIsModalDelete] = React.useState(false);
  const [isModalLoading, setIsModalLoading] = React.useState(false);
  const [selectImage, setSelectImage] = useState('');
  const [keyValue, setKeyValue] = React.useState('');
  const [inputs, setInputs] = useState([
    { label: 'Tree name', value: '', error: '' },
    { label: 'Quanlity', value: '', error: '' },
  ]);
  const [titlePopupNoti, setTitlePopupNoti] = useState('');
  const [contentPopupNoti, setContentPopupNoti] = useState('');
  const [titleModalSuccess, setTitleModalSuccess] = useState('Successfully');
  // let handleFunction = () => {};
  const [handleFunction, setHandleFunction] = useState(() => {});
  //CRUD tree
  useEffect(() => {
    getTrees();
  }, [getTrees]);
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
    setIsModalLoading(() => true);
    const isCreateTree = await createTree(
      treeNameInput,
      quanlityInput,
      selectImage,
    );
    setIsModalLoading(() => false);
    if (isCreateTree) {
      setIsModalAddTree(() => false);
      handleModalSuccessAdd();
    }
  };
  const handleDeleteTree = async (key: any) => {
    const tree = trees.find(item => item.key === (key as any));
    if (await deleteTree(tree, key)) {
      handleModalSuccessDelete();
    }
  };
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
    setIsModalLoading(() => true);
    const tree = trees.find(item => item.key === (keyValue as any));
    const isEditTree = await editTree(
      treeNameInput,
      quanlityInput,
      selectImage,
      tree,
      keyValue,
    );
    setIsModalLoading(() => false);
    if (isEditTree) {
      setIsModalEditTree(() => false);
      handleModalSuccessEdit();
    }
  };

  //HANDLE MODAL
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
  const handleModalEditTree = (key: any) => {
    const tree = trees.find(item => item.key === (key as any));
    if (tree) {
      setSelectImage(tree.imageUrl);
      setInputs([
        { label: 'Tree name', value: tree.name, error: '' },
        { label: 'Quanlity', value: tree.quanlity, error: '' },
      ]);
      setKeyValue(key);
    }
    setIsModalEditTree(() => !isModalEditTree);
  };
  const handleModalDelete = (key: any) => {
    setIsModalSuccess(() => !isModalSuccess);
    setContentPopupNoti('Do you want to delete this tre?');
    setTitlePopupNoti('Delete');
    setHandleFunction(() => () => handleDeleteTree(key));
    setTitleModalSuccess('delete');
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
    const newInputs = [...inputs];
    newInputs[index].value = value;
    newInputs[index].error = '';
    setInputs(newInputs);
  };
  const handleModalSuccessAdd = () => {
    setIsModalSuccess(() => !isModalSuccess);
    setContentPopupNoti('You have successfully added the tree.');
    setTitlePopupNoti('Successfully');
    setHandleFunction(() => () => {});
    setTitleModalSuccess('');
    setSelectImage('');
    setInputs(
      inputs.map(input => ({
        ...input,
        value: '',
        error: '',
      })),
    );
  };
  const handleModalSuccessEdit = () => {
    setIsModalSuccess(() => !isModalSuccess);
    setContentPopupNoti('You have successfully edited the tree.');
    setTitlePopupNoti('Successfully');
    setHandleFunction(() => () => {});
    setSelectImage('');
    setInputs(
      inputs.map(input => ({
        ...input,
        value: '',
        error: '',
      })),
    );
  };
  const handleModalSuccessDelete = () => {
    setIsModalSuccess(() => !isModalSuccess);
    setContentPopupNoti('You have successfully deleted the tree.');
    setTitlePopupNoti('Successfully');
    setTitleModalSuccess('');
  };

  return {
    trees,
    isModalAddTree,
    isModalEditTree,
    isModalDelete,
    isModalSuccess,
    isModalLoading,
    selectImage,
    inputs,
    titlePopupNoti,
    contentPopupNoti,
    handleModalAddTree,
    handleModalEditTree,
    handleModalDelete,
    handleModalSuccessAdd,
    handleModalSuccessEdit,
    handleModalImagePicker,
    setSelectImage,
    handleInputChange,
    handleAddTree,
    handleDeleteTree,
    handleEditTree,
    setIsModalDelete,
    setIsModalSuccess,
    keyValue,
    handleFunction,
    titleModalSuccess,
  };
};

export const UselogicFarmname = ({ navigation }: any) => {
  const { createFarmName, signOut } = Database();
  const [farmName, setFarmName] = useState('');
  const [errorName, setErrorName] = useState('');

  const saveFarmName = async () => {
    if (!farmName) {
      setErrorName('Please enter your farm name');
      return;
    }
    if (await createFarmName(farmName)) {
      navigation.navigate('AddTree');
    } else {
      setErrorName('Farm name already exists');
    }
  };

  const handleInputChangeFarmName = (text: any) => {
    setFarmName(text);
  };

  return {
    farmName,
    handleInputChangeFarmName,
    signOut,
    saveFarmName,
    errorName,
  };
};
