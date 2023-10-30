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
  DataExpenseInterface,
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

  function fetchDataAndCalculateTotal(
    collectionName1: string,
    collectionName2: string,
    selectedDateStart: string,
    selectedDateEnd: string,
    selectedTreeOrCostType: string,
    setData: React.Dispatch<React.SetStateAction<never[]>>,
    setTotal: React.Dispatch<React.SetStateAction<number>>,
    filter: string,
  ) {
    useEffect(() => {
      const timestampStart = convertTotimestamp(selectedDateStart, true);
      const timestampEnd = convertTotimestamp(selectedDateEnd, false);

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
        setData(data);
        console.log('data', data);
        setTotal(totalSum);
      });

      return () => query();
    }, [
      selectedDateEnd,
      selectedDateStart,
      collectionName1,
      setData,
      setTotal,
      selectedTreeOrCostType,
      filter,
      collectionName2,
    ]);
  }

  // function filterDataIncome(data: any) {
  //   data.filter = (item: { tree: string }) => {
  //     return item.tree === selectedTreeOrCostType;
  //   };

  //   return data;
  // }

  fetchDataAndCalculateTotal(
    'incomes',
    'income',
    selectedDateStart,
    selectedDateEnd,
    selectedTreeOrCostType,
    setDataIncome,
    setTotalIncome,
    'tree',
  );

  fetchDataAndCalculateTotal(
    'expenses',
    'expense',
    selectedDateStart,
    selectedDateEnd,
    selectedTreeOrCostType,
    setDataExpense,
    setTotalExpense,
    'costType',
  );

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
