import { useState, useEffect } from 'react';
import { Database } from '../../database/database';
import { InputInterface } from '../../Interface/Interface';

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
    getUnitIncome,
    getUnitExpense,
    getCostType,
    unitsExpense,
    trees,
    unitsIncome,
    costTypes,
    deleteIncome,
    deleteExpense,
    editExpense,
    editIncome,
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
  const [titlePickDate, setTitlePickDate] = useState('');
  const [isModalPickDate, setIsModalPickDate] = useState(false);
  const [valuePick, setValuePick] = useState('');
  const [isModalPick, setIsModalPick] = useState(false);
  const [titlePick, setTitlePick] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [titleHeader, setTitleHeader] = useState('');
  const [titleBody, setTitleBody] = useState('');
  const [isModalSuccess, setIsModalSuccess] = useState(false);
  const [titleDetail, setTitleDetail] = useState('');
  const [isModalDetail, setIsModalDetail] = useState(false);
  const [key, setKey] = useState('');
  const [itemExpense, setItemExpense] = useState<any>({});
  const [itemIncome, setItemIncome] = useState<any>({});
  const [titleFooterModalSuccess, setTitleFooterModalSuccess] = useState('');
  const [handleFunction, setHandleFunction] = useState(() => {});
  //CRUD INCOME AND EXPENSE
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
      } else {
        setIsDisabled(true);
      }
    }
  }, [
    selectedDateStart,
    selectedDateEnd,
    selectedTreeOrCostType,
    getItems,
    getCostType,
    getUnitExpense,
    getUnitIncome,
    getTrees,
    inputs,
  ]);
  const handleAdd = async (text: string) => {
    if (text === 'income') {
      setIsModalLoading(true);
      if (await createIncome(selectedDateIncome, inputs)) {
        setIsModalAdd(false);
        setIsModalLoading(false);
        setTitleHeader('Successfully');
        setTitleBody('You have successfully added income');
        setIsModalSuccess(true);
        setTitleFooterModalSuccess('');
        setHandleFunction(() => {});
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
        setTitleFooterModalSuccess('');
        setHandleFunction(() => {});
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

  const handleModalDeleteIncome = () => {
    setIsModalSuccess(true);
    setTitleHeader('Delete');
    setTitleBody('Do you want to delete this income?');
    setHandleFunction(() => () => handleDeleteIncome());
    setTitleFooterModalSuccess('delete');
  };

  const handleModalDeleteExpense = () => {
    setIsModalSuccess(true);
    setTitleHeader('Delete');
    setTitleBody('Do you want to delete this expense?');
    setHandleFunction(() => () => handleDeleteExpense());
    setTitleFooterModalSuccess('delete');
  };

  const handleDeleteIncome = async () => {
    setIsModalDetail(false);
    setTimeout(() => {
      setIsModalSuccess(false);
    }, 100);

    const isDeleteIncome = await deleteIncome(key);
    if (isDeleteIncome) {
      setTimeout(() => {
        setTitleBody('You have successfully deleted the income.');
        setTitleHeader('Successfully');
        setTitleFooterModalSuccess('');
        setIsModalSuccess(true);
      }, 1000);
    }
  };
  const handleDeleteExpense = async () => {
    setIsModalDetail(false);
    setTimeout(() => {
      setIsModalSuccess(false);
    }, 100);

    const isDeleteExpense = await deleteExpense(key);
    if (isDeleteExpense) {
      setTimeout(() => {
        setTitleBody('You have successfully deleted the expense.');
        setTitleHeader('Successfully');
        setTitleFooterModalSuccess('');
        setIsModalSuccess(true);
      }, 1000);
    }
  };
  const handleEditItem = async (text: string) => {
    if (text === 'income') {
      setIsModalLoading(true);
      if (await editIncome(selectedDateIncome, inputs, key)) {
        setIsModalAdd(false);
        setIsModalLoading(false);
        setTitleHeader('Successfully');
        setTitleBody('You have successfully edited income');
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
    } else {
      setIsModalLoading(true);
      if (await editExpense(selectedDateExpense, inputs, key)) {
        setIsModalAdd(false);
        setIsModalLoading(false);
        setTitleHeader('Successfully');
        setTitleBody('You have successfully edited expense');
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
  // MODAL
  const handleModalAddItem = (title?: string) => {
    // RESSET INPUTS
    const newInputs = [...inputs];
    newInputs.forEach((input, index) => {
      newInputs[index].value = '';
      newInputs[index].error = '';
    });
    setInputs(newInputs);
    if (title === 'Add income') {
      setTitleModalAdd(title);
      setSelectedDateIncome(timeNow);
      setInputs([...inputsIncome]);
    } else if (title === 'Add expense') {
      setTitleModalAdd(title);
      setSelectedDateExpense(timeNow);
      setInputs([...inputsExpense]);
    }
    setTimeout(() => {
      setIsModalAdd(!isModaAdd);
    }, 200);
  };
  const handleModalEditIncome = () => {
    setIsModalDetail(false);
    setIsDisabled(!isDisabled);
    setSelectedDateIncome(itemIncome?.date || '');
    setTitleModalAdd('Edit income');
    const newInputs = [...inputsIncome];
    newInputs[0].value = itemIncome?.tree || '';
    newInputs[1].value = itemIncome?.quantityInKilograms.toString();
    newInputs[2].value = itemIncome?.unit || '';
    newInputs[3].value = itemIncome?.totalPrice.toString();
    setInputs(newInputs);
    setIsModalAdd(!isModaAdd);
  };
  const handleModalEditExpense = () => {
    setIsModalDetail(false);
    setIsDisabled(!isDisabled);
    setSelectedDateExpense(itemExpense?.date || '');
    setTitleModalAdd('Edit expense');
    const newInputs = [...inputsExpense];
    newInputs[0].value = itemExpense?.costType || '';
    newInputs[1].value = itemExpense?.quantity.toString();
    newInputs[2].value = itemExpense?.unit || '';
    newInputs[3].value = itemExpense?.totalPrice.toString();
    setInputs(newInputs);
    setIsModalAdd(!isModaAdd);
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
  const handleModalPickFilter = (value?: string) => {
    if (value === 'income') {
      setTitlePick('Pick tree filter');
    } else if (value === 'expense') {
      setTitlePick('Pick cost type filter');
    }
    setIsModalPick(!isModalPick);
  };
  const handlePickDate = (text: string) => () => {
    setIsModalPickDate(!isModalPickDate);
    setTitlePickDate(text);
  };
  const handlePickItem = (value?: string) => {
    setIsModalPick(!isModalPick);
    if (titlePick === 'Pick tree' && value) {
      const newInputs = [...inputsIncome];
      newInputs[0].value = value;
    } else if (titlePick === 'Pick unit income' && value) {
      const newInputs = [...inputsIncome];
      newInputs[2].value = value;
    } else if (titlePick === 'Pick cost type' && value) {
      const newInputs = [...inputsExpense];
      newInputs[0].value = value;
    } else if (titlePick === 'Pick unit expense' && value) {
      const newInputs = [...inputsExpense];
      newInputs[2].value = value;
    } else if (titlePick === 'Pick cost type filter' && value) {
      setSelectedTreeOrCostType(value);
    } else if (titlePick === 'Pick tree filter' && value) {
      setSelectedTreeOrCostType(value);
    }
  };
  const handlePressDetail = (keyValue?: string, title?: string) => {
    if (keyValue && title) {
      if (title === 'Income history') {
        setTitleDetail('Income Detail');
        setItemIncome(dataIncome.find(item => item.key === (keyValue as any)));
      } else if (title === 'Expense history') {
        setTitleDetail('Expense Detail');
        setItemExpense(
          dataExpense.find(item => item.key === (keyValue as any)),
        );
      }
      setKey(keyValue);
    }
    setIsModalDetail(!isModalDetail);
  };
  const handleInputChange = (index: any, value: any) => {
    const newInputs = [...inputs];
    newInputs[index].value = value;
    newInputs[index].error = '';
    setInputs(newInputs);
  };

  // Handle general statistic
  const [totalProfit, setTotalProfit] = useState(0);
  useEffect(() => {
    setTotalProfit(totalIncome - totalExpense);
  }, [totalIncome, totalExpense]);

  // Other
  const handleReload = () => {
    setSelectedDateStart('');
    setSelectedDateEnd('');
    setSelectedTreeOrCostType('');
  };
  function getTimeNow() {
    return `${new Date().getFullYear()}/${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${new Date().getDate().toString().padStart(2, '0')}`;
  }
  const timeNow = getTimeNow();
  return {
    trees,
    unitsIncome,
    unitsExpense,
    costTypes,
    isModalPickDate,
    isModaAdd,
    isModalPick,
    isModalLoading,
    isModalDetail,
    isModalSuccess,
    isDisabled,
    handleModalAddItem,
    handleModalPickTree,
    handleModalPickFilter,
    handleModalPickCostType,
    handleModalPickUnitExpense,
    handleModalPickUnitIncome,
    handleModalEditIncome,
    handleModalEditExpense,
    handlePressDetail,
    handlePickDate,
    handlePickItem,
    handleReload,
    handleInputChange,
    handleDeleteIncome,
    handleDeleteExpense,
    handleAdd,
    handleEditItem,
    handleFunction,
    handleModalDeleteIncome,
    handleModalDeleteExpense,
    setIsModalPickDate,
    setIsModalSuccess,
    setIsModalAdd,
    titleBody,
    titleHeader,
    titleModalAdd,
    titleDetail,
    titlePick,
    titlePickDate,
    titleFooterModalSuccess,
    selectedTreeOrCostType,
    selectedDateStart,
    selectedDateEnd,
    selectedDateIncome,
    selectedDateExpense,
    setSelectedDateStart,
    setSelectedDateEnd,
    setSelectedDateIncome,
    setSelectedDateExpense,
    setSelectedTreeOrCostType,
    itemIncome,
    itemExpense,
    dataIncome,
    dataExpense,
    totalIncome,
    totalExpense,
    totalProfit,
    valuePick,
    key,
    inputs,
  };
}
