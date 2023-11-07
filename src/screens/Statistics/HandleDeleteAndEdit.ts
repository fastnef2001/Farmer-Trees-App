/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-shadow */
import { useState, useEffect } from 'react';
import { UseLogic } from './UseLogic';
import {
  DataExpenseInterface,
  DataIncomeInterface,
} from './Statistics.interface';
import { set } from 'date-fns';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export function HandleDeleteAndEdit() {
  const { dataExpense, dataIncome } = UseLogic();

  const [data, setData] = useState<DataExpenseInterface[]>([]);
  const [dataIncome1, setDataIncome] = useState<DataIncomeInterface[]>([]);
  const [titleBody1, setTitleBody1] = useState('');
  const [titleHeader1, setTitleHeader1] = useState('');
  const [isModalSuccess1, setIsModalSuccess1] = useState(false);
  const [isModalLoading1, setIsModalLoading1] = useState(false);

  useEffect(() => {
    setData(dataExpense);
    setDataIncome(dataIncome);
  }, [dataExpense, dataIncome]);

  const [isModalDetail, setIsModalDetail] = useState(false);
  const [key, setKey] = useState('');
  const [title, setTitle] = useState('');
  const handlePressDetail = (key: string, title: string) => {
    setTitle(title);
    setIsModalDetail(true);
    setKey(key);
  };
  const handleModalDetail = () => {
    setIsModalDetail(false);
  };

  const handleDeleteIncome = () => {
    setTitleBody1('You have successfully deleted the income.');
    setTitleHeader1('Successfully');
    firestore()
      .collection('incomes')
      .doc(auth().currentUser?.uid)
      .collection('income')
      .doc(key)
      .delete();
    handleModalDetail();
    setIsModalSuccess1(true);
  };
  const handleDeleteExpense = () => {
    setTitleBody1('You have successfully deleted the expense.');
    setTitleHeader1('Successfully');
    firestore()
      .collection('expenses')
      .doc(auth().currentUser?.uid)
      .collection('expense')
      .doc(key)
      .delete();
    handleModalDetail();
    setIsModalSuccess1(true);
  };

  const handleModalSuccess = () => {
    setIsModalSuccess1(!isModalSuccess1);
  };

  const item = data.find(item => item.key === key);
  const itemIncome = dataIncome1.find(item => item.key === key);
  return {
    isModalDetail,
    setIsModalDetail,
    key,
    setKey,
    handlePressDetail,
    handleModalDetail,
    item,
    itemIncome,
    title,
    handleDeleteIncome,
    handleDeleteExpense,
    isModalSuccess1,
    setIsModalSuccess1,
    titleBody1,
    titleHeader1,
    handleModalSuccess,
    isModalLoading1,
  };
}
