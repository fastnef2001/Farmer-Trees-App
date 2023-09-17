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
  const [isModalExpense, setIsModalExpense] = useState(false);
  const [inputs, setInputs] = useState([
    { label: 'Tree', value: '', error: '' },
    { label: 'Quantity', value: '', error: '' },
    { label: 'Unit', value: '', error: '' },
    { label: 'Total price', value: '', error: '' },
  ]);
  const handleModalExpense = () => {
    setIsModalExpense(!isModalExpense);
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
      const res = await firestore().collection('unit').get();
      const data: any = [];
      res.forEach((doc: { data: () => any; id: any }) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setUnit(data);
      console.log(data);
    };
    fetchData();
  }, []);

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

      <ModalInsert isVisible={isModalExpense}>
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
