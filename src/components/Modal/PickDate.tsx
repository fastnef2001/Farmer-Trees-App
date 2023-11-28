import React from 'react';
import { StyleSheet, View } from 'react-native';
import RNModal from 'react-native-modal';

type ModalProps = {
  isVisible: boolean;
  children: React.ReactNode;
  [x: string]: any;
};

export const PickDate = ({
  isVisible = false,
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
    </RNModal>
  );
};

const Container = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.container}>{children}</View>
);
const Header = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.header}>{children}</View>
);
const Body = ({ children }: { children?: React.ReactNode }) => (
  <View style={styles.body}>{children}</View>
);
const Footer = ({ children }: { children?: React.ReactNode }) => (
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
    paddingHorizontal: 8,
    paddingTop: 8,
    maxHeight: 500,
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

PickDate.Container = Container;
PickDate.Header = Header;
PickDate.Body = Body;
PickDate.Footer = Footer;
