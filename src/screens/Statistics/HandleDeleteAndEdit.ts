/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-shadow */
import { useState, useEffect } from 'react';
import { UseLogic } from './UseLogic';
import { DataExpenseInterface } from './Statistics.interface';

export function HandleDeleteAndEdit() {
  const { dataExpense } = UseLogic();

  const [data, setData] = useState<DataExpenseInterface[]>([]);

  useEffect(() => {
    setData(dataExpense);
  }, [dataExpense]);

  console.log('dataExpense', dataExpense);
  const [isModalDetail, setIsModalDetail] = useState(false);
  const [key, setKey] = useState('');
  const handlePressDetail = (key: string) => {
    setIsModalDetail(true);
    setKey(key);
  };
  const handleModalDetail = () => {
    setIsModalDetail(false);
  };

  const item = data.find(item => item.key === key);
  return {
    isModalDetail,
    setIsModalDetail,
    key,
    setKey,
    handlePressDetail,
    handleModalDetail,
    item,
  };
}
