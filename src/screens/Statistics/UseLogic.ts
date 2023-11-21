import { useState, useEffect } from 'react';
import { Database } from '../../database/database';

export function UseLogic() {
  const { getItems, dataIncome, totalIncome, dataExpense, totalExpense } =
    Database();
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
  const [totalProfit, setTotalProfit] = useState(0);
  useEffect(() => {
    setTotalProfit(totalIncome - totalExpense);
  }, [totalIncome, totalExpense]);

  useEffect(() => {
    getItems(
      'incomes',
      'income',
      selectedDateStart,
      selectedDateEnd,
      selectedTreeOrCostType,
      'tree',
    );
    getItems(
      'expenses',
      'expense',
      selectedDateStart,
      selectedDateEnd,
      selectedTreeOrCostType,
      'costType',
    );
  }, [selectedDateStart, selectedDateEnd, selectedTreeOrCostType, getItems]);

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
    dataExpense,
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
