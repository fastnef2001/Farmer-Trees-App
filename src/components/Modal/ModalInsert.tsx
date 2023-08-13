import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import RNModal from 'react-native-modal';
import IconBack from '../../assets/images/IconBack.svg';

type ModalProps = {
  isVisible: boolean;
  children: React.ReactNode;
  [x: string]: any;
};

export const ModalInsert = ({
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
      style={{ margin: 0 }}
      {...props}>
      {children}
    </RNModal>
  );
};

const ModalInsertContainer = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.container}>{children}</View>
);
const ModalInsertHeader = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.header}>{children}</View>
);
const ModalInsertBody = ({ children }: { children?: React.ReactNode }) => (
  <View style={styles.body}>{children}</View>
);
const ModalInsertFooter = ({ children }: { children?: React.ReactNode }) => (
  <View style={styles.footer}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    height: '50%',
    width: '100%',
    backgroundColor: '#ffffff',
    position: 'absolute', // Tương ứng với top: 364px
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 12, // Tương ứng với border-radius: 12px 12px 0px 0px
    borderTopRightRadius: 12,
    flexDirection: 'column', // Flex direction mặc định của React Native là column
    alignItems: 'stretch', // Stretch tương ứng với "Hug" trong Figma
    justifyContent: 'flex-start', // Tương ứng với top alignment trong Figma
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 24,
    color: '#163859',
    fontWeight: 'bold',
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

ModalInsert.Container = ModalInsertContainer;
ModalInsert.Header = ModalInsertHeader;
ModalInsert.Body = ModalInsertBody;
ModalInsert.Footer = ModalInsertFooter;
