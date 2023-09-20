/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
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
  //Handlefilter
  const [selectedDateStart, setSelectedDateStart] = useState('');
  const [selectedDateEnd, setSelectedDateEnd] = useState('');
  const [isStart, setIsStart] = useState(false);
  const [isModalPickDate, setIsModalPickDate] = useState(false);
  const handlePickDate = (isStartDate: boolean) => () => {
    setIsModalPickDate(true);
    setIsStart(isStartDate);
  };
  const handleReload = () => {
    setSelectedDateStart('');
    setSelectedDateEnd('');
  };

  //Modal income
  const [isModalPickDate1, setIsModalPickDate1] = useState(false);
  const [isIncome, setIsIncome] = useState(false);
  const [incomeDate, setIncomeDate] = useState('');

  const dateNow = new Date().getDate();
  const monthNow = new Date().getMonth() + 1;
  const yearNow = new Date().getFullYear();
  const monthNow1 = monthNow < 10 ? `0${monthNow}` : monthNow;
  const timeNow = `${yearNow}/${monthNow1}/${dateNow}`;

  const [isModalncome, setisModalncome] = useState(false);
  const [inputs, setInputs] = useState([
    { label: 'Tree', value: '', error: '' },
    { label: 'Quantity', value: '', error: '' },
    { label: 'Unit', value: '', error: '' },
    { label: 'Total price', value: '', error: '' },
  ]);
  const handleModalIncome = () => {
    setisModalncome(!isModalncome);
    setIncomeDate(timeNow);
    const newInputs = [...inputs];
    newInputs.forEach((input, index) => {
      newInputs[index].value = '';
      newInputs[index].error = '';
    });
  };
  const handleInputChange = (index: any, value: any) => {
    const newInputs = [...inputs];
    newInputs[index].value = value;
    newInputs[index].error = '';
    setInputs(newInputs);
  };

  const handlePickDate1 = (isIncomeDate: boolean) => () => {
    setIsModalPickDate1(true);
    setIsIncome(isIncomeDate);
  };

  const handleAddIncome = () => {
    const treeNameInput = inputs.find(input => input.label === 'Tree');
    const quanlityInput = inputs.find(input => input.label === 'Quantity');
    const unitInput = inputs.find(input => input.label === 'Unit');
    const totalPriceInput = inputs.find(input => input.label === 'Total price');
    const userid = auth().currentUser?.uid;
    const date = incomeDate;
    const time = new Date().getTime();

    if (
      !treeNameInput?.value ||
      !quanlityInput?.value ||
      !unitInput?.value ||
      !totalPriceInput?.value
    ) {
      setInputs(
        inputs.map(input => ({
          ...input,
          error: !input.value ? `Please enter ${input.label}` : '',
        })),
      );
      return;
    }
    try {
      const tree = treeNameInput?.value;
      const quantity = Number(quanlityInput?.value);
      const unit = unitInput?.value;
      const total = Number(totalPriceInput?.value);
      firestore()
        .collection('incomes')
        .doc(userid)
        .collection('income')
        .add({
          date,
          time,
          tree,
          quantity,
          unit,
          total,
        })
        .then(() => {
          console.log('User added!');
        });
    } catch (error) {
      console.log(error);
    }
  };
  //Pick unitsTree
  interface Unit {
    [x: string]: string;
    name: string;
  }
  const [units, setUnit] = useState<Unit[]>([]);
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
      setUnit(data);
      console.log(data);
    };
    fetchData();
  }, []);
  const [isModalPickUnit, setIsModalPickUnit] = useState(false);
  const handleModalPickUnit = () => {
    setIsModalPickUnit(!isModalPickUnit);
  };
  const [valueUnit, setValueUnit] = React.useState('');
  const hanleHideModalPicklUnit = (valueUnit: string) => {
    setIsModalPickUnit(false);
    setValueUnit(valueUnit);
    const newInputs = [...inputs];
    newInputs[2].value = valueUnit;
  };

  //Pick tree
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
          console.log('treeProperties', trees);
        });
        setTrees(trees);
        console.log('trees', trees);
      });
    return () => subscriber();
  }, []);
  const [isModalPickTree, setIsModalPickTree] = useState(false);
  const handleModalPickTree = () => {
    setIsModalPickTree(!isModalPickTree);
  };
  const [valueTree, setValueTree] = React.useState('');
  const hanleHideModalPicklTree = (valueTree: string) => {
    setIsModalPickTree(false);
    setValueTree(valueTree);
    const newInputs = [...inputs];
    newInputs[0].value = valueTree;
  };

  // Modal Expense
  const [expenseDate, setExpenseDate] = useState('');
  const [ishandleModalExpense, setishandleModalExpense] = useState(false);
  const [inputsExpense, setInputsExpense] = useState([
    { label: 'Cost type', value: '', error: '' },
    { label: 'Quantity', value: '', error: '' },
    { label: 'Unit', value: '', error: '' },
    { label: 'Total price', value: '', error: '' },
  ]);
  const handleModalExpense = () => {
    setishandleModalExpense(!ishandleModalExpense);
    setExpenseDate(timeNow);
    const newInputs = [...inputsExpense];
    newInputs.forEach((input, index) => {
      newInputs[index].value = '';
      newInputs[index].error = '';
    });
  };
  const handleInputChangeExpense = (index: any, value: any) => {
    const newInputsExpense = [...inputs];
    newInputsExpense[index].value = value;
    newInputsExpense[index].error = '';
    setInputsExpense(newInputsExpense);
  };
  const handleAddExpense = () => {
    const newInputsExpense = [...inputs];
    newInputsExpense.forEach((input, index) => {
      if (input.value === '') {
        newInputsExpense[index].error = `Please enter ${input.label}`;
      }
    });
  };
  //Cost type
  interface costType {
    [x: string]: string;
    name: string;
  }
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
      console.log('costTypes', data);
    };
    fetchData();
  }, []);

  const [isModalPickCostType, setIsModalPickCostType] = useState(false);
  const handleModalPickCostType = () => {
    setIsModalPickCostType(!isModalPickCostType);
  };

  const [valueCostType, setValueCostType] = React.useState('');
  const hanleHideModalPickCostTypes = (valueCostType: string) => {
    console.log('valueCostType', valueCostType);
    setIsModalPickCostType(false);
    setValueCostType(valueCostType);
    const newInputs = [...inputsExpense];
    newInputs[0].value = valueCostType;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderComponent onPress={() => navigation.navigate('Profile')} />
      <ScrollView style={{ flex: 1 }}>
        {/* Filter */}
        <View style={stylesFilter.root}>
          <FilterComponent
            onPress={handlePickDate(true)}
            titleDate={selectedDateStart}
            isRight={true}
          />
          <View style={{ width: 8 }} />
          <FilterComponent
            onPress={handlePickDate(false)}
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
            onPress={handleModalIncome}
            title="Icome"
            isRight={false}
          />
          <View style={{ width: 8 }} />
          <ButtonAddComponent
            onPress={handleModalExpense}
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
                if (isStart) {
                  setSelectedDateStart(date);
                } else {
                  setSelectedDateEnd(date);
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
              selected={isStart ? selectedDateStart : selectedDateEnd}
              selectorStartingYear={2020}
            />
          </PickDate.Body>
        </PickDate.Container>
      </PickDate>

      <PickDate
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
      </PickDate>

      {/* Add income */}

      <ModalInsert isVisible={isModalncome} isPick={false}>
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
                  {inputs.map((input, index) => (
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
      </ModalInsert>

      <ModalInsert isVisible={isModalPickUnit}>
        <StatusBar backgroundColor={'#010508'} />
        <ModalInsert.Container isPick={true}>
          <ModalInsert.Header>
            <View style={styles.headSessionModal}>
              <TouchableOpacity onPress={handleModalPickUnit}>
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
                onValueChange={value => hanleHideModalPicklUnit(value)}
                value={valueUnit}>
                {units.map((unit, index) => (
                  <RadioButton.Item
                    color={COLORS.blue}
                    label={unit.name}
                    value={unit.name}
                  />
                ))}
              </RadioButton.Group>
            </ModalInsert.Body>
          </ScrollView>
        </ModalInsert.Container>
      </ModalInsert>

      <ModalInsert isVisible={isModalPickTree}>
        <StatusBar backgroundColor={'#010508'} />
        <ModalInsert.Container isPick={true}>
          <ModalInsert.Header>
            <View style={styles.headSessionModal}>
              <TouchableOpacity onPress={handleModalPickTree}>
                <IconBack> </IconBack>
              </TouchableOpacity>
              <View style={styles.txtContainer}>
                <Text style={styles.txtTitleModal}>Pick tree</Text>
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
                onValueChange={value => hanleHideModalPicklTree(value)}
                value={valueTree}>
                {trees.map((tree, index) => (
                  <RadioButton.Item
                    color={COLORS.blue}
                    label={tree.name}
                    value={tree.name}
                  />
                ))}
              </RadioButton.Group>
            </ModalInsert.Body>
          </ScrollView>
        </ModalInsert.Container>
      </ModalInsert>

      {/* Add expense */}

      <ModalInsert isVisible={ishandleModalExpense} isPick={false}>
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
      </ModalInsert>

      <ModalInsert isVisible={isModalPickCostType}>
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
      </ModalInsert>

      {/* <ModalInsert isVisible={isModalPickTree}>
        <StatusBar backgroundColor={'#010508'} />
        <ModalInsert.Container isPick={true}>
          <ModalInsert.Header>
            <View style={styles.headSessionModal}>
              <TouchableOpacity onPress={handleModalPickTree}>
                <IconBack> </IconBack>
              </TouchableOpacity>
              <View style={styles.txtContainer}>
                <Text style={styles.txtTitleModal}>Pick tree</Text>
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
                onValueChange={value => hanleHideModalPicklTree(value)}
                value={valueTree}>
                {trees.map((tree, index) => (
                  <RadioButton.Item
                    color={COLORS.blue}
                    label={tree.name}
                    value={tree.name}
                  />
                ))}
              </RadioButton.Group>
            </ModalInsert.Body>
          </ScrollView>
        </ModalInsert.Container>
      </ModalInsert> */}
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
