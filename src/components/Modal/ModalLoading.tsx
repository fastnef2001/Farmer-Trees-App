import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import RNModal from 'react-native-modal';

type ModalProps = {
  isVisible: boolean;
  children: React.ReactNode;
  [x: string]: any;
};

export const ModalLoading = ({ isVisible, children, ...props }: ModalProps) => {
  return (
    <RNModal
      isVisible={isVisible}
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      {...props}>
      {children}
    </RNModal>
  );
};

const ModalLoadingContainer = () => (
  <View>
    <LottieView
      style={{ width: 100, height: 100, alignSelf: 'center' }}
      source={require('../../assets/animations/AnimationLoading.json')}
      autoPlay
      loop
    />
  </View>
);

ModalLoading.Container = ModalLoadingContainer;
