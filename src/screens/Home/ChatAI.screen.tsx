import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatAIScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chat AI</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#163859',
  },
});

export default ChatAIScreen;
