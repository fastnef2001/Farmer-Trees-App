/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import RNModal from 'react-native-modal';
import IconDone from '../../assets/images/IconDone.svg';

type ModalProps = {
  isVisible: boolean;
  children: React.ReactNode;
  [x: string]: any;
};

export const Modal = ({
  isVisible = false,
  children,
  ...props
}: ModalProps) => {
  return (
    <RNModal
      isVisible={isVisible}
      animationInTiming={1000}
      animationOutTiming={1000}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}
      {...props}>
      {children}
    </RNModal>
  );
};

const ModalContainer = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.container}>{children}</View>
);

const ModalHeader = ({ title }: { title: string }) => (
  <View style={styles.header}>
    <IconDone />
    <Text style={styles.text}>{title}</Text>
    <View
      style={{
        width: '100%',
        backgroundColor: '#C1C1C7',
        height: 1,
        marginTop: 12,
      }}
    />
  </View>
);

const ModalBody = ({ title }: { title: string }) => (
  <View style={styles.body}>
    <Text style={styles.textbody}>{title}</Text>
  </View>
);

const ModalFooter = ({ children }: { children?: React.ReactNode }) => (
  <View style={styles.footer}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#163859',
    borderStyle: 'solid',
    padding: 16,
    maxWidth: 327,
    //đưa thẻ Container về giữa màn hình
    alignSelf: 'center',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Nunito',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#163859',
    marginTop: 16,
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    width: '100%',
  },

  textbody: {
    fontFamily: 'Nunito',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#636366',
    width: '100%',
  },
  footer: {
    marginTop: 24,
  },
});

Modal.Header = ModalHeader;
Modal.Container = ModalContainer;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
