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
} from 'react-native';
import auth from '@react-native-firebase/auth';
import GeneralStatistics from '../../components/Statistics/GeneralStatistics.component';
import HeaderComponent from '../../components/Header/Header.component';
import FilterComponent from '../../components/Statistics/Filter.component';
import ButtonAddComponent from '../../components/Statistics/ButtonAdd.component';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../theme/color';
import Detail from '../../assets/images/Detail.svg';
import IconDetailBold from '../../assets/images/IconDetailBold.svg';
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
  const newInputs = [...inputs];
  useEffect(() => {
    // Kiểm tra giá trị của inputs khi inputs thay đổi
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
  const handleAdd = (text: string) => {
    if (text === 'income') {
      console.log('inputsIncome');
    } else {
      console.log('inputsExpense');
    }
  };
  // // Add income
  // const handleAddIncome = () => {
  //   console.log('inputsIncome');
  //   // const treeNameInput = inputsIncome.find(input => input.label === 'Tree');
  //   // const quanlityInput = inputsIncome.find(
  //   //   input => input.label === 'Quantity',
  //   // );
  //   // const unitInput = inputsIncome.find(input => input.label === 'Unit');
  //   // const totalPriceInput = inputsIncome.find(
  //   //   input => input.label === 'Total price',
  //   // );
  //   // const userid = auth().currentUser?.uid;
  //   // const date = selectedDateIncome;
  //   // const time = new Date().getTime();

  //   // if (
  //   //   !treeNameInput?.value ||
  //   //   !quanlityInput?.value ||
  //   //   !unitInput?.value ||
  //   //   !totalPriceInput?.value
  //   // ) {
  //   //   setInputsIncome(
  //   //     inputsIncome.map(input => ({
  //   //       ...input,
  //   //       error: !input.value ? `Please enter ${input.label}` : '',
  //   //     })),
  //   //   );
  //   //   return;
  //   // }
  //   // try {
  //   //   const tree = treeNameInput?.value;
  //   //   const quantity = Number(quanlityInput?.value);
  //   //   const unit = unitInput?.value;
  //   //   const total = Number(totalPriceInput?.value);
  //   //   firestore()
  //   //     .collection('incomes')
  //   //     .doc(userid)
  //   //     .collection('income')
  //   //     .add({
  //   //       date,
  //   //       time,
  //   //       tree,
  //   //       quantity,
  //   //       unit,
  //   //       total,
  //   //     })
  //   //     .then(() => {
  //   //       console.log('User added!');
  //   //     });
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  // };
  // // Add expense
  // const handleAddExpense = () => {
  //   console.log('inputsExpense');
  // };

  //Modal income
  // const [isModalPickDate1, setIsModalPickDate1] = useState(false);
  // const [isIncome, setIsIncome] = useState(false);

  // const [isModalncome, setisModalncome] = useState(false);

  // const handleModalIncome = () => {
  //   setisModalncome(!isModalncome);
  //   const newInputs = [...inputsIncome];
  //   newInputs.forEach((input, index) => {
  //     newInputs[index].value = '';
  //     newInputs[index].error = '';
  //   });
  // };
  // const handleInputChange = (index: any, value: any) => {
  //   const newInputs = [...inputsIncome];
  //   newInputs[index].value = value;
  //   newInputs[index].error = '';
  //   setInputsIncome(newInputs);
  // };

  // const handlePickDate1 = (isIncomeDate: boolean) => () => {
  //   setIsModalPickDate1(true);
  //   setIsIncome(isIncomeDate);
  // };
  // Modal Expense
  // const [expenseDate, setExpenseDate] = useState('');
  // const [ishandleModalExpense, setishandleModalExpense] = useState(false);
  // const handleModalExpense = () => {
  //   setishandleModalExpense(!ishandleModalExpense);
  //   setExpenseDate(timeNow);
  //   const newInputs = [...inputsExpense];
  //   newInputs.forEach((input, index) => {
  //     newInputs[index].value = '';
  //     newInputs[index].error = '';
  //   });
  // };
  // const handleInputChangeExpense = (index: any, value: any) => {
  //   const newInputsExpense = [...inputsExpense];
  //   newInputsExpense[index].value = value;
  //   newInputsExpense[index].error = '';
  //   setInputsExpense(newInputsExpense);
  // };
  // const handleAddExpense = () => {
  //   const newInputsExpense = [...inputsExpense];
  //   newInputsExpense.forEach((input, index) => {
  //     if (input.value === '') {
  //       newInputsExpense[index].error = `Please enter ${input.label}`;
  //     }
  //   });
  // };
  //Cost type
  // const [valueCostType, setValueCostType] = React.useState('');
  // const hanleHideModalPickCostTypes = (valueCostType: string) => {
  //   console.log('valueCostType', valueCostType);
  //   setIsModalPickCostType(false);
  //   setValueCostType(valueCostType);
  //   const newInputs = [...inputsExpense];
  //   newInputs[0].value = valueCostType;
  // };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderComponent onPress={() => navigation.navigate('Profile')} />
      <ScrollView style={{ flex: 1 }}>
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
      </ScrollView>

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

      {/* <PickDate
        isVisible={isModalPickDate1}
        onBackdropPress={() => setIsModalPickDate1(false)}>
        <StatusBar backgroundColor={'#07111B'} />
        <PickDate.Container>
          <PickDate.Body>
            <DatePicker
              onSelectedChange={date => {
                if (isIncome) {
                  setIncomeDate(date);
                } else {
                  setExpenseDate(date);
                }
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
              selected={isIncome ? incomeDate : selectedDateEnd}
              selectorStartingYear={2020}
            />
          </PickDate.Body>
        </PickDate.Container>
      </PickDate> */}

      {/* Add income */}
      {/* <ModalInsert isVisible={isModalncome} isPick={false}>
        <StatusBar backgroundColor={'#07111B'} />
        <View style={{ flex: 1 }}>
          <ModalInsert.Container>
            <ModalInsert.Header>
              <View style={styles.headSessionModal}>
                <TouchableOpacity onPress={handleModalIncome}>
                  <IconBack> </IconBack>
                </TouchableOpacity>
                <View style={styles.txtContainer}>
                  <Text style={styles.txtTitleModal1}>Add income</Text>
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
                  <TouchableOpacity
                    style={stylesPickDate.root}
                    onPress={handlePickDate1(true)}>
                    <Text style={stylesPickDate.textDay}>{incomeDate}</Text>
                    <View style={{ width: 8 }} />
                    <IconCalendar />
                  </TouchableOpacity>
                  <View style={{ height: 8 }} />
                  {inputsIncome.map((input, index) => (
                    <View key={index}>
                      <Input
                        onPress={
                          input.label === 'Tree'
                            ? handleModalPickTree
                            : input.label === 'Unit'
                            ? handleModalPickUnit
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
                    </View>
                  ))}
                </View>
                <TouchableOpacity
                  style={styles.btnSendSession1}
                  onPress={handleAddIncome}>
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
              </ModalInsert.Body>
            </ScrollView>
          </ModalInsert.Container>
        </View>
      </ModalInsert> */}
      {/* End income */}

      {/* Add expense */}

      {/* <ModalInsert isVisible={ishandleModalExpense} isPick={false}>
        <StatusBar backgroundColor={'#07111B'} />
        <View style={{ flex: 1 }}>
          <ModalInsert.Container>
            <ModalInsert.Header>
              <View style={styles.headSessionModal}>
                <TouchableOpacity onPress={handleModalExpense}>
                  <IconBack> </IconBack>
                </TouchableOpacity>
                <View style={styles.txtContainer}>
                  <Text style={styles.txtTitleModal2}>Add expense</Text>
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
                  <TouchableOpacity
                    style={stylesPickDate.root}
                    onPress={handlePickDate1(false)}>
                    <Text style={stylesPickDate.textDay}>{expenseDate}</Text>
                    <View style={{ width: 8 }} />
                    <IconCalendar />
                  </TouchableOpacity>
                  {inputsExpense.map((input, index) => (
                    <View key={index}>
                      <Input
                        onPress={
                          input.label === 'Cost type'
                            ? handleModalPickCostType
                            : input.label === 'Unit'
                            ? handleModalPickUnit
                            : () => {}
                        }
                        label={input.label}
                        textPlaceholder={
                          input.label === 'Cost type' || input.label === 'Unit'
                            ? `Choose ${input.label.toLowerCase()}`
                            : `Enter your ${input.label.toLowerCase()}`
                        }
                        value={input.label === 'Unit' ? valueUnit : input.value}
                        onChangeText={(text: string) =>
                          handleInputChangeExpense(index, text)
                        }
                        dropDown={
                          input.label === 'Cost type' || input.label === 'Unit'
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
                          input.label === 'Cost type' || input.label === 'Unit'
                            ? false
                            : true
                        }
                      />
                    </View>
                  ))}
                </View>
                <TouchableOpacity
                  style={styles.btnSendSession2}
                  onPress={handleAddExpense}>
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
              </ModalInsert.Body>
            </ScrollView>
          </ModalInsert.Container>
        </View>
      </ModalInsert> */}

      {/* <ModalInsert isVisible={isModalPickCostType}>
        <StatusBar backgroundColor={'#010508'} />
        <ModalInsert.Container isPick={true}>
          <ModalInsert.Header>
            <View style={styles.headSessionModal}>
              <TouchableOpacity onPress={handleModalPickCostType}>
                <IconBack> </IconBack>
              </TouchableOpacity>
              <View style={styles.txtContainer}>
                <Text style={styles.txtTitleModal}>Pick unit</Text>
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
                onValueChange={value => hanleHideModalPickCostTypes(value)}
                value={valueCostType}>
                {costTypes.map((costType, index) => (
                  <RadioButton.Item
                    color={COLORS.blue}
                    label={costType.name}
                    value={costType.name}
                  />
                ))}
              </RadioButton.Group>
            </ModalInsert.Body>
          </ScrollView>
        </ModalInsert.Container>
      </ModalInsert> */}

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
                ) : titleModalAdd === 'Add expense' && isDisabled === false ? (
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
    </SafeAreaView>
  );
};

const stylesFilter = StyleSheet.create({
  root: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 16,
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
