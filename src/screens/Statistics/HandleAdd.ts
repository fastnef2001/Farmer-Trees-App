/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-shadow */
import { useState, useEffect } from 'react';
import firestore, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import React from 'react';
import {
  InputInterface,
  TreeInterface,
  UnitInterface,
} from './Statistics.interface';

function convertToKilograms(quantity: number, unit: string) {
  switch (unit) {
    case 'Gram':
      return quantity / 1000; // 1 gram = 0.001 kilogram
    case 'Quintal':
      return quantity * 100; // 1 quintal = 100 kilograms
    case 'Ton':
      return quantity * 1000; // 1 ton = 1000 kilograms
    default:
      return quantity;
  }
}

function changeMonthToSrting(month: string) {
  switch (month) {
    case '01':
      return 'Jan.';
    case '02':
      return 'Feb.';
    case '03':
      return 'Mar.';
    case '04':
      return 'Apr.';
    case '05':
      return 'May.';
    case '06':
      return 'Jun.';
    case '07':
      return 'Jul.';
    case '08':
      return 'Aug.';
    case '09':
      return 'Sep.';
    case '10':
      return 'Oct.';
    case '11':
      return 'Nov.';
    case '12':
      return 'Dec.';
    default:
      return 'Jan.';
  }
}

function getTimeNow() {
  return `${new Date().getFullYear()}/${(new Date().getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${new Date().getDate().toString().padStart(2, '0')}`;
}

function getDataUnitIncome() {
  const [unitsIncome, setUnitsIncome] = useState<UnitInterface[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const res = await firestore()
        .collection('unitsTree')
        .orderBy('id', 'asc')
        .get();
      const data: any = [];
      res.forEach((doc: { data: () => any; id: any }) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setUnitsIncome(data);
    };
    fetchData();
  }, []);
  return unitsIncome;
}

function getDataUnitExpense() {
  const [unitsExpense, setUnitsExpense] = useState<UnitInterface[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const res = await firestore()
        .collection('unitsExpense')
        .orderBy('id', 'asc')
        .get();
      const data: any = [];
      res.forEach((doc: { data: () => any; id: any }) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setUnitsExpense(data);
    };
    fetchData();
  }, []);
  return unitsExpense;
}

function getDataTree() {
  const [trees, setTrees] = useState<TreeInterface[]>([]);
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
  return trees;
}

function getDataCostType() {
  const [costTypes, setCostType] = useState<UnitInterface[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const res = await firestore()
        .collection('costTypes')
        .orderBy('id', 'asc')
        .get();
      const data: any = [];
      res.forEach((doc: { data: () => any; id: any }) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setCostType(data);
    };
    fetchData();
  }, []);
  return costTypes;
}

