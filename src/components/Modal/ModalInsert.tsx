import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import RNModal from 'react-native-modal';
import IconBack from '../../assets/images/IconBack.svg';
import { ScrollView } from 'react-native-gesture-handler';

type ModalProps = {
  isVisible: boolean;
  children: React.ReactNode;
  [x: string]: any;
};

export const ModalInsert = ({
  isVisible = false,
  isPick,
  children,
  ...props
}: ModalProps) => {
  return (
    <RNModal
      isVisible={isVisible}
      animationInTiming={500}
      animationOutTiming={500}
      style={{ margin: 0 }}
      {...props}>
      {children}
      {isPick}
    </RNModal>
  );
};

const ModalInsertContainer = ({
  children,
  isPick,
}: {
  children: React.ReactNode;
  isPick?: boolean;
}) => (
  <View style={isPick ? styles.container1 : styles.container}>{children}</View>
);
const ModalInsertHeader = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.header}>{children}</View>
);
const ModalInsertBody = ({
  children,
  isPick,
}: {
  children?: React.ReactNode;
  isPick?: boolean;
}) => <View style={isPick ? styles.body1 : styles.body}>{children}</View>;
const ModalInsertFooter = ({ children }: { children?: React.ReactNode }) => (
  <View style={styles.footer}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#ffffff',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingTop: 8,
    maxHeight: 800,
  },
  container1: {
    width: '100%',
    backgroundColor: '#ffffff',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingTop: 8,
    maxHeight: 800,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  text: {
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 24,
    color: '#163859',
    fontWeight: 'bold',
  },
  body: {
    width: '90%',
    alignSelf: 'center',
  },
  body1: {
    width: '100%',
    alignSelf: 'center',
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
