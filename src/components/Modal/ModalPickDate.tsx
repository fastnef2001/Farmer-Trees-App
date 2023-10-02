import React from 'react';
import { PickDate } from './PickDate';
import { StatusBar } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import { COLORS } from '../../theme/color';

export type ModalPickDateProps = {
  isModalPickDate: boolean;
  setIsModalPickDate: React.Dispatch<React.SetStateAction<boolean>>;
  status: string;
  setSelectedDateStart: React.Dispatch<React.SetStateAction<string>>;
  setSelectedDateEnd: React.Dispatch<React.SetStateAction<string>>;
  setSelectedDateIncome: React.Dispatch<React.SetStateAction<string>>;
  setSelectedDateExpense: React.Dispatch<React.SetStateAction<string>>;
  selectedDateStart: string;
  selectedDateEnd: string;
  selectedDateIncome: string;
  selectedDateExpense: string;
};

export const ModalPickDate = ({
  isModalPickDate,
  setIsModalPickDate,
  status,
  setSelectedDateStart,
  setSelectedDateEnd,
  setSelectedDateIncome,
  setSelectedDateExpense,
  selectedDateStart,
  selectedDateEnd,
  selectedDateIncome,
  selectedDateExpense,
}: ModalPickDateProps) => {
  return (
    <>
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
    </>
  );
};
