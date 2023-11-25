import React, { useEffect, useState } from 'react';
import { Database } from '../../database/database';
import { UseLogicAddtree } from '../Setupfarm/UseLogic';

export function UseLogic() {
  const {
    handleModalAddTree,
    handleModalEditTree,
    handleModalImagePicker,
    setSelectImage,
    handleInputChange,
    handleAddTree,
    handleEditTree,
    handleModalDelete,
    isModalAddTree,
    isModalEditTree,
    isModalSuccess,
    isModalLoading,
    selectImage,
    inputs,
    trees,
    titlePopupNoti,
    contentPopupNoti,
    setIsModalSuccess,
    handleFunction,
    titleModalSuccess,
    setInputs,
  } = UseLogicAddtree();
  const {
    getInforUser,
    userInfors,
    getUnitExpense,
    unitsExpense,
    unitsIncome,
    costTypes,
  } = Database();
  const [isModalPick, setIsModalPick] = useState(false);
  const [isModalCalculate, setIsModalCalculate] = React.useState(false);
  const [valuePick, setValuePick] = React.useState('Unit');
  const [titlePick, setTitlePick] = useState('');
  const [resultTotalQuantity, setResultTotalQuantity] = useState(0);
  const [resultTotalPrice, setResultTotalPrice] = useState(0);
  //GET FARM NAME
  let farmName = '';
  useEffect(() => {
    getUnitExpense();
    getInforUser();
  }, [getInforUser, getUnitExpense]);
  userInfors.forEach((userInfor: any) => {
    farmName = userInfor.farmName;
  });

  //HANDLE MODAL
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
    handleModalAddTree,
    handleModalEditTree,
    handleModalImagePicker,
    setSelectImage,
    handleInputChange,
    handleAddTree,
    handleEditTree,
    handleModalDelete,
    isModalAddTree,
    isModalEditTree,
    isModalSuccess,
    isModalLoading,
    selectImage,
    inputs,
    trees,
    titlePopupNoti,
    contentPopupNoti,
    setIsModalSuccess,
    handleFunction,
    titleModalSuccess,
    setInputs,

    isModalCalculate,
    isModalPick,
    handleModalCalculate,
    handleModalPickUnitExpense,
    handleCalculate,
    farmName,
    valuePick,
    titlePick,
    resultTotalQuantity,
    resultTotalPrice,
    unitsExpense,
    unitsIncome,
    costTypes,
  };
}
