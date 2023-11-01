/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-shadow */
import { useState, useEffect } from 'react';
import { UseLogic } from './UseLogic';
import {
  DataExpenseInterface,
  DataIncomeInterface,
} from './Statistics.interface';

export function HandleDeleteAndEdit() {
  const { dataExpense, dataIncome } = UseLogic();

  const [data, setData] = useState<DataExpenseInterface[]>([]);
  const [dataIncome1, setDataIncome] = useState<DataIncomeInterface[]>([]);

  useEffect(() => {
    setData(dataExpense);
    setDataIncome(dataIncome);
  }, [dataExpense, dataIncome]);

  const [isModalDetail, setIsModalDetail] = useState(false);
  const [key, setKey] = useState('');
  const handlePressDetail = (key: string) => {
    console.log('có bấm');
    setIsModalDetail(true);
    console.log(isModalDetail);
    setKey(key);
  };
  const handleModalDetail = () => {
    setIsModalDetail(false);
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
  };
}
