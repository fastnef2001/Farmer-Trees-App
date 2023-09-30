/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import GeneralStatistics from '../../components/Statistics/GeneralStatistics.component';
import HistoryComponent from '../../components/Statistics/History.component';
import HeaderComponent from '../../components/Header/Header.component';
import FilterComponent from '../../components/Statistics/Filter.component';
import ButtonAddComponent from '../../components/Statistics/ButtonAdd.component';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../theme/color';
import DatePicker from 'react-native-modern-datepicker';
import { PickDate } from '../../components/Modal/PickDate';
import { ModalInsert } from '../../components/Modal/ModalInsert';
import IconBack from '../../assets/images/IconBack.svg';
import styles from '../Setupfarm/Addtree.style';
import IconSwitch from '../../assets/images/IconSwitch.svg';
import Input from '../../components/Input/Input.component';
import IconSave from '../../assets/images/IconSave.svg';
import firestore from '@react-native-firebase/firestore';
import { RadioButton } from 'react-native-paper';
import IconCalendar from '../../assets/images/IconCalendar.svg';
import {
  PopUpSuccess,
  PopUpLoading,
} from '../../components/Statistics/GeneralPopUps.component';

const Statistics = ({ navigation }: any) => {
  // Modal add
  const [isModaAdd, setIsModalAdd] = useState(false);
  const [titleModalAdd, setTitleModalAdd] = useState('');
  interface Input {
    label: string;
    value: string;
    error: string;
  }
  const [inputs, setInputs] = useState<Input[]>([]);
  const timeNow = `${new Date().getFullYear()}/${(new Date().getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${new Date().getDate().toString().padStart(2, '0')}`;

  const handleHideModalAdd = () => {
    setIsModalAdd(false);
    const newInputsIncome = [...inputsIncome];
    newInputsIncome.forEach((input, index) => {
      newInputsIncome[index].value = '';
      newInputsIncome[index].error = '';
    });
    const newInputsExpense = [...inputsExpense];
    newInputsExpense.forEach((input, index) => {
      newInputsExpense[index].value = '';
      newInputsExpense[index].error = '';
    });
  };

  // Income
  const [inputsIncome, setInputsIncome] = useState([
    { label: 'Tree', value: '', error: '' },
    { label: 'Quantity', value: '', error: '' },
    { label: 'Unit', value: '', error: '' },
    { label: 'Total price', value: '', error: '' },
  ]);
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
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
  }, [inputs]);
  const handleModalAddIncome = () => {
    setSelectedDateIncome(timeNow);
    setTitleModalAdd('Add income');
    setInputs([...inputsIncome]);
    setIsModalAdd(!isModaAdd);
  };
  // Expense
  const [inputsExpense, setInputsExpense] = useState([
    { label: 'Cost type', value: '', error: '' },
    { label: 'Quantity', value: '', error: '' },
    { label: 'Unit', value: '', error: '' },
    { label: 'Total price', value: '', error: '' },
  ]);
  const handleModalAddExpense = () => {
    setSelectedDateExpense(timeNow);
    setTitleModalAdd('Add expense');
    setInputs([...inputsExpense]);
    setIsModalAdd(!isModaAdd);
  };

  const handleInputChange = (index: any, value: any) => {
    const newInputs = [...inputs];
    newInputs[index].value = value;
    newInputs[index].error = '';
    setInputs(newInputs);
  };

  // Get data unit income
  interface Unit {
    [x: string]: string;
    name: string;
  }
  const [unitsIncome, setUnitsIncome] = useState<Unit[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const res = await firestore()
        .collection('unitsTree')
        .orderBy('id', 'asc')
        .get();
      const data: any = [];
      res.forEach((doc: { data: () => any; id: any }) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setUnitsIncome(data);
    };
    fetchData();
  }, []);
  // End get data unit income
  // Get data tree
  interface Tree {
    [x: string]: string;
    name: string;
    quanlity: string;
    imageUrl: string;
  }
  const [trees, setTrees] = useState<Tree[]>([]);
  React.useEffect(() => {
    const subscriber = firestore()
      .collection('trees')
      .doc(auth().currentUser?.uid)
      .collection('tree')
      .orderBy('timeAdd', 'desc')
      .onSnapshot(querySnapshot => {
        const trees: any = [];
        querySnapshot.forEach(documentSnapshot => {
          trees.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setTrees(trees);
      });
    return () => subscriber();
  }, []);
  // End get data tree
  // Get data cost type
  const [costTypes, setCostType] = useState<Unit[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const res = await firestore()
        .collection('costTypes')
        .orderBy('id', 'asc')
        .get();
      const data: any = [];
      res.forEach((doc: { data: () => any; id: any }) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setCostType(data);
    };
    fetchData();
  }, []);
  // End get data cost type
  // Get data unit expense
  const [unitsExpense, setUnitsExpense] = useState<Unit[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const res = await firestore()
        .collection('unitsExpense')
        .orderBy('id', 'asc')
        .get();
      const data: any = [];
      res.forEach((doc: { data: () => any; id: any }) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setUnitsExpense(data);
    };
    fetchData();
  }, []);

  // Modal pick
  const [isModalPick, setIsModalPick] = useState(false);
  const [titlePick, setTitlePick] = useState('');
  const handleModalPickHide = () => {
    setIsModalPick(false);
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
  // End modal pick

  // Handle value modal pick
  const [valuePick, setValuePick] = React.useState('');
  const hanleHideModalPick = (value: string, titlePick: string) => {
    setIsModalPick(false);
    setValuePick(value);
    if (titlePick === 'Pick tree') {
      const newInputs = [...inputsIncome];
      newInputs[0].value = value;
    } else if (titlePick === 'Pick unit income') {
      const newInputs = [...inputsIncome];
      newInputs[2].value = value;
    } else if (titlePick === 'Pick cost type') {
      const newInputs = [...inputsExpense];
      newInputs[0].value = value;
    } else {
      const newInputs = [...inputsExpense];
      newInputs[2].value = value;
    }
  };

  //Handlefilter
  const [selectedDateStart, setSelectedDateStart] = useState('');
  const [selectedDateEnd, setSelectedDateEnd] = useState('');
  const [selectedDateIncome, setSelectedDateIncome] = useState('');
  const [selectedDateExpense, setSelectedDateExpense] = useState('');
  const [status, setStatus] = useState('');
  const [isModalPickDate, setIsModalPickDate] = useState(false);
  const handlePickDate = (text: string) => () => {
    setIsModalPickDate(true);
    setStatus(text);
  };
  const handleReload = () => {
    setSelectedDateStart('');
    setSelectedDateEnd('');
  };

  // Add income / expense
  const [isModalSuccess, setIsModalSuccess] = useState(false);
  const [titleHeader, setTitleHeader] = useState('');
  const [titleBody, setTitleBody] = useState('');
  const [isModalLoading, setIsModalLoading] = useState(false);
  const handleAdd = (text: string) => {
    if (text === 'income') {
      setIsModalLoading(true);
      function convertToKilograms(quantity: number, unit: string) {
        switch (unit) {
          case 'Gram':
            return quantity / 1000; // 1 gram = 0.001 kilogram
          case 'Quintal':
            return quantity * 100; // 1 quintal = 100 kilograms
          case 'Ton':
            return quantity * 1000; // 1 ton = 1000 kilograms
          default:
            return quantity;
        }
      }
      try {
        const userid = auth().currentUser?.uid;
        const time = new Date().getTime();
        const date = selectedDateIncome;
        const tree = inputs[0].value;
        const quantity = Number(inputs[1].value);
        const unit = inputs[2].value;
        const totalPrice = Number(inputs[3].value);
        const quantityInKilograms = convertToKilograms(quantity, unit);
        let month = date.slice(5, 7);
        switch (month) {
          case '01':
            month = 'Jan.';
            break;
          case '02':
            month = 'Feb.';
            break;
          case '03':
            month = 'Mar.';
            break;
          case '04':
            month = 'Apr.';
            break;
          case '05':
            month = 'May.';
            break;
          case '06':
            month = 'Jun.';
            break;
          case '07':
            month = 'Jul.';
            break;
          case '08':
            month = 'Aug.';
            break;
          case '09':
            month = 'Sep.';
            break;
          case '10':
            month = 'Oct.';
            break;
          case '11':
            month = 'Nov.';
            break;
          case '12':
            month = 'Dec.';
            break;
          default:
            month = 'Jan.';
        }
        const day = date.slice(8, 10);
        firestore()
          .collection('incomes')
          .doc(userid)
          .collection('income')
          .add({
            unit,
            month,
            day,
            date,
            time,
            tree,
            quantityInKilograms,
            totalPrice,
          })
          .then(() => {
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
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsModalLoading(true);
      try {
        const userid = auth().currentUser?.uid;
        const time = new Date().getTime();
        const date = selectedDateExpense;
        const costType = inputs[0].value;
        const quantity = Number(inputs[1].value);
        const unit = inputs[2].value.toLowerCase();
        const totalPrice = Number(inputs[3].value);
        let month = date.slice(5, 7);
        switch (month) {
          case '01':
            month = 'Jan.';
            break;
          case '02':
            month = 'Feb.';
            break;
          case '03':
            month = 'Mar.';
            break;
          case '04':
            month = 'Apr.';
            break;
          case '05':
            month = 'May.';
            break;
          case '06':
            month = 'Jun.';
            break;
          case '07':
            month = 'Jul.';
            break;
          case '08':
            month = 'Aug.';
            break;
          case '09':
            month = 'Sep.';
            break;
          case '10':
            month = 'Oct.';
            break;
          case '11':
            month = 'Nov.';
            break;
          case '12':
            month = 'Dec.';
            break;
          default:
            month = 'Jan.';
        }
        const day = date.slice(8, 10);
        firestore()
          .collection('expenses')
          .doc(userid)
          .collection('expense')
          .add({
            month,
            day,
            date,
            time,
            costType,
            quantity,
            unit,
            totalPrice,
          })
          .then(() => {
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
          });
      } catch (error) {
        console.log(error);
      }
    }
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
  if (!selectedDateStart && !selectedDateEnd) {
    React.useEffect(() => {
      const subscriber = firestore()
        .collection('incomes')
        .doc(auth().currentUser?.uid)
        .collection('income')
        .orderBy('time', 'desc')
        .onSnapshot(querySnapshot => {
          const incomes: any = [];
          querySnapshot.forEach(documentSnapshot => {
            incomes.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          const validIncomes = incomes.filter(
            (income: { totalPrice: number }) => {
              return !isNaN(income.totalPrice) && income.totalPrice >= 0;
            },
          );

          const totalSumIncome = validIncomes.reduce(
            (accumulator: any, income: { totalPrice: number }) => {
              return accumulator + income.totalPrice;
            },
            0,
          );
          setDataIncome(incomes);
          setTotalIncome(totalSumIncome);
        });
      return () => subscriber();
    }, [selectedDateEnd, selectedDateStart, totalIncome]);
  } else if (!selectedDateStart && selectedDateEnd) {
    React.useEffect(() => {
      const subscriber = firestore()
        .collection('incomes')
        .doc(auth().currentUser?.uid)
        .collection('income')
        .where('date', '<=', selectedDateEnd)
        .onSnapshot(querySnapshot => {
          const incomes: any = [];
          querySnapshot.forEach(documentSnapshot => {
            incomes.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          const validIncomes = incomes.filter(
            (income: { totalPrice: number }) => {
              return !isNaN(income.totalPrice) && income.totalPrice >= 0;
            },
          );

          const totalSumIncome = validIncomes.reduce(
            (accumulator: any, income: { totalPrice: number }) => {
              return accumulator + income.totalPrice;
            },
            0,
          );
          setDataIncome(incomes);
          setTotalIncome(totalSumIncome);
        });
      return () => subscriber();
    }, [selectedDateEnd, selectedDateStart, totalIncome]);
  } else if (selectedDateStart && !selectedDateEnd) {
    React.useEffect(() => {
      const subscriber = firestore()
        .collection('incomes')
        .doc(auth().currentUser?.uid)
        .collection('income')
        .where('date', '>=', selectedDateStart)
        .onSnapshot(querySnapshot => {
          const incomes: any = [];
          querySnapshot.forEach(documentSnapshot => {
            incomes.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          const validIncomes = incomes.filter(
            (income: { totalPrice: number }) => {
              return !isNaN(income.totalPrice) && income.totalPrice >= 0;
            },
          );

          const totalSumIncome = validIncomes.reduce(
            (accumulator: any, income: { totalPrice: number }) => {
              return accumulator + income.totalPrice;
            },
            0,
          );
          setDataIncome(incomes);
          setTotalIncome(totalSumIncome);
        });
      return () => subscriber();
    }, [selectedDateEnd, selectedDateStart, totalIncome]);
  } else {
    React.useEffect(() => {
      const subscriber = firestore()
        .collection('incomes')
        .doc(auth().currentUser?.uid)
        .collection('income')
        .where('date', '>=', selectedDateStart)
        .where('date', '<=', selectedDateEnd)
        .onSnapshot(querySnapshot => {
          const incomes: any = [];
          querySnapshot.forEach(documentSnapshot => {
            incomes.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
          const validIncomes = incomes.filter(
            (income: { totalPrice: number }) => {
              return !isNaN(income.totalPrice) && income.totalPrice >= 0;
            },
          );

          const totalSumIncome = validIncomes.reduce(
            (accumulator: any, income: { totalPrice: number }) => {
              return accumulator + income.totalPrice;
            },
            0,
          );
          setDataIncome(incomes);
          setTotalIncome(totalSumIncome);
        });
      return () => subscriber();
    }, [selectedDateEnd, selectedDateStart, totalIncome]);
  }
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1, width: '100%', height: '100%' }}>
        <HeaderComponent onPress={() => navigation.navigate('Profile')} />
        <ScrollView style={{ flex: 1, marginTop: 16 }}>
          {/* Filter */}
          <View style={stylesFilter.root}>
            <FilterComponent
              onPress={handlePickDate('startDate')}
              titleDate={selectedDateStart}
              isRight={true}
            />
            <View style={{ width: 8 }} />
            <FilterComponent
              onPress={handlePickDate('endDate')}
              titleDate={selectedDateEnd}
              isRight={false}
            />
            <View style={{ width: 8 }} />
            <TouchableOpacity
              style={stylesButtonReload.root}
              onPress={handleReload}>
              <IconSwitch />
            </TouchableOpacity>
          </View>
          {/* End filter */}
          {/* GeneralStatistics */}
          <GeneralStatistics
            totalIncome={totalIncome}
            totalExpense={totalExpense}
            totalProfit={totalProfit}
          />
          {/* End GeneralStatistics */}

          {/* Button Add */}
          <View style={stylesFilter.root}>
            <ButtonAddComponent
              onPress={handleModalAddIncome}
              title="Icome"
              isRight={false}
            />
            <View style={{ width: 8 }} />
            <ButtonAddComponent
              onPress={handleModalAddExpense}
              title="Expense"
              isRight={true}
            />
          </View>
          {/* End button add */}
          {/* History */}
          <HistoryComponent
            data={dataIncome}
            title="Income history"
            isIncome={true}
          />
          <HistoryComponent
            data={dataExpense}
            title="Expense history"
            isIncome={false}
          />
          {/* End history */}
        </ScrollView>

        {/* Modal pick date */}
        <PickDate
          isVisible={isModalPickDate}
          onBackdropPress={() => setIsModalPickDate(false)}>
          <StatusBar backgroundColor={'#07111B'} />
          <PickDate.Container>
            <PickDate.Body>
              <DatePicker
                onSelectedChange={date => {
                  if (status === 'startDate') {
                    setSelectedDateStart(date);
                  } else if (status === 'endDate') {
                    setSelectedDateEnd(date);
                  } else if (status === 'incomeDate') {
                    setSelectedDateIncome(date);
                  } else {
                    setSelectedDateExpense(date);
                  }
                  // setIsModalPickDate(false);
                }}
                mode="calendar"
                options={{
                  textHeaderColor: COLORS.blue,
                  textDefaultColor: COLORS.blue,
                  selectedTextColor: '#fff',
                  mainColor: COLORS.blue,
                  textSecondaryColor: COLORS.text2,
                  defaultFont: 'Nunito-SemiBold',
                }}
                selected={
                  status === 'startDate'
                    ? selectedDateStart
                    : status === 'endDate'
                    ? selectedDateEnd
                    : status === 'incomeDate'
                    ? selectedDateIncome
                    : selectedDateExpense
                }
                selectorStartingYear={2020}
              />
            </PickDate.Body>
          </PickDate.Container>
        </PickDate>
        {/* End modal pick date */}

        {/* Modal add */}
        <ModalInsert isVisible={isModaAdd} isPick={false}>
          <StatusBar backgroundColor={'#07111B'} />
          <View style={{ flex: 1 }}>
            <ModalInsert.Container>
              <ModalInsert.Header>
                <View style={styles.headSessionModal}>
                  <TouchableOpacity onPress={handleHideModalAdd}>
                    <IconBack> </IconBack>
                  </TouchableOpacity>
                  <View style={styles.txtContainer}>
                    {titleModalAdd === 'Add income' ? (
                      <Text style={styles.txtTitleModal1}>Add income</Text>
                    ) : (
                      <Text style={styles.txtTitleModal2}>Add expense</Text>
                    )}
                  </View>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                    }}
                  />
                </View>
              </ModalInsert.Header>
              <ScrollView>
                <ModalInsert.Body>
                  <View style={styles.inputSession}>
                    {titleModalAdd === 'Add income' ? (
                      <TouchableOpacity
                        style={stylesPickDate.root}
                        onPress={handlePickDate('incomeDate')}>
                        <Text style={stylesPickDate.textDay}>
                          {selectedDateIncome}
                        </Text>
                        <View style={{ width: 8 }} />
                        <IconCalendar />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={stylesPickDate.root}
                        onPress={handlePickDate('expenseDate')}>
                        <Text style={stylesPickDate.textDay}>
                          {selectedDateExpense}
                        </Text>
                        <View style={{ width: 8 }} />
                        <IconCalendar />
                      </TouchableOpacity>
                    )}

                    <View style={{ height: 8 }} />
                    {inputs.map((input, index) => (
                      <View key={index}>
                        {titleModalAdd === 'Add income' ? (
                          <Input
                            onPress={
                              input.label === 'Tree'
                                ? handleModalPickTree
                                : input.label === 'Unit'
                                ? handleModalPickUnitIncome
                                : () => {}
                            }
                            label={input.label}
                            textPlaceholder={
                              input.label === 'Tree' || input.label === 'Unit'
                                ? `Choose ${input.label.toLowerCase()}`
                                : `Enter your ${input.label.toLowerCase()}`
                            }
                            value={input.value}
                            onChangeText={(text: string) =>
                              handleInputChange(index, text)
                            }
                            dropDown={
                              input.label === 'Tree' || input.label === 'Unit'
                            }
                            iconDolar={input.label === 'Total price'}
                            textError={input.error}
                            keyboardType={
                              input.label === 'Quantity' ||
                              input.label === 'Total price'
                                ? 'numeric'
                                : 'default'
                            }
                            span="*"
                            editable={
                              input.label === 'Tree' || input.label === 'Unit'
                                ? false
                                : true
                            }
                          />
                        ) : (
                          <Input
                            onPress={
                              input.label === 'Cost type'
                                ? handleModalPickCostType
                                : input.label === 'Unit'
                                ? handleModalPickUnitExpense
                                : () => {}
                            }
                            label={input.label}
                            textPlaceholder={
                              input.label === 'Cost type' ||
                              input.label === 'Unit'
                                ? `Choose ${input.label.toLowerCase()}`
                                : `Enter your ${input.label.toLowerCase()}`
                            }
                            value={input.value}
                            onChangeText={(text: string) =>
                              handleInputChange(index, text)
                            }
                            dropDown={
                              input.label === 'Cost type' ||
                              input.label === 'Unit'
                            }
                            iconDolar={input.label === 'Total price'}
                            textError={input.error}
                            keyboardType={
                              input.label === 'Quantity' ||
                              input.label === 'Total price'
                                ? 'numeric'
                                : 'default'
                            }
                            span="*"
                            editable={
                              input.label === 'Cost type' ||
                              input.label === 'Unit'
                                ? false
                                : true
                            }
                          />
                        )}
                      </View>
                    ))}
                  </View>
                  {titleModalAdd === 'Add income' && isDisabled === false ? (
                    <TouchableOpacity
                      style={styles.btnSendSession1}
                      onPress={() => handleAdd('income')}>
                      <View style={styles.txtBtnSignup}>
                        <IconSave />
                        <View style={{ width: 16 }} />
                        <Text
                          style={{
                            fontSize: 16,
                            textAlign: 'center',
                            color: '#FFFFFF',
                            fontFamily: 'Nunito-Bold',
                          }}>
                          SAVE
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : titleModalAdd === 'Add expense' &&
                    isDisabled === false ? (
                    <TouchableOpacity
                      style={styles.btnSendSession2}
                      onPress={() => handleAdd('expense')}>
                      <View style={styles.txtBtnSignup}>
                        <IconSave />
                        <View style={{ width: 16 }} />
                        <Text
                          style={{
                            fontSize: 16,
                            textAlign: 'center',
                            color: '#FFFFFF',
                            fontFamily: 'Nunito-Bold',
                          }}>
                          SAVE
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.btnSendSession3}>
                      <View style={styles.txtBtnSignup}>
                        <IconSave />
                        <View style={{ width: 16 }} />
                        <Text
                          style={{
                            fontSize: 16,
                            textAlign: 'center',
                            color: '#FFFFFF',
                            fontFamily: 'Nunito-Bold',
                          }}>
                          SAVE
                        </Text>
                      </View>
                    </View>
                  )}
                </ModalInsert.Body>
              </ScrollView>
            </ModalInsert.Container>
          </View>
        </ModalInsert>
        {/* End modal add */}

        {/* Modal pick */}
        <ModalInsert isVisible={isModalPick}>
          <StatusBar backgroundColor={'#010508'} />
          <ModalInsert.Container isPick={true}>
            <ModalInsert.Header>
              <View style={styles.headSessionModal}>
                <TouchableOpacity onPress={handleModalPickHide}>
                  <IconBack> </IconBack>
                </TouchableOpacity>
                <View style={styles.txtContainer}>
                  <Text style={styles.txtTitleModal}>{titlePick}</Text>
                </View>
                <View
                  style={{
                    width: 40,
                    height: 40,
                  }}
                />
              </View>
            </ModalInsert.Header>

            <ScrollView>
              <ModalInsert.Body isPick={true}>
                <RadioButton.Group
                  onValueChange={value => hanleHideModalPick(value, titlePick)}
                  value={valuePick}>
                  {titlePick === 'Pick tree' ? (
                    trees.map((tree, index) => (
                      <RadioButton.Item
                        color={COLORS.blue}
                        label={tree.name}
                        value={tree.name}
                      />
                    ))
                  ) : titlePick === 'Pick unit income' ? (
                    unitsIncome.map((unit, index) => (
                      <RadioButton.Item
                        color={COLORS.blue}
                        label={unit.name}
                        value={unit.name}
                      />
                    ))
                  ) : titlePick === 'Pick cost type' ? (
                    costTypes.map((costType, index) => (
                      <RadioButton.Item
                        color={COLORS.blue}
                        label={costType.name}
                        value={costType.name}
                      />
                    ))
                  ) : titlePick === 'Pick unit expense' ? (
                    unitsExpense.map((unit, index) => (
                      <RadioButton.Item
                        color={COLORS.blue}
                        label={unit.name}
                        value={unit.name}
                      />
                    ))
                  ) : (
                    <></>
                  )}
                </RadioButton.Group>
              </ModalInsert.Body>
            </ScrollView>
          </ModalInsert.Container>
        </ModalInsert>
        {/* End modal pick */}

        {/* Pop up noti and loading */}
        <PopUpSuccess
          isModalSuccess={isModalSuccess}
          titleHeader={titleHeader}
          titleBody={titleBody}
        />
        <PopUpLoading isModalSuccess={isModalLoading} />
        {/* End up noti and loading */}
      </ImageBackground>
    </SafeAreaView>
  );
};

const stylesFilter = StyleSheet.create({
  root: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
  },
});

const stylesButtonReload = StyleSheet.create({
  root: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#163859',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const stylesPickDate = StyleSheet.create({
  root: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  textDay: {
    color: COLORS.text1,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
  },
});

export default Statistics;
