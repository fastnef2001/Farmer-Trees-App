import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import RNModal from 'react-native-modal';

type ModalProps = {
  isVisible: boolean;
  children: React.ReactNode;
  [x: string]: any;
};

export const ModalLoading = ({
  isVisible = false,
  children,
  ...props
}: ModalProps) => {
  return (
    <RNModal isVisible={isVisible} {...props}>
      {children}
    </RNModal>
  );
};

const ModalLoadingContainer = () => (
  <View>
    <LottieView
      style={{ width: 500, height: 500, alignSelf: 'center' }}
      source={require('../../assets/animations/AnimationLoading.json')}
      autoPlay
      loop
    />
  </View>
);

const styles = StyleSheet.create({
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
    width: '90%',
    alignSelf: 'center',
  },
});

ModalLoading.Container = ModalLoadingContainer;
