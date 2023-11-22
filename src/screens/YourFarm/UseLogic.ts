/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';
import { MediaType, launchImageLibrary } from 'react-native-image-picker';
import { Database } from '../../database/database';

export function UseLogic() {
  const {
    getTrees,
    trees,
    createTree,
    getInforUser,
    userInfors,
    editTree,
    deleteTree,
  } = Database();
  const [isModalPick, setIsModalPick] = useState(false);
  const [isModalAddTree, setIsModalAddTree] = React.useState(false);
  const [isModalSuccess, setIsModalSuccess] = React.useState(false);
  const [isModalEditTree, setIsModalEditTree] = React.useState(false);
  const [isModalCalculate, setIsModalCalculate] = React.useState(false);
  const [isModalLoading, setIsModalLoading] = React.useState(false);
  const [isModalDelete, setIsModalDelete] = React.useState(false);

  const [selectImage, setSelectImage] = useState('');
  const [key, setKey] = React.useState('');
  const [titleBody, setTitleBody] = useState('');
  const [titleHeader, setTitleHeader] = useState('');
  const [isFooter, setIsFooter] = useState(false);
  const [valuePick, setValuePick] = React.useState('Unit');
  const [titlePick, setTitlePick] = useState('');
  const [resultTotalQuantity, setResultTotalQuantity] = useState(0);
  const [resultTotalPrice, setResultTotalPrice] = useState(0);
  const [inputs, setInputs] = useState([
    { label: 'Tree name', value: '', error: '' },
    { label: 'Quanlity', value: '', error: '' },
  ]);

  //OTHER FUNCTION
  const handleDeleteImage = () => setSelectImage('');
  const handleInputChange = (index: any, value: any) => {
    const newInputs = [...inputs];
    newInputs[index].value = value;
    newInputs[index].error = '';
    setInputs(newInputs);
  };

  //GET FARM NAME
  let farmName = '';
  useEffect(() => {
    getInforUser();
  }, [getInforUser]);
  userInfors.forEach((userInfor: any) => {
    farmName = userInfor.farmName;
  });

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
  const handleModalDelete = (key: any) => {
    setKey(key);
    setTitleBody('Do you want to delete the coffee tree?');
    setTitleHeader('Delete');
    setIsFooter(true);
    handleModalSuccess();
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
  const handleModalLoading = () => {
    setIsModalLoading(() => !isModalLoading);
  };
  const handleModalPickUnitExpense = (value?: string, title?: string) => {
    setTitlePick('Pick unit expense');
    setIsModalPick(!isModalPick);
    if (value) {
      setValuePick(value);
      const newInputs = [...inputs];
      newInputs[2].value = value;
    }
  };
  const handleModalCalculate = (key: any) => {
    const tree = trees.find(tree => tree.key === (key as any));
    if (tree) {
      setInputs([
        { label: 'Quantity tree', value: tree.quanlity, error: '' },
        { label: 'Quantity to buy for each tree', value: '', error: '' },
        { label: 'Unit', value: '', error: '' },
        { label: 'Purchase price per unit', value: '', error: '' },
      ]);
    } else {
      setInputs([
        { label: 'Tree name', value: '', error: '' },
        { label: 'Quanlity', value: '', error: '' },
      ]);
    }
    setIsModalCalculate(() => !isModalCalculate);
  };

  //CRUD TREE
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
    if (await createTree(treeNameInput, quanlityInput, selectImage)) {
      setIsModalLoading(() => false);
      setIsModalAddTree(() => false);
      setTitleBody('You have successfully added the tree.');
      setTitleHeader('Successfully');
      setIsFooter(false);
      handleModalSuccess();
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
    const tree = trees.find(tree => tree.key === (key as any));
    if (await editTree(treeNameInput, quanlityInput, selectImage, tree, key)) {
      setIsModalEditTree(() => false);
      setTitleBody('You have successfully edited the tree.');
      setTitleHeader('Successfully');
      setIsFooter(false);
      setIsModalLoading(() => false);
      handleModalSuccess();
      setSelectImage('');
      setInputs(
        inputs.map(input => ({
          ...input,
          value: '',
          error: '',
        })),
      );
    }
  };
  const handleDeleteTree = async (key: string) => {
    if (await deleteTree(trees, key)) {
      setTitleBody('You have successfully deleted the tree.');
      setTitleHeader('Successfully');
      handleModalSuccess();
    }
  };
  //CALCULATE
  const handleCalculate = () => {
    const convertToNumber = (value: string) => {
      const number = Number(value);
      return number;
    };
    setResultTotalQuantity(
      convertToNumber(inputs[0].value) * convertToNumber(inputs[1].value),
    );
    setResultTotalPrice(
      convertToNumber(inputs[0].value) * convertToNumber(inputs[3].value),
    );
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
    isModalPick,
    valuePick,
    titlePick,
    setIsModalPick,
    setValuePick,
    setTitlePick,
    handleModalPickUnitExpense,
    resultTotalQuantity,
    handleCalculate,
    resultTotalPrice,
  };
}
