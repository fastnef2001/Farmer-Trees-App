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
    <IconDone style={{ marginTop: 18 }} />
    <Text style={styles.text}>{title}</Text>
    <View
      style={{
        width: '80%',
        backgroundColor: 'gray',
        height: 1,
        marginTop: 18,
      }}
    />
  </View>
);

const ModalBody = ({ children }: { children?: React.ReactNode }) => (
  <View style={styles.body}>{children}</View>
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
  },
  body: {
    justifyContent: 'center',
    paddingHorizontal: 15,
    minHeight: 60,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
  },
});

Modal.Header = ModalHeader;
Modal.Container = ModalContainer;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
