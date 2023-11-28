import { useEffect } from 'react';
import { Database } from '../../database/database';
import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { Alert } from 'react-native';
export function HandleExcel() {
  const { getItems, dataIncome, dataExpense } = Database();
  let nameFile = '';
  useEffect(() => {
    getItems('incomes', 'income', '', '', '', 'tree');
    getItems('expenses', 'expense', '', '', '', 'tree');
  }, [getItems]);
  console.log('dataIncome', dataIncome);
  console.log('dataExpense', dataExpense);
  const dataToExport: any[][] = [];
  const headerIncome = [
    'Date',
    'Tree name',
    'Quantity',
    'Unit',
    'Total Price $',
  ];
  const headerExpense = [
    'Date',
    'Cost type',
    'Quantity',
    'Unit',
    'Total Price $',
  ];
  const convertToXLSX = (data: any) => {
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    return workbook;
  };
  const createAndShareExcel = async (title: string) => {
    if (title === 'income') {
      nameFile = 'IncomeHistory';
      dataToExport.length = 0;
      dataToExport.push(headerIncome);
      for (const incomeData of dataIncome) {
        const formattedData = [
          incomeData.date,
          incomeData.tree,
          incomeData.quantity,
          incomeData.unit,
          incomeData.totalPrice,
        ];
        dataToExport.push(formattedData);
      }
    } else {
      nameFile = 'ExpenseHistory';
      dataToExport.length = 0;
      dataToExport.push(headerExpense);
      for (const expenseData of dataExpense) {
        const formattedData = [
          expenseData.date,
          expenseData.costType,
          expenseData.quantity,
          expenseData.unit,
          expenseData.totalPrice,
        ];
        dataToExport.push(formattedData);
      }
    }
    const workbook = convertToXLSX(dataToExport);
    const excelBuffer = XLSX.write(workbook, { type: 'base64' });
    const pathToWrite = `${RNFS.DownloadDirectoryPath}/${nameFile}.xlsx`;
    try {
      await RNFS.writeFile(pathToWrite, excelBuffer, 'base64');
      Alert.alert('Download Success', 'Do you want to share this file?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            Share.open({
              url: `file://${pathToWrite}`,
              type: 'application/vnd.ms-excel',
              title: 'Share File',
            });
          },
        },
      ]);
    } catch (error) {
      return;
    }
  };
  return {
    dataIncome,
    dataExpense,
    createAndShareExcel,
  };
}
