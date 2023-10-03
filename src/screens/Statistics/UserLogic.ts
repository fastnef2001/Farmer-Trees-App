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
import { HandleAdd } from './HandleAdd';

export function UseLogic() {
  //Handlefilter
  const [selectedTreeOrCostType, setSelectedTreeOrCostType] = useState('');
  const [selectedDateStart, setSelectedDateStart] = useState('');
  const [selectedDateEnd, setSelectedDateEnd] = useState('');
  const [selectedDateIncome, setSelectedDateIncome] = useState('');
  const [selectedDateExpense, setSelectedDateExpense] = useState('');
  const [status, setStatus] = useState('');
  const [isModalPickDate, setIsModalPickDate] = useState(false);
  const [isModalPickFilter, setIsModalPickFilter] = useState(false);
  const [titlePickFilter, setTitlePickFilter] = useState('');
  const handlePickDate = (text: string) => () => {
    setIsModalPickDate(true);
    setStatus(text);
  };
  const handleReload = () => {
    setSelectedDateStart('');
    setSelectedDateEnd('');
    setSelectedTreeOrCostType('');
  };

  const handleModalPickFilter = (title: string) => {
    setIsModalPickFilter(!isModalPickFilter);
    setTitlePickFilter(title);
  };
  const handleModalPickHideFilter = () => {
    setIsModalPickFilter(false);
  };

  const hanlePickItem = (value: string, titlePick: string) => {
    setIsModalPickFilter(false);
    setSelectedTreeOrCostType(value);
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
  // if (!selectedDateStart && !selectedDateEnd) {
  React.useEffect(() => {
    let subscriber = firestore()
      .collection('incomes')
      .doc(auth().currentUser?.uid)
      .collection('income')
      .orderBy('date', 'desc')
      .orderBy('time', 'desc');
    if (selectedDateStart) {
      subscriber = subscriber.where('date', '>=', selectedDateStart);
    }
    if (selectedDateEnd) {
      subscriber = subscriber.where('date', '<=', selectedDateEnd);
    }

    const unsubscribe = subscriber.onSnapshot(querySnapshot => {
      const incomes: any = [];
      querySnapshot.forEach(documentSnapshot => {
        incomes.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      const validIncomes = incomes.filter((income: { totalPrice: number }) => {
        return !isNaN(income.totalPrice) && income.totalPrice >= 0;
      });
      const totalSumIncome = validIncomes.reduce(
        (accumulator: any, income: { totalPrice: number }) => {
          return accumulator + income.totalPrice;
        },
        0,
      );
      setDataIncome(incomes);
      setTotalIncome(totalSumIncome);
    });

    return () => unsubscribe();
  }, [selectedDateEnd, selectedDateStart, totalIncome]);
  // } else if (!selectedDateStart && selectedDateEnd) {
  //   React.useEffect(() => {
  //     const subscriber = firestore()
  //       .collection('incomes')
  //       .doc(auth().currentUser?.uid)
  //       .collection('income')
  //       .where('date', '<=', selectedDateEnd)
  //       .onSnapshot(querySnapshot => {
  //         const incomes: any = [];
  //         querySnapshot.forEach(documentSnapshot => {
  //           incomes.push({
  //             ...documentSnapshot.data(),
  //             key: documentSnapshot.id,
  //           });
  //         });
  //         const validIncomes = incomes.filter(
  //           (income: { totalPrice: number }) => {
  //             return !isNaN(income.totalPrice) && income.totalPrice >= 0;
  //           },
  //         );

  //         const totalSumIncome = validIncomes.reduce(
  //           (accumulator: any, income: { totalPrice: number }) => {
  //             return accumulator + income.totalPrice;
  //           },
  //           0,
  //         );
  //         setDataIncome(incomes);
  //         setTotalIncome(totalSumIncome);
  //       });
  //     return () => subscriber();
  //   }, [selectedDateEnd, selectedDateStart, totalIncome]);
  // } else if (selectedDateStart && !selectedDateEnd) {
  //   React.useEffect(() => {
  //     const subscriber = firestore()
  //       .collection('incomes')
  //       .doc(auth().currentUser?.uid)
  //       .collection('income')
  //       .where('date', '>=', selectedDateStart)
  //       .onSnapshot(querySnapshot => {
  //         const incomes: any = [];
  //         querySnapshot.forEach(documentSnapshot => {
  //           incomes.push({
  //             ...documentSnapshot.data(),
  //             key: documentSnapshot.id,
  //           });
  //         });
  //         const validIncomes = incomes.filter(
  //           (income: { totalPrice: number }) => {
  //             return !isNaN(income.totalPrice) && income.totalPrice >= 0;
  //           },
  //         );

  //         const totalSumIncome = validIncomes.reduce(
  //           (accumulator: any, income: { totalPrice: number }) => {
  //             return accumulator + income.totalPrice;
  //           },
  //           0,
  //         );
  //         setDataIncome(incomes);
  //         setTotalIncome(totalSumIncome);
  //       });
  //     return () => subscriber();
  //   }, [selectedDateEnd, selectedDateStart, totalIncome]);
  // } else {
  //   React.useEffect(() => {
  //     const subscriber = firestore()
  //       .collection('incomes')
  //       .doc(auth().currentUser?.uid)
  //       .collection('income')
  //       .where('date', '>=', selectedDateStart)
  //       .where('date', '<=', selectedDateEnd)
  //       .onSnapshot(querySnapshot => {
  //         const incomes: any = [];
  //         querySnapshot.forEach(documentSnapshot => {
  //           incomes.push({
  //             ...documentSnapshot.data(),
  //             key: documentSnapshot.id,
  //           });
  //         });
  //         const validIncomes = incomes.filter(
  //           (income: { totalPrice: number }) => {
  //             return !isNaN(income.totalPrice) && income.totalPrice >= 0;
  //           },
  //         );

  //         const totalSumIncome = validIncomes.reduce(
  //           (accumulator: any, income: { totalPrice: number }) => {
  //             return accumulator + income.totalPrice;
  //           },
  //           0,
  //         );
  //         setDataIncome(incomes);
  //         setTotalIncome(totalSumIncome);
  //       });
  //     return () => subscriber();
  //   }, [selectedDateEnd, selectedDateStart, totalIncome]);
  // }
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
    dataIncome,
    setDataIncome,
    dataExpense,
    setDataExpense,
    status,
    setStatus,
    isModalPickDate,
    setIsModalPickDate,
    selectedTreeOrCostType,
    setSelectedTreeOrCostType,
    isModalPickFilter,
    hanlePickItem,
    handleModalPickFilter,
    titlePickFilter,
    handleModalPickHideFilter,
  };
}
