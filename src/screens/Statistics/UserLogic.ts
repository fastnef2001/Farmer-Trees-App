/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-shadow */
import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import React from 'react';
import {
  InputInterface,
  TreeInterface,
  UnitInterface,
} from './Statistics.interface';

export function UseLogic() {
  // Modal add
  const [isModaAdd, setIsModalAdd] = useState(false);
  const [titleModalAdd, setTitleModalAdd] = useState('');

  const [inputs, setInputs] = useState<InputInterface[]>([]);
  const timeNow = `${new Date().getFullYear()}/${(new Date().getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${new Date().getDate().toString().padStart(2, '0')}`;

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

  // Income
  const [inputsIncome, setInputsIncome] = useState([
    { label: 'Tree', value: '', error: '' },
    { label: 'Quantity', value: '', error: '' },
    { label: 'Unit', value: '', error: '' },
    { label: 'Total price', value: '', error: '' },
  ]);
  const [isDisabled, setIsDisabled] = useState(true);
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
  // Expense
  const [inputsExpense, setInputsExpense] = useState([
    { label: 'Cost type', value: '', error: '' },
    { label: 'Quantity', value: '', error: '' },
    { label: 'Unit', value: '', error: '' },
    { label: 'Total price', value: '', error: '' },
  ]);
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
  // End get data unit income
  // Get data tree
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
  // End get data tree
  // Get data cost type
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
  // End get data cost type
  // Get data unit expense
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

  // Modal pick
  const [isModalPick, setIsModalPick] = useState(false);
  const [titlePick, setTitlePick] = useState('');
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
  const [valuePick, setValuePick] = React.useState('');
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

  //Handlefilter
  const [selectedDateStart, setSelectedDateStart] = useState('');
  const [selectedDateEnd, setSelectedDateEnd] = useState('');
  const [selectedDateIncome, setSelectedDateIncome] = useState('');
  const [selectedDateExpense, setSelectedDateExpense] = useState('');
  const [status, setStatus] = useState('');
  const [isModalPickDate, setIsModalPickDate] = useState(false);
  const handlePickDate = (text: string) => () => {
    setIsModalPickDate(true);
    setStatus(text);
  };
  const handleReload = () => {
    setSelectedDateStart('');
    setSelectedDateEnd('');
  };

  // Add income / expense
  const [isModalSuccess, setIsModalSuccess] = useState(false);
  const [titleHeader, setTitleHeader] = useState('');
  const [titleBody, setTitleBody] = useState('');
  const [isModalLoading, setIsModalLoading] = useState(false);
  const handleAdd = (text: string) => {
    if (text === 'income') {
      setIsModalLoading(true);
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
      try {
        const userid = auth().currentUser?.uid;
        const time = new Date().getTime();
        const date = selectedDateIncome;
        const tree = inputs[0].value;
        const quantity = Number(inputs[1].value);
        const unit = inputs[2].value;
        const totalPrice = Number(inputs[3].value);
        const quantityInKilograms = convertToKilograms(quantity, unit);
        let month = date.slice(5, 7);
        switch (month) {
          case '01':
            month = 'Jan.';
            break;
          case '02':
            month = 'Feb.';
            break;
          case '03':
            month = 'Mar.';
            break;
          case '04':
            month = 'Apr.';
            break;
          case '05':
            month = 'May.';
            break;
          case '06':
            month = 'Jun.';
            break;
          case '07':
            month = 'Jul.';
            break;
          case '08':
            month = 'Aug.';
            break;
          case '09':
            month = 'Sep.';
            break;
          case '10':
            month = 'Oct.';
            break;
          case '11':
            month = 'Nov.';
            break;
          case '12':
            month = 'Dec.';
            break;
          default:
            month = 'Jan.';
        }
        const day = date.slice(8, 10);
        firestore()
          .collection('incomes')
          .doc(userid)
          .collection('income')
          .add({
            unit,
            month,
            day,
            date,
            time,
            tree,
            quantityInKilograms,
            totalPrice,
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
        const time = new Date().getTime();
        const date = selectedDateExpense;
        const costType = inputs[0].value;
        const quantity = Number(inputs[1].value);
        const unit = inputs[2].value.toLowerCase();
        const totalPrice = Number(inputs[3].value);
        let month = date.slice(5, 7);
        switch (month) {
          case '01':
            month = 'Jan.';
            break;
          case '02':
            month = 'Feb.';
            break;
          case '03':
            month = 'Mar.';
            break;
          case '04':
            month = 'Apr.';
            break;
          case '05':
            month = 'May.';
            break;
          case '06':
            month = 'Jun.';
            break;
          case '07':
            month = 'Jul.';
            break;
          case '08':
            month = 'Aug.';
            break;
          case '09':
            month = 'Sep.';
            break;
          case '10':
            month = 'Oct.';
            break;
          case '11':
            month = 'Nov.';
            break;
          case '12':
            month = 'Dec.';
            break;
          default:
            month = 'Jan.';
        }
        const day = date.slice(8, 10);
        firestore()
          .collection('expenses')
          .doc(userid)
          .collection('expense')
          .add({
            month,
            day,
            date,
            time,
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
  // Handle general statistic
  const [totalIncome, setTotalIncome] = useState(0);
  const [dataIncome, setDataIncome] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [dataExpense, setDataExpense] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);
  useEffect(() => {
    setTotalProfit(totalIncome - totalExpense);
  }, [totalIncome, totalExpense]);
  // Get data income
  if (!selectedDateStart && !selectedDateEnd) {
    React.useEffect(() => {
      const subscriber = firestore()
        .collection('incomes')
        .doc(auth().currentUser?.uid)
        .collection('income')
        .orderBy('time', 'desc')
        .onSnapshot(querySnapshot => {
          const incomes: any = [];
          querySnapshot.forEach(documentSnapshot => {
            incomes.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          const validIncomes = incomes.filter(
            (income: { totalPrice: number }) => {
              return !isNaN(income.totalPrice) && income.totalPrice >= 0;
            },
          );

          const totalSumIncome = validIncomes.reduce(
            (accumulator: any, income: { totalPrice: number }) => {
              return accumulator + income.totalPrice;
            },
            0,
          );
          setDataIncome(incomes);
          setTotalIncome(totalSumIncome);
        });
      return () => subscriber();
    }, [selectedDateEnd, selectedDateStart, totalIncome]);
  } else if (!selectedDateStart && selectedDateEnd) {
    React.useEffect(() => {
      const subscriber = firestore()
        .collection('incomes')
        .doc(auth().currentUser?.uid)
        .collection('income')
        .where('date', '<=', selectedDateEnd)
        .onSnapshot(querySnapshot => {
          const incomes: any = [];
          querySnapshot.forEach(documentSnapshot => {
            incomes.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          const validIncomes = incomes.filter(
            (income: { totalPrice: number }) => {
              return !isNaN(income.totalPrice) && income.totalPrice >= 0;
            },
          );

          const totalSumIncome = validIncomes.reduce(
            (accumulator: any, income: { totalPrice: number }) => {
              return accumulator + income.totalPrice;
            },
            0,
          );
          setDataIncome(incomes);
          setTotalIncome(totalSumIncome);
        });
      return () => subscriber();
    }, [selectedDateEnd, selectedDateStart, totalIncome]);
  } else if (selectedDateStart && !selectedDateEnd) {
    React.useEffect(() => {
      const subscriber = firestore()
        .collection('incomes')
        .doc(auth().currentUser?.uid)
        .collection('income')
        .where('date', '>=', selectedDateStart)
        .onSnapshot(querySnapshot => {
          const incomes: any = [];
          querySnapshot.forEach(documentSnapshot => {
            incomes.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          const validIncomes = incomes.filter(
            (income: { totalPrice: number }) => {
              return !isNaN(income.totalPrice) && income.totalPrice >= 0;
            },
          );

          const totalSumIncome = validIncomes.reduce(
            (accumulator: any, income: { totalPrice: number }) => {
              return accumulator + income.totalPrice;
            },
            0,
          );
          setDataIncome(incomes);
          setTotalIncome(totalSumIncome);
        });
      return () => subscriber();
    }, [selectedDateEnd, selectedDateStart, totalIncome]);
  } else {
    React.useEffect(() => {
      const subscriber = firestore()
        .collection('incomes')
        .doc(auth().currentUser?.uid)
        .collection('income')
        .where('date', '>=', selectedDateStart)
        .where('date', '<=', selectedDateEnd)
        .onSnapshot(querySnapshot => {
          const incomes: any = [];
          querySnapshot.forEach(documentSnapshot => {
            incomes.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          const validIncomes = incomes.filter(
            (income: { totalPrice: number }) => {
              return !isNaN(income.totalPrice) && income.totalPrice >= 0;
            },
          );

          const totalSumIncome = validIncomes.reduce(
            (accumulator: any, income: { totalPrice: number }) => {
              return accumulator + income.totalPrice;
            },
            0,
          );
          setDataIncome(incomes);
          setTotalIncome(totalSumIncome);
        });
      return () => subscriber();
    }, [selectedDateEnd, selectedDateStart, totalIncome]);
  }
  // End get data income
  // Get data expense
  if (!selectedDateStart && !selectedDateEnd) {
    React.useEffect(() => {
      const subscriber = firestore()
        .collection('expenses')
        .doc(auth().currentUser?.uid)
        .collection('expense')
        .onSnapshot(querySnapshot => {
          const expenses: any = [];
          querySnapshot.forEach(documentSnapshot => {
            expenses.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          const totalSumExpense = expenses.reduce(
            (accumulator: any, expense: { totalPrice: number }) => {
              if (!isNaN(expense.totalPrice)) {
                return accumulator + expense.totalPrice;
              }
              return accumulator;
            },
            0,
          );
          setDataExpense(expenses);
          setTotalExpense(totalSumExpense);
        });
      return () => subscriber();
    }, []);
  } else if (!selectedDateStart && selectedDateEnd) {
    React.useEffect(() => {
      const subscriber = firestore()
        .collection('expenses')
        .doc(auth().currentUser?.uid)
        .collection('expense')
        .where('date', '<=', selectedDateEnd)
        .onSnapshot(querySnapshot => {
          const expenses: any = [];
          querySnapshot.forEach(documentSnapshot => {
            expenses.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          const totalSumExpense = expenses.reduce(
            (accumulator: any, expense: { totalPrice: number }) => {
              if (!isNaN(expense.totalPrice)) {
                return accumulator + expense.totalPrice;
              }
              return accumulator;
            },
            0,
          );
          setDataExpense(expenses);
          setTotalExpense(totalSumExpense);
        });
      return () => subscriber();
    }, [selectedDateEnd]);
  } else if (selectedDateStart && !selectedDateEnd) {
    React.useEffect(() => {
      const subscriber = firestore()
        .collection('expenses')
        .doc(auth().currentUser?.uid)
        .collection('expense')
        .where('date', '>=', selectedDateStart)
        .onSnapshot(querySnapshot => {
          const expenses: any = [];
          querySnapshot.forEach(documentSnapshot => {
            expenses.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          const totalSumExpense = expenses.reduce(
            (accumulator: any, expense: { totalPrice: number }) => {
              if (!isNaN(expense.totalPrice)) {
                return accumulator + expense.totalPrice;
              }
              return accumulator;
            },
            0,
          );
          setDataExpense(expenses);
          setTotalExpense(totalSumExpense);
        });
      return () => subscriber();
    }, [selectedDateStart]);
  } else {
    React.useEffect(() => {
      const subscriber = firestore()
        .collection('expenses')
        .doc(auth().currentUser?.uid)
        .collection('expense')
        .where('date', '>=', selectedDateStart)
        .where('date', '<=', selectedDateEnd)
        .onSnapshot(querySnapshot => {
          const expenses: any = [];
          querySnapshot.forEach(documentSnapshot => {
            expenses.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          const totalSumExpense = expenses.reduce(
            (accumulator: any, expense: { totalPrice: number }) => {
              if (!isNaN(expense.totalPrice)) {
                return accumulator + expense.totalPrice;
              }
              return accumulator;
            },
            0,
          );
          setDataExpense(expenses);
          setTotalExpense(totalSumExpense);
        });
      return () => subscriber();
    }, [selectedDateEnd, selectedDateStart]);
  }
  // End get data expense
  React.useEffect(() => {
    const subscriber = firestore()
      .collection('expenses')
      .doc(auth().currentUser?.uid)
      .collection('expense')
      .onSnapshot(querySnapshot => {
        const expenses: any = [];
        querySnapshot.forEach(documentSnapshot => {
          expenses.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        const totalSumExpense = expenses.reduce(
          (accumulator: any, expense: { totalPrice: number }) => {
            if (!isNaN(expense.totalPrice)) {
              return accumulator + expense.totalPrice;
            }
            return accumulator;
          },
          0,
        );
        setTotalExpense(totalSumExpense);
      });
    return () => subscriber();
  }, []);

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
    selectedDateStart,
    setSelectedDateStart,
    selectedDateEnd,
    setSelectedDateEnd,
    selectedDateIncome,
    setSelectedDateIncome,
    selectedDateExpense,
    setSelectedDateExpense,
    handlePickDate,
    handleReload,
    totalIncome,
    totalExpense,
    totalProfit,
    handleAdd,
    isModalSuccess,
    setIsModalSuccess,
    titleHeader,
    setTitleHeader,
    titleBody,
    setTitleBody,
    isModalLoading,
    setIsModalLoading,
    dataIncome,
    setDataIncome,
    dataExpense,
    setDataExpense,
    status,
    setStatus,
    isModalPickDate,
    setIsModalPickDate,
  };
}
