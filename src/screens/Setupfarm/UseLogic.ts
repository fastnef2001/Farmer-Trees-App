import React, { useState, useEffect } from 'react';
import { launchImageLibrary, MediaType } from 'react-native-image-picker';
import { Database } from '../../database/database';
import { is } from 'date-fns/locale';
export const UseLogic = () => {
  const { createTree, editTree, deleteTree, trees, getTrees } = Database();
  const [isModalAddTree, setIsModalAddTree] = React.useState(false);
  const [isModalSuccess, setIsModalSuccess] = React.useState(false);
  const [isModalDelete, setIsModalDelete] = React.useState(false);
  const [selectImage, setSelectImage] = useState('');
  const [key, setKey] = React.useState('');
  const [inputs, setInputs] = useState([
    { label: 'Tree name', value: '', error: '' },
    { label: 'Quanlity', value: '', error: '' },
  ]);
  const [titlePopupNoti, setTitlePopupNoti] = useState('');
  const [contentPopupNoti, setContentPopupNoti] = useState('');

  // Get tree
  useEffect(() => {
    getTrees();
  }, [getTrees]);

  // Add tree
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
  // 3. Add tree
  const handleInputChange = (index: any, value: any) => {
    const newInputs = [...inputs];
    newInputs[index].value = value;
    newInputs[index].error = '';
    setInputs(newInputs);
  };

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
    if (await createTree(treeNameInput, quanlityInput, selectImage)) {
      setIsModalAddTree(() => false);
      handleModalSuccessAdd();
    }
    handleModalLoading();
  };

  const handleModalSuccessAdd = () => {
    setIsModalSuccess(() => !isModalSuccess);
    setContentPopupNoti('You have successfully added the tree.');
    setTitlePopupNoti('Successfully');
    setSelectImage('');
    setInputs(
      inputs.map(input => ({
        ...input,
        value: '',
        error: '',
      })),
    );
  };

  // Delete tree
  const handleModalDelete = (keyValue: any) => {
    setKey(key);
    setIsModalDelete(() => !isModalDelete);
  };

  const handleDeleteTree = async (keyValue: any) => {
    const tree = trees.find(item => item.key === (key as any));
    if (await deleteTree(tree, key)) {
      setIsModalDelete(() => false);
    }
  };

  // Edit tree
  // 1. Modal edit tree
  const [isModalEditTree, setIsModalEditTree] = React.useState(false);
  const handleModalEditTree = (keyValue: any) => {
    setSelectImage('');
    setInputs(
      inputs.map(input => ({
        ...input,
        value: '',
        error: '',
      })),
    );

    const tree = trees.find(item => item.key === (key as any));
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
    const tree = trees.find(item => item.key === (key as any));
    if (await editTree(treeNameInput, quanlityInput, selectImage, tree, key)) {
      setIsModalEditTree(() => false);
      handleModalLoading();
      handleModalSuccessEdit();
    } else {
      console.log('error');
      handleModalLoading();
    }
  };

  // Modal success edit
  const handleModalSuccessEdit = () => {
    setIsModalSuccess(() => !isModalSuccess);
    setContentPopupNoti('You have successfully edited the tree.');
    setTitlePopupNoti('Successfully');
    setSelectImage('');
    setInputs(
      inputs.map(input => ({
        ...input,
        value: '',
        error: '',
      })),
    );
  };

  // Modal loading
  const [isModalLoading, setIsModalLoading] = React.useState(false);
  const handleModalLoading = () => {
    setIsModalLoading(prev => !prev);
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
    handleModalLoading,
    handleModalImagePicker,
    handleDeleteImage,
    handleInputChange,
    handleAddTree,
    handleDeleteTree,
    handleEditTree,
    setIsModalDelete,
    setIsModalSuccess,
    key,
  };
};
