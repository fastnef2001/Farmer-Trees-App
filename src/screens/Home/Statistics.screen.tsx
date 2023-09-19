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

  //Handle button add
  const [isModalncome, setisModalncome] = useState(false);
  const [inputs, setInputs] = useState([
    { label: 'Tree', value: '', error: '' },
    { label: 'Quantity', value: '', error: '' },
    { label: 'Unit', value: '', error: '' },
    { label: 'Total price', value: '', error: '' },
  ]);
  const handleModalExpense = () => {
    setisModalncome(!isModalncome);
  };
  const handleInputChange = (index: any, value: any) => {
    const newInputs = [...inputs];
    newInputs[index].value = value;
    newInputs[index].error = '';
    setInputs(newInputs);
  };
  const handleAddIncome = () => {
    const newInputs = [...inputs];
    newInputs.forEach((input, index) => {
      if (input.value === '') {
        newInputs[index].error = `Please enter ${input.label}`;
      }
    });
  };

  interface Unit {
    [x: string]: string;
    name: string;
  }
  const [units, setUnit] = useState<Unit[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const res = await firestore().collection('units').get();
      const data: any = [];
      res.forEach((doc: { data: () => any; id: any }) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setUnit(data);
      console.log(data);
    };
    fetchData();
  }, []);

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
  };

  //Pick unit
  const [isModalPickUnit, setIsModalPickUnit] = useState(false);
  const handleModalPickUnit = () => {
    setIsModalPickUnit(!isModalPickUnit);
  };
  const [valueUnit, setValueUnit] = React.useState('');
  const hanleHideModalPicklUnit = (valueUnit: string) => {
    setIsModalPickUnit(false);
    setValueUnit(valueUnit);
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
            onPress={handleModalExpense}
            title="Icome"
            isRight={false}
          />
          <View style={{ width: 8 }} />
          <ButtonAddComponent
            onPress={handlePickDate(true)}
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

      {/* Add income */}

      <ModalInsert isVisible={isModalncome} isPick={false}>
        <StatusBar backgroundColor={'#07111B'} />
        <View style={{ flex: 1 }}>
          <ModalInsert.Container>
            <ModalInsert.Header>
              <View style={styles.headSessionModal}>
                <TouchableOpacity onPress={handleModalExpense}>
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
                        value={
                          input.label === 'Tree'
                            ? valueTree
                            : input.label === 'Unit'
                            ? valueUnit
                            : input.value
                        }
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
                    // key={index}
                    // nameTree={tree.name}
                    // numberTree={tree.quanlity}
                    // urlImage={tree.imageUrl}
                    // onPressDelete={() => handleModalDelete(tree.key)}
                    // caculate={true}
                    // onPressEdit={() => handleModalEditTree(tree.key)}
                  />
                ))}
              </RadioButton.Group>
            </ModalInsert.Body>
          </ScrollView>
        </ModalInsert.Container>
      </ModalInsert>

      {/* Add expense */}
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

export default Statistics;