function convertTotimestamp(selectDate: string) {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // Xác định liệu là AM hay PM
  let period = 'AM';
  if (hours >= 12) {
    period = 'PM';
  }

  // Thêm số 0 nếu cần thiết
  hours = hours % 12; // Đổi giờ sang định dạng 12 giờ
  const hoursString = hours < 10 ? `0${hours}` : hours;
  const minutesString = minutes < 10 ? `0${minutes}` : minutes;
  const secondsString = seconds < 10 ? `0${seconds}` : seconds;

  // Tạo chuỗi thời gian hiện tại
  const timeNow = `${hoursString}:${minutesString}:${secondsString} ${period}`;
  console.log('timeNowdggsg', timeNow);

  const [year, month1, day] = selectDate.split('/').map(Number);
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

export function HandleAdd() {
  const [selectedDateIncome, setSelectedDateIncome] = useState('');
  const [selectedDateExpense, setSelectedDateExpense] = useState('');
  const [isModaAdd, setIsModalAdd] = useState(false);
  const [titleModalAdd, setTitleModalAdd] = useState('');
  const [inputs, setInputs] = useState<InputInterface[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isModalPick, setIsModalPick] = useState(false);
  const [titlePick, setTitlePick] = useState('');
  const [valuePick, setValuePick] = React.useState('');
  const [isModalSuccess, setIsModalSuccess] = useState(false);
  const [titleHeader, setTitleHeader] = useState('');
  const [titleBody, setTitleBody] = useState('');
  const [isModalLoading, setIsModalLoading] = useState(false);

  const [inputsIncome, setInputsIncome] = useState([
    { label: 'Tree', value: '', error: '' },
    { label: 'Quantity', value: '', error: '' },
    { label: 'Unit', value: '', error: '' },
    { label: 'Total price', value: '', error: '' },
  ]);
  const [inputsExpense, setInputsExpense] = useState([
    { label: 'Cost type', value: '', error: '' },
    { label: 'Quantity', value: '', error: '' },
    { label: 'Unit', value: '', error: '' },
    { label: 'Total price', value: '', error: '' },
  ]);

  const timeNow = getTimeNow();

  const handleHideModalAdd = () => {
    setIsModalAdd(false);
    const newInputsIncome = [...inputsIncome];
    newInputsIncome.forEach((input, index) => {
      newInputsIncome[index].value = '';
      newInputsIncome[index].error = '';
    });
    const newInputsExpense = [...inputsExpense];
    newInputsExpense.forEach((input, index) => {
      newInputsExpense[index].value = '';
      newInputsExpense[index].error = '';
    });
  };

  useEffect(() => {
    if (inputs.length > 0) {
      if (
        inputs[0].value &&
        inputs[1].value &&
        inputs[2].value &&
        inputs[3].value
      ) {
        setIsDisabled(false);
        console.log('inputs', inputs);
      } else {
        setIsDisabled(true);
      }
    }
  }, [inputs]);

  const handleModalAddIncome = () => {
    setSelectedDateIncome(timeNow);
    setTitleModalAdd('Add income');
    setInputs([...inputsIncome]);
    setIsModalAdd(!isModaAdd);
  };

  const handleModalAddExpense = () => {
    setSelectedDateExpense(timeNow);
    setTitleModalAdd('Add expense');
    setInputs([...inputsExpense]);
    setIsModalAdd(!isModaAdd);
  };

  const handleInputChange = (index: any, value: any) => {
    const newInputs = [...inputs];
    newInputs[index].value = value;
    newInputs[index].error = '';
    setInputs(newInputs);
  };

  // Get data unit income
  const unitsIncome = getDataUnitIncome();
  // Get data tree
  const trees = getDataTree();
  // Get data cost type
  const costTypes = getDataCostType();
  // Get data unit expense
  const unitsExpense = getDataUnitExpense();

  // Modal pick
  const handleModalPickHide = () => {
    setIsModalPick(false);
  };
  const handleModalPickTree = () => {
    const newInputs = [...inputsIncome];
    setValuePick(newInputs[0].value);
    setIsModalPick(!isModalPick);
    setTitlePick('Pick tree');
  };
  const handleModalPickUnitIncome = () => {
    const newInputs = [...inputsIncome];
    setValuePick(newInputs[2].value);
    setTitlePick('Pick unit income');
    setIsModalPick(!isModalPick);
  };
  const handleModalPickCostType = () => {
    const newInputs = [...inputsExpense];
    setValuePick(newInputs[0].value);
    setTitlePick('Pick cost type');
    setIsModalPick(!isModalPick);
  };
  const handleModalPickUnitExpense = () => {
    const newInputs = [...inputsExpense];
    setValuePick(newInputs[2].value);
    setTitlePick('Pick unit expense');
    setIsModalPick(!isModalPick);
  };
  // End modal pick

  // Handle value modal pick
  const hanleHideModalPick = (value: string, titlePick: string) => {
    setIsModalPick(false);
    setValuePick(value);
    if (titlePick === 'Pick tree') {
      const newInputs = [...inputsIncome];
      newInputs[0].value = value;
    } else if (titlePick === 'Pick unit income') {
      const newInputs = [...inputsIncome];
      newInputs[2].value = value;
    } else if (titlePick === 'Pick cost type') {
      const newInputs = [...inputsExpense];
      newInputs[0].value = value;
    } else {
      const newInputs = [...inputsExpense];
      newInputs[2].value = value;
    }
  };

  // Add income / expense
  const handleAdd = (text: string) => {
    if (text === 'income') {
      setIsModalLoading(true);
      try {
        const userid = auth().currentUser?.uid;
        const date = selectedDateIncome;
        const tree = inputs[0].value;
        const quantity = Number(inputs[1].value);
        const unit = inputs[2].value;
        const totalPrice = Number(inputs[3].value);
        const quantityInKilograms = convertToKilograms(quantity, unit);
        const month = changeMonthToSrting(date.slice(5, 7));
        const timestamp = convertTotimestamp(selectedDateIncome);
        const day = date.slice(8, 10);

        firestore()
          .collection('incomes')
          .doc(userid)
          .collection('income')
          .add({
            timestamp,
            month,
            day,
            date,
            tree,
            quantity,
            unit,
            totalPrice,
            quantityInKilograms,
          })
          .then(() => {
            setIsModalAdd(false);
            setIsModalLoading(false);
            setTitleHeader('Successfully');
            setTitleBody('You have successfully added income');
            setIsModalSuccess(true);
            setTimeout(() => {
              setIsModalSuccess(false);
            }, 5000);
            const newInputs = [...inputs];
            newInputs.forEach((input, index) => {
              newInputs[index].value = '';
              newInputs[index].error = '';
            });
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsModalLoading(true);
      try {
        const userid = auth().currentUser?.uid;
        const date = selectedDateExpense;
        const costType = inputs[0].value;
        const quantity = Number(inputs[1].value);
        const unit = inputs[2].value.toLowerCase();
        const totalPrice = Number(inputs[3].value);
        const month = changeMonthToSrting(date.slice(5, 7));
        const timestamp = convertTotimestamp(selectedDateExpense);
        const day = date.slice(8, 10);
        firestore()
          .collection('expenses')
          .doc(userid)
          .collection('expense')
          .add({
            month,
            day,
            date,
            timestamp,
            costType,
            quantity,
            unit,
            totalPrice,
          })
          .then(() => {
            setIsModalAdd(false);
            setIsModalLoading(false);
            setTitleHeader('Successfully');
            setTitleBody('You have successfully added expense');
            setIsModalSuccess(true);
            setTimeout(() => {
              setIsModalSuccess(false);
            }, 5000);
            const newInputs = [...inputs];
            newInputs.forEach((input, index) => {
              newInputs[index].value = '';
              newInputs[index].error = '';
            });
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return {
    isModaAdd,
    setIsModalAdd,
    titleModalAdd,
    setTitleModalAdd,
    inputs,
    setInputs,
    handleHideModalAdd,
    handleInputChange,
    inputsIncome,
    setInputsIncome,
    isDisabled,
    setIsDisabled,
    handleModalAddIncome,
    inputsExpense,
    setInputsExpense,
    handleModalAddExpense,
    unitsIncome,
    trees,
    costTypes,
    unitsExpense,
    handleModalPickHide,
    handleModalPickTree,
    handleModalPickUnitIncome,
    handleModalPickCostType,
    handleModalPickUnitExpense,
    isModalPick,
    setIsModalPick,
    titlePick,
    setTitlePick,
    valuePick,
    setValuePick,
    hanleHideModalPick,
    selectedDateIncome,
    setSelectedDateIncome,
    selectedDateExpense,
    setSelectedDateExpense,
    handleAdd,
    isModalSuccess,
    setIsModalSuccess,
    titleHeader,
    setTitleHeader,
    titleBody,
    setTitleBody,
    isModalLoading,
    setIsModalLoading,
  };
}
