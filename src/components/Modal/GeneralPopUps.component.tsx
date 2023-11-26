import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
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
  isFooter?: boolean;
  handleFunction: any;
  handleModalSuccess: () => void;
  isLogin?: boolean;
  title?: string;
};

export type PopUpLoadingProps = {
  isModalVisible: boolean;
};

// export const PopUpSuccessLogin = ({
//   isModalSuccess,
//   handleFunction,
//   handleModalSuccess,
// }: PopUpSuccessProps) => {
//   return (
//     <>
//       <Modal isVisible={isModalSuccess}>
//         <StatusBar backgroundColor={'#07111B'} />
//         <Modal.Container>
//           <Modal.Header title={'Successfully'} />
//           <Modal.Body
//             title={'You have successfully registered, please login.'}
//           />
//           <Modal.Footer>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 paddingHorizontal: 8,
//               }}>
//               <ButtonBack
//                 isRight={false}
//                 isDelete={false}
//                 title="CANCEL"
//                 onPress={handleModalSuccess}
//               />
//               <View style={{ width: 16 }} />
//               <ButtonLogin
//                 isRight={true}
//                 isDelete={true}
//                 title="LOGIN"
//                 onPress={handleFunction}
//               />
//             </View>
//           </Modal.Footer>
//         </Modal.Container>
//       </Modal>
//     </>
//   );
// };

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
