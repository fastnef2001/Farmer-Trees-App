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
import { is } from 'date-fns/locale';
import { set } from 'date-fns';
const { format } = require('date-fns');

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
  // React.useEffect(() => {
  //   let subscriber = firestore()
  //     .collection('incomes')
  //     .doc(auth().currentUser?.uid)
  //     .collection('income')
  //     .orderBy('date', 'desc')
  //     .orderBy('time', 'desc');
  //   if (selectedDateStart) {
  //     subscriber = subscriber.where('date', '>=', selectedDateStart);
  //   }
  //   if (selectedDateEnd) {
  //     subscriber = subscriber.where('date', '<=', selectedDateEnd);
  //   }

  //   const unsubscribe = subscriber.onSnapshot(querySnapshot => {
  //     if (!querySnapshot || querySnapshot.empty) {
  //       // Kiểm tra nếu querySnapshot không tồn tại hoặc không có dữ liệu
  //       console.log('No documents found');
  //       return;
  //     }
  //     const incomes: any = [];
  //     querySnapshot.forEach(documentSnapshot => {
  //       incomes.push({
  //         ...documentSnapshot.data(),
  //         key: documentSnapshot.id,
  //       });
  //     });
  //     const validIncomes = incomes.filter((income: { totalPrice: number }) => {
  //       return !isNaN(income.totalPrice) && income.totalPrice >= 0;
  //     });
  //     const totalSumIncome = validIncomes.reduce(
  //       (accumulator: any, income: { totalPrice: number }) => {
  //         return accumulator + income.totalPrice;
  //       },
  //       0,
  //     );
  //     setDataIncome(incomes);
  //     setTotalIncome(totalSumIncome);
  //   });

  //   return () => unsubscribe();
  // }, [selectedDateEnd, selectedDateStart, totalIncome]);
  React.useEffect(() => {
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
    // const timestampStart = convertTotimestamp(selectedDateStart);
    // const timestampStart = 'October 12, 2023, 10:14:52 AM AM GMT+7';
    // const timestampStart = 'October 12, 2023, 10:14:51 AM AM GMT+7';
    // const timestampStart = 'October 12, 2023, 10:14:53 AM AM GMT+7';
    // const timestampStart = 'October 12, 2023, 00:00:00 AM AM GMT+7';

    const timestampStart = convertTotimestamp(selectedDateStart, true);

    const timestampEnd = convertTotimestamp(selectedDateEnd);
    console.log('timestampStart', timestampStart);
    console.log('timestampEnd', timestampEnd);
    let subscriber = firestore()
      .collection('incomes')
      .doc(auth().currentUser?.uid)
      .collection('income')
      .orderBy('timestamp', 'desc');
    if (selectedDateStart) {
      subscriber = subscriber.where('timestamp', '>=', timestampStart);
    }
    if (selectedDateEnd) {
      subscriber = subscriber.where('timestamp', '<=', timestampEnd);
    }

    const query = subscriber.onSnapshot(querySnapshot => {
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

    return () => query();
  }, [selectedDateEnd, selectedDateStart]);
  // if (!selectedDateStart && !selectedDateEnd) {
  //   React.useEffect(() => {
  //     const subscriber = firestore()
  //       .collection('incomes')
  //       .doc(auth().currentUser?.uid)
  //       .collection('income')
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
  //   }, []);
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
