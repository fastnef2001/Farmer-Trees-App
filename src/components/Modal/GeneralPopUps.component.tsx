import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { COLORS } from '../../theme/color';
import { Modal } from './Modal';
import { StatusBar } from 'react-native';
import { ModalLoading } from './ModalLoading';

export type PopUpSuccessProps = {
  //   onPress: () => void;
  //   titleDate?: string;
  //   isRight?: boolean;
  isModalSuccess: boolean;
  titleHeader: string;
  titleBody: string;
};

export type PopUpLoadingProps = {
  isModalSuccess: boolean;
};

export const PopUpSuccess = ({
  isModalSuccess,
  titleHeader,
  titleBody,
}: PopUpSuccessProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    setModalVisible(isModalSuccess);
  }, [isModalSuccess]);

  return (
    <>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <StatusBar backgroundColor={'#07111B'} />
        <Modal.Container>
          <Modal.Header title={titleHeader} />
          <Modal.Body title={titleBody} />
        </Modal.Container>
      </Modal>
    </>
  );
};

export const PopUpLoading = ({ isModalSuccess }: PopUpLoadingProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    setModalVisible(isModalSuccess);
  }, [isModalSuccess]);

  return (
    <>
      <ModalLoading isVisible={isModalVisible}>
        <StatusBar backgroundColor={'#010508'} />
        <SafeAreaView>
          <ModalLoading.Container />
        </SafeAreaView>
      </ModalLoading>
    </>
  );
};
