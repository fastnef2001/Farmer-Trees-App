import { useState, useEffect } from 'react';
import { Database } from '../../database/database';
import {
  InputInterface,
  TreeInterface,
  UnitInterface,
} from './Statistics.interface';

export function UseLogic() {
  const {
    getItems,
    dataIncome,
    totalIncome,
    dataExpense,
    totalExpense,
    createIncome,
    createExpense,
    getTrees,
    trees,
    getUnitIncome,
    unitsIncome,
    getUnitExpense,
    getCostType,
    unitsExpense,
    costTypes,
  } = Database();
  //Handlefilter
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
  const [inputs, setInputs] = useState<InputInterface[]>([]);
  const [isModaAdd, setIsModalAdd] = useState(false);
  const [titleModalAdd, setTitleModalAdd] = useState('');
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
    setIsModalPickDate(!isModalPickDate);
    setStatus(text);
  };
  function getTimeNow() {
    return `${new Date().getFullYear()}/${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${new Date().getDate().toString().padStart(2, '0')}`;
  }
  const timeNow = getTimeNow();

  const handleModalAddItem = (title?: string) => {
    if (title === 'Add income') {
      setSelectedDateIncome(timeNow);
      setInputs([...inputsIncome]);
    } else if (title === 'Add expense') {
      setSelectedDateExpense(timeNow);
      setInputs([...inputsExpense]);
    }
    if (title) {
      setTitleModalAdd(title);
    }
    setIsModalAdd(!isModaAdd);
  };

  const [valuePick, setValuePick] = useState('');
  const [isModalPick, setIsModalPick] = useState(false);
  const [titlePick, setTitlePick] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [titleHeader, setTitleHeader] = useState('');
  const [titleBody, setTitleBody] = useState('');
  const [isModalSuccess, setIsModalSuccess] = useState(false);

  const handlePickItem = (value?: string) => {
    setIsModalPick(!isModalPick);
    if (titlePick === 'Pick tree' && value) {
      const newInputs = [...inputsIncome];
      newInputs[0].value = value;
      setTitlePick('Pick tree');
    } else if (titlePick === 'Pick unit income' && value) {
      const newInputs = [...inputsIncome];
      newInputs[2].value = value;
      setTitlePick('Pick unit income');
    } else if (titlePick === 'Pick cost type' && value) {
      const newInputs = [...inputsExpense];
      newInputs[0].value = value;
      setTitlePick('Pick cost type');
    } else if (titlePick === 'Pick unit expense' && value) {
      const newInputs = [...inputsExpense];
      newInputs[2].value = value;
      setTitlePick('Pick unit expense');
    }
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
  const handleInputChange = (index: any, value: any) => {
    const newInputs = [...inputs];
    newInputs[index].value = value;
    newInputs[index].error = '';
    setInputs(newInputs);
  };
  useEffect(() => {
    getCostType();
    getUnitExpense();
    getUnitIncome();
    getTrees();
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
  }, [getTrees, getUnitExpense, getUnitIncome, inputs]);

  const handleAdd = async (text: string) => {
    if (text === 'income') {
      setIsModalLoading(true);
      if (await createIncome(selectedDateIncome, inputs)) {
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
      }
    } else if (text === 'expense') {
      setIsModalLoading(true);
      if (await createExpense(selectedDateExpense, inputs)) {
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
      }
    }
  };

  //RELOAD
  const handleReload = () => {
    setSelectedDateStart('');
    setSelectedDateEnd('');
    setSelectedTreeOrCostType('');
  };
  //PICK FILTER
  const handleModalPickFilter = (value?: string) => {
    console.log(value);
    setIsModalPickFilter(!isModalPickFilter);
    if (value) {
      setSelectedTreeOrCostType(value);
    }
    if (titlePick) {
      setTitlePickFilter(titlePick);
    }
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
    titlePickFilter,
    handleModalPickFilter,
    handleModalAddItem,
    isModaAdd,
    titleModalAdd,
    inputs,
    handleModalPickTree,
    handleModalPickCostType,
    handleModalPickUnitExpense,
    handleModalPickUnitIncome,
    titlePick,
    isModalPick,
    valuePick,
    handlePickItem,
    handleInputChange,
    isDisabled,
    handleAdd,
    isModalSuccess,
    titleBody,
    titleHeader,
    isModalLoading,
    setIsModalSuccess,
    trees,
    unitsIncome,
    unitsExpense,
    costTypes,
  };
}
