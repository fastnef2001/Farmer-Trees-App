import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Modal } from './Modal';
import { StatusBar } from 'react-native';
import { ModalLoading } from './ModalLoading';
import { ButtonBack, ButtonDelete } from '../../components/Button/Button';

export type PopUpSuccessProps = {
  isModalSuccess: boolean;
  titleHeader: string;
  titleBody: string;
  isFooter?: boolean;
  handleDeleteTree: () => void;
  handleModalSuccess: () => void;
};

export type PopUpLoadingProps = {
  isModalSuccess: boolean;
};

export const PopUpSuccess = ({
  isModalSuccess,
  titleHeader,
  titleBody,
  handleDeleteTree,
  isFooter = false,
  handleModalSuccess,
}: PopUpSuccessProps) => {
  const [isModalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    setModalVisible(isModalSuccess);
  }, [isModalSuccess]);

  return (
    <>
      <Modal isVisible={isModalVisible} onBackdropPress={handleModalSuccess}>
        <StatusBar backgroundColor={'#07111B'} />
        <Modal.Container>
          <Modal.Header title={titleHeader} />
          <Modal.Body title={titleBody} />
          {isFooter ? (
            <Modal.Footer>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 8,
                }}>
                <ButtonBack
                  isRight={false}
                  isDelete={false}
                  title="CANCEL"
                  onPress={handleModalSuccess}
                />
                <View style={{ width: 16 }} />
                <ButtonDelete
                  isRight={true}
                  isDelete={true}
                  title="DELETE"
                  onPress={handleDeleteTree}
                />
              </View>
            </Modal.Footer>
          ) : null}
          {/* <Modal.Footer>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 8,
              }}>
              <ButtonBack
                isRight={false}
                isDelete={false}
                title="CANCEL"
                onPress={() => setModalVisible(false)}
              />
              <View style={{ width: 16 }} />
              <ButtonDelete
                isRight={true}
                isDelete={true}
                title="LOGIN"
                onPress={() => handleDeleteTree(key)}
              />
            </View>
          </Modal.Footer> */}
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
