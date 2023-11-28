import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Modal } from './Modal';
import { StatusBar } from 'react-native';
import { ModalLoading } from './ModalLoading';
import {
  ButtonBack,
  ButtonDelete,
  ButtonLogin,
  ButtonChatAI,
} from '../../components/Button/Button';

export type PopUpSuccessProps = {
  isModalSuccess: boolean;
  titleHeader: string;
  titleBody: string;
  handleFunction: any;
  handleModalSuccess: () => void;
  title?: string;
};

export type PopUpLoadingProps = {
  isModalVisible: boolean;
};

export const PopUpSuccess = ({
  isModalSuccess,
  titleHeader,
  titleBody,
  handleFunction,
  handleModalSuccess,
  title,
}: PopUpSuccessProps) => {
  return (
    <>
      <Modal isVisible={isModalSuccess} onBackdropPress={handleModalSuccess}>
        <StatusBar backgroundColor={'#07111B'} />
        <Modal.Container>
          <Modal.Header title={titleHeader} />
          <Modal.Body title={titleBody} />
          {title ? (
            <Modal.Footer>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 8,
                }}>
                <ButtonBack title="CANCEL" onPress={handleModalSuccess} />
                <View style={{ width: 16 }} />
                {title === 'login' ? (
                  <ButtonLogin title="LOGIN" onPress={handleFunction} />
                ) : title === 'delete' ? (
                  <ButtonDelete title="DELETE" onPress={handleFunction} />
                ) : title === 'payment' ? (
                  <ButtonChatAI title="CHAT AI" onPress={handleFunction} />
                ) : null}
              </View>
            </Modal.Footer>
          ) : null}
        </Modal.Container>
      </Modal>
    </>
  );
};

export const PopUpLoading = ({ isModalVisible }: PopUpLoadingProps) => {
  return (
    <>
      <ModalLoading isVisible={isModalVisible}>
        <StatusBar backgroundColor={'#07111B'} />
        <SafeAreaView>
          <ModalLoading.Container />
        </SafeAreaView>
      </ModalLoading>
    </>
  );
};
